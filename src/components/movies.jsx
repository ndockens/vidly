import React, { Component } from "react";
import { toast } from "react-toastify";
import { getMovies, deleteMovie } from "../services/movieService";
import Pagination from "./common/pagination";
import paginate from "../utils/paginate";
import ListGroup from "./common/listGroup";
import SearchBar from "./common/searchBar";
import { getGenres } from "../services/genreService";
import MoviesTable from "./moviesTable";
import _ from "lodash";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    selectedGenre: {},
    searchText: "",
    pageSize: 4,
    currentPage: 1,
    sortColumn: { path: "title", order: "asc" }
  };

  async componentDidMount() {
    const { data } = await getGenres();
    const genres = [{ _id: "", name: "All Genres" }, ...data];
    const { data: movies } = await getMovies();
    this.setState({
      movies,
      genres,
      selectedGenre: genres[0]
    });
  }

  getPagedData() {
    const {
      movies,
      selectedGenre,
      searchText,
      sortColumn,
      currentPage,
      pageSize
    } = this.state;

    const filteredMovies =
      selectedGenre && selectedGenre._id
        ? movies.filter(m => m.genre._id === selectedGenre._id)
        : movies;

    const searchedMovies = searchText
      ? filteredMovies.filter(m =>
          m.title.toLowerCase().includes(searchText.toLowerCase())
        )
      : filteredMovies;

    const sortedMovies = _.orderBy(
      searchedMovies,
      sortColumn.path,
      sortColumn.order
    );

    const paginatedMovies = paginate(sortedMovies, currentPage, pageSize);

    return { totalCount: searchedMovies.length, data: paginatedMovies };
  }

  handleDelete = async movie => {
    const originalMovies = this.state.movies;
    const movies = [...this.state.movies];
    movies.splice(movies.indexOf(movie), 1);
    this.setState({ movies });

    try {
      await deleteMovie(movie._id);
      toast.success("Movie has been deleted.");
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("This movie has already been deleted.");

      this.setState({ movies: originalMovies });
    }
  };

  handleLike = movie => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movie };
    movies[index].like = !movie.like;
    this.setState({ movies });
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = genre => {
    this.setState({ selectedGenre: genre, searchText: "", currentPage: 1 });
  };

  handleSearch = searchText => {
    this.setState({ searchText, selectedGenre: {}, currentPage: 1 });
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  render() {
    const {
      pageSize,
      currentPage,
      genres,
      selectedGenre,
      searchText,
      sortColumn
    } = this.state;

    const { user } = this.props;

    const { totalCount: moviesCount, data: movies } = this.getPagedData();

    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={genres}
            selectedItem={selectedGenre}
            onItemSelect={this.handleGenreSelect}
            keyProperty="_id"
            valueProperty="name"
          />
        </div>
        <div className="col-9">
          {user && (
            <button
              onClick={() => this.props.history.push("/movies/new")}
              className="btn btn-primary"
              id="btn-new-movie"
            >
              New Movie
            </button>
          )}

          <p>Showing {moviesCount} movies in this database</p>
          <SearchBar value={searchText} onChange={this.handleSearch} />
          <MoviesTable
            movies={movies}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
            sortColumn={sortColumn}
          />
          <Pagination
            itemCount={moviesCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Movies;

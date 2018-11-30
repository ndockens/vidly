import React, { Component } from "react";
import { getMovies, deleteMovie } from "../services/fakeMovieService";

class Movies extends Component {
  state = {
    movies: getMovies()
  };

  handleDelete(id) {
    deleteMovie(id);
    this.setState({ movies: this.state.movies });
  }

  render() {
    const moviesCount = this.state.movies.length;

    if (moviesCount === 0) return <p>There are no movies to display.</p>;
    else
      return (
        <React.Fragment>
          <p>Showing {moviesCount} movies in this database</p>
          <table className="table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Genre</th>
                <th>Stock</th>
                <th>Rate</th>
                <th> </th>
              </tr>
            </thead>
            <tbody>
              {this.state.movies.map(movie => (
                <tr key={movie._id}>
                  <td>{movie.title}</td>
                  <td>{movie.genre.name}</td>
                  <td>{movie.numberInStock}</td>
                  <td>{movie.dailyRentalRate}</td>
                  <td>
                    <button
                      onClick={() => this.handleDelete(movie._id)}
                      className="btn btn-danger btn-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </React.Fragment>
      );
  }
}

export default Movies;

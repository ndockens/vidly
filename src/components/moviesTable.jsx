import React, { Component } from "react";
import Like from "./common/like";
import Table from "./common/table";
import { Link } from "react-router-dom";
import auth from "../services/authService";

class MoviesTable extends Component {
  columns = [
    {
      key: 1,
      label: "Title",
      path: "title",
      getContent: movie => (
        <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
      )
    },
    {
      key: 2,
      label: "Genre",
      path: "genre.name",
      getContent: movie => movie.genre.name
    },
    {
      key: 3,
      label: "Stock",
      path: "numberInStock",
      getContent: movie => movie.numberInStock
    },
    {
      key: 4,
      label: "Rate",
      path: "dailyRentalRate",
      getContent: movie => movie.dailyRentalRate
    },
    {
      key: 5,
      getContent: movie => (
        <Like like={movie.like} onClick={() => this.props.onLike(movie)} />
      )
    }
  ];

  componentWillMount() {
    const user = auth.getCurrentUser();

    if (user && user.isAdmin) {
      const deleteBtnColumn = {
        key: 6,
        getContent: movie => (
          <button
            onClick={() => this.props.onDelete(movie)}
            className="btn btn-danger btn-sm"
          >
            Delete
          </button>
        )
      };

      this.columns.push(deleteBtnColumn);
    }
  }

  render() {
    const { movies, onSort, sortColumn } = this.props;

    return (
      <Table
        columns={this.columns}
        data={movies}
        onSort={onSort}
        sortColumn={sortColumn}
      />
    );
  }
}

export default MoviesTable;

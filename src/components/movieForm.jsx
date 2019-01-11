import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import { getMovie, saveMovie } from "../services/movieService";
import { getGenres } from "../services/genreService";
import { toast } from "react-toastify";

class MovieForm extends Form {
  state = {
    data: {
      _id: "",
      title: "",
      genreId: "",
      numberInStock: "",
      dailyRentalRate: ""
    },
    errors: {}
  };

  schema = {
    _id: Joi.string(),
    title: Joi.string()
      .required()
      .label("Title"),
    genreId: Joi.string()
      .required()
      .label("Genre"),
    numberInStock: Joi.number()
      .min(0)
      .max(100)
      .required()
      .label("Number in Stock"),
    dailyRentalRate: Joi.number()
      .min(0)
      .max(10)
      .required()
      .label("Rate")
  };

  genres = [];

  async componentDidMount() {
    const { data: genres } = await getGenres();
    this.genres = genres;

    if (this.props.location.pathname === "/movies/new") {
      const data = {
        _id: "0",
        title: "",
        genreId: genres[0]._id,
        numberInStock: "",
        dailyRentalRate: ""
      };

      this.setState({ data });
    } else this.loadMovieData(this.props);
  }

  loadMovieData = async props => {
    const { history } = props;
    const id = props.match.params.id;
    try {
      const { data } = await getMovie(id);

      const movie = {
        _id: data._id,
        title: data.title,
        genreId: data.genre._id,
        numberInStock: data.numberInStock,
        dailyRentalRate: data.dailyRentalRate
      };

      this.setState({ data: movie });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        history.replace("/not-found");
    }
  };

  async doSubmit() {
    const {
      _id,
      title,
      genreId,
      numberInStock,
      dailyRentalRate
    } = this.state.data;

    const response = await saveMovie(_id, {
      title,
      genreId,
      numberInStock,
      dailyRentalRate
    });

    if (response && response.status === 200) {
      this.props.history.push("/movies");
      toast.success("Movie has been saved to the database.");
    }
  }

  render() {
    return (
      <div>
        <h1>Movie Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "title", "Title")}
          {this.renderSelect("genreId", "genreId", "Genre", this.genres)}
          {this.renderInput(
            "numberInStock",
            "numberInStock",
            "Number in Stock"
          )}
          {this.renderInput("dailyRentalRate", "dailyRentalRate", "Rate")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default MovieForm;

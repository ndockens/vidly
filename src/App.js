import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import auth from "./services/authService";
import Movies from "./components/movies";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NavBar from "./components/common/navbar";
import LoginForm from "./components/loginForm";
import Logout from "./components/logout";
import RegisterForm from "./components/registerForm";
import NotFound from "./components/common/notFound";
import MovieForm from "./components/movieForm";
import ProtectedRoute from "./components/common/protectedRoute";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";

class App extends Component {
  state = {
    navbarBrand: "Vidly",
    navbarLinks: [
      { key: 1, label: "Movies", path: "/movies" },
      { key: 2, label: "Customers", path: "/customers" },
      { key: 3, label: "Rentals", path: "/rentals" },
      { key: 4, label: "Login", path: "/login" },
      { key: 5, label: "Register", path: "/register" }
    ]
  };

  componentDidMount() {
    const user = auth.getCurrentUser();

    if (!user) return;

    // Is user is logged in, remove login and register links
    // from navbar and add username and logout.
    let navbarLinks = this.state.navbarLinks.filter(
      n => n.key !== 4 && n.key !== 5
    );
    navbarLinks.push(
      { key: 6, label: `${user.name} <${user.email}>`, path: "/profile" },
      { key: 7, label: "Logout", path: "/logout" }
    );

    this.setState({ user, navbarLinks });
  }

  render() {
    const { user, navbarBrand, navbarLinks } = this.state;
    return (
      <main className="container">
        <ToastContainer />
        <NavBar brand={navbarBrand} links={navbarLinks} />
        <Switch>
          <Route path="/login" component={LoginForm} />
          <Route path="/logout" component={Logout} />
          <Route path="/register" component={RegisterForm} />
          <ProtectedRoute path="/movies/new" component={MovieForm} />
          <Route path="/movies/:id" component={MovieForm} />
          <Route
            path="/movies"
            render={props => <Movies {...props} user={user} />}
          />
          <Route path="/customers" component={Customers} />
          <Route path="/rentals" component={Rentals} />
          <Route path="/not-found" component={NotFound} />
          <Redirect exact from="/" to="/movies" />
          <Redirect to="/not-found" />
        </Switch>
      </main>
    );
  }
}

export default App;

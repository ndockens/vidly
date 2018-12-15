import React, { Component } from "react";

class Like extends Component {
  render() {
    return (
      <i
        className={this.props.like ? "fa fa-heart" : "fa fa-heart-o"}
        onClick={this.props.onClick}
        aria-hidden="true"
        style={{ cursor: "pointer" }}
      />
    );
  }
}

export default Like;

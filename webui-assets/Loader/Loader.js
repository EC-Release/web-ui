import React, { Component } from "react";
import Rolling from "../assets/images/rolling.svg";
class Loader extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-md-6 text-centered"></div>
        <div className="col-md-4 text-centered">
          <img className="index-loader center-block" alt="loading" src={Rolling} />
        </div>
      </div>
    );
  }
}

export default Loader;

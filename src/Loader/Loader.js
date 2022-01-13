import React, { Component } from "react";
import Rolling from "../assets/images/rolling.svg";
class Loader extends Component {
  /* istanbul ignore next */
  render() {
    /* jshint ignore:start */
    /* istanbul ignore next */
    return (
      <div className="row">
        <div className="col-md-12 text-centered">
          <img className="index-loader center-block" alt="loading" src={Rolling} />
        </div>
      </div>
    );
    /* jshint ignore:end */
  }
}

export default Loader;

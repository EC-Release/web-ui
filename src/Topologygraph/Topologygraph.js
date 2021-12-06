import React from "react";
//import { vis } from "vis-network";
//import { DataSet, Network } from 'vis-network/standalone/esm/vis-network';
import {
  Network,
  DataSet,
} from "vis-network/standalone/umd/vis-network.min.js";

export default class Topologygraph extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.generateTopology(this.props.nodeData);
  }

  /* istanbul ignore next */
  componentDidUpdate() {
    this.generateTopology(this.props.nodeData);
  }

  generateTopology(nodeData) {
    var width = 400;
    var height = 280;
    var options = {
      height: "280px",
    };
    var network = new Network(this.refs.myRef, nodeData, options);
    network.moveTo({
      position: { x: 0, y: 0 },
      offset: { x: -width / 2, y: -height / 2 },
      scale: 1,
    });
  }
  render() {
    /* jshint ignore:start */
    /* istanbul ignore next */
    return (
      <div  className="Topologygraph" id="topologygraph" >
        <div ref="myRef"></div>
      </div>
    );
    /* jshint ignore:end */
  }
}

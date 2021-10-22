import React from "react";
//import { vis } from "vis-network";
//import { DataSet, Network } from 'vis-network/standalone/esm/vis-network';
import { Network,  DataSet } from 'vis-network/standalone/umd/vis-network.min.js';

export default class Topologygraph extends React.Component {
    
    constructor(props) {
        super(props);
    }
    
    componentDidMount(){
        //window.generateTopology(this.props.nodeData, 'topologygraph');
        this.generateTopology(this.props.nodeData, 'topologygraph');
    }

    /* istanbul ignore next */
    componentDidUpdate(){
      this.generateTopology(this.props.nodeData, 'topologygraph');
        
    }

    generateTopology(nodeData, graphtype){
        var options = {
        height: "220px"};
        var network = new Network(this.refs.myRef,nodeData,options); 
    }
    render(){
        /* jshint ignore:start */
        /* istanbul ignore next */
        return( <div className="Topologygraph" id="topologygraph"><div  ref="myRef"></div></div>)
        /* jshint ignore:end */
    }
}

import React from "react";

export default class Topologygraph extends React.Component {
    
    constructor(props) {
        super(props);
    }

    componentDidMount(){
        window.generateTopology(this.props.nodeData, 'topologygraph');
    }

    /* istanbul ignore next */
    componentDidUpdate(){
        window.generateTopology(this.props.nodeData, 'topologygraph');
    }

    render(){
        /* jshint ignore:start */
        /* istanbul ignore next */
        return(<div className="Topologygraph" id="topologygraph"></div>)
        /* jshint ignore:end */
    }
}
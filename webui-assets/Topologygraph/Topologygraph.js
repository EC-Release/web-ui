import React from "react";

export default class Topologygraph extends React.Component {
    
    constructor(props) {
        super(props);
    }

    componentDidMount(){
        window.generateTopology(this.props.nodeData, 'topologygraph');
    }

    componentDidUpdate(){
        window.generateTopology(this.props.nodeData, 'topologygraph');
    }

    render(){
        return(<div className="Topologygraph" id="topologygraph"></div>)
    }
}
import React from "react";
import ReactDOM from "react-dom";

import Treelist from '../Treelist/Treelist.js';
import Topologygraph from '../Topologygraph/Topologygraph.js';
import Viewtable from '../Viewtable/Viewtable.js';

export default class Businessview extends React.Component {

    /* istanbul ignore next */
    constructor(props){
        super(props);
        this.state = {
            treeValue: [],
            graph: {
                nodes: [],
                edges: []
            },

            options: {
                layout: {
                  hierarchical: true
                },
                edges: {
                  color: "#000000"
                },
                height: "500px"
            },
            table:{
                thead: [],
                tbody: []
            }
        };
    }

    /* istanbul ignore next */
    componentDidMount(){
        let treeValue = [{
            id: 1,
            value: 'EC',
            children: [
                {
                    id: 2,
                    value: 'Business',
                    children: [
                        {
                            id: 7,
                            value: 'Aviation',
                            children: [
                                {
                                    id: 11,
                                    value: 'Aviation1'
                                },
                                {
                                    id: 12,
                                    value: 'Aviation2'
                                },
                                {
                                    id: 13,
                                    value: 'Aviation3'
                                },
                            ]
                        },
                        {
                            id: 8,
                            value: 'Power'
                        },
                        {
                            id: 9,
                            value: 'Capital'
                        },
                        {
                            id: 10,
                            value: 'External'
                        }
                    ]
                },
                {
                    id: 3,
                    value: 'Subscription'
                },
                {
                    id: 4,
                    value: 'Application'
                },
                {
                    id: 5,
                    value: 'Groups'
                },
                {
                    id: 6,
                    value: 'Connection'
                }
            ]
        }];
        let nodes = [];
        let edges = [];
        if(treeValue.length > 0){
            let treeObj = treeValue[0];
            let parentNodeId = treeObj.id;
            let parentNodeLabel = treeObj.value;
            let parentNode = { id: parentNodeId, label: parentNodeLabel };
            nodes.push(parentNode);
            if(treeObj.children){
                for(let childNode of treeObj.children){
                    let childNodeId = childNode.id;
                    let childNodeLabel = childNode.value;
                    let preparedChildNode = { id: childNodeId, label: childNodeLabel };
                    nodes.push(preparedChildNode);

                    let prepareEdges = { from: 1, to: childNodeId };
                    edges.push(prepareEdges);
                }
            }
        }
        
        this.setState({
            treeValue: treeValue,
            graph: {
                nodes: nodes,
                edges: edges
            }
        });
    }

    /* istanbul ignore next */
    changeTopologyView(items){
        let nodes = [];
        let edges = [];
        let treeObj = Object.assign({}, items);
        let parentNodeId = treeObj.id;
        let parentNodeLabel = treeObj.value;
        let parentNode = {};
        parentNode.id = parentNodeId;
        parentNode.label = parentNodeLabel;
        nodes.push(parentNode);
        if(treeObj.children){
            let childern = [ ...treeObj.children];
            for(let childNode of childern){
                let copiedChildNode = Object.assign({}, childNode);
                let childNodeId = copiedChildNode.id;
                let childNodeLabel = copiedChildNode.value;
                let preparedChildNode = {};
                preparedChildNode.id = childNodeId;
                preparedChildNode.label = childNodeLabel;
                nodes.push(preparedChildNode);

                let prepareEdges = {};
                prepareEdges.from = parentNodeId;
                prepareEdges.to = childNodeId;
                edges.push(prepareEdges);
            }
        }

        this.setState({
            graph: {
                nodes: nodes,
                edges: edges
            }
        });
    }

    /* istanbul ignore next */
    render() {
        /* jshint ignore:start */
        return (
            <div className="Businessview">
                {/*<div id="accordion">
                    <div className="card">
                        <div className="card-header" id="headingOne">
                            <h5 className="mb-0">
                                <button className="btn btn-link" data-toggle="collapse" data-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                                    Treelist and Topology
                                </button>
                            </h5>
                        </div>

                        <div id="collapseOne" className="collapse" aria-labelledby="headingOne" data-parent="#accordion">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-4 treeview-div">
                                        <Treelist treeValue={this.state.treeValue} changeTopology={this.changeTopologyView.bind(this)}></Treelist>
                                    </div>
                                    <div className="col-md-8 treeview-div">
                                        <Topologygraph nodeData={this.state.graph}></Topologygraph>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-header" id="headingTwo">
                            <h5 className="mb-0">
                                <button className="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                    Table
                                </button>
                            </h5>
                        </div>
                        <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
                            <div className="card-body">
                            {
                                this.props.showTable ?
                                    <div className="row view-table">
                                        <div className="col-md-12">
                                            <Viewtable tableData={this.props.tableData} showHideTableTdData={this.props.showHideTableTdData.bind(this)}></Viewtable>
                                        </div>
                                        <div className="col-md-12">
                                            <button onClick={this.props.goToSearch.bind(this)} className="btn btn-sm float-right customize-view-btn">CUSTOMIZE VIEW</button>
                                        </div>
                                    </div> :
                                    <p className="text-center loader-icon">
                                        <img alt="loading" src="assets/static/images/rolling.svg" />
                                    </p>
                            }
                            </div>
                        </div>
                    </div>
                </div> */}

                <ul className="nav nav-tabs" id="myTab" role="tablist">
                    <li className="nav-item">
                        <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Table</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Treelist and Topology</a>
                    </li>
                </ul>
                <div className="tab-content" id="myTabContent">
                    <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                    
                        <div className="row view-table">
                            <div className="col-md-12" id="viewTableDiv">
                                {/*<button onClick={this.props.goToSearch.bind(this)} className="btn btn-sm float-right btn-link">Advanced search</button>
                                <Viewtable tableData={this.props.tableData} showHideTableTdData={this.props.showHideTableTdData.bind(this)}></Viewtable>*/}
                                <h3>Work in progress for real time table view</h3>
                            </div>
                        </div>
                    </div>
                    <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                        <div className="row">
                            <div className="col-md-4 treeview-div">
                                <Treelist treeValue={this.state.treeValue} changeTopology={this.changeTopologyView.bind(this)}></Treelist>
                            </div>
                            <div className="col-md-8 treeview-div">
                                <Topologygraph nodeData={this.state.graph}></Topologygraph>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
        /* jshint ignore:end */
    }
}
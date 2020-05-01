import React from "react";

import Technicalview from './Technicalview.js';
import Businessview from './Businessview.js';

export default class View extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            mockTableData: [],
            topologyView: false, // false = Technical view, true = Business view
        };
    }

    /* istanbul ignore next */
    componentDidMount(){
    }

    /* istanbul ignore next */
    changeTopologyView(){
        this.setState({
            topologyView: event.target.checked
        });
    }

    /* istanbul ignore next */
    servedTopologyView(){
        const currentTopologyView = this.state.topologyView;
        if(!currentTopologyView){
            // Technical view
            return <Technicalview authToken={this.props.authToken} baseUrl={this.props.baseUrl} userId={this.props.userId} showGlobalMessage={this.props.showGlobalMessage} hideGlobalMessage={this.props.hideGlobalMessage} />; // jshint ignore:line
        }
        else{
            // Business view
            return <Businessview authToken={this.props.authToken} baseUrl={this.props.baseUrl} userId={this.props.userId} showGlobalMessage={this.props.showGlobalMessage} hideGlobalMessage={this.props.hideGlobalMessage} />; // jshint ignore:line
        }
    }

    render() {
        /* jshint ignore:start */
        /* istanbul ignore next */
        return (
            <div className="centered-div View">
                <div className="centered-div-header">
                    <div className="row view-header">
                        <div className="col-sm-8">
                            <h6 id="view-header-title">Topology view</h6>
                        </div>
                        <div className="col-sm-4">
                            <div className="row">
                                <div className="col-sm-5">
                                    <h6>Technical view</h6>
                                </div>
                                <div className="col-sm-2">
                                    <div className="custom-control custom-switch">
                                        <input
                                            checked={ this.state.topologyView }
                                            onChange={this.changeTopologyView.bind(this)} 
                                            type="checkbox" 
                                            className="custom-control-input" 
                                            id="viewComponentChange" />
                                        <label className="custom-control-label cursor-pointer" htmlFor="viewComponentChange">&nbsp;</label>
                                    </div>
                                </div>
                                <div className="col-sm-5">
                                    <h6>Business view</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr></hr>
                    <div className="col-md-12">
                        { this.servedTopologyView() }
                    </div>
                </div>
            </div>
        );
        /* jshint ignore:end */
    }
}
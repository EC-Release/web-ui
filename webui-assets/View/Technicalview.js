import React from "react";
import ReactDOM from "react-dom";

import Treelist from '../Treelist/Treelist.js';
import Topologygraph from '../Topologygraph/Topologygraph.js';
import Viewtable from '../Viewtable/Viewtable.js';

export default class Technicalview extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            treeValue: [],
            graph: {
                nodes: [],
                edges: []
            },
            loadTreeJs: false
        };
    }

    componentDidMount(){
        
        let treeValue = [{
            id: 1,
            value: 'EC'
        }];

        fetch(this.props.baseUrl + '/listSubscriptions', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+this.props.authToken
            }
        })
		.then((response) => {
			if (response.status === 200) {
                response.json().then((respData) => {
                    
                    if(respData.errorStatus.status == 'ok'){
                        let subscriptions = respData.data;
                        if(subscriptions.length == 0){
                            subscriptions = [];
                        }

                        let numOfSubscriptions = subscriptions.length;
                        let totalNumOfAjax = subscriptions.length;
                        let totalNumOfAjaxProcessed = 0;
                        if(numOfSubscriptions === 0){
                            let that = this;
                            setTimeout(function(){
                                that.setState({
                                    loadTreeJs: true
                                });
                                console.log('subscriptions');
                            }, 1000);
                        }

                        let newId = treeValue[0].id;
                        for(let indexSubscriptions in subscriptions){
                            let subscriptionId = subscriptions[indexSubscriptions].subscriptionId.trim();
                            newId++;
                            let newSubscriptionsObj = {};
                            newSubscriptionsObj.id = newId;
                            newSubscriptionsObj.title = subscriptionId;
                            let valueToshow = subscriptionId;
                            if(subscriptionId.length > 20){
                                let first3Char = subscriptionId.substr(0, 5);
                                let last3Char = subscriptionId.substr(subscriptionId.length - 5, 5);
                                valueToshow = first3Char+'...'+last3Char;
                            }
                            newSubscriptionsObj.value = valueToshow;
                            
                            if(indexSubscriptions == 0){
                                treeValue[0].children = [newSubscriptionsObj];
                            }
                            else{
                                treeValue[0].children.push(newSubscriptionsObj);
                            }

                            if(subscriptionId != ''){
                                fetch(this.props.baseUrl + '/gatewayList?subscriptionID='+subscriptionId, { // Get gateways '/gatewayList?subscriptionID='+subscriptionId
                                    method: 'GET',
                                    headers: {
                                        'Accept': 'application/json',
                                        'Content-Type': 'application/json',
                                        'Authorization': 'Bearer '+this.props.authToken
                                    }
                                })
                                .then((response) => { // jshint ignore:line
                                    if (response.status === 200) {
                                        totalNumOfAjaxProcessed++;
                                        response.json().then((respData) => {
                                            if(respData.errorStatus.status == 'ok'){
                                                let gateways = respData.data.glist;
                                                totalNumOfAjax = totalNumOfAjax + Object.keys(gateways).length;
                                                
                                                if(totalNumOfAjaxProcessed === totalNumOfAjax){
                                                    let that = this;
                                                    setTimeout(function(){
                                                        that.setState({
                                                            loadTreeJs: true
                                                        });
                                                        console.log('gateways');
                                                    }, 2000);
                                                }
   
                                                for(let indexGateway in gateways){
                                                    newId++;
                                                    let newGatewayObj = {};
                                                    newGatewayObj.id = newId;
                                                    newGatewayObj.title = gateways[indexGateway].cfURL;
                                                    let valueToshow = gateways[indexGateway].cfURL;
                                                    if(gateways[indexGateway].cfURL.length > 30){
                                                        let first7Char = gateways[indexGateway].cfURL.substr(0, 10);
                                                        let last7Char = gateways[indexGateway].cfURL.substr(gateways[indexGateway].cfURL.length - 10, 10);
                                                        valueToshow = first7Char+'...'+last7Char;
                                                    }
                                                    newGatewayObj.value = valueToshow;
            
                                                    if(indexGateway.split(":")[1] == 0){
                                                        treeValue[0].children[indexSubscriptions].children = [newGatewayObj];
                                                    }
                                                    else{
                                                        treeValue[0].children[indexSubscriptions].children.push(newGatewayObj);
                                                    }

                                                    fetch(this.props.baseUrl + '/getGatewayHealth?gatewayURL='+gateways[indexGateway].cfURL, {
                                                        method: 'GET',
                                                        headers: {
                                                            'Accept': 'application/json',
                                                            'Content-Type': 'application/json',
                                                            'Authorization': 'Bearer '+this.props.authToken
                                                        }
                                                    })
                                                    .then((response) => { // jshint ignore:line
                                                        if (response.status === 200) {
                                                            response.json().then((respData) => {
                                                                totalNumOfAjaxProcessed++;
                                                                if(respData.errorStatus.status == 'ok'){
                                                                    console.log(respData.data);
                                                                    let clientPools = respData.data.ClientPool;
                                                                    let superConns = respData.data.SuperConns;
                                                                    
                                                                    if(clientPools.length > 0){
                                                                        newId++;
                                                                        treeValue[0].children[indexSubscriptions].children[indexGateway.split(":")[1]].children = [{id: newId, value: 'Client Pools'}];
                                                                        for(let indexClientPool in clientPools){
                                                                            newId++;
                                                                            let newClientPoolObj = {};
                                                                            newClientPoolObj.id = newId;
                                                                            newClientPoolObj.title = clientPools[indexClientPool].clientConfig.groupId+' ['+clientPools[indexClientPool].clientConfig.id+']';
                                                                            let valueToshow = clientPools[indexClientPool].clientConfig.groupId+' ['+clientPools[indexClientPool].clientConfig.id+']';
                                                                            
                                                                            newClientPoolObj.value = valueToshow;

                                                                            if(indexClientPool == 0){
                                                                                treeValue[0].children[indexSubscriptions].children[indexGateway.split(":")[1]].children[0].children = [newClientPoolObj];
                                                                            }
                                                                            else{
                                                                                treeValue[0].children[indexSubscriptions].children[indexGateway.split(":")[1]].children[0].children.push(newClientPoolObj);
                                                                            }
                                                                        }
                                                                    }

                                                                    if(superConns.length > 0){
                                                                        newId++;
                                                                        
                                                                        if(!treeValue[0].children[indexSubscriptions].children[indexGateway.split(":")[1]].children){
                                                                            treeValue[0].children[indexSubscriptions].children[indexGateway.split(":")[1]].children = [{id: newId, value: 'Super Connections'}];
                                                                        }
                                                                        else{
                                                                            treeValue[0].children[indexSubscriptions].children[indexGateway.split(":")[1]].children.push({id: newId, value: 'Super Connections'});
                                                                        }
                                                                        
                                                                        for(let indexSuperConn in superConns){
                                                                            newId++;
                                                                            let newSuperConnObj = {};
                                                                            newSuperConnObj.id = newId;
                                                                            newSuperConnObj.title = superConns[indexSuperConn].bindId.groupId+' ['+ superConns[indexSuperConn].bindId.id + ']';
                                                                            let valueToshow = superConns[indexSuperConn].bindId.groupId+' ['+ superConns[indexSuperConn].bindId.id + ']';
                
                                                                            newSuperConnObj.value = valueToshow;
                
                                                                            if(indexSuperConn == 0){
                                                                                if(treeValue[0].children[indexSubscriptions].children[indexGateway.split(":")[1]].children[0].value === 'Client Pools'){
                                                                                    treeValue[0].children[indexSubscriptions].children[indexGateway.split(":")[1]].children[1].children = [newSuperConnObj];
                                                                                }
                                                                                else{
                                                                                    treeValue[0].children[indexSubscriptions].children[indexGateway.split(":")[1]].children[0].children = [newSuperConnObj];
                                                                                }
                                                                                
                                                                            }
                                                                            else{
                                                                                if(treeValue[0].children[indexSubscriptions].children[indexGateway.split(":")[1]].children[0].value === 'Client Pools'){
                                                                                    treeValue[0].children[indexSubscriptions].children[indexGateway.split(":")[1]].children[1].children.push(newSuperConnObj);
                                                                                }
                                                                                else{
                                                                                    treeValue[0].children[indexSubscriptions].children[indexGateway.split(":")[1]].children[0].children.push(newSuperConnObj);
                                                                                }
                                                                            }
                                                                        }
                                                                    }

                                                                }

                                                                if(totalNumOfAjaxProcessed === totalNumOfAjax){
                                                                    let that = this;
                                                                    setTimeout(function(){
                                                                        that.setState({
                                                                            loadTreeJs: true
                                                                        });
                                                                        console.log('getGatewayHealth');
                                                                    }, 2000);
                                                                }
                                                            });
                                                        }
                                                    });
                                                }
                                            }
                                        });
                                    }
                                });
                            }
                            else{
                                totalNumOfAjaxProcessed++;
                            }
                        
                        }

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
                                    let childNodeTitle = childNode.title;
                                    let preparedChildNode = { id: childNodeId, label: childNodeLabel, title: childNodeTitle };
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
                });
            }
        });
    }

    changeTopologyView(items){
        let nodes = [];
        let edges = [];
        let treeObj = Object.assign({}, items);
        let parentNodeId = treeObj.id;
        let parentNodeLabel = treeObj.value;
        let parentNodeTitle = treeObj.title;
        let parentNode = {};
        parentNode.id = parentNodeId;
        parentNode.label = parentNodeLabel;
        parentNode.title = parentNodeTitle;
        nodes.push(parentNode);
        if(treeObj.children){
            let childern = [ ...treeObj.children];
            for(let childNode of childern){
                let copiedChildNode = Object.assign({}, childNode);
                let childNodeId = copiedChildNode.id;
                let childNodeLabel = copiedChildNode.value;
                let childNodeTitle = copiedChildNode.title;
                let preparedChildNode = {};
                preparedChildNode.id = childNodeId;
                preparedChildNode.label = childNodeLabel;
                preparedChildNode.title = childNodeTitle;
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

    render() {
        /* jshint ignore:start */
        return (
            <div className="Technicalview">
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
                    {
                        this.props.showTable ?
                            <div className="row view-table">
                                <div className="col-md-12">
                                    <button onClick={this.props.goToSearch.bind(this)} className="btn btn-sm float-right btn-link">Advanced search</button>
                                    <Viewtable tableData={this.props.tableData} showHideTableTdData={this.props.showHideTableTdData.bind(this)}></Viewtable>
                                </div>
                            </div> :
                            <p className="text-center loader-icon">
                                <img alt="loading" src="assets/static/images/rolling.svg" />
                            </p>
                    }
                    </div>
                    <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                        <div className="row">
                            <div className="col-md-4 treeview-div">
                                {
                                this.state.loadTreeJs ? 
                                    <Treelist treeValue={this.state.treeValue} changeTopology={this.changeTopologyView.bind(this)}></Treelist>:
                                    <p className="text-center loader-icon">
                                        <img alt="loading" src="assets/static/images/rolling.svg" />
                                    </p>
                                }
                            </div>
                            <div className="col-md-8 treeview-div">
                                {
                                this.state.loadTreeJs ?
                                    <Topologygraph nodeData={this.state.graph}></Topologygraph>:
                                    <p className="text-center loader-icon">
                                        <img alt="loading" src="assets/static/images/rolling.svg" />
                                    </p>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
        /* jshint ignore:end */
    }
}
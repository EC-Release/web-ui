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
            loadTreeJs: false,
            centerNodeColor: '#77b300',
            nodeShapes: [
                'ellipse',
                'circle',
                'box',
            ],
            apiLoadPercentage: 0
        };
    }

    /* istanbul ignore next */
    componentDidMount(){
        
        let treeValue = [{
            id: 1,
            value: 'EC',
            title: 'EC',
            nodeType: 'root'
        }];
        let progressPercent = 0;

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
                        treeValue[0].value = treeValue[0].value + ' (' + subscriptions.length +')';
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

                        progressPercent = Math.round((totalNumOfAjaxProcessed / totalNumOfAjax) * 100);
                        this.setState({
                            apiLoadPercentage: progressPercent
                        });

                        let newId = treeValue[0].id;
                        for(let indexSubscriptions in subscriptions){
                            let subscriptionId = subscriptions[indexSubscriptions].subscriptionId.trim();
                            let subscriptionName = subscriptions[indexSubscriptions].subscriptionName.trim();
                            newId++;
                            let newSubscriptionsObj = {};
                            newSubscriptionsObj.id = newId;
                            newSubscriptionsObj.title = subscriptionName;
                            let valueToshow = subscriptionName;
                            if(subscriptionName.length > 20){
                                let first3Char = subscriptionName.substr(0, 5);
                                let last3Char = subscriptionName.substr(subscriptionName.length - 5, 5);
                                valueToshow = first3Char+'...'+last3Char;
                            }
                            newSubscriptionsObj.value = valueToshow;
                            newSubscriptionsObj.nodeType = 'subscription';
                            
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
                                        progressPercent = Math.round((totalNumOfAjaxProcessed / totalNumOfAjax) * 100);
                                        this.setState({
                                            apiLoadPercentage: progressPercent
                                        });
                                        response.json().then((respData) => {
                                            if(respData.errorStatus.status == 'ok'){
                                                let gateways = respData.data.glist;
                                                let gatewaysCount = Object.keys(gateways).length;
                                                totalNumOfAjax = totalNumOfAjax + gatewaysCount;
                                                progressPercent = Math.round((totalNumOfAjaxProcessed / totalNumOfAjax) * 100);
                                                this.setState({
                                                    apiLoadPercentage: progressPercent
                                                });
                                                treeValue[0].children[indexSubscriptions].value = treeValue[0].children[indexSubscriptions].value + ' (' + gatewaysCount +')';
                                                for(let indexGateway in gateways){
                                                    newId++;
                                                    let newGatewayObj = {};
                                                    newGatewayObj.id = newId;
                                                    newGatewayObj.title = gateways[indexGateway].cfURL;
                                                    let cfUrl = gateways[indexGateway].cfURL;
                                                    let startPos = cfUrl.indexOf('://') + 3;
                                                    let endPos = cfUrl.indexOf('.');
                                                    let valueToshow = cfUrl.slice(startPos, endPos);
                                                    if(valueToshow > 30){
                                                        let first7Char = valueToshow.substr(0, 10);
                                                        let last7Char = valueToshow.substr(valueToshow.length - 10, 10);
                                                        valueToshow = first7Char+'...'+last7Char;
                                                    }
                                                    newGatewayObj.value = valueToshow;
                                                    newGatewayObj.nodeType = 'gateway';
            
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
                                                                progressPercent = Math.round((totalNumOfAjaxProcessed / totalNumOfAjax) * 100);
                                                                this.setState({
                                                                    apiLoadPercentage: progressPercent
                                                                });
                                                                if(respData.errorStatus.status == 'ok'){
                                                                    let clientPools = respData.data.ClientPool;
                                                                    let preparedClientPools = [];
                                                                    let clientPoolCounts = {};
                                                                    let superConns = respData.data.SuperConns;
                                                                    let preparedSuperConns = [];
                                                                    let superConnCounts = {};
                                                                    let sessions = respData.data.Sessions;
                                                                    let secondarySessions = [];
                                                                    let preparedSessions = [];
                                                                    let sessionCounts = {};
                                                                    console.log(sessions);
                                                                    for(let sessionIndex in sessions){
                                                                        console.log(sessions[sessionIndex].clientConfig.groupId);
                                                                        let prepareSessionData = {};
                                                                        prepareSessionData.sessionId = sessionIndex;
                                                                        prepareSessionData.groupId = sessions[sessionIndex].clientConfig.groupId;
                                                                        secondarySessions.push(prepareSessionData);
                                                                    }
                                                                    console.log(secondarySessions);
                                                                    if(clientPools.length > 0){
                                                                        clientPools.forEach(function(element) {
                                                                            clientPoolCounts[element.bindId] = (clientPoolCounts[element.bindId] || 0) + 1;
                                                                        });
                                                                        preparedClientPools = this.removeDuplicates(clientPools, 'bindId');
                                                                        //console.log(preparedClientPools);
                                                                    }

                                                                    if(preparedClientPools.length > 0){
                                                                        newId++;
                                                                        treeValue[0].children[indexSubscriptions].children[indexGateway.split(":")[1]].children = [{id: newId, value: 'Client Pools ('+ clientPools.length + ')', title: 'Client Pools', nodeType: 'clientpooltitle'}];
                                                                        for(let indexClientPool in preparedClientPools){
                                                                            newId++;
                                                                            let newClientPoolObj = {};
                                                                            newClientPoolObj.id = newId;
                                                                            newClientPoolObj.title = preparedClientPools[indexClientPool].clientConfig.groupId+"\n"+' ['+preparedClientPools[indexClientPool].clientConfig.id+'] '+'('+clientPoolCounts[preparedClientPools[indexClientPool].clientConfig.id]+')';
                                                                            let valueToshow = preparedClientPools[indexClientPool].clientConfig.groupId+"\n"+' ['+preparedClientPools[indexClientPool].clientConfig.id+'] '+'('+clientPoolCounts[preparedClientPools[indexClientPool].clientConfig.id]+')';
                                                                            
                                                                            newClientPoolObj.value = valueToshow;
                                                                            newClientPoolObj.nodeType = 'clientpool';

                                                                            if(indexClientPool == 0){
                                                                                treeValue[0].children[indexSubscriptions].children[indexGateway.split(":")[1]].children[0].children = [newClientPoolObj];
                                                                            }
                                                                            else{
                                                                                treeValue[0].children[indexSubscriptions].children[indexGateway.split(":")[1]].children[0].children.push(newClientPoolObj);
                                                                            }
                                                                        }
                                                                    }

                                                                    if(superConns.length > 0){
                                                                        superConns.forEach(function(element) {
                                                                            superConnCounts[element.serverId] = (superConnCounts[element.serverId] || 0) + 1;
                                                                        });
                                                                        preparedSuperConns = this.removeDuplicates(superConns, 'serverId');
                                                                    }
                                                                    if(preparedSuperConns.length > 0){
                                                                        newId++;
                                                                        
                                                                        if(!treeValue[0].children[indexSubscriptions].children[indexGateway.split(":")[1]].children){
                                                                            treeValue[0].children[indexSubscriptions].children[indexGateway.split(":")[1]].children = [
                                                                                {
                                                                                    id: newId, 
                                                                                    value: 'Super Connections (' + superConns.length + ')', 
                                                                                    title: 'Super Connections',
                                                                                    nodeType: 'superconnectiontitle'
                                                                                }
                                                                            ];
                                                                        }
                                                                        else{
                                                                            treeValue[0].children[indexSubscriptions].children[indexGateway.split(":")[1]].children.push({id: newId, value: 'Super Connections (' + superConns.length + ')', title: 'Super Connections', nodeType: 'superconnectiontitle'});
                                                                        }
                                                                        
                                                                        for(let indexSuperConn in preparedSuperConns){
                                                                            newId++;
                                                                            let newSuperConnObj = {};
                                                                            newSuperConnObj.id = newId;
                                                                            newSuperConnObj.title = preparedSuperConns[indexSuperConn].bindId.groupId+"\n"+' ['+ preparedSuperConns[indexSuperConn].bindId.id + '] '+'('+ superConnCounts[preparedSuperConns[indexSuperConn].bindId.id] +')';
                                                                            let valueToshow = preparedSuperConns[indexSuperConn].bindId.groupId+"\n"+' ['+ preparedSuperConns[indexSuperConn].bindId.id + '] '+'('+ superConnCounts[preparedSuperConns[indexSuperConn].bindId.id] +')';
                
                                                                            newSuperConnObj.value = valueToshow;
                                                                            newSuperConnObj.nodeType = 'superconnection';
                
                                                                            if(indexSuperConn == 0){
                                                                                if(treeValue[0].children[indexSubscriptions].children[indexGateway.split(":")[1]].children[0].title === 'Client Pools'){
                                                                                    treeValue[0].children[indexSubscriptions].children[indexGateway.split(":")[1]].children[1].children = [newSuperConnObj];
                                                                                }
                                                                                else{
                                                                                    treeValue[0].children[indexSubscriptions].children[indexGateway.split(":")[1]].children[0].children = [newSuperConnObj];
                                                                                }
                                                                                
                                                                            }
                                                                            else{
                                                                                if(treeValue[0].children[indexSubscriptions].children[indexGateway.split(":")[1]].children[0].title === 'Client Pools'){
                                                                                    treeValue[0].children[indexSubscriptions].children[indexGateway.split(":")[1]].children[1].children.push(newSuperConnObj);
                                                                                }
                                                                                else{
                                                                                    treeValue[0].children[indexSubscriptions].children[indexGateway.split(":")[1]].children[0].children.push(newSuperConnObj);
                                                                                }
                                                                            }
                                                                        }

                                                                        if(secondarySessions.length > 0){
                                                                            secondarySessions.forEach(function(element) {
                                                                                sessionCounts[element.groupId] = (sessionCounts[element.groupId] || 0) + 1;
                                                                            });
                                                                            preparedSessions = this.removeDuplicates(secondarySessions, 'groupId');
                                                                        }

                                                                        if(preparedSessions.length > 0){
                                                                            newId++;
                                                                            
                                                                            if(!treeValue[0].children[indexSubscriptions].children[indexGateway.split(":")[1]].children){
                                                                                treeValue[0].children[indexSubscriptions].children[indexGateway.split(":")[1]].children = [
                                                                                    {
                                                                                        id: newId, 
                                                                                        value: 'Sessions (' + secondarySessions.length + ')', 
                                                                                        title: 'Sessions',
                                                                                        nodeType: 'sessiontitle'
                                                                                    }
                                                                                ];
                                                                            }
                                                                            else{
                                                                                treeValue[0].children[indexSubscriptions].children[indexGateway.split(":")[1]].children.push({id: newId, value: 'Sessions (' + secondarySessions.length + ')', title: 'Sessions', nodeType: 'sessiontitle'});
                                                                            }
                                                                            let sessionIndexToPushChildren = treeValue[0].children[indexSubscriptions].children[indexGateway.split(":")[1]].children.length - 1;
                                                                            for(let indexSession in preparedSessions){
                                                                                newId++;
                                                                                let newSessionObj = {};
                                                                                newSessionObj.id = newId;
                                                                                newSessionObj.title = preparedSessions[indexSession].groupId +'('+ sessionCounts[preparedSessions[indexSession].groupId] +')';
                                                                                let valueToshow = preparedSessions[indexSession].groupId +'('+ sessionCounts[preparedSessions[indexSession].groupId] +')';
                    
                                                                                newSessionObj.value = valueToshow;
                                                                                newSessionObj.nodeType = 'session';
                    
                                                                                if(indexSession == 0){
                                                                                    treeValue[0].children[indexSubscriptions].children[indexGateway.split(":")[1]].children[sessionIndexToPushChildren].children = [newSessionObj];
                                                                                }
                                                                                else{
                                                                                    treeValue[0].children[indexSubscriptions].children[indexGateway.split(":")[1]].children[sessionIndexToPushChildren].children.push(newSessionObj);
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
                                            else{
                                                treeValue[0].children[indexSubscriptions].value = treeValue[0].children[indexSubscriptions].value + ' (0)';
                                            }

                                            if(totalNumOfAjaxProcessed === totalNumOfAjax){
                                                let that = this;
                                                setTimeout(function(){
                                                    that.setState({
                                                        loadTreeJs: true
                                                    });
                                                    console.log('gateways');
                                                }, 2000);
                                            }
                                        });
                                    }
                                });
                            }
                            else{
                                totalNumOfAjaxProcessed++;
                                progressPercent = Math.round((totalNumOfAjaxProcessed / totalNumOfAjax) * 100);
                                this.setState({
                                    apiLoadPercentage: progressPercent
                                });
                            }
                        
                        }

                        let nodes = [];
                        let edges = [];
                        if(treeValue.length > 0){
                            let shapeArray = this.state.nodeShapes;
                            let treeObj = treeValue[0];
                            let parentNodeId = treeObj.id;
                            let parentNodeLabel = treeObj.value;
                            let parentNodeTitle = treeObj.value;
                            let parentNode = { 
                                id: parentNodeId, 
                                label: parentNodeLabel, 
                                title: parentNodeTitle, 
                                color: this.state.centerNodeColor,
                                shape: 'ellipse'
                            };
                            nodes.push(parentNode);
                            if(treeObj.children){
                                for(let childNode of treeObj.children){
                                    let childNodeId = childNode.id;
                                    let childNodeLabel = childNode.value;
                                    let childNodeTitle = childNode.title;
                                    let shape = 'box';
                                    if(childNode.nodeType == 'subscription'){
                                        shape = 'circle';
                                    }
                                    else if(childNode.nodeType == 'superconnectiontitle' || childNode.nodeType == 'clientpooltitle' || childNode.nodeType == 'sessiontitle'){
                                        shape = 'circle';
                                    }
                                    else if(childNode.nodeType == 'clientpool'){
                                        shape = 'ellipse';
                                    }
                                    let childNodeShape = shape;
                                    let preparedChildNode = { 
                                        id: childNodeId, 
                                        label: childNodeLabel, 
                                        title: childNodeTitle,
                                        shape: childNodeShape
                                    };
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

    /* istanbul ignore next */
    changeTopologyView(items){
        let shapeArray = this.state.nodeShapes;
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
        parentNode.color = this.state.centerNodeColor;
        parentNode.shape = 'ellipse';
        parentNode.color = this.state.centerNodeColor;
        nodes.push(parentNode);
        if(treeObj.children){
            let childern = [ ...treeObj.children];
            for(let childNode of childern){
                let copiedChildNode = Object.assign({}, childNode);
                let childNodeId = copiedChildNode.id;
                let childNodeLabel = copiedChildNode.value;
                let childNodeTitle = copiedChildNode.title;
                let childNodeType = copiedChildNode.nodeType;
                let preparedChildNode = {};
                preparedChildNode.id = childNodeId;
                preparedChildNode.label = childNodeLabel;
                preparedChildNode.title = childNodeTitle;
                let shape = 'box';
                let color = '#80b8d2fa';
                if(childNodeType == 'subscription'){
                    shape = 'circle';
                    color = '#08cc9efa';
                }
                else if(childNodeType == 'superconnectiontitle' || childNodeType == 'clientpooltitle' || childNodeType == 'sessiontitle'){
                    shape = 'circle';
                    color = '#08cc9efa';
                }
                else if(childNodeType == 'clientpool'){
                    shape = 'ellipse';
                    color = '#e84a4a';
                }
                else if(childNodeType == 'session'){
                    shape = 'box';
                    color = '#ffc107';
                }
                preparedChildNode.shape = shape;
                preparedChildNode.color = color;
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
    removeDuplicates(myArr, prop) {
        return myArr.filter((obj, pos, arr) => {
            return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
        });
    }

    render() {
        /* jshint ignore:start */
        /* istanbul ignore next */
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
                            this.state.loadTreeJs ?
                            <div className="row view-table">
                                <div className="col-md-12" id="viewTableDiv">
                                    {/*<button onClick={this.props.goToSearch.bind(this)} className="btn btn-sm float-right btn-link">Advanced search</button>
                                    <Viewtable tableData={this.props.tableData} showHideTableTdData={this.props.showHideTableTdData.bind(this)}></Viewtable>*/}
                                    <h3>Work in progress for real time data</h3>
                                </div>
                            </div>:
                            <div className="row">
                                <div className="col-md-12 mt-5">
                                    <p>Please wait...</p>
                                    <div className="progress">
                                        <div className="progress-bar progress-bar-striped progress-bar-animated" style={{width: this.state.apiLoadPercentage+ '%'}}></div>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                    <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                        {
                        this.state.loadTreeJs ?
                            <div className="row">
                                <div className="col-md-4 treeview-div">
                                    <Treelist treeValue={this.state.treeValue} changeTopology={this.changeTopologyView.bind(this)}></Treelist>
                                </div>
                                <div className="col-md-8 treeview-div">
                                    <Topologygraph nodeData={this.state.graph}></Topologygraph>
                                </div>
                            </div> : 
                            <div className="row">
                                <div className="col-md-12 mt-5">
                                    <p>Please wait...</p>
                                    <div className="progress">
                                        <div className="progress-bar progress-bar-striped progress-bar-animated" style={{width: this.state.apiLoadPercentage+ '%'}}></div>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        )
        /* jshint ignore:end */
    }
}
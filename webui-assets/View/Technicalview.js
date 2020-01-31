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
            apiEndPoints:{
                baseUrl: 'https://reqres.in/api/users/2'
            },
            loadTreeJs: false,
            userId: ''
        }
    }

    componentDidMount(){

        var name = "user_id=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for(var i = 0; i <ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                this.setState({
                    userId: c.substring(name.length, c.length)
                })
            }
        }
        
        let treeValue = [{
            id: 1,
            value: 'EC'
        }]

        fetch(this.state.apiEndPoints.baseUrl, { // Get zones 'listZones?user_id='+this.state.userId
			method: 'GET'
		})
		.then((response) => {
			if (response.status === 200) {
                response.json().then((zones) => {
                    zones = [
                        "b3a2e601",
                        "b3a2",
                        "b3a2e60"
                    ];
                    let numOfZones = zones.length;
                    let totalNumOfAjax = zones.length;
                    let totalNumOfAjaxProcessed = 0;
                    if(numOfZones === 0){
                        let that = this;
                        setTimeout(function(){
                            that.setState({
                                loadTreeJs: true
                            })
                            console.log('zones');
                        }, 1000);
                    }
                    let newId = treeValue[0].id;
                    for(let indexZone in zones){
                        newId++;
                        let newZoneObj = {};
                        newZoneObj.id = newId;
                        newZoneObj.value = zones[indexZone];
                        
                        if(indexZone == 0){
                            treeValue[0].children = [newZoneObj];
                        }
                        else{
                            treeValue[0].children.push(newZoneObj);
                        }

                        fetch(this.state.apiEndPoints.baseUrl, { // Get gateways '/listGatewaysForZone?zone_id='+zones[indexZone];
                            method: 'GET'
                        })
                        .then((response) => {
                            if (response.status === 200) {
                                response.json().then((gateways) => {
                                    gateways = [
                                        {
                                          "gatewayId": "Gateway-10",
                                          "userId": "212712078",
                                          "gatewayPort": "8080",
                                          "zone": "b3a2e606-eaa8-4d3c-aadc-c27f12260a1b",
                                          "serviceUrl": "https://b3a2e606-eaa8-4d3c-aadc-c27f12260a1b.run.aws-usw02-dev.ice.predix.io",
                                          "admToken": "YWRtaW46WUo1NVBpWUkwWXpZcmpFQjVsc0dNNGdOcVRTSDlwS1l5RFJXcldOTElwSjA0TlBJM1M=",
                                          "hostUrl": "wss://gateway-url/agent"
                                        },
                                        {
                                          "gatewayId": "Gateway-d4",
                                          "userId": "212712078",
                                          "gatewayPort": "8080",
                                          "zone": "b3a2e606-eaa8-4d3c-aadc-c27f12260a1d",
                                          "serviceUrl": "https://b3a2e606-eaa8-4d3c-aadc-c27f12260a1b.run.aws-usw02-dev.ice.predix.io",
                                          "admToken": "YWRtaW46WUo1NVBpWUkwWXpZcmpFQjVsc0dNNGdOcVRTSDlwS1l5RFJXcldOTElwSjA0TlBJM1M=",
                                          "hostUrl": "wss://gateway-url/agent"
                                        }
                                    ];
                                    totalNumOfAjax = totalNumOfAjax + gateways.length;
                                    totalNumOfAjaxProcessed++;
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
                                        newGatewayObj.value = gateways[indexGateway].gatewayId;

                                        if(indexGateway == 0){
                                            treeValue[0].children[indexZone].children = [newGatewayObj];
                                        }
                                        else{
                                            treeValue[0].children[indexZone].children.push(newGatewayObj);
                                        }
                                        totalNumOfAjax = totalNumOfAjax + 1; 
                                        fetch(this.state.apiEndPoints.baseUrl, { // Get servers '/listServersForGateway?gateway_id='+gateways[indexGateway].gatewayId;
                                            method: 'GET'
                                        })
                                        .then((response) => {
                                            if (response.status === 200) {
                                                response.json().then((servers) => {
                                                    servers = [
                                                        {
                                                          "serverId": "Server-56",
                                                          "gatewayId": "Gateway-16450058-e7e3-4ac2-9315-5fa93afaf709",
                                                          "userId": "212712078",
                                                          "zone": "b3a2e606-eaa8-4d3c-aadc-c27f12260a1b",
                                                          "serviceUrl": "https://service-url",
                                                          "hostUrl": "wss://gateway-url/agent",
                                                          "agentId": "xbdhfg",
                                                          "groupId": "ec-test",
                                                          "uaaUrl": "https://uaa-url",
                                                          "uaaClientId": "ec-test",
                                                          "uaaClientSecret": "ec-test",
                                                          "duration": 3000,
                                                          "remoteHost": "localhost",
                                                          "remotePort": "5432",
                                                          "plugin": null
                                                        },
                                                        {
                                                          "serverId": "Server-849",
                                                          "gatewayId": "Gateway-16450058-e7e3-4ac2-9315-5fa93afaf709",
                                                          "userId": "212712078",
                                                          "zone": "b3a2e606-eaa8-4d3c-aadc-c27f12260a1b",
                                                          "serviceUrl": "https://service-url",
                                                          "hostUrl": "wss://gateway-url/agent",
                                                          "agentId": "xbdhfg",
                                                          "groupId": "ec-test",
                                                          "uaaUrl": "https://uaa-url",
                                                          "uaaClientId": "ec-test",
                                                          "uaaClientSecret": "ec-test",
                                                          "duration": 3000,
                                                          "remoteHost": "localhost",
                                                          "remotePort": "5432",
                                                          "plugin": null
                                                        }
                                                    ];

                                                    totalNumOfAjaxProcessed++;
                                                    if(totalNumOfAjaxProcessed === totalNumOfAjax){
                                                        let that = this;
                                                        setTimeout(function(){
                                                            that.setState({
                                                                loadTreeJs: true
                                                            });
                                                            console.log('servers');
                                                        }, 2000);
                                                    }

                                                    if(servers.length > 0){
                                                        newId++;
                                                        treeValue[0].children[indexZone].children[indexGateway].children = [{id: newId, value: 'Server'}];
                                                        for(let indexServer in servers){
                                                            newId++;
                                                            let newServerObj = {};
                                                            newServerObj.id = newId;
                                                            newServerObj.value = servers[indexServer].serverId;
                                                            if(indexServer == 0){
                                                                treeValue[0].children[indexZone].children[indexGateway].children[0].children = [newServerObj];
                                                            }
                                                            else{
                                                                treeValue[0].children[indexZone].children[indexGateway].children[0].children.push(newServerObj);
                                                            }
                                                        }
                                                    }
                                                })
                                            }
                                            else{
                                                this.props.showGlobalMessage(false, true, 'Please try after some time', 'custom-success');
                                                let that = this;
                                                setTimeout(function(){
                                                    that.props.hideGlobalMessage();
                                                }, 2000);
                                            }
                                        })


                                        fetch(this.state.apiEndPoints.baseUrl, { // Get clients '/listClientsForGateway?gateway_id='+gateways[indexGateway].gatewayId;
                                            method: 'GET'
                                        })
                                        .then((response) => {
                                            if (response.status === 200) {
                                                response.json().then((clients) => {
                                                    clients = [
                                                        {
                                                          "clientId": "Client-1b9",
                                                          "gatewayId": "Gateway-16450058-e7e3-4ac2-9315-5fa93afaf709",
                                                          "userId": "212712078",
                                                          "hostUrl": "wss://gateway-url/agent",
                                                          "agentId": "hdsvhe",
                                                          "targetId": "dhvhye",
                                                          "groupId": "ec-test",
                                                          "uaaUrl": "https://url.predix.io/token",
                                                          "uaaClientId": "ec-test",
                                                          "uaaClientSecret": "ec-test",
                                                          "duration": 3000,
                                                          "localPort": "7999",
                                                          "plugin": null
                                                        },
                                                        {
                                                          "clientId": "Client-45",
                                                          "gatewayId": "Gateway-16450058-e7e3-4ac2-9315-5fa93afaf709",
                                                          "userId": "212712078",
                                                          "hostUrl": "wss://gateway-url/agent",
                                                          "agentId": "hdsvhe",
                                                          "targetId": "dhvhye",
                                                          "groupId": "ec-test",
                                                          "uaaUrl": "https://url.predix.io/token",
                                                          "uaaClientId": "ec-test",
                                                          "uaaClientSecret": "ec-test",
                                                          "duration": 3000,
                                                          "localPort": "7999",
                                                          "plugin": null
                                                        }
                                                    ];

                                                    
                                                    totalNumOfAjaxProcessed++;

                                                    if(clients.length > 0){
                                                        newId++;
                                                        
                                                        if(!treeValue[0].children[indexZone].children[indexGateway].children){
                                                            treeValue[0].children[indexZone].children[indexGateway].children = [{id: newId, value: 'Client'}];
                                                        }
                                                        else{
                                                            treeValue[0].children[indexZone].children[indexGateway].children.push({id: newId, value: 'Client'});
                                                        }
                                                        
                                                        for(let indexClient in clients){
                                                            newId++;
                                                            let newClientObj = {};
                                                            newClientObj.id = newId;
                                                            newClientObj.value = clients[indexClient].clientId;
                                                            if(indexClient == 0){
                                                                if(treeValue[0].children[indexZone].children[indexGateway].children[0].value === 'Server'){
                                                                    treeValue[0].children[indexZone].children[indexGateway].children[1].children = [newClientObj];
                                                                }
                                                                else{
                                                                    treeValue[0].children[indexZone].children[indexGateway].children[0].children = [newClientObj];
                                                                }
                                                                
                                                            }
                                                            else{
                                                                if(treeValue[0].children[indexZone].children[indexGateway].children[0].value === 'Server'){
                                                                    treeValue[0].children[indexZone].children[indexGateway].children[1].children.push(newClientObj);
                                                                }
                                                                else{
                                                                    treeValue[0].children[indexZone].children[indexGateway].children[0].children.push(newClientObj);
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
                                                            console.log('clients');
                                                        }, 2000);
                                                    }
                                                })
                                            }
                                            else{
                                                //this.showGlobalMessage('Oops! There is an error', 'alert-danger');
                                                //console.log('Looks like there was a problem. Status Code: ' + response.status);
                                                //this.showAjaxBusy(false);
                                            }
                                        })

                                    }
                                });
                            }
                            else{
                                //this.showGlobalMessage('Oops! There is an error', 'alert-danger');
                                //console.log('Looks like there was a problem. Status Code: ' + response.status);
                                //this.showAjaxBusy(false);
                            }
                        })
                        .catch((err) => {
                            //this.showGlobalMessage('Oops! There is an error with API', 'alert-danger');
                            //console.log('Fetch Error: ' + err);
                            //this.showAjaxBusy(false);
                        });
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
                });
			}
			else{
				//this.showGlobalMessage('Oops! There is an error', 'alert-danger');
				//console.log('Looks like there was a problem. Status Code: ' + response.status);
				//this.showAjaxBusy(false);
			}
		})
		.catch((err) => {
			//this.showGlobalMessage('Oops! There is an error with API', 'alert-danger');
			//console.log('Fetch Error: ' + err);
			//this.showAjaxBusy(false);
        });
    }

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

    render() {
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
                                    <button onClick={this.props.goToSearch.bind(this)} className="btn btn-sm float-right btn-link">Advance search</button>
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
    }
}
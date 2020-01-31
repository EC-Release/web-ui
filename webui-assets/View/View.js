import React from "react";
import ReactDOM from "react-dom";

import Technicalview from './Technicalview.js';
import Businessview from './Businessview.js';
import Customsearch from './Customsearch.js';

export default class View extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            mockTableData: [],
            topologyView: false, // false = Technical view, true = Business view
            showTable: false,
            isSearchView: false,
            table:{
                thead: [],
                tbody: [],
                allFields: []
            },
            apiEndPoints: {
                baseUrl : 'https://reqres.in/api/users/2'
            },
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
        let technicalTableData = [];
        fetch(this.state.apiEndPoints.baseUrl, { // Get gateways '/listGateways?user_id='+this.state.userId;
            method: 'GET'
        })
        .then((response) => {
            if (response.status === 200) {
                response.json().then((gateways) => {
                    gateways = [
                        {
                          "gatewayId": "Gateway-10afc420-d8ad-41ec-8be6-6f723e6fb18a",
                          "userId": "212712078",
                          "gatewayPort": "8080",
                          "zone": "b3a2e606-eaa8-4d3c-aadc-c27f12260a1b",
                          "serviceUrl": "https://b3a2e606-eaa8-4d3c-aadc-c27f12260a1b.run.aws-usw02-dev.ice.predix.io",
                          "admToken": "YWRtaW46WUo1NVBpWUkwWXpZcmpFQjVsc0dNNGdOcVRTSDlwS1l5RFJXcldOTElwSjA0TlBJM1M=",
                          "hostUrl": "wss://gateway-url/agent"
                        },
                        {
                          "gatewayId": "Gateway-d4b7844c-f9b2-4ab3-bab3-592b8ca1629d",
                          "userId": "212712078",
                          "gatewayPort": "8080",
                          "zone": "b3a2e606-eaa8-4d3c-aadc-c27f12260a1d",
                          "serviceUrl": "https://b3a2e606-eaa8-4d3c-aadc-c27f12260a1b.run.aws-usw02-dev.ice.predix.io",
                          "admToken": "YWRtaW46WUo1NVBpWUkwWXpZcmpFQjVsc0dNNGdOcVRTSDlwS1l5RFJXcldOTElwSjA0TlBJM1M=",
                          "hostUrl": "wss://gateway-url/agent"
                        }
                    ];

                    if(gateways.length > 0){
                        for(let gateway of gateways){
                            let prepareData = {};
                            prepareData.agent_id = '';
                            prepareData.gateway = gateway.hostUrl;
                            prepareData.group = '';
                            prepareData.oauth_provider = '';
                            prepareData.zone = gateway.zone;
                            prepareData.subscription = gateway.gatewayId;
                            prepareData.remote_port = '';
                            technicalTableData.push(prepareData);
                        }
                    }
                    
                    fetch(this.state.apiEndPoints.baseUrl, { // Get servers 'listServers?user_id='+this.state.userId;
                        method: 'GET'
                    })
                    .then((response) => {
                        if (response.status === 200) {
                            response.json().then((servers) => {
                                servers = [
                                    {
                                      "serverId": "Server-56ca9bb6-62ee-4a41-88bd-107d20ceed30",
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
                                      "serverId": "Server-849d04cc-2f81-413d-a269-5402960fbd8e",
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

                                if(servers.length > 0){
                                    for(let server of servers){
                                        let prepareData = {};
                                        prepareData.agent_id = server.agentId;
                                        prepareData.gateway = server.hostUrl;
                                        prepareData.group = server.groupId;
                                        prepareData.oauth_provider = server.uaaUrl;
                                        prepareData.zone = server.zone;
                                        prepareData.subscription = server.serverId;
                                        prepareData.remote_port = server.remotePort;
                                        technicalTableData.push(prepareData);
                                    }
                                }

                                fetch(this.state.apiEndPoints.baseUrl, { // Get clients '/listClients?user_id='+this.state.userId;
                                    method: 'GET'
                                })
                                .then((response) => {
                                    if (response.status === 200) {
                                        response.json().then((clients) => {
                                            clients = [
                                                {
                                                  "clientId": "Client-1b95c319-aa6c-44ba-8c2f-2b1764efe697",
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
                                                  "clientId": "Client-45a222d9-50fa-48c8-a7ec-ec700a1ce44f",
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

                                            for(let client of clients){
                                                let prepareData = {};
                                                prepareData.agent_id = client.agentId;
                                                prepareData.gateway = client.hostUrl;
                                                prepareData.group = client.groupId;
                                                prepareData.oauth_provider = client.uaaUrl;
                                                prepareData.zone = '';
                                                prepareData.subscription = client.clientId;
                                                prepareData.remote_port = '';
                                                technicalTableData.push(prepareData);
                                            }
                                            this.generateTableStructure(technicalTableData);
                                            this.setState({
                                                mockTableData: technicalTableData
                                            });
                                        })
                                    }
                                    else{
                                        //this.showGlobalMessage('Oops! There is an error', 'alert-danger');
                                        //console.log('Looks like there was a problem. Status Code: ' + response.status);
                                        //this.showAjaxBusy(false);
                                    }
                                })
                            })
                        }
                        else{
                            //this.showGlobalMessage('Oops! There is an error', 'alert-danger');
                            //console.log('Looks like there was a problem. Status Code: ' + response.status);
                            //this.showAjaxBusy(false);
                        }
                    })
                })
            }
            else{
                //this.showGlobalMessage('Oops! There is an error', 'alert-danger');
                //console.log('Looks like there was a problem. Status Code: ' + response.status);
                //this.showAjaxBusy(false);
            }
        })
        
    }

    generateTableStructure(technicalTableData){
        let thead = [];
        let allFields = [];
        let tbody = [];
        let mockTableData = technicalTableData;
        if(mockTableData.length > 0){
            let allDataKeys = Object.keys(mockTableData[0]);
            for(let dataKey of allDataKeys){
                let theadOject = {};
                theadOject.fieldId = dataKey;
                theadOject.fieldName = this.toTableHeaderCase(dataKey);
                thead.push(theadOject);
                allFields.push(theadOject);
            }

            for(let allData of mockTableData){
                let tbodyObj = {};
                let objKey = 0;
                for(let dataKey of allDataKeys){
                    let singleObj = {};
                    if(allData[dataKey].length > 20){
                        singleObj.value = allData[dataKey].substr(0, 20);
                        singleObj.hiddenValue = allData[dataKey];
                        singleObj.hiddenState = true;
                    }
                    else{
                        singleObj.value = allData[dataKey];
                    }
                    tbodyObj[objKey] = singleObj;
                    objKey++;
                }
                tbody.push(tbodyObj);
            }
        }

        this.setState({
            table:{
                thead: thead,
                tbody: tbody
            },
            allFields: allFields,
            showTable: true
        });
    }

    toTableHeaderCase(str){
        return str.split('_').map(function(word, index){
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        }).join(' ');
    }

    showHideTableTdData(objectIndex, itemIndex){
        let currentTbody = this.state.table.tbody;
        let copiedObjectToChange = Object.assign({}, currentTbody[objectIndex][itemIndex]);
        let tempValue = copiedObjectToChange.value;
        copiedObjectToChange.value = copiedObjectToChange.hiddenValue;
        copiedObjectToChange.hiddenValue = tempValue;
        copiedObjectToChange.hiddenState = !copiedObjectToChange.hiddenState;
        currentTbody[objectIndex][itemIndex] = copiedObjectToChange;
        this.setState({
            table:{
                thead: this.state.table.thead,
                tbody: currentTbody
            }
        });
    }

    changeTopologyView(){
        this.setState({
            topologyView: event.target.checked
        });
    }

    changeToSearchView(){
        this.setState({
            isSearchView: true
        })
    }

    servedTopologyView(){
        const currentTopologyView = this.state.topologyView;
        if(!currentTopologyView){
            // Technical view
            return <Technicalview showTable={this.state.showTable} tableData={this.state.table} showHideTableTdData={this.showHideTableTdData.bind(this)} goToSearch={this.changeToSearchView.bind(this)} />;
        }
        else{
            // Business view
            return <Businessview showTable={this.state.showTable} tableData={this.state.table} showHideTableTdData={this.showHideTableTdData.bind(this)} goToSearch={this.changeToSearchView.bind(this)} />;
        }
    }

    createView(selectedFields, filterFields){
        // search functionality here
        let mockTableData = [...this.state.mockTableData];
        let filteredData = mockTableData;
        let uniqueFilteredData = [];
        let andFilters = [];
        let orFilters = [];
        for(let filterField of filterFields){
            if(filterField.whereCondition == 'AND' && filterField.whereValue !== ''){
                andFilters.push(filterField);
            }
            else if(filterField.whereCondition == 'OR' && filterField.whereValue !== ''){
                orFilters.push(filterField);
            }
        }

        if(andFilters.length > 0){
            for(let andFilter of andFilters){
                if(andFilter.whereOperator == '='){
                    filteredData = filteredData.filter(function(data) {
                        return data[andFilter.whereField] == andFilter.whereValue;
                    });
                }
                else if(andFilter.whereOperator == '>'){
                    filteredData = filteredData.filter(function(data) {
                        return data[andFilter.whereField] > andFilter.whereValue;
                    });
                }
                else if(andFilter.whereOperator == '<'){
                    filteredData = filteredData.filter(function(data) {
                        return data[andFilter.whereField] < andFilter.whereValue;
                    });
                }
                else if(andFilter.whereOperator == '!='){
                    filteredData = filteredData.filter(function(data) {
                        return data[andFilter.whereField] != andFilter.whereValue;
                    });
                }
            }
        }

        if(orFilters.length > 0){
            let orResults = [];
            for(let orFilter of orFilters){
                let orFilteredDatas = [];
                let wholeData = [...this.state.mockTableData];
                if(orFilter.whereOperator == '='){
                    orFilteredDatas = wholeData.filter(function(data) {
                        return data[orFilter.whereField] == orFilter.whereValue;
                    });
                }
                else if(orFilter.whereOperator == '>'){
                    orFilteredDatas = wholeData.filter(function(data) {
                        return data[orFilter.whereField] > orFilter.whereValue;
                    });
                }
                else if(orFilter.whereOperator == '<'){
                    orFilteredDatas = wholeData.filter(function(data) {
                        return data[orFilter.whereField] < orFilter.whereValue;
                    });
                }
                else if(orFilter.whereOperator == '!='){
                    orFilteredDatas = wholeData.filter(function(data) {
                        return data[orFilter.whereField] != orFilter.whereValue;
                    });
                }

                if(orFilteredDatas.length > 0){
                    for(let orFilteredData of orFilteredDatas){
                        orResults.push(orFilteredData);
                    }
                }
            }

            if(orResults.length > 0){
                for(let orResult of orResults){
                    filteredData.push(orResult);
                }
            }
        }
        
        if(orFilters.length > 0){
            uniqueFilteredData = filteredData.filter(function (a) {
                                let key = a.agent_id;
                                if (!this[key]) {
                                    this[key] = true;
                                    return true;
                                }
                            }, Object.create(null));
        }
        else{
            uniqueFilteredData = filteredData;
        }

        let selectedDataKeys = [];
        let tbody = [];
        for(let selDatakey of selectedFields){
            selectedDataKeys.push(selDatakey.fieldId);
        }
        for(let allData of uniqueFilteredData){
            let tbodyObj = {};
            let objKey = 0;
            for(let dataKey of selectedDataKeys){
                let singleObj = {};
                if(allData[dataKey].length > 20){
                    singleObj.value = allData[dataKey].substr(0, 20);
                    singleObj.hiddenValue = allData[dataKey];
                    singleObj.hiddenState = true;
                }
                else{
                    singleObj.value = allData[dataKey];
                }
                tbodyObj[objKey] = singleObj;
                objKey++;
            }
            tbody.push(tbodyObj);
        }

        this.setState({
            table:{
                thead: selectedFields,
                tbody: tbody
            },
            isSearchView: false
        });
        
        //window.openCollapsible('dynamic-table-btn');
    }

    render() {
        return (
            <div className="centered-div View">
                { !this.state.isSearchView ? 
                    <div className="centered-div-header">
                        <div className="row view-header">
                            <div className="col-sm-8">
                                <h6>Topology view</h6>
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
                    </div> :
                    <Customsearch 
                        showGlobalMessage={this.props.showGlobalMessage.bind(this)}
                        hideGlobalMessage={this.props.hideGlobalMessage.bind(this)}
                        allFields={this.state.allFields} 
                        selectedFields={this.state.table.thead}
                        createView={this.createView.bind(this)}></Customsearch>
                }
            </div>
        )
    }
}
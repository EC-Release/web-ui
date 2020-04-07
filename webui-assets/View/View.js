import React from "react";

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
            }
        };
    }

    /* istanbul ignore next */
    componentDidMount(){
        /*let technicalTableData = [];
        fetch(this.props.baseUrl+'/listGateways?user_id='+this.props.userId , { // Get gateways this.props.baseUrl+'/listGateways?user_id='+this.props.userId
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': this.props.authToken
            }
        })
        .then((response) => {
            if (response.status === 200) {
                response.json().then((respData) => {
                    let gateways = respData.data;
                    if(gateways === null){
                        gateways = [];
                    }

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
                    
                    fetch(this.props.baseUrl + '/listServers?user_id='+this.props.userId, { // Get servers 'listServers?user_id='+this.props.userId;
                        method: 'GET',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization': this.props.authToken
                        }
                    })
                    .then((response) => {
                        if (response.status === 200) {
                            response.json().then((respData) => {
                                let servers = respData.data;

                                if(servers === null){
                                    servers = [];
                                }

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

                                fetch(this.props.baseUrl + '/listClients?user_id='+this.props.userId, { // Get clients '/listClients?user_id='+this.props.userId;
                                    method: 'GET',
                                    headers: {
                                        'Accept': 'application/json',
                                        'Content-Type': 'application/json',
                                        'Authorization': this.props.authToken
                                    }
                                })
                                .then((response) => {
                                    if (response.status === 200) {
                                        response.json().then((respData) => {
                                            let clients = respData.data;

                                            if(clients === null){
                                                clients = [];
                                            }

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
                                        });
                                    }
                                    else{
                                    }
                                });
                            });
                        }
                        else{
                        }
                    });
                });
            }
            else{
            }
        });*/
    }

    /* istanbul ignore next */
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
                    if(allData[dataKey].length > 10){
                        singleObj.value = allData[dataKey].substr(0, 10);
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

    /* istanbul ignore next */
    toTableHeaderCase(str){
        return str.split('_').map(function(word, index){
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        }).join(' ');
    }

    /* istanbul ignore next */
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

    /* istanbul ignore next */
    changeTopologyView(){
        this.setState({
            topologyView: event.target.checked
        });
    }

    /* istanbul ignore next */
    changeToSearchView(){
        this.setState({
            isSearchView: true
        });
    }

    /* istanbul ignore next */
    servedTopologyView(){
        const currentTopologyView = this.state.topologyView;
        if(!currentTopologyView){
            // Technical view
            return <Technicalview authToken={this.props.authToken} baseUrl={this.props.baseUrl} userId={this.props.userId} showTable={this.state.showTable} tableData={this.state.table} showHideTableTdData={this.showHideTableTdData.bind(this)} goToSearch={this.changeToSearchView.bind(this)} />; // jshint ignore:line
        }
        else{
            // Business view
            return <Businessview authToken={this.props.authToken} baseUrl={this.props.baseUrl} userId={this.props.userId} showTable={this.state.showTable} tableData={this.state.table} showHideTableTdData={this.showHideTableTdData.bind(this)} goToSearch={this.changeToSearchView.bind(this)} />; // jshint ignore:line
        }
    }

    /* istanbul ignore next */
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
                    filteredData = filteredData.filter(function(data) { // jshint ignore:line
                        return data[andFilter.whereField] == andFilter.whereValue;
                    });
                }
                else if(andFilter.whereOperator == '>'){
                    filteredData = filteredData.filter(function(data) { // jshint ignore:line
                        return data[andFilter.whereField] > andFilter.whereValue;
                    });
                }
                else if(andFilter.whereOperator == '<'){
                    filteredData = filteredData.filter(function(data) { // jshint ignore:line
                        return data[andFilter.whereField] < andFilter.whereValue;
                    });
                }
                else if(andFilter.whereOperator == '!='){
                    filteredData = filteredData.filter(function(data) { // jshint ignore:line
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
                    orFilteredDatas = wholeData.filter(function(data) { // jshint ignore:line
                        return data[orFilter.whereField] == orFilter.whereValue;
                    });
                }
                else if(orFilter.whereOperator == '>'){
                    orFilteredDatas = wholeData.filter(function(data) { // jshint ignore:line
                        return data[orFilter.whereField] > orFilter.whereValue;
                    });
                }
                else if(orFilter.whereOperator == '<'){
                    orFilteredDatas = wholeData.filter(function(data) { // jshint ignore:line
                        return data[orFilter.whereField] < orFilter.whereValue;
                    });
                }
                else if(orFilter.whereOperator == '!='){
                    orFilteredDatas = wholeData.filter(function(data) { // jshint ignore:line
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
                if(allData[dataKey].length > 10){
                    singleObj.value = allData[dataKey].substr(0, 10);
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
    }

    render() {
        /* jshint ignore:start */
        /* istanbul ignore next */
        return (
            <div className="centered-div View">
                { !this.state.isSearchView ? 
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
                    </div> :
                    <Customsearch 
                        showGlobalMessage={this.props.showGlobalMessage.bind(this)}
                        hideGlobalMessage={this.props.hideGlobalMessage.bind(this)}
                        allFields={this.state.allFields} 
                        selectedFields={this.state.table.thead}
                        createView={this.createView.bind(this)}
                        userId={this.props.userId}></Customsearch>
                }
            </div>
        );
        /* jshint ignore:end */
    }
}
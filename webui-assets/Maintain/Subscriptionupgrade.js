import React from "react";

import Subscriptionedit from './Subscriptionedit.js';

export default class Subscriptionupgrade extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tableData: [],
            newTableData: [],
            viewTable: true,
            editItemData: {},
            searchString: '',
            showTableInit: false
        };
    }

    componentDidMount() {
        this.handleDataTable(false);
    }

    handleDataTable(preserveState) {
        let technicalTableData = [];
        fetch(this.props.baseUrl + '/listSubscriptions', { // this.props.baseUrl + '/listSubscriptions' | 'https://reqres.in/api/users/2'
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
                    let subscriptions = respData.data;
                    /*subscriptions = [
                        {
                              "accountId": "12341",
                              "adminToken": "xyzxc",
                              "app": "abc",
                              "assetId": "123er",
                              "bucAdn": "xbchd",
                              "clientId": "ec-test",
                              "clientSc": "ec-test",
                              "cluster": "abc",
                              "compliance": "none",
                              "confidentiality": true,
                              "customer": "ec",
                              "date": "2020/11/03",
                              "env": "DEV",
                              "managementHostType": "none",
                              "optInoptOut": true,
                              "owner": "EC",
                              "preserve": true,
                              "project": "Test",
                              "role": "Web",
                              "security": "none",
                              "serviceUri": "https://service1.com",
                              "subscriptionId": "123cd1",
                              "subscriptionName": "ec test1",
                              "uaaUrl": "https://uaa1.com",
                              "uai": "none",
                              "version": "1"
                        },
                        {
                              "accountId": "12342",
                              "adminToken": "xyzxc",
                              "app": "abc",
                              "assetId": "123er",
                              "bucAdn": "xbchd",
                              "clientId": "ec-test",
                              "clientSc": "ec-test",
                              "cluster": "abc",
                              "compliance": "none",
                              "confidentiality": false,
                              "customer": "ec",
                              "date": "2020/12/03",
                              "env": "TEST",
                              "managementHostType": "none",
                              "optInoptOut": true,
                              "owner": "EC",
                              "preserve": true,
                              "project": "Test",
                              "role": "Web",
                              "security": "none",
                              "serviceUri": "https://service2.com",
                              "subscriptionId": "123cd2",
                              "subscriptionName": "ec test2",
                              "uaaUrl": "https://uaa2.com",
                              "uai": "none",
                              "version": "1"
                        },
                        {
                              "accountId": "12343",
                              "adminToken": "xyzxc",
                              "app": "abc",
                              "assetId": "123er",
                              "bucAdn": "xbchd",
                              "clientId": "ec-test",
                              "clientSc": "ec-test",
                              "cluster": "abc",
                              "compliance": "none",
                              "confidentiality": true,
                              "customer": "ec",
                              "date": "2020/13/03",
                              "env": "DEV",
                              "managementHostType": "none",
                              "optInoptOut": true,
                              "owner": "EC",
                              "preserve": true,
                              "project": "Test",
                              "role": "Web",
                              "security": "none",
                              "serviceUri": "https://service3.com",
                              "subscriptionId": "123cd3",
                              "subscriptionName": "ec test3",
                              "uaaUrl": "https://uaa3.com",
                              "uai": "none",
                              "version": "1"
                        },
                        {
                              "accountId": "12344",
                              "adminToken": "xyzxc",
                              "app": "abc",
                              "assetId": "123er",
                              "bucAdn": "xbchd",
                              "clientId": "ec-test",
                              "clientSc": "ec-test",
                              "cluster": "abc",
                              "compliance": "none",
                              "confidentiality": true,
                              "customer": "ec",
                              "date": "2020/12/3",
                              "env": "DEV",
                              "managementHostType": "none",
                              "optInoptOut": true,
                              "owner": "EC",
                              "preserve": true,
                              "project": "Test",
                              "role": "Web",
                              "security": "none",
                              "serviceUri": "https://service4.com",
                              "subscriptionId": "123cd4",
                              "subscriptionName": "ec test4",
                              "uaaUrl": "https://uaa4.com",
                              "uai": "none",
                              "version": "1"
                        },
                        {
                              "accountId": "12345",
                              "adminToken": "xyzxc",
                              "app": "abc",
                              "assetId": "123er",
                              "bucAdn": "xbchd",
                              "clientId": "ec-test",
                              "clientSc": "ec-test",
                              "cluster": "abc",
                              "compliance": "none",
                              "confidentiality": true,
                              "customer": "ec",
                              "date": "2020/12/3",
                              "env": "DEV",
                              "managementHostType": "none",
                              "optInoptOut": true,
                              "owner": "EC",
                              "preserve": true,
                              "project": "Test",
                              "role": "Web",
                              "security": "none",
                              "serviceUri": "https://service5.com",
                              "subscriptionId": "123cd5",
                              "subscriptionName": "ec test5",
                              "uaaUrl": "https://uaa5.com",
                              "uai": "none",
                              "version": "1"
                        },
                        {
                              "accountId": "12346",
                              "adminToken": "xyzxc",
                              "app": "abc",
                              "assetId": "123er",
                              "bucAdn": "xbchd",
                              "clientId": "ec-test",
                              "clientSc": "ec-test",
                              "cluster": "abc",
                              "compliance": "none",
                              "confidentiality": true,
                              "customer": "ec",
                              "date": "2020/12/3",
                              "env": "DEV",
                              "managementHostType": "none",
                              "optInoptOut": true,
                              "owner": "EC",
                              "preserve": true,
                              "project": "Test",
                              "role": "Web",
                              "security": "none",
                              "serviceUri": "https://service5.com",
                              "subscriptionId": "123cd6",
                              "subscriptionName": "ec test6",
                              "uaaUrl": "https://uaa5.com",
                              "uai": "none",
                              "version": "1"
                        },
                        {
                              "accountId": "12347",
                              "adminToken": "xyzxc",
                              "app": "abc",
                              "assetId": "123er",
                              "bucAdn": "xbchd",
                              "clientId": "ec-test",
                              "clientSc": "ec-test",
                              "cluster": "abc",
                              "compliance": "none",
                              "confidentiality": true,
                              "customer": "ec",
                              "date": "2020/12/3",
                              "env": "DEV",
                              "managementHostType": "none",
                              "optInoptOut": true,
                              "owner": "EC",
                              "preserve": true,
                              "project": "Test",
                              "role": "Web",
                              "security": "none",
                              "serviceUri": "https://service7.com",
                              "subscriptionId": "123cd7",
                              "subscriptionName": "ec test7",
                              "uaaUrl": "https://uaa7.com",
                              "uai": "none",
                              "version": "1"
                        }
                    ];*/
                    if (subscriptions === null) {
                        subscriptions = [];
                    }

                    if (subscriptions.length > 0) {
                        for (let subscription of subscriptions) {
                            technicalTableData.push(subscription);
                        }
                        this.generateTableStructure(technicalTableData, preserveState);
                        this.setState({
                            tableData: technicalTableData
                        });
                    }
                });
            }
            else {
                this.props.showGlobalMessage(true, true, 'Please try after sometime', 'custom-danger');
                setTimeout(()=> {
                    this.props.hideGlobalMessage();
                }, 2000);
            }
        })
        .catch((err) => {
            console.log(err);
            this.props.showGlobalMessage(true, true, 'Please try after sometime', 'custom-danger');
            setTimeout(()=> {
                this.props.hideGlobalMessage();
            }, 2000);
        });
    }



    generateTableStructure(technicalTableData, preserveState) {
        let tableData = technicalTableData;
        let newTableData = [];
        for (let dataObj of tableData) {
            let newDataObj = {};
            newDataObj.adminToken = dataObj.adminToken;
            newDataObj.app = dataObj.app;
            newDataObj.assetId = dataObj.assetId;
            newDataObj.bucAdn = dataObj.bucAdn;
            newDataObj.clientId = dataObj.clientId;
            newDataObj.clientSc = dataObj.clientSc;
            newDataObj.cluster = dataObj.cluster;
            newDataObj.compliance = dataObj.compliance;
            newDataObj.confidentiality = dataObj.confidentiality;
            newDataObj.customer = dataObj.customer;
            newDataObj.date = dataObj.date;
            newDataObj.env = dataObj.env;
            newDataObj.managementHostType = dataObj.managementHostType;
            newDataObj.optInoptOut = dataObj.optInoptOut;
            newDataObj.owner = dataObj.owner;
            newDataObj.preserve = dataObj.preserve;
            newDataObj.project = dataObj.project;
            newDataObj.role = dataObj.role;
            newDataObj.security = dataObj.security;
            newDataObj.uai = dataObj.uai;
            newDataObj.version = dataObj.version;
            newDataObj.developerId = dataObj.developerId; 
            if (dataObj.subscriptionId.length > 10) {
                newDataObj.subscriptionId = dataObj.subscriptionId.substr(0, 10);
                newDataObj.subscriptionIdHidden = dataObj.subscriptionId;
                newDataObj.subscriptionIdHiddenFlag = true;
            }
            else {
                newDataObj.subscriptionId = dataObj.subscriptionId;
                newDataObj.subscriptionIdHiddenFlag = false;
            }

            if (dataObj.serviceUri.length > 10) {
                newDataObj.serviceUri = dataObj.serviceUri.substr(0, 10);
                newDataObj.serviceUriHidden = dataObj.serviceUri;
                newDataObj.serviceUriHiddenFlag = true;
            }
            else {
                newDataObj.serviceUri = dataObj.serviceUri;
                newDataObj.serviceUriHiddenFlag = false;
            }

            if (dataObj.subscriptionName.length > 10) {
                newDataObj.subscriptionName = dataObj.subscriptionName.substr(0, 10);
                newDataObj.subscriptionNameHidden = dataObj.subscriptionName;
                newDataObj.subscriptionNameHiddenFlag = true;
            }
            else {
                newDataObj.subscriptionName = dataObj.subscriptionName;
                newDataObj.subscriptionNameHiddenFlag = false;
            }

            if (dataObj.uaaUrl.length > 10) {
                newDataObj.uaaUrl = dataObj.uaaUrl.substr(0, 10);
                newDataObj.uaaUrlHidden = dataObj.uaaUrl;
                newDataObj.uaaUrlHiddenFlag = true;
            }
            else {
                newDataObj.uaaUrl = dataObj.uaaUrl;
                newDataObj.uaaUrlHiddenFlag = false;
            }

            if (dataObj.accountId.length > 10) {
                newDataObj.accountId = dataObj.accountId.substr(0, 10);
                newDataObj.accountIdHidden = dataObj.accountId;
                newDataObj.accountIdHiddenFlag = true;
            }
            else {
                newDataObj.accountId = dataObj.accountId;
                newDataObj.accountIdHiddenFlag = false;
            }

            newTableData.push(newDataObj);
        }

        this.setState({
            newTableData: newTableData,
            showTableInit: true
        });

        if (preserveState === true) {
            setTimeout(function () {
                window.initTable('subscriptionupgradeTable', true);
            }, 100);
        }
        else {
            setTimeout(function () {
                window.initTable('subscriptionupgradeTable', false);
            }, 100);
        }

    }

    showHideTableTdData(objectIndex, fieldName) {
        let newTableData = [...this.state.newTableData];
        let copiedObjectToChange = Object.assign({}, newTableData[objectIndex]);
        if (fieldName === 'subscriptionId') {
            let tempValue = copiedObjectToChange.subscriptionId;
            copiedObjectToChange.subscriptionId = copiedObjectToChange.subscriptionIdHidden;
            copiedObjectToChange.subscriptionIdHidden = tempValue;
            copiedObjectToChange.subscriptionIdHiddenFlag = !copiedObjectToChange.subscriptionIdHiddenFlag;
            newTableData[objectIndex] = copiedObjectToChange;
        }
        else if (fieldName === 'serviceUri') {
            let tempValue = copiedObjectToChange.serviceUri;
            copiedObjectToChange.serviceUri = copiedObjectToChange.serviceUriHidden;
            copiedObjectToChange.serviceUriHidden = tempValue;
            copiedObjectToChange.serviceUriHiddenFlag = !copiedObjectToChange.serviceUriHiddenFlag;
            newTableData[objectIndex] = copiedObjectToChange;
        }

        else if (fieldName === 'subscriptionName') {
            let tempValue = copiedObjectToChange.subscriptionName;
            copiedObjectToChange.subscriptionName = copiedObjectToChange.subscriptionNameHidden;
            copiedObjectToChange.subscriptionNameHidden = tempValue;
            copiedObjectToChange.subscriptionNameHiddenFlag = !copiedObjectToChange.subscriptionNameHiddenFlag;
            newTableData[objectIndex] = copiedObjectToChange;
        }

        else if (fieldName === 'uaaUrl') {
            let tempValue = copiedObjectToChange.uaaUrl;
            copiedObjectToChange.uaaUrl = copiedObjectToChange.uaaUrlHidden;
            copiedObjectToChange.uaaUrlHidden = tempValue;
            copiedObjectToChange.uaaUrlHiddenFlag = !copiedObjectToChange.uaaUrlHiddenFlag;
            newTableData[objectIndex] = copiedObjectToChange;
        }

        else if (fieldName === 'accountId') {
            let tempValue = copiedObjectToChange.accountId;
            copiedObjectToChange.accountId = copiedObjectToChange.accountIdHidden;
            copiedObjectToChange.accountIdHidden = tempValue;
            copiedObjectToChange.accountIdHiddenFlag = !copiedObjectToChange.accountIdHiddenFlag;
            newTableData[objectIndex] = copiedObjectToChange;
        }

        this.setState({
            newTableData: newTableData
        });
    }

    /*filterByValue(array, string) {
        return array.filter(o =>
            Object.keys(o).some((k) => {
                if(typeof o[k] != 'boolean'){
                    return o[k].toLowerCase().includes(string.toLowerCase());
                }
            }));
    }*/

    filterByValue(myArray, string){
        let retArr = [];
        for (var i=0; i < myArray.length; i++) {
            if (myArray[i].subscriptionId.toLowerCase().includes(string.toLowerCase()) || myArray[i].serviceUri.toLowerCase().includes(string.toLowerCase()) || myArray[i].subscriptionName.toLowerCase().replace(/\s/g, "").includes(string.toLowerCase().replace(/\s/g, "")) || myArray[i].uaaUrl.toLowerCase().includes(string.toLowerCase()) || myArray[i].role.toLowerCase().includes(string.toLowerCase()) || myArray[i].accountId.toLowerCase().includes(string.toLowerCase())) {
                retArr.push(myArray[i]);
            }
        }
        return retArr;
    }

    filterData(e) {
        window.destroyDataTable('subscriptionupgradeTable');
        let searchStr = e.target.value.trim();
        let searchStrWithSp = e.target.value;
        let wholeData = [...this.state.tableData];
        let filteredData = [];
        let newTableData = [];
        if (searchStr != '') {
            filteredData = this.filterByValue(wholeData, searchStr);
            //console.log(filteredData);
        }
        else {
            filteredData = wholeData;
        }

        for (let dataObj of filteredData) {
            let newDataObj = {};
            newDataObj.adminToken = dataObj.adminToken;
            newDataObj.app = dataObj.app;
            newDataObj.assetId = dataObj.assetId;
            newDataObj.bucAdn = dataObj.bucAdn;
            newDataObj.clientId = dataObj.clientId;
            newDataObj.clientSc = dataObj.clientSc;
            newDataObj.cluster = dataObj.cluster;
            newDataObj.compliance = dataObj.compliance;
            newDataObj.confidentiality = dataObj.confidentiality;
            newDataObj.customer = dataObj.customer;
            newDataObj.date = dataObj.date;
            newDataObj.env = dataObj.env;
            newDataObj.managementHostType = dataObj.managementHostType;
            newDataObj.optInoptOut = dataObj.optInoptOut;
            newDataObj.owner = dataObj.owner;
            newDataObj.preserve = dataObj.preserve;
            newDataObj.project = dataObj.project;
            newDataObj.role = dataObj.role;
            newDataObj.security = dataObj.security;
            newDataObj.uai = dataObj.uai;
            newDataObj.version = dataObj.version;
            newDataObj.developerId = dataObj.developerId; 
            if (dataObj.subscriptionId.length > 10) {
                newDataObj.subscriptionId = dataObj.subscriptionId.substr(0, 10);
                newDataObj.subscriptionIdHidden = dataObj.subscriptionId;
                newDataObj.subscriptionIdHiddenFlag = true;
            }
            else {
                newDataObj.subscriptionId = dataObj.subscriptionId;
                newDataObj.subscriptionIdHiddenFlag = false;
            }

            if (dataObj.serviceUri.length > 10) {
                newDataObj.serviceUri = dataObj.serviceUri.substr(0, 10);
                newDataObj.serviceUriHidden = dataObj.serviceUri;
                newDataObj.serviceUriHiddenFlag = true;
            }
            else {
                newDataObj.serviceUri = dataObj.serviceUri;
                newDataObj.serviceUriHiddenFlag = false;
            }

            if (dataObj.subscriptionName.length > 10) {
                newDataObj.subscriptionName = dataObj.subscriptionName.substr(0, 10);
                newDataObj.subscriptionNameHidden = dataObj.subscriptionName;
                newDataObj.subscriptionNameHiddenFlag = true;
            }
            else {
                newDataObj.subscriptionName = dataObj.subscriptionName;
                newDataObj.subscriptionNameHiddenFlag = false;
            }

            if (dataObj.uaaUrl.length > 10) {
                newDataObj.uaaUrl = dataObj.uaaUrl.substr(0, 10);
                newDataObj.uaaUrlHidden = dataObj.uaaUrl;
                newDataObj.uaaUrlHiddenFlag = true;
            }
            else {
                newDataObj.uaaUrl = dataObj.uaaUrl;
                newDataObj.uaaUrlHiddenFlag = false;
            }

            if (dataObj.accountId.length > 10) {
                newDataObj.accountId = dataObj.accountId.substr(0, 10);
                newDataObj.accountIdHidden = dataObj.accountId;
                newDataObj.accountIdHiddenFlag = true;
            }
            else {
                newDataObj.accountId = dataObj.accountId;
                newDataObj.accountIdHiddenFlag = false;
            }

            newTableData.push(newDataObj);
        }

        this.setState({
            newTableData: newTableData,
            searchString: searchStrWithSp
        });

        setTimeout(function () {
            window.initTable('subscriptionupgradeTable', false);
        }, 0);
    }

    edit(item) {
        let editItem = Object.assign({}, item);
        if(editItem.subscriptionIdHiddenFlag){
            editItem.subscriptionId = editItem.subscriptionIdHidden;
        }
        if(editItem.serviceUriHiddenFlag){
            editItem.serviceUri = editItem.serviceUriHidden;
        }
        if(editItem.subscriptionNameFlag){
            editItem.subscriptionName = editItem.subscriptionNameHidden;
        }
        if(editItem.uaaUrlHiddenFlag){
            editItem.uaaUrl = editItem.uaaUrlHidden;
        }
        if(editItem.accountIdHiddenFlag){
            editItem.accountId = editItem.accountIdHidden;
        }
        window.destroyDataTable('subscriptionupgradeTable');
        this.setState({
            editItemData: editItem,
            viewTable: false
        });
    }

    deleteData(tbodyVal, rowIndex) {
        let cnf = window.confirm('Are you sure you want to delete');
        if (cnf) {
            this.props.showGlobalMessage(true, true, 'Please Wait....', 'custom-success');
            fetch(this.props.baseUrl + '/deleteSubscription?subscriptionID='+tbodyVal.subscriptionId, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+this.props.authToken
                }
            })
            .then((response) => {
                if (response.status === 200) {
                    response.json().then((respData) => {
                        if (respData.errorStatus.status === 'ok') {
                            this.props.showGlobalMessage(false, true, 'Record deleted successfuly', 'custom-success');
                            window.removeDataTableRow('subscriptionupgradeTable', rowIndex);
                            let that = this;
                            setTimeout(function () {
                                that.props.hideGlobalMessage();
                            }, 2000);
                        }
                        else{
                            this.props.showGlobalMessage(true, true, respData.errorStatus.statusMsg, 'custom-danger');
                            setTimeout(()=> {
                                this.props.hideGlobalMessage();
                            }, 2000);
                        }
                    });
                }
                else {
                    this.props.showGlobalMessage(true, true, 'Please try after sometime', 'custom-danger');
                    let that = this;
                    setTimeout(function () {
                        that.props.hideGlobalMessage();
                    }, 2000);
                }
            })
            .catch((err) => {
                console.log(err);
                this.props.showGlobalMessage(true, true, 'Please try after sometime', 'custom-danger');
                setTimeout(()=> {
                    this.props.hideGlobalMessage();
                }, 2000);
            });
        }
    }

    changeView() {
        this.setState({
            viewTable: true
        });
        setTimeout(function () {
            window.initTable('subscriptionupgradeTable', true);
        }, 0);
    } // jshint ignore:line
    
    
    render(){
        /* jshint ignore:start */
        return (
            <div>
                {this.state.viewTable ?
                    <div className="row Subscriptionupgrade">
                        <div className="col-md-12">
                            <div className="row mt-2">
                                <div className="col-sm-6 text-left">
                                    <div className="d-inline">
                                        <button type="button" className="btn btn-sm btn-outline-secondary disabled">
                                            <i className="fa fa-filter"></i>
                                            FILTER
                                </button>
                                    </div>
                                    <div className="d-inline p-2">
                                        <input
                                            type="text"
                                            value={this.state.searchString}
                                            className="d-inline form-control form-control-sm search-field"
                                            onChange={(event) => { this.filterData(event) }} />
                                    </div>
                                </div>
                            </div>
                            <div className="centered-div">
                                { this.state.showTableInit ? 
                                    <table id="subscriptionupgradeTable" className="table">
                                        <thead>
                                            <tr>
                                                <th>Subscription ID</th>
                                                <th>Service Uri</th>
                                                <th>Subscription Name</th>
                                                <th>OAuth Provider</th>
                                                <th>Application Role</th>
                                                <th>Account ID</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                            this.state.newTableData.map((tbodyVal, tbodyIndex) => {
                                                    return (
                                                        <tr id={'subscriptionupgradeTableTbodyTr_' + tbodyIndex} key={'subscriptionupgradeTableTbodyTr_' + tbodyIndex}>
                                                            <td>
                                                                {tbodyVal.subscriptionId}&nbsp;&nbsp;
                                                                {tbodyVal.subscriptionIdHiddenFlag ?
                                                                    <img onClick={this.showHideTableTdData.bind(this, tbodyIndex, 'subscriptionId')} className="icon-arrowmore" alt="td-detail" src="assets/static/images/icon_arrowmore.svg" /> :
                                                                    null
                                                                }
                                                            </td>
                                                            <td>
                                                                {tbodyVal.serviceUri}&nbsp;&nbsp;
                                                                {tbodyVal.serviceUriHiddenFlag ?
                                                                    <img onClick={this.showHideTableTdData.bind(this, tbodyIndex, 'serviceUri')} className="icon-arrowmore" alt="td-detail" src="assets/static/images/icon_arrowmore.svg" /> :
                                                                    null
                                                                }
                                                            </td>
                                                            <td>
                                                                {tbodyVal.subscriptionName}&nbsp;&nbsp;
                                                                {tbodyVal.subscriptionNameHiddenFlag ?
                                                                    <img onClick={this.showHideTableTdData.bind(this, tbodyIndex, 'subscriptionName')} className="icon-arrowmore" alt="td-detail" src="assets/static/images/icon_arrowmore.svg" /> :
                                                                    null
                                                                }
                                                            </td>
                                                            <td>
                                                                {tbodyVal.uaaUrl}&nbsp;&nbsp;
                                                                {tbodyVal.uaaUrlHiddenFlag ?
                                                                    <img onClick={this.showHideTableTdData.bind(this, tbodyIndex, 'uaaUrl')} className="icon-arrowmore" alt="td-detail" src="assets/static/images/icon_arrowmore.svg" /> :
                                                                    null
                                                                }
                                                            </td>
                                                            <td>
                                                                {tbodyVal.role}
                                                            </td>
                                                            <td>
                                                                {tbodyVal.accountId}&nbsp;&nbsp;
                                                                {tbodyVal.accountIdHiddenFlag ?
                                                                    <img onClick={this.showHideTableTdData.bind(this, tbodyIndex, 'accountId')} className="icon-arrowmore" alt="td-detail" src="assets/static/images/icon_arrowmore.svg" /> :
                                                                    null
                                                                }
                                                            </td>
                                                            <td>
                                                                <span className="action-img">
                                                                    <img onClick={this.edit.bind(this, tbodyVal)} alt="edit-icon" title="Edit" src="assets/static/images/iconedit_tablemaintainmonitor.svg" />
                                                                    <img alt="delete-icon" onClick={this.deleteData.bind(this, tbodyVal, tbodyIndex)} title="Delete" src="assets/static/images/icondelete_tablemaintainmonitor.svg" />
                                                                </span>
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table> :
                                    <p className="text-center loader-icon">
                                        <img alt="loading" src="assets/static/images/rolling.svg" />
                                    </p>
                                }
                            </div>
                        </div>
                    </div>
                    :
                    <Subscriptionedit authToken={this.props.authToken} helpText={this.props.helpText} handleDataTable={this.handleDataTable.bind(this)} baseUrl={this.props.baseUrl} userId={this.props.userId} showGlobalMessage={this.props.showGlobalMessage.bind(this)} hideGlobalMessage={this.props.hideGlobalMessage.bind(this)} changeView={this.changeView.bind(this)} editItemData={this.state.editItemData}></Subscriptionedit>
                }
            </div>
        )
        /* jshint ignore:end */
    }
}
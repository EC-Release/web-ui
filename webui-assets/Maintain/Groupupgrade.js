import React from "react";

export default class Groupupgrade extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            tableData: [],
            newTableData: [],
            selectedSubscriptionId: '',
            showTableInit: false,
            subscriptions: []
        };
    }

    /* istanbul ignore next */
    componentDidMount(){
        if(localStorage.getItem("subscriptions") === null){
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
                            let selectedSubscriptionId = subscriptions[1].subscriptionId;
                            this.setState({
                                subscriptions: subscriptions,
                                selectedSubscriptionId: selectedSubscriptionId
                            });
                            if(selectedSubscriptionId == ''){
                                this.setState({
                                    tableData: []
                                });
                                this.generateTableStructure([]);
                            }
                            else{
                                fetch(this.props.baseUrl + '/groupList?subscriptionID='+selectedSubscriptionId, { //this.props.baseUrl + '/groupList?subscriptionID='+selectedSubscriptionId
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
                                            console.log(respData)
                                            /*respData = {
                                                data:[
                                                    {
                                                        groupId: 'fad66a52-8d59-4824-b96d-42564b68c711',
                                                        ids: {
                                                            aid: 'DstAet1',
                                                            tid: '0GhEuE1'
                                                        }
                                                    },
                                                    {
                                                        groupId: 'fad66a52-8d59-4824-b96d-42564b68c712',
                                                        ids: {
                                                            aid: 'DstAet2',
                                                            tid: '0GhEuE2'
                                                        }
                                                    },
                                                    {
                                                        groupId: 'fad66a52-8d59-4824-b96d-42564b68c713',
                                                        ids: {
                                                            aid: 'DstAet3',
                                                            tid: '0GhEuE3'
                                                        }
                                                    }
                                                ],
                                                errorStatus: {status: 'ok'}
                                            };*/
                                            let data = respData.data;
                                            if(respData.errorStatus.status == 'ok'){
                                                // check selectedSubscriptionId in createGroup localStorage and append it to data here
                                                let newlyCreatedGroupsofSubscriptions = JSON.parse(localStorage.getItem("newlyCreatedGroups")) || [];
                                                let findIndex = newlyCreatedGroupsofSubscriptions.findIndex(x => x.subscriptionId === selectedSubscriptionId);
                                                if(findIndex != -1){
                                                    let allNewlyCreatedGroupsData = [...newlyCreatedGroupsofSubscriptions[findIndex].createdData];
                                                    if(allNewlyCreatedGroupsData.length > 0){
                                                        for(let dataToAppendAsPending of allNewlyCreatedGroupsData){
                                                            let pendingData = {
                                                                groupId: dataToAppendAsPending.groupId,
                                                                ids: {
                                                                    aid: dataToAppendAsPending.aid,
                                                                    tid: dataToAppendAsPending.tid
                                                                }
                                                            };
                                                            data.push(pendingData);
                                                        }
                                                    }
                                                }
                                                this.setState({
                                                    tableData: data
                                                });
                                                this.generateTableStructure(data);
                                            }
                                            else{
                                                this.props.showGlobalMessage(true, true, respData.errorStatus.statusMsg, 'custom-danger');
                                                setTimeout(()=> {
                                                    this.props.hideGlobalMessage();
                                                }, 2000);
                                            }
                                        });
                                    }
                                    else{
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
                            localStorage.setItem("subscriptions", JSON.stringify(subscriptions));
                        }
                        else{
                            this.props.showGlobalMessage(true, true, respData.errorStatus.statusMsg, 'custom-danger');
                            setTimeout(()=> {
                                this.props.hideGlobalMessage();
                            }, 2000);
                        }
                    });
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
        else{
            let subscriptions = JSON.parse(localStorage.getItem("subscriptions"));
            let selectedSubscriptionId = subscriptions[1].subscriptionId;
            this.setState({
                subscriptions: subscriptions,
                selectedSubscriptionId: selectedSubscriptionId
            });
            if(selectedSubscriptionId == ''){
                this.setState({
                    tableData: []
                });
                this.generateTableStructure([]);
            }
            else{
                fetch(this.props.baseUrl + '/groupList?subscriptionID='+selectedSubscriptionId, { //this.props.baseUrl + '/groupList?subscriptionID='+selectedSubscriptionId
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
                            console.log(respData)
                            /*respData = {
                                data:[
                                    {
                                        groupId: 'fad66a52-8d59-4824-b96d-42564b68c711',
                                        ids: {
                                            aid: 'DstAet1',
                                            tid: '0GhEuE1'
                                        }
                                    },
                                    {
                                        groupId: 'fad66a52-8d59-4824-b96d-42564b68c712',
                                        ids: {
                                            aid: 'DstAet2',
                                            tid: '0GhEuE2'
                                        }
                                    },
                                    {
                                        groupId: 'fad66a52-8d59-4824-b96d-42564b68c713',
                                        ids: {
                                            aid: 'DstAet3',
                                            tid: '0GhEuE3'
                                        }
                                    }
                                ],
                                errorStatus: {status: 'ok'}
                            };*/
                            let data = respData.data;
                            if(respData.errorStatus.status == 'ok'){
                                // check selectedSubscriptionId in createGroup localStorage and append it to data here
                                let newlyCreatedGroupsofSubscriptions = JSON.parse(localStorage.getItem("newlyCreatedGroups")) || [];
                                let findIndex = newlyCreatedGroupsofSubscriptions.findIndex(x => x.subscriptionId === selectedSubscriptionId);
                                if(findIndex != -1){
                                    let allNewlyCreatedGroupsData = [...newlyCreatedGroupsofSubscriptions[findIndex].createdData];
                                    if(allNewlyCreatedGroupsData.length > 0){
                                        for(let dataToAppendAsPending of allNewlyCreatedGroupsData){
                                            let pendingData = {
                                                groupId: dataToAppendAsPending.groupId,
                                                ids: {
                                                    aid: dataToAppendAsPending.aid,
                                                    tid: dataToAppendAsPending.tid
                                                }
                                            };
                                            data.push(pendingData);
                                        }
                                    }
                                }
                                this.setState({
                                    tableData: data
                                });
                                this.generateTableStructure(data);
                            }
                            else{
                                this.props.showGlobalMessage(true, true, respData.errorStatus.statusMsg, 'custom-danger');
                                setTimeout(()=> {
                                    this.props.hideGlobalMessage();
                                }, 2000);
                            }
                        });
                    }
                    else{
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
            
            this.timerForSubscriptionList = setInterval(()=> this.getSubscriptionList(), 20000);
        }
    }

    /* istanbul ignore next */
    componentWillUnmount() {
        clearInterval(this.timerForSubscriptionList);
        this.timerForSubscriptionList = null;
    }

    /* istanbul ignore next */
    getSubscriptionList(){
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
                        localStorage.setItem("subscriptions", JSON.stringify(subscriptions));
                    }
                    else{
                        console.log('Subscription list backgroung api error');
                    }
                });
            }
        })
        .catch((err) => {
            console.log(err);
            console.log('Subscription list backgroung api error');
        });
    }

    /* istanbul ignore next */
    generateTableStructure(tableData){
        let newTableData = [];
        for(let dataObj of tableData){
            let newDataObj = {};
            newDataObj.groupId = dataObj.groupId;
            newDataObj.aid = dataObj.ids.aid;
            newDataObj.tid = dataObj.ids.tid;

            newTableData.push(newDataObj);
        }

        this.setState({
            newTableData: newTableData,
            showTableInit: true
        });

        setTimeout(function(){
            window.initTable('groupupgradeTable');
        }, 100);
    }

    /* istanbul ignore next */
    getDataOnChange(e){
        let selectedSubscriptionId = e.target.value;
        window.destroyDataTable('groupupgradeTable');
        this.setState({
            selectedSubscriptionId: selectedSubscriptionId,
            showTableInit: false
        });

        if(selectedSubscriptionId == ''){
            this.setState({
                tableData: []
            });
            this.generateTableStructure([]);
        }
        else{
            fetch(this.props.baseUrl + '/groupList?subscriptionID='+selectedSubscriptionId, { //this.props.baseUrl + '/groupList?subscriptionID='+selectedSubscriptionId
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
                        console.log(respData)
                        /*respData = {
                            data:[
                                {
                                    groupId: 'fad66a52-8d59-4824-b96d-42564b68c711',
                                    ids: {
                                        aid: 'DstAet1',
                                        tid: '0GhEuE1'
                                    }
                                },
                                {
                                    groupId: 'fad66a52-8d59-4824-b96d-42564b68c712',
                                    ids: {
                                        aid: 'DstAet2',
                                        tid: '0GhEuE2'
                                    }
                                },
                                {
                                    groupId: 'fad66a52-8d59-4824-b96d-42564b68c713',
                                    ids: {
                                        aid: 'DstAet3',
                                        tid: '0GhEuE3'
                                    }
                                }
                            ],
                            errorStatus:{status: 'ok'}
                        };*/
                        let data = respData.data;
                        if(respData.errorStatus.status == 'ok'){
                            // check selectedSubscriptionId in createGroup localStorage and append it to data here
                            let newlyCreatedGroupsofSubscriptions = JSON.parse(localStorage.getItem("newlyCreatedGroups")) || [];
                            let findIndex = newlyCreatedGroupsofSubscriptions.findIndex(x => x.subscriptionId === selectedSubscriptionId);
                            if(findIndex != -1){
                                let allNewlyCreatedGroupsData = [...newlyCreatedGroupsofSubscriptions[findIndex].createdData];
                                if(allNewlyCreatedGroupsData.length > 0){
                                    for(let dataToAppendAsPending of allNewlyCreatedGroupsData){
                                        let pendingData = {
                                            groupId: dataToAppendAsPending.groupId,
                                            ids: {
                                                aid: dataToAppendAsPending.aid,
                                                tid: dataToAppendAsPending.tid
                                            }
                                        };
                                        data.push(pendingData);
                                    }
                                }
                            }
                            this.setState({
                                tableData: data
                            });
                            this.generateTableStructure(data);
                        }
                        else{
                            this.props.showGlobalMessage(true, true, respData.errorStatus.statusMsg, 'custom-danger');
                            setTimeout(()=> {
                                this.props.hideGlobalMessage();
                            }, 2000);
                        }
                    });
                }
                else{
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
    }

    /* istanbul ignore next */
    filterByValue(myArray, string){
        let retArr = [];
        for (var i=0; i < myArray.length; i++) {
            if (myArray[i].groupId.toLowerCase().includes(string.toLowerCase()) || myArray[i].aid.toLowerCase().includes(string.toLowerCase()) || myArray[i].tid.toLowerCase().replace(/\s/g, "").includes(string.toLowerCase().replace(/\s/g, ""))) {
                retArr.push(myArray[i]);
            }
        }
        return retArr;
    }

    /* istanbul ignore next */
    filterData(e){
        window.destroyDataTable('groupupgradeTable');
        let searchStr = e.target.value.trim();
        let wholeDataUnstructured = [...this.state.tableData];
        let wholeData = [];
        for(let dataObj of wholeDataUnstructured){
            let newDataObj = {};
            newDataObj.groupId = dataObj.groupId;
            newDataObj.aid = dataObj.ids.aid;
            newDataObj.tid = dataObj.ids.tid;

            wholeData.push(newDataObj);
        }
        let filteredData = [];
        if(searchStr != ''){
            filteredData = this.filterByValue(wholeData, searchStr);
        }
        else{
            filteredData = wholeData;
        }

        this.setState({
            newTableData: filteredData
        });

        setTimeout(function(){
            window.initTable('groupupgradeTable');
        }, 0);
    }

    /* istanbul ignore next */
    deleteData(tbodyVal, rowIndex) {
        console.log(rowIndex)
        let cnf = window.confirm('Are you sure you want to delete');
        if (cnf) {
            let groupId = tbodyVal.groupId;
            this.props.showGlobalMessage(true, true, 'Please Wait....', 'custom-success');
            fetch(this.props.baseUrl + '/deleteGroup?groupID='+groupId+'&subscriptionID='+this.state.selectedSubscriptionId , {
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
                            window.removeDataTableRow('groupupgradeTable', rowIndex);
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

    render() {
        /* jshint ignore:start */
        /* istanbul ignore next */
        return (
            <div className="row Groupupgrade">
                <div className="col-md-12">
                    <div className="row mt-2">
                        <div className="col-sm-6">
                            <select 
                                className="form-control form-control-sm" 
                                name="subscriptionId" 
                                value={this.state.selectedSubscriptionId}
                                onChange={(event)=>{this.getDataOnChange(event)}}>
                                    {
                                    this.state.subscriptions.map((subscription, subscriptionIndex) => {
                                        return(
                                            <option
                                                key={"subscriptionOption"+subscriptionIndex}
                                                value={ subscription.subscriptionId }>{ subscription.subscriptionName }</option>)
                                    })}
                            </select>
                        </div>
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
                                    className="d-inline form-control form-control-sm search-field"
                                    onChange={(event)=>{this.filterData(event)}} />
                            </div>  
                        </div>
                    </div>
                    <div className="centered-div">
                    <div id="groupupgradeTableDiv">
                            { this.state.showTableInit ?
                                <table id="groupupgradeTable" className="table">
                                    <thead>
                                        <tr>
                                            <th>Group ID</th>
                                            <th>AID</th>
                                            <th>TID</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {this.state.newTableData.map((tbodyVal, tbodyIndex) => {
                                        return(
                                            <tr key={'groupupgradeTableTbodyTr_'+tbodyIndex} id={'groupupgradeTableTbodyTr_'+tbodyIndex}>
                                                
                                                <td>{ tbodyVal.groupId }</td>
                                                <td>{ tbodyVal.aid }</td>
                                                <td>{ tbodyVal.tid }</td>
                                                <td>
                                                    <span className="action-img">
                                                        {
                                                        tbodyVal.aid != 'Pending' && tbodyVal.tid != 'Pending' ? 
                                                            <img alt="delete-icon" onClick={this.deleteData.bind(this, tbodyVal, tbodyIndex)} title="Delete" src="assets/static/images/icondelete_tablemaintainmonitor.svg" />
                                                            :null
                                                        }
                                                    </span>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                    </tbody>
                                </table>:
                                <p className="text-center loader-icon">
                                    <img alt="loading" src="assets/static/images/rolling.svg" />
                                </p>
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
        /* jshint ignore:end */
    }
}
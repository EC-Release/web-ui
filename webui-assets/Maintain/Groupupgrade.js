import React from "react";

export default class Groupupgrade extends React.Component { 
    /* istanbul ignore next */
    constructor(props){
        super(props);
        this.state = {
            tableData: [],
            newTableData: [],
            selectedSubscriptionId: '',
            showTableInit: false,
            subscriptions: [],
            filterValue:"",
            groupForm:{
              subscriptionId: { value: [], dirtyState: false },
              groupId: { value: '', dirtyState: false },
          },
            changeForm:false,
            errorsGroupForm:{},
            groupFormIsValid: false
        };
    }

    /* istanbul ignore next */
    componentDidMount(){
       
        let technicalTableData = [];
        if (sessionStorage.getItem("snapshotData") !== null) {
                let respData =  JSON.parse(sessionStorage.getItem("snapshotData"))
                let allData =[]
                  Object.keys(respData).forEach((key)=> {
                      allData.push(respData[key])
                  });
                  for(let individualData of allData){
                      if(individualData.parent){
                          if(individualData.parent ==="f894e5a8-0f9b-46ca-8b74-57e94610d731"){
                            technicalTableData.push(individualData);
                          }
                      }
                  }
                this.generateTableStructure(technicalTableData);
                this.setState({
                    tableData: technicalTableData
                });

                if(technicalTableData.length ===0){
                    this.props.showGlobalMessage(true, true, 'There is no Data', 'custom-danger');
                    setTimeout(()=> {
                        this.props.hideGlobalMessage();
                    }, 2000);
                }
           
        }
        else {
            this.props.showGlobalMessage(true, true, 'Please try after sometime', 'custom-danger');
            setTimeout(()=> {
                this.props.hideGlobalMessage();
            }, 2000);
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
            newDataObj.subscriptionId=dataObj.subscriptionId
            newDataObj.key = dataObj.key;
            newTableData.push(newDataObj);
        }

        this.setState({
            tableData:newTableData,
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
         // fetch(this.props.baseUrl + '/groupList?subscriptionID='+selectedSubscriptionId, { //this.props.baseUrl + '/groupList?subscriptionID='+selectedSubscriptionId
         fetch('https://reqres.in/api/users/2' ,{
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
                        let data = respData.data;
                        respData={
                            "errorStatus": {
                                  "status": "ok"
                                 }
                                };

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
            if (myArray[i].groupId.toLowerCase().includes(string.toLowerCase())) {
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
            filterValue:searchStr,
            newTableData: filteredData
        });

        setTimeout(function(){
            window.initTable('groupupgradeTable');
        }, 0);
    }

    /* istanbul ignore next */
    deleteData(tbodyVal, rowIndex) {
        let cnf = window.confirm('Are you sure you want to delete');
        if (cnf) {
            let groupId = tbodyVal.groupId;
            this.props.showGlobalMessage(true, true, 'Please Wait....', 'custom-success');
            fetch( this.props.baseUrl + tbodyVal.key ,{   //this.props.baseUrl + '/deleteGroup?groupID='+groupId+'&subscriptionID='+this.state.selectedSubscriptionId , {
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
                            this.props.showGlobalMessage(false, true, 'Record deleted successfuly', 'custom-success');
                            window.removeDataTableRow('groupupgradeTable', rowIndex);
                            let that = this;
                            setTimeout(function () {
                                that.props.hideGlobalMessage();
                            }, 2000);
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

    editData(groupVal){
      let groupData ={...this.state.groupForm}
      groupData.groupId.value =groupVal.groupId,
      groupData.subscriptionId.value = groupVal.subscriptionId
      this.setState({
        groupForm:groupData,
        currentKey: groupVal.key
      });
      setTimeout(() => {
        this.setState({
          changeForm: true,
        });
      });
      setTimeout(() => {
        window.selectView();
      }, 500);
    }

    updategroup(){
      this.props.showGlobalMessage(false, true, 'Record update initiated. Please check after some time.', 'custom-success');
      let prepareData = {};
      prepareData.subscriptionId = this.state.groupForm.subscriptions.value;
      prepareData.groupId = this.state.groupForm.groupId.value;
      prepareData.parent = "f894e5a8-0f9b-46ca-8b74-57e94610d731"
      prepareData.name = "GroupName"
 
      
      fetch(this.props.baseUrl + this.state.currentKey, { //this.props.baseUrl + '/createGroup'
          method: 'PUT',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': 'Bearer '+this.props.authToken
          },
          body: JSON.stringify(prepareData)
      })
      .then((response) => {
          if (response.status === 200) {
              response.json().then((respData) => {
                      this.props.showGlobalMessage(true, true, respData.errorStatus.statusMsg, 'custom-danger');
                      setTimeout(()=> {
                          this.props.hideGlobalMessage();
                      }, 2000);
                  let oldNewlyCreatedGroupsofSubscriptions = JSON.parse(sessionStorage.getItem("newlyCreatedGroups"));
                  let findIndex = oldNewlyCreatedGroupsofSubscriptions.findIndex(x => x.subscriptionId === prepareData.subscriptionId);
                  let allNewlyCreatedGroupsData = [...oldNewlyCreatedGroupsofSubscriptions[findIndex].createdData];
                  let findGroupIndex = allNewlyCreatedGroupsData.findIndex(x => x.groupId === prepareData.groupId);
                  allNewlyCreatedGroupsData.splice(findGroupIndex, 1);
                  oldNewlyCreatedGroupsofSubscriptions[findIndex].createdData = allNewlyCreatedGroupsData;
                  sessionStorage.setItem("newlyCreatedGroups", JSON.stringify(oldNewlyCreatedGroupsofSubscriptions));
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

    /* istanbul ignore next */
    handleFormData(e){
      let fieldName = e.target.name;
      let updatedValue = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
      let currentForm =  Object.assign({}, this.state.groupForm);

      if(fieldName === 'subscriptionId'){
          let value = Array.from(e.target.selectedOptions, (option) => option.value);
          currentForm.subscriptionId.value = value;
          currentForm.subscriptionId.dirtyState = true;
      }
      else if(fieldName === 'groupId'){
          currentForm.groupId.value = updatedValue;
          currentForm.groupId.dirtyState = true;
      }
      this.setState({
        groupForm: currentForm
    });
    
      this.handleFormValidation();
  }

  /* istanbul ignore next */
  handleFormValidation(){
      let currentFormData = this.state.groupForm;
      let subscriptionIdValue = currentFormData.subscriptionId.value;
      let subscriptionIdDirtyState = currentFormData.subscriptionId.dirtyState;
      let groupIdValue = currentFormData.groupId.value;
      let groupIdDirtyState = currentFormData.groupId.dirtyState;
      let formIsValid = true;
      let errors = {};

      let subscriptionIdFound = false;
      for (let subscriptionId of subscriptionIdValue) {
        if (subscriptionId.trim() !== "") {
          subscriptionIdFound = true;
        }
      }
      if (!subscriptionIdFound) {
        errors.subscriptionId = "Please select Subscription ID";
        formIsValid = false;
      }

      if(groupIdValue.trim() === ''){
          if(groupIdDirtyState)
              errors.groupId = 'Please enter Group ID';
          formIsValid = false;
      }

      this.setState({
    groupFormIsValid: formIsValid,
    errorsGroupForm: errors
  });
  }

    render() {
        /* jshint ignore:start */
        /* istanbul ignore next */
        return (
            <div className="row Groupupgrade">
              {this.state.changeForm ? 
                 <div className="col-md-12 centered-div">
                <div className="row" >
                   
                    <div className="col-sm-6 text-center" >
                    <div className="col-sm-12 label">
                           Subscriptions
                       </div>
                        <select
                          className="selectpicker form-control form-control-sm "
                          multiple={true}
                          data-live-search="true"
                          name="subscriptionId"
                          value={this.state.groupForm.subscriptionId.value}
                          disabled={true}
                           onChange={(event) => {
                            this.handleFormData(event);
                          }} 
                        >
                          {this.state.groupForm.subscriptionId.value.map(
                            (subscription, subscriptionIndex) => {
                              return (
                                <option
                                  key={"subscriptionOption" + subscriptionIndex}
                                  value={subscription}
                                >
                                  {subscription}
                                </option>
                              );
                            }
                          )}
                        </select>
                        <small className="text-danger">{ this.state.errorsGroupForm['subscriptionId']}</small>
                    </div>
                    <div className="col-sm-6" > 
                    <div className="col-sm-12 label text-left">
                           Group Id
                       </div>
                       <div className="col-sm-12 mb-2">
                           <input
                               type="text"
                               className="form-control form-control-sm"
                               name="groupId"
                               onChange={(event) => {
                                this.handleFormData(event);
                              }} 
                               value={this.state.groupForm.groupId.value}
                           />
                           <small className="text-danger">{ this.state.errorsGroupForm['groupId']}</small>
                       </div>
                    </div>
                </div>
                <div className="row">
              <div className="col-sm-12 mb-2 text-right">

              <button 
                 id="update-group-btn"
                 disabled={!this.state.groupFormIsValid}
                 onClick={this.updategroup.bind(this)} 
                 className="btn btn-sm customize-view-btn">UPDATE GROUP</button>             
                <button
                  onClick={() =>
                    setTimeout(()=>{
                        this.setState({ changeForm: false })
                    },0)
                    }
                  className="btn btn-sm customize-view-btn">
                  Back
                </button>
              </div>
            </div>
                 </div> :
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
                                    className="d-inline form-control form-control-sm search-field"
                                    onChange={(event)=>{this.filterData(event)}}
                                    value={this.state.filterValue} />
                            </div>  
                        </div>
                    </div>
                    <div className="centered-div">
                        <div id="groupupgradeTableDiv">
                            { this.state.showTableInit ?
                                this.state.newTableData.length > 0 ?
                                <table id="groupupgradeTable" className="table">
                                    <thead>
                                        <tr>
                                            <th>Group ID</th>
                                            { 
                                                this.props.permissions.accesses.maintain.subMenus.groups.delete || this.props.permissions.accesses.maintain.subMenus.groups.edit ?
                                                    <th>Action</th>
                                                    :
                                                    null
                                            }
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.newTableData.map((tbodyVal, tbodyIndex) => {
                                            return(
                                                <tr key={'groupupgradeTableTbodyTr_'+tbodyIndex} id={'groupupgradeTableTbodyTr_'+tbodyIndex}>
                                                    <td>{ tbodyVal.groupId }</td>
                                                            <td>
                                                                <span className="action-img">
                                                                {
                                                                 this.props.permissions.accesses.maintain.subMenus.groups.edit ?
                                                                        <img alt="delete-icon" onClick={this.editData.bind(this, tbodyVal, tbodyIndex)} title="edit" src="assets/static/images/iconedit_tablemaintainmonitor.svg" />
                                                                        :null
                                                                    }
                                                                {
                                                                 this.props.permissions.accesses.maintain.subMenus.groups.delete ?
                                                                        <img alt="delete-icon" onClick={this.deleteData.bind(this, tbodyVal, tbodyIndex)} title="Delete" src="assets/static/images/icondelete_tablemaintainmonitor.svg" />
                                                                        :null
                                                                 }
                                                                </span>
                                                            </td>
                                                       
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table> :
                                <div className="row mt-2">
                                    <div className="col-md-12">
                                        <div className="alert alert-success" role="alert">
                                            No record found!
                                        </div>
                                    </div>
                                </div>
                                :
                                <p className="text-center loader-icon">
                                    <img alt="loading" src="assets/static/images/rolling.svg" />
                                </p>
                            }
                        </div>
                    </div>
                </div> }
            </div>
        )
        /* jshint ignore:end */
    }
}

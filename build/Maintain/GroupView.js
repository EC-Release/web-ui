import React from "react";
import $ from "jquery";

import Rolling from '../assets/images/rolling.svg';
export default class GroupView extends React.Component { 
    /* istanbul ignore next */
    constructor(props){
        super(props);
        this.state = {
            tableData: [],
            newTableData: [],
            selectedSubscriptionId: '',
            showTableInit: false,
            subscriptions: [],
            groupId: "",
            changeForm: false,
            filterValue:""
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

    initTable(tableId, preserveState) {
        var pageLength = 5;
        let tableWidth = 0;
          tableWidth = $("#groupupgradeTableDiv")[0].offsetWidth - 200;
          $("#" + tableId).DataTable({
            dom: 'rt<"bottom"lp>',
            bSort: true,
            scrollX: true,
            language: {
              paginate: {
                previous: "<",
                next: ">",
              },
            },
            createdRow: function (row, data, dataIndex) {
              for (let i = 0; i < data.length; i++) {
                $("td:eq(" + i + ")", row).css(
                  "min-width",
                  tableWidth / data.length + "px"
                );
              }
            },
            pageLength: pageLength,
            stateSave: preserveState,
            destroy: true,
            fnDrawCallback: function (oSettings) {
              if (oSettings.aiDisplay.length <= pageLength) {
                $(".dataTables_paginate").hide();
              } else {
                $(".dataTables_paginate").show();
              }
            },
          });
        $(".bottom").addClass("row");
        $(".dataTables_length").addClass("col-sm-6");
        $(".dataTables_paginate").addClass("col-sm-6");
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
                    if(respData.errorStatus.status === 'ok'){
                        let subscriptions = respData.data ;
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
            newDataObj.subscriptions = dataObj.subscriptionId;

            newTableData.push(newDataObj);
        }

        this.setState({
            tableData:newTableData,
            newTableData: newTableData,
            showTableInit: true
        });

        setTimeout(() =>{
            this.initTable('groupupgradeTable');
        }, 100);
    }

    /* istanbul ignore next */
    edit(groupData){
        let subscriptions = groupData.subscriptions === undefined ? [] : groupData.subscriptions;
        let groupId = groupData.groupId;
        this.setState({
            subscriptions: subscriptions,
            groupId: groupId,
          });
          setTimeout(() => {
            this.setState({
              changeForm: true,
            });
          });
          setTimeout(() => {
            $("select").selectpicker();
          }, 500);
    }

    /* istanbul ignore next */
    destroyDataTable(tableId) {
        var table = $("#" + tableId).DataTable();
        table.destroy();
      }

    /* istanbul ignore next */
    filterData(e){
        this.destroyDataTable('groupupgradeTable');
        let searchStr = e.target.value.trim();
        let wholeDataUnstructured = [...this.state.tableData];
        let wholeData = [];
        for(let dataObj of wholeDataUnstructured){
            let newDataObj = {};
            if(dataObj.groupId !== undefined){
                newDataObj.groupId = dataObj.groupId;
                wholeData.push(newDataObj);
            } 
        }
        let filteredData = [];
        if(searchStr !== ''){
            filteredData = wholeData.filter(groupId =>  groupId.groupId.toLowerCase().includes(searchStr.toLowerCase())); 
        }
        else{
            filteredData = wholeData;
        }
        
        setTimeout(() =>{
            this.setState({
                filterValue:searchStr,
                newTableData: filteredData
            });
            this.initTable('groupupgradeTable');
        }, 0);
    }

    /* istanbul ignore next */
    changeFormHandler(){
        setTimeout(()=>{
            this.setState({ changeForm: false, filterValue:'' })
        },0)
        this.generateTableStructure(this.state.tableData);
    }

    render() {
        /* jshint ignore:start */
        /* istanbul ignore next */
        return (
            <div className="row Groupupgrade">
                {this.state.changeForm ? 
                 <div className="col-md-12 centered-div">
                <div className="row text-center" >
                    <div className="col-sm-6" > 
                    <div className="col-sm-12 label text-left">
                           Group Id
                       </div>
                       <div className="col-sm-12 mb-2">
                           <input
                               type="text"
                               className="form-control form-control-sm"
                               name="subscriptionName"
                               disabled={true}
                               value={this.state.groupId}
                           />
                       </div>
                    </div>
                    <div className="col-sm-6 text-center" >
                    <div className="col-sm-12 label text-left">
                           Subscriptions
                       </div>
                        <select
                          className="selectpicker form-control form-control-sm "
                          multiple={true}
                          data-live-search="true"
                          name="subscriptionId"
                          value={this.state.subscriptions}
                          readOnly={true}
                        /*   onChange={(event) => {
                            this.handleFormData(event);
                          }} */
                        >
                          {this.state.subscriptions.map(
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
                    </div>
                </div>
                <div className="row text-center">
              <div className="col-sm-12 mb-2 text-center">
                <button
                  id="create-group-btn"
                  onClick={() =>
                    this.changeFormHandler()
                    }
                  className="btn btn-sm customize-view-btn"
                >
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
                                 value={this.state.filterValue}
                                 className="d-inline form-control form-control-sm search-field"
                                 onChange={(event)=>{this.filterData(event)}} />
                         </div>  
                     </div>
                 </div>
                 <div className="row"> {null} </div>
                 <div className="centered-div">
                     <div id="groupupgradeTableDiv">
                         { this.state.showTableInit ?
                             this.state.newTableData.length > 0 ?
                             <table id="groupupgradeTable" className="table text-center">
                                 <thead>
                                     <tr>
                                         <th>Group ID</th>
                                         { 
                                             this.props.permissions.accesses.maintain.subMenus.groups.view ?
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
                                                 {
                                                     this.props.permissions.accesses.maintain.subMenus.groups.delete ?
                                                         <td>
                                                             <span className="action-img">
                                                                 
                                                             <i
                                                             onClick={this.edit.bind(this, tbodyVal)}
                                                             className="fa fa-eye cursor-pointer"
                                                             title="View"
                                                             ></i>

                                                             </span>
                                                         </td>
                                                         :
                                                         null
                                                 }
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
                                 <img alt="loading" src={Rolling} />
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

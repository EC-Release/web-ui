import React from "react";

import $ from "jquery";
//import Subscriptionviewform from './LicenseViewForm.js';
import Subscriptionedit from "./LicenseEdit.js";
import Rolling from '../assets/images/rolling.svg';

export default class LicenseView extends React.Component {

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

    /* istanbul ignore next */
    componentDidMount() {
        this.handleDataTable(false);
    }

    /* istanbul ignore next */
    handleDataTable(preserveState) {
        let technicalTableData = [];
     
            if (sessionStorage.getItem("snapshotData") !== null) {
                    let respData =  JSON.parse(sessionStorage.getItem("snapshotData"))
                    let allData =[]
                      Object.keys(respData).forEach((key)=> {
                          allData.push(respData[key])
                      });
                      for(let individualData of allData){
                          if(individualData.parent){
                              if(individualData.parent ==="ab2a2691-a563-486c-9883-5111ff36ba9b"){
                                console.log(individualData);
                                technicalTableData.push(individualData);
                              }
                          }
                      }
                    this.generateTableStructure(technicalTableData, preserveState);
                    this.setState({
                        tableData: technicalTableData
                    });
               
            }
            else {
                this.props.showGlobalMessage(true, true, 'Please try after sometime', 'custom-danger');
                setTimeout(()=> {
                    this.props.hideGlobalMessage();
                }, 2000);
            }
    }

    /* istanbul ignore next */
    initTable(tableId, preserveState) {
        var pageLength = 5;
        let tableWidth = 0;
          tableWidth = $("#subscriptionupgradeTableDiv")[0].offsetWidth - 200;
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
    generateTableStructure(technicalTableData, preserveState) {
        let tableData = technicalTableData;
        let newTableData = [];
        for (let dataObj of tableData) {
            let newDataObj = {};
            newDataObj.licenseId = dataObj.licenseId;
            newDataObj.emailAddress = dataObj.emailAddress;
            newDataObj.date = dataObj.date;
            newDataObj.sso = dataObj.sso;
            newDataObj.username = dataObj.username;
            newDataObj.desc = dataObj.desc;
            newDataObj.key = dataObj.key;
            newTableData.push(newDataObj);
        }

        this.setState({
            newTableData: newTableData,
            showTableInit: true
        });

        setTimeout( () =>  {
            this.initTable('subscriptionupgradeTable', preserveState);
        }, 100);
    }

    /* istanbul ignore next */
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

        this.setState({
            newTableData: newTableData
        });
    }

    /* istanbul ignore next */
    filterByValue(myArray, string){
        let retArr = [];
       for (var i=0; i < myArray.length; i++) {
            if (myArray[i].licenseId.toLowerCase().includes(string.toLowerCase()) || myArray[i].emailAddress.toLowerCase().includes(string.toLowerCase()) || myArray[i].date.includes(string) || myArray[i].sso.includes(string)  ) {
                retArr.push(myArray[i]);
            }
        }
        return retArr;
    }

    /* istanbul ignore next */
    destroyDataTable(tableId) {
        var table = $("#" + tableId).DataTable();
        table.destroy();
      }

    /* istanbul ignore next */
    filterData(e) {
        this.destroyDataTable('subscriptionupgradeTable');
        let searchStr = e.target.value.trim();
        let searchStrWithSp = e.target.value;
        let wholeData = [...this.state.tableData];
        let filteredData = [];
        let newTableData = [];
        if (searchStr !== '') {
            filteredData = this.filterByValue(wholeData, searchStr);
            //console.log(filteredData);
        }
        else {
            filteredData = wholeData;
        }

        for (let dataObj of filteredData) {
            let newDataObj = {};
         
            newDataObj.licenseId = dataObj.licenseId;
            newDataObj.emailAddress = dataObj.emailAddress;
            newDataObj.date = dataObj.date;
            newDataObj.sso = dataObj.sso;
            newDataObj.username = dataObj.username;
            newDataObj.desc = dataObj.desc;

            newTableData.push(newDataObj);
        }

        this.setState({
            newTableData: newTableData,
            searchString: searchStrWithSp
        });

        setTimeout( () => {
            this.initTable('subscriptionupgradeTable', false);
        }, 0);
    }

    /* istanbul ignore next */
    edit(item) {
        let editItem = Object.assign({}, item);
        this.destroyDataTable('subscriptionupgradeTable');
        this.setState({
            editItemData: editItem,
            viewTable: false
        });
    }

    /* istanbul ignore next */
    removeDataTableRow(tableId, rowIndex) {
        var table = $("#" + tableId).DataTable();
        table
          .row("#" + tableId + "TbodyTr_" + rowIndex)
          .remove()
          .draw(false);
      }

    /* istanbul ignore next */
    deleteData(tbodyVal, rowIndex) {
        let cnf = window.confirm('Are you sure you want to delete');
        if (cnf) {
            let subscripnId = tbodyVal.subscriptionId;
            if(tbodyVal.subscriptionIdHiddenFlag){
                subscripnId = tbodyVal.subscriptionIdHidden;
            }
            this.props.showGlobalMessage(true, true, 'Please Wait....', 'custom-success');
            fetch(this.props.baseUrl + '/deleteSubscription?subscriptionID='+subscripnId, {
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
                            this.removeDataTableRow('subscriptionupgradeTable', rowIndex);
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

    /* istanbul ignore next */
    changeView() {
        this.setState({
            viewTable: true
        });
        setTimeout( () => {
            this.initTable('subscriptionupgradeTable', true);
        }, 0);
    } // jshint ignore:line
    
    
    render(){
        /* jshint ignore:start */
        /* istanbul ignore next */
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
                                <div id="subscriptionupgradeTableDiv">
                                    { this.state.showTableInit ? 
                                        this.state.newTableData.length > 0 ?
                                            <table id="subscriptionupgradeTable" className="table text-center">
                                                <thead>
                                                    <tr>
                                                    <th>License ID</th>
                                                    <th>Email Address</th>
                                                    <th>Expiry Date</th>
                                                    <th>SSO</th>
                                                    <th>Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                    this.state.newTableData.map((tbodyVal, tbodyIndex) => {
                                                            return (
                                                                <tr id={'subscriptionupgradeTableTbodyTr_' + tbodyIndex} key={'subscriptionupgradeTableTbodyTr_' + tbodyIndex}>
                                                                  
                                                                    <td>{tbodyVal.licenseId}</td>
                                                                    <td>{tbodyVal.emailAddress}</td>
                                                                    <td>{tbodyVal.date}</td>
                                                                    <td>{tbodyVal.sso}</td>
                                                                    <td>
                                                                        <span className="action-img">
                                                                            <i onClick={this.edit.bind(this, tbodyVal)} className="fa fa-eye cursor-pointer" title="View"></i>
                                                                        </span>
                                                                    </td>
                                                                </tr>
                                                            )
                                                        })
                                                    }
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
                        </div>
                    </div>
                    :
                    <Subscriptionedit
                    authToken={this.props.authToken}
                    helpText={this.props.helpText}
                    handleDataTable={this.handleDataTable.bind(this)}
                    baseUrl={this.props.baseUrl}
                    userId={this.props.userId}
                    showGlobalMessage={this.props.showGlobalMessage.bind(this)}
                    hideGlobalMessage={this.props.hideGlobalMessage.bind(this)}
                    changeView={this.changeView.bind(this)}
                    editItemData={this.state.editItemData}
                    isViewOnly={true}
                    ></Subscriptionedit>
                }
            </div>
        )
        /* jshint ignore:end */
    }
}

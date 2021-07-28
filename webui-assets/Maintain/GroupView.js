import React from "react";

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
      /*   tableData=[{
            "groupId":"12345",
            "subscriptionId":[ 1,2,3,4 ] ,
            "ids":{
                "aid":"avbf43",
                "tid":"avbf43"}  
                }]; */
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

        setTimeout(function(){
            window.initTable('groupupgradeTable');
        }, 100);
    }

    /* istanbul ignore next */
    edit(groupData){
        this.setState({
            subscriptions: groupData.subscriptions,
            groupId: groupData.groupId,
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
                {this.state.changeForm ? 
                 <div className="col-md-12 centered-div">
                <div className="row" >
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
                <div className="row">
              <div className="col-sm-12 mb-2 text-center">
                <button
                  id="create-group-btn"
                  onClick={() =>
                    setTimeout(()=>{
                        this.setState({ changeForm: false })
                    },0)
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
                             <table id="groupupgradeTable" className="table">
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

import React from "react";
import $ from "jquery";

import IconEdit from '../assets/images/iconedit_tablemaintainmonitor.svg';
import IconDelete from '../assets/images/icondelete_tablemaintainmonitor.svg';
import IconArrowMore from '../assets/images/icon_arrowmore.svg';

const MOCK_TABLE_DATA = [
  {
    event_type: "Client Agent Restart",
    gateway: "0d0c3ef5-c8c1-49e3-a9f0-2b2bf22f6fca",
    desc: "The Client is in active state",
    time: "2021-05-22T10:17",
    components: "Gateway, Clients",
  },
  {
    event_type: "Gateway Agent Restart",
    gateway: "3824402a-2504-4239-9820-8ae26caef99a",
    desc: "The Gateway is in suspended state",
    time: "2021-06-15T15:17",
    components: "Group 1",
  },
  {
    event_type: "Server Agent Restart",
    gateway: "664b3ec3-ad7d-476d-a137-66071854e7cc",
    desc: "The Server is in loading state",
    time: "2021-06-02T05:12",
    components: "Gateway , Server",
  },
  {
    event_type: "Client Agent Restart",
    gateway: "7733df8b-96c1-427b-8568-09526e4b9b51",
    desc: "The Client is in suspended state",
    time: "2021-06-12T11:17",
    components: "Gateway",
  },
  {
    event_type: "Client Agent Restart",
    gateway: "b7f5eb88-fef0-44f3-92b3-ea450211eb1e",
    desc: "The Client is in pending state",
    time: "2021-05-21T11:27",
    components: " Clients",
  },
  {
    event_type: "Connection Establish",
    gateway: "7733df8b-96c1-427b-8568-09526e4b9b51",
    desc: "The connection established between Gateway and server",
    time: "2021-06-05T14:18",
    components: "Gateway, Server",
  },
  {
    event_type: "Client Agent Restart",
    gateway: "c810a15e-2892-4276-873a-f0b3f4603d42",
    desc: "The Client is suspended state",
    time: "2021-05-28T10:32",
    components: "Gateway, Clients",
  },
  {
    event_type: "Server Agent Restart",
    gateway: "7733df8b-96c1-427b-8568-09526e4b9b51",
    desc: "The Server is in suspended state",
    time: "2021-05-15T12:27",
    components: " Server",
  },
  {
    event_type: "Gateway Agent Restart",
    gateway: "c810a15e-2892-4276-873a-f0b3f4603d42",
    desc: "The Gateway is in active state",
    time: "2021-04-20T12:10",
    components: "Gateway, Clients , Server",
  },
  {
    event_type: "Connection Establish",
    gateway: "b7f5eb88-fef0-44f3-92b3-ea450211eb1e",
    desc: "The connection established between gateway and client",
    time: "2021-03-12T20:17",
    components: "Gateway, Clients",
  },
  /*  {
        agent_id: 'DEV63016770',
        gateway: 'https://avipocsubdomain.domainname.ext/pagename',
        session: 'Group 1',
        connections_no: 'Group 1',
        group: 'Group 1',
        id: '63016770',
        client_pool: '63016770',
        subscription: 'https://avipocsubdomain.domainname.ext/pagename'
    },
    {
        agent_id: 'DEV63016771',
        gateway: 'https://avipocsubdomain.domainname.ext/pagename',
        session: 'Group 1',
        connections_no: 'Group 1',
        group: 'Group 1',
        id: '63016771',
        client_pool: '63016771',
        subscription: 'https://avipocsubdomain.domainname.ext/pagename'
    },
    {
        agent_id: 'DEV63016772',
        gateway: 'https://avipocsubdomain.domainname.ext/pagename',
        session: 'Group 1',
        connections_no: 'Group 1',
        group: 'Group 1',
        id: '63016772',
        client_pool: '63016772',
        subscription: 'https://avipocsubdomain.domainname.ext/pagename'
    },
    {
        agent_id: 'DEV63016773',
        gateway: 'https://avipocsubdomain.domainname.ext/pagename',
        session: 'Group 1',
        connections_no: 'Group 1',
        group: 'Group 1',
        id: '63016773',
        client_pool: '63016773',
        subscription: 'https://avipocsubdomain.domainname.ext/pagename'
    } */
];

export default class Notification extends React.Component {
  /* istanbul ignore next */
  constructor(props) {
    super(props);
    this.state = {
      tableData: MOCK_TABLE_DATA,
      newTableData: MOCK_TABLE_DATA,
      apiEndPoints: {
        baseUrl: "https://jsonplaceholder.typicode.com/todos/1",
      },
      viewTable: true,
      editItemData: {},
      searchString: "",
    };
  }

  initTable(tableId, preserveState) {
    var pageLength = 5;
    let tableWidth = 0;
   
      tableWidth = $("#" + tableId + "Div")[0].offsetWidth - 200;
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

  filterByValue(myArray, string) {
    
    let retArr = [];
    for (var i = 0; i < myArray.length; i++) {
      if (
        myArray[i].components.includes(string.toLowerCase()) ||
        myArray[i].desc.includes(string.toLowerCase()) ||
        myArray[i].event_type.toLowerCase().includes(string.toLowerCase()) ||
        myArray[i].gateway.toLowerCase().includes(string.toLowerCase()) ||
        myArray[i].time.toLowerCase().includes(string.toLowerCase())
      ) {
        retArr.push(myArray[i]);
      }
    }
    console.log(retArr);
    return retArr;
  }

  destroyDataTable(tableId) {
    var table = $("#" + tableId).DataTable();
    table.destroy();
  }

  filterData(e) {
    this.destroyDataTable("notificationTable");
    let searchStr = e.target.value.trim();
    let searchStrWithSp = e.target.value;
    let wholeData = [...this.state.tableData];
    let filteredData = [];
    let newTableData = [];
    if (searchStr !== "") {
      filteredData = this.filterByValue(wholeData, searchStr);
      //console.log(filteredData);
    } else {
      filteredData = wholeData;
    }

    for (let dataObj of filteredData) {
      let newDataObj = {};

      newDataObj.components = dataObj.components;
      newDataObj.desc = dataObj.desc;
      newDataObj.event_type = dataObj.event_type;
      newDataObj.gateway = dataObj.gateway;
      newDataObj.time = dataObj.time;
      newTableData.push(newDataObj);
    }

    this.setState({
      newTableData: newTableData,
      searchString: searchStrWithSp,
    });

    setTimeout( () => {
      this.initTable("notificationTable", false);
    }, 0);
  }


  /* istanbul ignore next */
  componentDidMount() {
    setTimeout(() => {
      this.initTable("notificationTable");
    }, 100);
  }

  /* istanbul ignore next */
  render() {
    /* jshint ignore:start */
    return (
      <div>
        {this.state.viewTable ? (
          <div className="row Notification">
            <div className="col-md-12">
              <div className="row mt-2">
                <div className="col-sm-6 text-left">
                  <div className="form-group has-search">
                    <span className="fa fa-search form-control-feedback"></span>
                    <input
                      value={this.state.searchString}
                      type="text"
                      className="form-control form-control-sm"
                      placeholder="Search"
                      onChange={(event) => {
                        this.filterData(event);
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="centered-div" id="notificationTableDiv">
                <table id="notificationTable" className="table">
                  <thead>
                    <tr>
                      <th>Event Type</th>
                      <th>Gateway</th>
                      <th>Description</th>
                      <th>Time Stamp</th>
                      <th>Components Associated</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.newTableData.map((tbodyVal, tbodyIndex) => {
                      return (
                        <tr key={"notificationTableTbodyTr_" + tbodyIndex}>
                          <td>{tbodyVal.event_type}</td>
                          <td>
                            {tbodyVal.gateway}&nbsp;&nbsp;
                            {tbodyVal.gatewayHiddenFlag ? (
                              <img
                                onClick={this.showHideTableTdData.bind(
                                  this,
                                  tbodyIndex,
                                  "gateway"
                                )}
                                className="icon-arrowmore"
                                alt="td-detail"
                                src={IconArrowMore}
                              />
                            ) : null}
                          </td>
                          <td>{tbodyVal.desc}</td>
                          <td>{tbodyVal.time}</td>
                          <td>{tbodyVal.components}</td>
                          <td>
                            <span className="action-img">
                              <img
                                alt="edit-icon"
                                title="Edit"
                                src={IconEdit}
                              />
                              <img
                                alt="delete-icon"
                                title="Delete"
                                src={IconDelete}
                              />
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    );
    /* jshint ignore:end */
  }
}

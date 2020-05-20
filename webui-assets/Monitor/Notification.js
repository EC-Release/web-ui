import React from "react";

const MOCK_TABLE_DATA = [
    {
        agent_id: 'DEV63016760',
        gateway: 'https://avipocsubdomain.domainname.ext/pagename1',
        session: 'Group 1',
        connections_no: 'Group 1',
        group: 'Group 1',
        id: '63016760',
        client_pool: '63016760',
        subscription: 'https://avipocsubdomain.domainname.ext/pagename',
    },
    {
        agent_id: 'DEV63016761',
        gateway: 'https://avipocsubdomain.domainname.ext/pagename11',
        session: 'Group 1',
        connections_no: 'Group 1',
        group: 'Group 1',
        id: '63016761',
        client_pool: '63016761',
        subscription: 'https://avipocsubdomain.domainname.ext/pagename'
    },
    {
        agent_id: 'DEV63016762',
        gateway: 'https://avipocsubdomain.domainname.ext/pagename',
        session: 'Group 1',
        connections_no: 'Group 1',
        group: 'Group 1',
        id: '63016762',
        client_pool: '63016762',
        subscription: 'https://avipocsubdomain.domainname.ext/pagename'
    },
    {
        agent_id: 'DEV63016763',
        gateway: 'https://avipocsubdomain.domainname.ext/pagename',
        session: 'Group 2',
        connections_no: 'Group 2',
        group: 'Group 3',
        id: '63016763',
        client_pool: '63016763',
        subscription: 'https://avipocsubdomain.domainname.ext/pagename'
    },
    {
        agent_id: 'DEV63016764',
        gateway: 'https://avipocsubdomain.domainname.ext/pagename',
        session: 'Group 2',
        connections_no: 'Group 2',
        group: 'Group 2',
        id: '63016762',
        client_pool: '63016762',
        subscription: 'https://avipocsubdomain.domainname.ext/pagename'
    },
    {
        agent_id: 'DEV63016765',
        gateway: 'https://avipocsubdomain.domainname.ext/pagename',
        session: 'Group 3',
        connections_no: 'Group 3',
        group: 'Group 3',
        id: '63016765',
        client_pool: '63016765',
        subscription: 'https://avipocsubdomain.domainname.ext/pagename'
    },
    {
        agent_id: 'DEV63016766',
        gateway: 'https://avipocsubdomain.domainname.ext/pagename',
        session: 'Group 1',
        connections_no: 'Group 1',
        group: 'Group 1',
        id: '63016766',
        client_pool: '63016766',
        subscription: 'https://avipocsubdomain.domainname.ext/pagename'
    },
    {
        agent_id: 'DEV63016767',
        gateway: 'https://avipocsubdomain.domainname.ext/pagename',
        session: 'Group 1',
        connections_no: 'Group 1',
        group: 'Group 1',
        id: '63016767',
        client_pool: '63016767',
        subscription: 'https://avipocsubdomain.domainname.ext/pagename'
    },
    {
        agent_id: 'DEV63016768',
        gateway: 'https://avipocsubdomain.domainname.ext/pagename',
        session: 'Group 1',
        connections_no: 'Group 1',
        group: 'Group 1',
        id: '63016768',
        client_pool: '63016768',
        subscription: 'https://avipocsubdomain.domainname.ext/pagename'
    },
    {
        agent_id: 'DEV63016769',
        gateway: 'https://avipocsubdomain.domainname.ext/pagename',
        session: 'Group 1',
        connections_no: 'Group 1',
        group: 'Group 1',
        id: '63016769',
        client_pool: '63016769',
        subscription: 'https://avipocsubdomain.domainname.ext/pagename'
    },
    {
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
    }
];

export default class Notification extends React.Component {

    /* istanbul ignore next */
    constructor(props){
        super(props);
        this.state = {
            tableData: MOCK_TABLE_DATA,
            newTableData: MOCK_TABLE_DATA,
            apiEndPoints: {
                baseUrl : 'https://jsonplaceholder.typicode.com/todos/1'
            },
            viewTable: true,
            editItemData: {},
            searchString: '',
        };
    }

    /* istanbul ignore next */
    componentDidMount(){ 
        setTimeout(function(){
            window.initTable('notificationTable');
        }, 100);
    }

    /* istanbul ignore next */
    render() {
        /* jshint ignore:start */
        return (
            <div>
            { this.state.viewTable ?
            <div className="row Notification">
                <div className="col-md-12">
                    <div className="row mt-2">
                        <div className="col-sm-6 text-left">
                            <div className="form-group has-search">
                                <span className="fa fa-search form-control-feedback"></span>
                                <input value={this.state.searchString} type="text" className="form-control form-control-sm" placeholder="Search" onChange={(event)=>{this.filterData(event)}} />
                            </div>
                        </div>
                    </div>
                    <div className="centered-div">
                        <table id="notificationTable" className="table">
                            <thead>
                                <tr>
                                    <th>Agent ID</th>
                                    <th>Gateway</th>
                                    <th>Session</th>
                                    <th>Connections No.</th>
                                    <th>Group ID</th>
                                    <th>ID</th>
                                    <th>Client Pool</th>
                                    <th>Subscription</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                            {this.state.newTableData.map((tbodyVal, tbodyIndex) => {
                                return(
                                    <tr key={'notificationTableTbodyTr_'+tbodyIndex}>
                                        <td>{ tbodyVal.agent_id }</td>
                                        <td>
                                            { tbodyVal.gateway }&nbsp;&nbsp;
                                            {
                                                tbodyVal.gatewayHiddenFlag ?
                                                    <img onClick={this.showHideTableTdData.bind(this, tbodyIndex, 'gateway')} className="icon-arrowmore" alt="td-detail" src="assets/static/images/icon_arrowmore.svg" />:
                                                    null
                                            }
                                        </td>
                                        <td>{ tbodyVal.session }</td>
                                        <td>{ tbodyVal.connections_no }</td>
                                        <td>{ tbodyVal.group }</td>
                                        <td>{ tbodyVal.id }</td>
                                        <td>{ tbodyVal.client_pool }</td>
                                        <td>
                                            { tbodyVal.subscription }&nbsp;&nbsp;
                                            {  tbodyVal.subscriptionHiddenFlag ?
                                                <img onClick={this.showHideTableTdData.bind(this, tbodyIndex, 'subscription')} className="icon-arrowmore" alt="td-detail" src="assets/static/images/icon_arrowmore.svg" />:
                                                null
                                            }
                                        </td>
                                        <td>
                                            <span className="action-img">
                                                <img alt="plus-icon" title="" src="assets/static/images/plus.svg" />
                                                <img  alt="edit-icon" title="Edit" src="assets/static/images/iconedit_tablemaintainmonitor.svg" />
                                                <img alt="-icon" title="" src="assets/static/images/icon_tablemaintainmonitor.svg" />
                                                <img alt="delete-icon" title="Delete" src="assets/static/images/icondelete_tablemaintainmonitor.svg" />
                                            </span>
                                        </td>
                                    </tr>
                                )
                            })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            :
            null
        }
        </div>
        )
        /* jshint ignore:end */
    }
}
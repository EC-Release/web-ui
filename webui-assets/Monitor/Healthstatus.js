import React from "react";

export default class Healthstatus extends React.Component {

    /* istanbul ignore next */
    constructor(props){
        super(props);
        this.state = {
            gateway:'',
            selectedGateway: '',
            gateways: [],
            healthLink: '',
            session :{
                sessionId:'',
                id:'',
                bindId:'',
                targetId:'',
                groupId:'',
            },
            superConnection:{
                serverId:'',
                id:'',
                targetId:'',
                groupId:'',
                timeCreated:'',
                ip:'',
                lastPong:'',
            },
            connection:{
                bindId:'',
                clientConfiguration:'',
                id:'',
                bindId2:'',
                targetId:'',
                groupId:'',
                timeCreated:'',
                allocations:'',
                totalAllocations:'',
                frees:'',
                heapAlloc:'',
                heapInUse:'',
                heapReleased:'',
                heapObjects:'',
                report:'',
                lastUsage:'',
                lastReport:'',
            },
            showSession:false,
            showConnection:false,
            showSuperConnection:false
        };
    }

    /* istanbul ignore next */
    componentDidMount(){

        // get gateway list start
        fetch('https://jsonplaceholder.typicode.com/todos/1', { // Get gateways
            method: 'GET'
        })
        .then((response) => {
            if (response.status === 200) {
                response.json().then((gateways) => {
                    gateways = [
                        {
                          "gatewayId": "Gateway-10afc420-d8ad-41ec-8be6-6f723e6fb18a",
                          "serviceUrl": "https://b3a2e606-eaa8-4d3c-aadc-c27f12260a1b.run.aws-usw02-dev.ice.predix.io",
                        },
                        {
                          "gatewayId": "Gateway-d4b7844c-f9b2-4ab3-bab3-592b8ca1629d",
                          "serviceUrl": "https://b3a2e606-eaa8-4d3c-aadc-c27f12260a1b.run.aws-usw02-dev.ice.predix.io",
                        }
                    ];
                    this.setState({
                        gateways: gateways
                    });
                });
            }
        });

        //get session, connection, super connection
        
        /*let currentSession = Object.assign({}, this.state.session);
        let currentSuperConnection = Object.assign({},this.state.superConnection);
        let currentConnection = Object.assign({},this.state.connection)
        fetch('https://jsonplaceholder.typicode.com/todos/1')
        .then((response) => {
            if (response.status === 200) {
                response.json().then((sessions) => {
                    this.props.showGlobalMessage(true, true, 'Please wait', 'custom-success');
                    sessions=[{
                        "sessionId" : "OfxhwZxbW61",
                        "id" : "OGhEuE1",
                        "bindId" : 'CejeRnKYuO1',
                        "targetId": 'value1',
                        "groupId" : 'smartshop-prod1',
                    }
                    ];
                    if(sessions.length > 0){
                        for(let session of sessions){
                            currentSession.sessionId = session.sessionId;
                            currentSession.id = session.id;
                            currentSession.bindId = session.bindId;
                            currentSession.targetId = session.targetId;
                            currentSession.groupId = session.groupId;
                        }
                        this.setState({
                            session : currentSession
                        })
                    }

                    fetch('https://jsonplaceholder.typicode.com/todos/1')
                    .then((response) => {
                    if (response.status === 200) {
                    response.json().then((superConnections) => {
                        superConnections=[{
                            "serverId" : "OGhEuE1",
                            "id" : "OGhEuE1",
                            "targetId" : "value1",
                            "groupId" : "smartshop-prod1",
                            "timeCreated" : "2019-11-13T22:05:38.101993815Z1",
                            "ip" : "10.72.1.16:613681",
                            "lastPong" : "0001-01-01T00:00:00Z1"
                        }
                        ];
                    if(superConnections.length > 0){
                        for(let superConnection of superConnections){
                            currentSuperConnection.serverId = superConnection.serverId;
                            currentSuperConnection.id = superConnection.id;
                            currentSuperConnection.targetId = superConnection.targetId;
                            currentSuperConnection.groupId = superConnection.groupId;
                            currentSuperConnection.timeCreated = superConnection.timeCreated;
                            currentSuperConnection.ip = superConnection.ip;
                            currentSuperConnection.lastPong = superConnection.lastPong;
                        }
                        this.setState({
                            superConnection : currentSuperConnection
                        })
                    }

                    fetch('https://jsonplaceholder.typicode.com/todos/1')
                    .then((response) => {
                        if (response.status === 200) {
                            response.json().then((connections) => {
                                connections=[{
                            "bindId" : "DstAet1",
                            "clientConfiguration" : "value1",
                            "id" : "087ADA1",
                            "bindId2" : "0074C51",
                            "targetId" : "OGhEuE1",
                            "groupId" : "smartshop-prod1",
                            "timeCreated" : "2019-11-13T22:05:38.101993815Z1",
                            "allocations" : "29037761",
                            "totalAllocations" : "250076241",
                            "frees" : "3943151",
                            "heapAlloc" : "29037761",
                            "heapInUse" : "51855361",
                            "heapReleased" : "602030081",
                            "heapObjects" : "202241",
                            "report" : "value1",
                            "lastUsage" : "9871",
                            "lastReport" : "0001-01-01T00:00:00Z1",
                        }
                        ];
                        if(connections.length > 0){
                            for(let connection of connections){
                                currentConnection.bindId = connection.bindId;
                                currentConnection.clientConfiguration = connection.clientConfiguration;
                                currentConnection.id = connection.id;
                                currentConnection.bindId2 = connection.bindId2;
                                currentConnection.targetId = connection.targetId;
                                currentConnection.groupId = connection.groupId;
                                currentConnection.timeCreated = connection.timeCreated;
                                currentConnection.allocations = connection.allocations;
                                currentConnection.totalAllocations = connection.totalAllocations;
                                currentConnection.frees = connection.frees;
                                currentConnection.heapAlloc = connection.heapAlloc;
                                currentConnection.heapInUse = connection.heapInUse;
                                currentConnection.heapReleased = connection.heapReleased;
                                currentConnection.heapObjects = connection.heapObjects;
                                currentConnection.report = connection.report;
                                currentConnection.lastUsage = connection.lastUsage;
                                currentConnection.lastReport = connection.lastReport;
                            }
                            this.setState({
                                connection : currentConnection
                            })
                            let that= this;
                            that.props.hideGlobalMessage();
                            }});
                        }})  
                    });}
                })     
            });}
        })
        .catch((err) => {
            console.log(err);
            this.props.showGlobalMessage(true, true, 'Error', 'custom-danger');
                            let that= this;
                            setTimeout(function () {
                                that.props.hideGlobalMessage();
                            }, 2000);
        });*/
    }

    /* istanbul ignore next */
    handleChange(e){
        let id = e.target.id;
        
        if(id === "session"){
            let currentShowSession = this.state.showSession;
            this.setState({
                showSession : !currentShowSession
            });
        }
        if(id === "superConnection"){
            let currentSuperConnection = this.state.showSuperConnection;
            this.setState({
                showSuperConnection : !currentSuperConnection
            });
        }
        if(id === "connections"){
            let currentConnection = this.state.showConnection;
            this.setState({
                showConnection : !currentConnection
            });
        }
    }
    
    /* istanbul ignore next */
    fetchHealthStatus(){
        let selectedGatewayId = this.state.selectedGateway;
        let gateways = this.state.gateways;
        let selectedGateway = gateways.find(x => x.gatewayId === selectedGatewayId);
        let serviceUrl = selectedGateway.serviceUrl;
        let healthLink = '';
        if(serviceUrl !== ''){
            let indexFromCut = serviceUrl.indexOf('.') + 1;
            let cutString = serviceUrl.slice(indexFromCut);
            healthLink = 'https://'+cutString+'/health';
        }
       
        let currentSession = Object.assign({}, this.state.session);
        let currentSuperConnection = Object.assign({},this.state.superConnection);
        let currentConnection = Object.assign({},this.state.connection);
        fetch('https://jsonplaceholder.typicode.com/todos/1') // healthLink
        .then((response) => {
            if (response.status === 200) {
                response.json().then((respData) => {
                    this.props.showGlobalMessage(true, true, 'Please wait', 'custom-success');
                    console.log(respData);
                    respData={
                        "Version": "v1.hokkaido.212",
                        "GatewayID": "1f703d50-e9c9-473e-9309-1cfeea1ec2ac",
                        "RefID": "1",
                        "IP": "10.254.0.42",
                        "PID": 17,
                        "NumOfConnSinceLaunch": 49412,
                        "Sessions": {
                          "0DZSiogZGu": {
                            "sessionId": "0DZSiogZGu",
                            "serverConfig": {
                              "id": "OqkLan",
                              "bindId": "5ZyTK7kkrJ",
                              "targetId": "",
                              "groupId": "cirrus-fdl-prod"
                            },
                            "clientConfig": {
                              "id": "Ia8DkA",
                              "bindId": "",
                              "targetId": "OqkLan",
                              "groupId": "cirrus-fdl-prod"
                            },
                            "timeCreated": "2020-02-08T23:09:54.906015311Z"
                          },
                          "8sGmr0Zz6l": {
                            "sessionId": "8sGmr0Zz6l",
                            "serverConfig": {
                              "id": "mOuTjM",
                              "bindId": "o43eTByjmP",
                              "targetId": "",
                              "groupId": "cirrus-mfttomdm-prod"
                            },
                            "clientConfig": {
                              "id": "Ub1ype",
                              "bindId": "",
                              "targetId": "mOuTjM",
                              "groupId": "cirrus-mfttomdm-prod"
                            },
                            "timeCreated": "2020-02-08T22:57:16.857906466Z"
                          },
                          "9As4szpFlY": {
                            "sessionId": "9As4szpFlY",
                            "serverConfig": {
                              "id": "OqkLan",
                              "bindId": "1gYsvJDCVZ",
                              "targetId": "",
                              "groupId": "cirrus-fdl-prod"
                            },
                            "clientConfig": {
                              "id": "Ia8DkA",
                              "bindId": "",
                              "targetId": "OqkLan",
                              "groupId": "cirrus-fdl-prod"
                            },
                            "timeCreated": "2020-02-08T11:37:26.892280615Z"
                          },
                          "BTtIbQGePB": {
                            "sessionId": "BTtIbQGePB",
                            "serverConfig": {
                              "id": "OqkLan",
                              "bindId": "jXAQnVfUNh",
                              "targetId": "",
                              "groupId": "cirrus-fdl-prod"
                            },
                            "clientConfig": {
                              "id": "Ia8DkA",
                              "bindId": "",
                              "targetId": "OqkLan",
                              "groupId": "cirrus-fdl-prod"
                            },
                            "timeCreated": "2020-02-09T06:50:44.881407754Z"
                          },
                          "CQVTPdgqen": {
                            "sessionId": "CQVTPdgqen",
                            "serverConfig": {
                              "id": "mOuTjM",
                              "bindId": "fteij3AY7F",
                              "targetId": "",
                              "groupId": "cirrus-mfttomdm-prod"
                            },
                            "clientConfig": {
                              "id": "Ub1ype",
                              "bindId": "",
                              "targetId": "mOuTjM",
                              "groupId": "cirrus-mfttomdm-prod"
                            },
                            "timeCreated": "2020-02-08T14:02:35.877650613Z"
                          },
                          "IrNOX7Ti15": {
                            "sessionId": "IrNOX7Ti15",
                            "serverConfig": {
                              "id": "mOuTjM",
                              "bindId": "HfedwY1bT2",
                              "targetId": "",
                              "groupId": "cirrus-mfttomdm-prod"
                            },
                            "clientConfig": {
                              "id": "Ub1ype",
                              "bindId": "",
                              "targetId": "mOuTjM",
                              "groupId": "cirrus-mfttomdm-prod"
                            },
                            "timeCreated": "2020-02-08T14:02:04.845292886Z"
                          },
                          "QVuJrEAKy3": {
                            "sessionId": "QVuJrEAKy3",
                            "serverConfig": {
                              "id": "OqkLan",
                              "bindId": "lZUuKrSKw1",
                              "targetId": "",
                              "groupId": "cirrus-fdl-prod"
                            },
                            "clientConfig": {
                              "id": "Ia8DkA",
                              "bindId": "",
                              "targetId": "OqkLan",
                              "groupId": "cirrus-fdl-prod"
                            },
                            "timeCreated": "2020-02-08T14:48:33.880675241Z"
                          },
                          "bKEV7YUV7A": {
                            "sessionId": "bKEV7YUV7A",
                            "serverConfig": {
                              "id": "mOuTjM",
                              "bindId": "4YmdvcvlXY",
                              "targetId": "",
                              "groupId": "cirrus-mfttomdm-prod"
                            },
                            "clientConfig": {
                              "id": "Ub1ype",
                              "bindId": "",
                              "targetId": "mOuTjM",
                              "groupId": "cirrus-mfttomdm-prod"
                            },
                            "timeCreated": "2020-02-09T10:17:12.898013082Z"
                          },
                          "m2AyukOB1L": {
                            "sessionId": "m2AyukOB1L",
                            "serverConfig": {
                              "id": "OqkLan",
                              "bindId": "Ky8a4fHw6y",
                              "targetId": "",
                              "groupId": "cirrus-fdl-prod"
                            },
                            "clientConfig": {
                              "id": "Ia8DkA",
                              "bindId": "",
                              "targetId": "OqkLan",
                              "groupId": "cirrus-fdl-prod"
                            },
                            "timeCreated": "2020-02-09T03:15:55.89144109Z"
                          },
                          "mB1slLcXtT": {
                            "sessionId": "mB1slLcXtT",
                            "serverConfig": {
                              "id": "4kY8Rp",
                              "bindId": "lRkWy1QXVm",
                              "targetId": "",
                              "groupId": "cirrus-corpsftp-prod"
                            },
                            "clientConfig": {
                              "id": "SBewk9",
                              "bindId": "",
                              "targetId": "4kY8Rp",
                              "groupId": "cirrus-corpsftp-prod"
                            },
                            "timeCreated": "2020-02-09T14:45:08.929716188Z"
                          },
                          "o700yaf9bL": {
                            "sessionId": "o700yaf9bL",
                            "serverConfig": {
                              "id": "mOuTjM",
                              "bindId": "LfishYQSdX",
                              "targetId": "",
                              "groupId": "cirrus-mfttomdm-prod"
                            },
                            "clientConfig": {
                              "id": "Ub1ype",
                              "bindId": "",
                              "targetId": "mOuTjM",
                              "groupId": "cirrus-mfttomdm-prod"
                            },
                            "timeCreated": "2020-02-09T19:22:16.881634483Z"
                          },
                          "oMVOXyR7A5": {
                            "sessionId": "oMVOXyR7A5",
                            "serverConfig": {
                              "id": "OqkLan",
                              "bindId": "NDgvIOL9Fi",
                              "targetId": "",
                              "groupId": "cirrus-fdl-prod"
                            },
                            "clientConfig": {
                              "id": "Ia8DkA",
                              "bindId": "",
                              "targetId": "OqkLan",
                              "groupId": "cirrus-fdl-prod"
                            },
                            "timeCreated": "2020-02-09T03:33:20.90654554Z"
                          },
                          "rOmRthusnf": {
                            "sessionId": "rOmRthusnf",
                            "serverConfig": {
                              "id": "4kY8Rp",
                              "bindId": "iWPCJnT9zx",
                              "targetId": "",
                              "groupId": "cirrus-corpsftp-prod"
                            },
                            "clientConfig": {
                              "id": "SBewk9",
                              "bindId": "",
                              "targetId": "4kY8Rp",
                              "groupId": "cirrus-corpsftp-prod"
                            },
                            "timeCreated": "2020-02-09T13:40:20.595895236Z"
                          },
                          "rnlY55fVmz": {
                            "sessionId": "rnlY55fVmz",
                            "serverConfig": {
                              "id": "mOuTjM",
                              "bindId": "BSGCMCPLnU",
                              "targetId": "",
                              "groupId": "cirrus-mfttomdm-prod"
                            },
                            "clientConfig": {
                              "id": "Ub1ype",
                              "bindId": "",
                              "targetId": "mOuTjM",
                              "groupId": "cirrus-mfttomdm-prod"
                            },
                            "timeCreated": "2020-02-10T05:20:09.895990145Z"
                          },
                          "tsQXMHvoBj": {
                            "sessionId": "tsQXMHvoBj",
                            "serverConfig": {
                              "id": "OqkLan",
                              "bindId": "jpFS5dbV9T",
                              "targetId": "",
                              "groupId": "cirrus-fdl-prod"
                            },
                            "clientConfig": {
                              "id": "Ia8DkA",
                              "bindId": "",
                              "targetId": "OqkLan",
                              "groupId": "cirrus-fdl-prod"
                            },
                            "timeCreated": "2020-02-09T10:25:05.90541234Z"
                          }
                        },
                        "SuperConns": [
                          {
                            "serverId": "4kY8Rp",
                            "bindId": {
                              "id": "4kY8Rp",
                              "bindId": "",
                              "targetId": "",
                              "groupId": "cirrus-corpsftp-prod"
                            },
                            "timeCreated": "2020-02-08T11:01:18.204711682Z",
                            "ip": "10.72.1.11:63694",
                            "lastPong": "0001-01-01T00:00:00Z"
                          },
                          {
                            "serverId": "mKDAUS",
                            "bindId": {
                              "id": "mKDAUS",
                              "bindId": "",
                              "targetId": "",
                              "groupId": "cirrus-mfttojeeves-prod"
                            },
                            "timeCreated": "2020-02-08T11:01:18.214632814Z",
                            "ip": "10.72.11.10:13236",
                            "lastPong": "0001-01-01T00:00:00Z"
                          },
                          {
                            "serverId": "r60wh4",
                            "bindId": {
                              "id": "r60wh4",
                              "bindId": "",
                              "targetId": "",
                              "groupId": "cirrus-smtp-prod"
                            },
                            "timeCreated": "2020-02-08T11:01:18.217563438Z",
                            "ip": "10.72.11.13:30718",
                            "lastPong": "0001-01-01T00:00:00Z"
                          },
                          {
                            "serverId": "wj8ut5",
                            "bindId": {
                              "id": "wj8ut5",
                              "bindId": "",
                              "targetId": "",
                              "groupId": "cirrus-postgres-prod"
                            },
                            "timeCreated": "2020-02-08T11:01:21.953060319Z",
                            "ip": "10.72.1.10:3704",
                            "lastPong": "0001-01-01T00:00:00Z"
                          },
                          {
                            "serverId": "OqkLan",
                            "bindId": {
                              "id": "OqkLan",
                              "bindId": "",
                              "targetId": "",
                              "groupId": "cirrus-fdl-prod"
                            },
                            "timeCreated": "2020-02-08T11:01:22.787765221Z",
                            "ip": "10.72.1.10:4068",
                            "lastPong": "0001-01-01T00:00:00Z"
                          },
                          {
                            "serverId": "DzaYzX",
                            "bindId": {
                              "id": "DzaYzX",
                              "bindId": "",
                              "targetId": "",
                              "groupId": "concur-sftp-prod"
                            },
                            "timeCreated": "2020-02-08T11:01:18.192820259Z",
                            "ip": "10.72.11.14:41642",
                            "lastPong": "0001-01-01T00:00:00Z"
                          },
                          {
                            "serverId": "mKDAUS",
                            "bindId": {
                              "id": "mKDAUS",
                              "bindId": "",
                              "targetId": "",
                              "groupId": "cirrus-mfttojeeves-prod"
                            },
                            "timeCreated": "2020-02-08T11:01:18.192218957Z",
                            "ip": "10.72.1.12:41234",
                            "lastPong": "0001-01-01T00:00:00Z"
                          },
                          {
                            "serverId": "4kY8Rp",
                            "bindId": {
                              "id": "4kY8Rp",
                              "bindId": "",
                              "targetId": "",
                              "groupId": "cirrus-corpsftp-prod"
                            },
                            "timeCreated": "2020-02-08T11:01:18.193435382Z",
                            "ip": "10.72.1.12:41228",
                            "lastPong": "0001-01-01T00:00:00Z"
                          },
                          {
                            "serverId": "mOuTjM",
                            "bindId": {
                              "id": "mOuTjM",
                              "bindId": "",
                              "targetId": "",
                              "groupId": "cirrus-mfttomdm-prod"
                            },
                            "timeCreated": "2020-02-08T11:01:18.203509394Z",
                            "ip": "10.72.1.14:31870",
                            "lastPong": "0001-01-01T00:00:00Z"
                          },
                          {
                            "serverId": "r60wh4",
                            "bindId": {
                              "id": "r60wh4",
                              "bindId": "",
                              "targetId": "",
                              "groupId": "cirrus-smtp-prod"
                            },
                            "timeCreated": "2020-02-08T11:01:20.767499516Z",
                            "ip": "10.72.1.14:32616",
                            "lastPong": "0001-01-01T00:00:00Z"
                          },
                          {
                            "serverId": "mOuTjM",
                            "bindId": {
                              "id": "mOuTjM",
                              "bindId": "",
                              "targetId": "",
                              "groupId": "cirrus-mfttomdm-prod"
                            },
                            "timeCreated": "2020-02-08T11:01:22.291384425Z",
                            "ip": "10.72.11.14:42994",
                            "lastPong": "0001-01-01T00:00:00Z"
                          },
                          {
                            "serverId": "OqkLan",
                            "bindId": {
                              "id": "OqkLan",
                              "bindId": "",
                              "targetId": "",
                              "groupId": "cirrus-fdl-prod"
                            },
                            "timeCreated": "2020-02-08T11:01:24.577507601Z",
                            "ip": "10.72.11.16:28370",
                            "lastPong": "0001-01-01T00:00:00Z"
                          },
                          {
                            "serverId": "wj8ut5",
                            "bindId": {
                              "id": "wj8ut5",
                              "bindId": "",
                              "targetId": "",
                              "groupId": "cirrus-postgres-prod"
                            },
                            "timeCreated": "2020-02-08T11:01:18.185183585Z",
                            "ip": "10.72.11.14:41648",
                            "lastPong": "0001-01-01T00:00:00Z"
                          }
                        ],
                        "ClientPool": [],
                        "Alloc": 18745352,
                        "TotalAlloc": 57944971144,
                        "Sys": 143329528,
                        "Lookups": 0,
                        "Mallocs": 290459711,
                        "Frees": 290304507,
                        "HeapAlloc": 18745352,
                        "HeapSys": 96337920,
                        "HeapIdle": 70377472,
                        "HeapInuse": 25960448,
                        "HeapReleased": 61628416,
                        "HeapObjects": 155204,
                        "Report": {
                          "lastUsage": 3437,
                          "lastReport": "0001-01-01T00:00:00Z"
                        }
                      };
                    if(respData.length > 0){
                        for(let session of respData){
                            currentSession.sessionId = session.sessionId;
                            currentSession.id = session.id;
                            currentSession.bindId = session.bindId;
                            currentSession.targetId = session.targetId;
                            currentSession.groupId = session.groupId;
                        }
                        this.setState({
                            session : currentSession
                        });
                    }

                    fetch('https://jsonplaceholder.typicode.com/todos/1')
                    .then((response) => {
                    if (response.status === 200) {
                    response.json().then((superConnections) => {
                        superConnections=[{
                            "serverId" : "OGhEuE",
                            "id" : "OGhEuE",
                            "targetId" : "value",
                            "groupId" : "smartshop-prod",
                            "timeCreated" : "2019-11-13T22:05:38.101993815Z",
                            "ip" : "10.72.1.16:61368",
                            "lastPong" : "0001-01-01T00:00:00Z"
                        }
                        ];
                    if(superConnections.length > 0){
                        for(let superConnection of superConnections){
                            currentSuperConnection.serverId = superConnection.serverId;
                            currentSuperConnection.id = superConnection.id;
                            currentSuperConnection.targetId = superConnection.targetId;
                            currentSuperConnection.groupId = superConnection.groupId;
                            currentSuperConnection.timeCreated = superConnection.timeCreated;
                            currentSuperConnection.ip = superConnection.ip;
                            currentSuperConnection.lastPong = superConnection.lastPong;
                        }
                        this.setState({
                            superConnection : currentSuperConnection
                        });
                    }

                    fetch('https://jsonplaceholder.typicode.com/todos/1')
                    .then((response) => {
                        if (response.status === 200) {
                            response.json().then((connections) => {
                                connections=[{
                            "bindId" : "DstAet",
                            "clientConfiguration" : "value",
                            "id" : "087ADA",
                            "bindId2" : "0074C5",
                            "targetId" : "OGhEuE",
                            "groupId" : "smartshop-prod",
                            "timeCreated" : "2019-11-13T22:05:38.101993815Z",
                            "allocations" : "2903776",
                            "totalAllocations" : "25007624",
                            "frees" : "394315",
                            "heapAlloc" : "2903776",
                            "heapInUse" : "5185536",
                            "heapReleased" : "60203008",
                            "heapObjects" : "20224",
                            "report" : "value",
                            "lastUsage" : "987",
                            "lastReport" : "0001-01-01T00:00:00Z",
                        }
                        ];
                        if(connections.length > 0){
                            for(let connection of connections){
                                currentConnection.bindId = connection.bindId;
                                currentConnection.clientConfiguration = connection.clientConfiguration;
                                currentConnection.id = connection.id;
                                currentConnection.bindId2 = connection.bindId2;
                                currentConnection.targetId = connection.targetId;
                                currentConnection.groupId = connection.groupId;
                                currentConnection.timeCreated = connection.timeCreated;
                                currentConnection.allocations = connection.allocations;
                                currentConnection.totalAllocations = connection.totalAllocations;
                                currentConnection.frees = connection.frees;
                                currentConnection.heapAlloc = connection.heapAlloc;
                                currentConnection.heapInUse = connection.heapInUse;
                                currentConnection.heapReleased = connection.heapReleased;
                                currentConnection.heapObjects = connection.heapObjects;
                                currentConnection.report = connection.report;
                                currentConnection.lastUsage = connection.lastUsage;
                                currentConnection.lastReport = connection.lastReport;
                            }
                            this.setState({
                                connection : currentConnection
                            });
                            let that= this;
                            that.props.hideGlobalMessage();
                            }});
                        }}) ; 
                    });}
                });    
            });}
        })
        .catch((err) => {
            console.log(err);
            this.props.showGlobalMessage(true, true, 'Error', 'custom-danger');
                            let that= this;
                            setTimeout(function () {
                                that.props.hideGlobalMessage();
                            }, 2000);
        });
        
    }

    /* istanbul ignore next */
    handleGatewayselection(e){
        let selectedGateway = e.target.value;
        this.setState({
            selectedGateway : selectedGateway
        });
    }

    /* istanbul ignore next */
    render() {
        /* jshint ignore:start */
        return (
            <div className = "Monitorhealthstatus">
                <div className="card mt-2">
                    <div className="row insidedata">
                        <form>
                            <div className="form-row">
                                <div className="col-sm-12 text-left">
                                    <label>GATEWAY</label>
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <select
												className="form-control form-control-sm"
												id="selectedGateway"
												name="selectedGateway"
												value={this.state.selectedGateway}
												onChange={(event) => {
													this.handleGatewayselection(event);
												}} >
													<option value="">Select Organization</option>
													{this.state.gateways.map((gateway, gatewayIndex) => {
                                                    return(
                                                        <option className="float-left"
                                                            key={"gatewayOption"+gatewayIndex}
                                                            value={ gateway.gatewayId }>{ gateway.gatewayId }</option>
                                                )})}
											</select>
                                        </div>
                                        <div className="col-sm-4">
                                            <button 
                                                type="button" 
                                                id="fetch-health-status-btn"
                                                disabled={this.state.selectedGateway === '' ? true : false}
                                                className="btn customize-view-btn btn-sm" 
                                                onClick={()=>{this.fetchHealthStatus()}}>
                                                    FETCH HEALTH STATUS
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="row insidedata">
                        <ul className="nav nav-tabs" id="myTab" role="tablist">
                            <li className="nav-item">
                                <a className="nav-link active" id="sessions-tab" data-toggle="tab" href="#sessions" role="tab" aria-controls="sessions" aria-selected="true">SESSIONS</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" id="superconnections-tab" data-toggle="tab" href="#superconnections" role="tab" aria-controls="superconnections" aria-selected="false">SUPER CONNECTIONS</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" id="contact-tab" data-toggle="tab" href="#contact" role="tab" aria-controls="contact" aria-selected="false">SUPER CONNECTIONS1</a>
                            </li>
                        </ul>
                        <div className="tab-content" id="myTabContent">
                            <div className="tab-pane fade show active" id="sessions" role="tabpanel" aria-labelledby="sessions-tab">
                                
                                <div className="row">
                                    <div className="col-sm-6">
                                        <small className="font-weight-bold">Session ID:</small><br/>
                                        <small className="font-weight-normal theme-color">{this.state.session.sessionId}</small><br/>
                                    </div>
                                    <div className="col-sm-6">
                                        <small className="font-weight-bold">Server config ID</small><br/>
                                        <small className="font-weight-normal theme-color">{this.state.session.id}</small><br/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-6">
                                        <small className="font-weight-bold">Bind ID:</small><br/>
                                        <small className="font-weight-normal theme-color">{this.state.session.bindId}</small><br/>
                                    </div>
                                    <div className="col-sm-6">
                                        <small className="font-weight-bold">Target ID:</small><br/>
                                        <small className="font-weight-normal theme-color">{this.state.session.targetId}</small><br/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-6">
                                        <small className="font-weight-bold">Group ID:</small><br/>
                                        <small className="font-weight-normal theme-color">{this.state.session.groupId}</small><br/>
                                    </div>
                                </div>
                            </div>

                            <div className="tab-pane fade" id="superconnections" role="tabpanel" aria-labelledby="superconnections-tab">
                                <div className="row">
                                    <div className="col-sm-6">
                                        <small className="font-weight-bold">Server ID:</small><br/>
                                        <small className="font-weight-normal theme-color">{this.state.superConnection.serverId}</small><br/>
                                    </div>
                                    <div className="col-sm-6">
                                        <small className="font-weight-bold">ID:</small><br/>
                                        <small className="font-weight-normal theme-color">{this.state.superConnection.id}</small><br/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-6">
                                        <small className="font-weight-bold">Target ID:</small><br/>
                                        <small className="font-weight-normal theme-color">{this.state.superConnection.targetId}</small><br/>
                                    </div>
                                    <div className="col-sm-6">
                                        <small className="font-weight-bold">Group ID:</small><br/>
                                        <small className="font-weight-normal theme-color">{this.state.superConnection.groupId}</small><br/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-6">
                                        <small className="font-weight-bold">Time created:</small><br/>
                                        <small className="font-weight-normal theme-color">{this.state.superConnection.timeCreated}</small><br/>
                                    </div>
                                    <div className="col-sm-6">
                                        <small className="font-weight-bold">IP:</small><br/>
                                        <small className="font-weight-normal theme-color">{this.state.superConnection.ip}</small><br/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-6">
                                        <small className="font-weight-bold">Last Pong:</small><br/>
                                        <small className="font-weight-normal theme-color">{this.state.superConnection.lastPong}</small><br/>
                                    </div>
                                </div>
                            </div>

                            <div className="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">
                                <div className="row">
                                    <div className="col-sm-4">
                                        <small className="font-weight-bold">Bind ID:</small><br/>
                                        <small className="font-weight-normal theme-color">{this.state.connection.bindId}</small><br/>
                                    </div>
                                    <div className="col-sm-4">
                                        <small className="font-weight-bold">Client configuration:</small><br/>
                                        <small className="font-weight-normal theme-color">{this.state.connection.clientConfiguration}</small><br/>
                                    </div>
                                    <div className="col-sm-4">
                                        <small className="font-weight-bold">ID:</small><br/>
                                        <small className="font-weight-normal theme-color">{this.state.connection.id}</small><br/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-4">
                                        <small className="font-weight-bold">Bind ID:</small><br/>
                                        <small className="font-weight-normal theme-color">{this.state.connection.bindId2}</small><br/>
                                    </div>
                                    <div className="col-sm-4">
                                        <small className="font-weight-bold">Target ID:</small><br/>
                                        <small className="font-weight-normal theme-color">{this.state.connection.targetId}</small><br/>
                                    </div>
                                    <div className="col-sm-4">
                                        <small className="font-weight-bold">Group ID:</small><br/>
                                        <small className="font-weight-normal theme-color">{this.state.connection.groupId}</small><br/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-4">
                                        <small className="font-weight-bold">Time created:</small><br/>
                                        <small className="font-weight-normal theme-color">{this.state.connection.timeCreated}</small><br/>
                                    </div>
                                    <div className="col-sm-4">
                                        <small className="font-weight-bold">Allocations:</small><br/>
                                        <small className="font-weight-normal theme-color">{this.state.connection.allocations}</small><br/>
                                    </div>
                                    <div className="col-sm-4">
                                        <small className="font-weight-bold">Total Allocations:</small><br/>
                                        <small className="font-weight-normal theme-color">{this.state.connection.totalAllocations}</small><br/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-4">
                                        <small className="font-weight-bold">Frees:</small><br/>
                                        <small className="font-weight-normal theme-color">{this.state.connection.frees}</small><br/>
                                    </div>
                                    <div className="col-sm-4">
                                        <small className="font-weight-bold">Heap Alloc:</small><br/>
                                        <small className="font-weight-normal theme-color">{this.state.connection.heapAlloc}</small><br/>
                                    </div>
                                    <div className="col-sm-4">
                                        <small className="font-weight-bold">Heap in use:</small><br/>
                                        <small className="font-weight-normal theme-color">{this.state.connection.heapInUse}</small><br/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-4">
                                        <small className="font-weight-bold">Heap released:</small><br/>
                                        <small className="font-weight-normal theme-color">{this.state.connection.heapReleased}</small><br/>
                                    </div>
                                    <div className="col-sm-4">
                                        <small className="font-weight-bold">Heap Objects:</small><br/>
                                        <small className="font-weight-normal theme-color">{this.state.connection.heapObjects}</small><br/>
                                    </div>
                                    <div className="col-sm-4">
                                        <small className="font-weight-bold">Report:</small><br/>
                                        <small className="font-weight-normal theme-color">{this.state.connection.report}</small><br/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-4">
                                        <small className="font-weight-bold">Last usage:</small><br/>
                                        <small className="font-weight-normal theme-color">{this.state.connection.lastUsage}</small><br/>
                                    </div>
                                    <div className="col-sm-4">
                                        <small className="font-weight-bold">Last report:</small><br/>
                                        <small className="font-weight-normal theme-color">{this.state.connection.lastReport}</small><br/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        /*<div className = "Monitorhealthstatus scroll">
                    <div className = 'row mt-2'>
                        <div className = 'col col-6'>
                            <select className="form-control form-control-sm">
                                <option className="float-left" value="fa-search" > &#xf002;  Search by gateway</option>
                                    {this.state.gateways.map((gateway, gatewayIndex) => {
                                        return(
                                            <option
                                                key={"gatewayOption"+gatewayIndex}
                                                value={ gateway.gatewayId }>{ gateway.gatewayId }</option>
                                            )})}
                            </select>
                        </div>
                    </div>
                    <div className='row mt-2'>
                        <div className="card">
                            <form>
                                <div className="row">
                                    <div className="col-sm-4">
                                    <label htmlFor="formGroupExampleInput" className="health-label float-left">Gateway</label>
                                    <select className="form-control" id="">
                                        <option className="float-left">AVIPOCSUBDOMAIN Gateway</option>
                                        {this.state.gateways.map((gateway, gatewayIndex) => {
                                            return(
                                                <option className="float-left"
                                                    key={"gatewayOption"+gatewayIndex}
                                                    value={ gateway.gatewayId }>{ gateway.gatewayId }</option>
                                        )})}
                                    </select>
                                    </div>
                                    <div className="col-sm-8">
                                    <label htmlFor="formGroupExampleInput">&nbsp;</label>
                                        <input type="text" className="form-control border-primary theme-color" defaultValue={this.state.healthLink}/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-12">
                                        <button type="button" className="btn customize-view-btn btn-sm mt-2 float-right" 
                                        onClick={()=>{this.fetchHealthStatus()}}>
                                            FETCH HEALTH STATUS
                                    </button>
                                    </div>
                                </div>
                            </form>
                            <div className = 'row mt-2 executeModal'>
                                <div className = 'col-4 mr-n3 d-flex'>
                                    <div className="card card-body p-4 flex-fill">
                                            <label className ="control-label ml-3">SESSIONS <img alt="down-arrow" src="assets/static/images/icon_greensortingdown.svg" /></label>
                                        {this.state.showSession === true?
                                            <div className ="container text-left">
                                                <small className="font-weight-bold">Session ID:</small><br/>
                                                <small className="font-weight-normal theme-color">{this.state.session.sessionId}</small><br/>
                                                <small className="font-weight-bold">Server config</small><br/>
                                                <small className="font-weight-bold">ID:</small><br/>
                                                <small className="font-weight-normal theme-color">{this.state.session.id}</small><br/>
                                                <small className="font-weight-bold">Bind ID:</small><br/>
                                                <small className="font-weight-normal theme-color">{this.state.session.bindId}</small><br/>
                                                <small className="font-weight-bold">Target ID:</small><br/>
                                                <small className="font-weight-normal theme-color">{this.state.session.targetId}</small><br/>
                                                <small className="font-weight-bold">Group ID:</small><br/>
                                                <small className="font-weight-normal theme-color">{this.state.session.groupId}</small><br/>     
                                            </div>:null    
                                        }
                                    </div>
                                </div>
                                <div className = 'col-4 mx-n3 d-flex'>
                                    <div className="card p-4 card-body flex-fill">
                                        <label className ="control-label ml-3">SUPER CONNECTIONS <img alt="down-arrow" src="assets/static/images/icon_greensortingdown.svg" /></label>
                                        {this.state.showSuperConnection === true?
                                            <div className ="container text-left">
                                                <small className="font-weight-bold">Server ID:</small><br/>
                                                <small className="font-weight-normal theme-color">{this.state.superConnection.serverId}</small><br/>
                                                <small className="font-weight-bold">ID:</small><br/>
                                                <small className="font-weight-normal theme-color">{this.state.superConnection.id}</small><br/>
                                                <small className="font-weight-bold">Target ID:</small><br/>
                                                <small className="font-weight-normal theme-color">{this.state.superConnection.targetId}</small><br/>
                                                <small className="font-weight-bold">Group ID:</small><br/>
                                                <small className="font-weight-normal theme-color">{this.state.superConnection.groupId}</small><br/>
                                                <small className="font-weight-bold">Time created:</small><br/>
                                                <small className="font-weight-normal theme-color">{this.state.superConnection.timeCreated}</small><br/>
                                                <small className="font-weight-bold">IP:</small><br/>
                                                <small className="font-weight-normal theme-color">{this.state.superConnection.ip}</small><br/>
                                                <small className="font-weight-bold">Last Pong:</small><br/>
                                                <small className="font-weight-normal theme-color">{this.state.superConnection.lastPong}</small><br/>
                                            </div>:null    
                                        }
                                    </div>
                          
                                </div>
                                <div className = 'col-4 ml-n3 d-flex'>
                                    <div className="card p-4 card-body flex-fill">
                                        <label className ="control-label ml-3">CONNECTIONS <img alt="down-arrow" src="assets/static/images/icon_greensortingdown.svg" /></label>
                                        {this.state.showConnection === true?
                                            <div className ="container text-left">
                                                <small className="font-weight-bold">Bind ID:</small><br/>
                                                <small className="font-weight-normal theme-color">{this.state.connection.bindId}</small><br/>
                                                <small className="font-weight-bold">Client configuration:</small><br/>
                                                <small className="font-weight-normal theme-color">{this.state.connection.clientConfiguration}</small><br/>
                                                <small className="font-weight-bold">ID:</small><br/>
                                                <small className="font-weight-normal theme-color">{this.state.connection.id}</small><br/>
                                                <small className="font-weight-bold">Bind ID:</small><br/>
                                                <small className="font-weight-normal theme-color">{this.state.connection.bindId2}</small><br/>
                                                <small className="font-weight-bold">Target ID:</small><br/>
                                                <small className="font-weight-normal theme-color">{this.state.connection.targetId}</small><br/>
                                                <small className="font-weight-bold">Group ID:</small><br/>
                                                <small className="font-weight-normal theme-color">{this.state.connection.groupId}</small><br/>
                                                <small className="font-weight-bold">Time created:</small><br/>
                                                <small className="font-weight-normal theme-color">{this.state.connection.timeCreated}</small><br/>
                                                <small className="font-weight-bold">Allocations:</small><br/>
                                                <small className="font-weight-normal theme-color">{this.state.connection.allocations}</small><br/>
                                                <small className="font-weight-bold">Total Allocations:</small><br/>
                                                <small className="font-weight-normal theme-color">{this.state.connection.totalAllocations}</small><br/>
                                                <small className="font-weight-bold">Frees:</small><br/>
                                                <small className="font-weight-normal theme-color">{this.state.connection.frees}</small><br/>
                                                <small className="font-weight-bold">Heap Alloc:</small><br/>
                                                <small className="font-weight-normal theme-color">{this.state.connection.heapAlloc}</small><br/>
                                                <small className="font-weight-bold">Heap in use:</small><br/>
                                                <small className="font-weight-normal theme-color">{this.state.connection.heapInUse}</small><br/>
                                                <small className="font-weight-bold">Heap released:</small><br/>
                                                <small className="font-weight-normal theme-color">{this.state.connection.heapReleased}</small><br/>
                                                <small className="font-weight-bold">Heap Objects:</small><br/>
                                                <small className="font-weight-normal theme-color">{this.state.connection.heapObjects}</small><br/>
                                                <small className="font-weight-bold">Report:</small><br/>
                                                <small className="font-weight-normal theme-color">{this.state.connection.report}</small><br/>
                                                <small className="font-weight-bold">Last usage:</small><br/>
                                                <small className="font-weight-normal theme-color">{this.state.connection.lastUsage}</small><br/>
                                                <small className="font-weight-bold">Last report:</small><br/>
                                                <small className="font-weight-normal theme-color">{this.state.connection.lastReport}</small><br/>
                                            </div>:null    
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className='row my-5'>
                                <div className = 'col'>
                                    <button type="button" className="btn btn-sm customize-view-btn mr-2 mb-2"
                                     onClick={(event)=>{this.handleChange(event)}}
                                     id= "superConnection">SUPER CONECTIONS</button>
                                    <button type="button" className="btn btn-sm customize-view-btn mr-2 mb-2"
                                        onClick={(event)=>{this.handleChange(event)}}
                                        id= "connections">NO. OF CONNECTIONS</button>
                                    <button type="button" className="btn btn-sm customize-view-btn mb-2"
                                     onClick={(event)=>{this.handleChange(event)}}
                                     id= "session">NO. OF SESSION ID</button>
                                </div>
                                <div className = 'col'>
                                    <button type="button" className="btn btn-sm customize-view-btn float-right mb-2">REFRESH</button>
                                </div>
                            </div>
                        </div>
                    </div>
                
                                    </div> */
        )
        /* jshint ignore:end */
    }
}
import React from "react";
import IconGreenSortingDown from "../assets/images/icon_greensortingdown.svg";
import CopyImg from "../assets/images/copy.svg";
export default class Maintainagentedit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      agentForm: {
        agentMode: { value: 2, dirtyState: false },
        gateway: { value: "", dirtyState: false },
        businessId: { value: 0, dirtyState: false },
        businessName: { value: "", dirtyState: false },
        requestor: { value: "", dirtyState: false },
        requestedDate: { value: "", dirtyState: false },
        customerEmail: { value: "", dirtyState: false },
        bucAnd: { value: "", dirtyState: false },
        vpc: { value: "", dirtyState: false },
        debugMode: { value: true, dirtyState: false },
      },
      errorsAgentForm: {},
      agentFormIsValid: false,

      serverForm: {
        mode: "SERVER",
        agentId: { value: "", dirtyState: false },
        group: { value: "", dirtyState: false },
        clientId: { value: "", dirtyState: false },
        clientSecret: { value: "", dirtyState: false },
        duration: { value: "", dirtyState: false },
        /* istanbul ignore next */
        OAuth2: { value: "", dirtyState: false },
        host: { value: "", dirtyState: false },
        zone: { value: "", dirtyState: false },
        serviceUrl: { value: "", dirtyState: false },
        remoteHost: { value: "", dirtyState: false },
        remotePort: { value: "", dirtyState: false },
        proxy: { value: "", dirtyState: false },
        allowPlugIn: { value: false, dirtyState: false },
        plugIn: { value: [], dirtyState: false },
      },
      errorsServerForm: {},
      serverFormIsValid: false,
      clientForm: {
        mode: "CLIENT",
        agentId: { value: "", dirtyState: false },
        group: { value: "", dirtyState: false },
        clientId: { value: "", dirtyState: false },
        uaaClientId: { value: "", dirtyState: false },
        clientSecret: { value: "", dirtyState: false },
        duration: { value: "", dirtyState: false },
        OAuth2: { value: "", dirtyState: false },
        host: { value: "", dirtyState: false },
        localPort: { value: "", dirtyState: false },
        targetId: { value: "", dirtyState: false },
        proxy: { value: "", dirtyState: false },
        allowPlugIn: { value: false, dirtyState: false },
        plugIn: { value: [], dirtyState: false },
      },
      errorsClientForm: {},
      clientFormIsValid: false,
      xclientForm: {
        mode: "X:CLIENT",
        group: { value: "", dirtyState: false },
        clientId: { value: "", dirtyState: false },
        OAuth2: { value: "", dirtyState: false },
        host: { value: "", dirtyState: false },
        remoteHost: { value: "", dirtyState: false },
      },
      errorsXClientForm: {},
      xclientFormIsValid: false,
      xserverForm: {
        mode: "X:SERVER",
        group: { value: "", dirtyState: false },
        clientId: { value: "", dirtyState: false },
        OAuth2: { value: "", dirtyState: false },
        host: { value: "", dirtyState: false },
        remoteHost: { value: "", dirtyState: false },
      },
      errorsXServerForm: {},
      xserverFormIsValid: false,
      executeScriptForm: {
        ecVersion: "",
        ecSubVersion: "",
        osType: "1",
        username: "",
        password: "",
        scriptPath: "",
      },
      // API will provide this agentModeButtons
      agentModeButtons: [
        { text: "SERVER", value: 2 },
        { text: "CLIENT", value: 3 },
        { text: "X:SERVER", value: 4 },
        { text: "X:CLIENT", value: 5 },
      ],
      // API will provide this gateways
      gateways: [
        { name: "Choose Gateway...", id: 100 },
        { name: "gateway-03123012", id: 101 },
        { name: "gateway-31034216", id: 102 },
        { name: "gateway-03130357", id: 103 },
      ],
      // API will provide this businesses
      businesses: [
        { name: "Aviation", id: "1" },
        { name: "Power", id: "2" },
        { name: "Capital", id: "3" },
        { name: "External", id: "4" },
      ],
      // API will provide this ecVersions
      ecVersions: [
        { name: "v 212 stable", id: "1" },
        { name: "v 1724 beta", id: "2" },
      ],
      // API will provide this ecSubVersions
      ecSubVersions: [
        { name: "v1.hokkaido.212 stable", id: "1", ecVersionId: "1" },
        { name: "v1beta.fukuoka.1724", id: "2", ecVersionId: "2" },
      ],
      // API will provide this osTypes
      osTypes: [
        { name: "Linux", id: "1" },
        { name: "Windows", id: "2" },
        { name: "Solaris", id: "3" },
        { name: "MAC", id: "4" },
      ],
      // API will provide this plugIns
      plugIns: [
        { name: "VLN", id: "vln" },
        { name: "TLS", id: "tls" },
      ],
      apiEndPoints: {
        baseUrl: "https://jsonplaceholder.typicode.com/todos/1",
      },
      environments: [
        { name: "CF", id: "cf" },
        { name: "AWS", id: "aws" },
      ],
    };
  }

  /* istanbul ignore next */
  componentDidMount() {
    let formData = Object.assign({}, this.props.editItemData);
    let agentForm = {
      agentMode: { value: parseInt(formData.agentMode), dirtyState: false },
      gateway: { value: formData.gatewayId, dirtyState: false },
      businessId: { value: 0, dirtyState: false },
      businessName: { value: "", dirtyState: false },
      requestor: { value: "", dirtyState: false },
      requestedDate: { value: "", dirtyState: false },
      customerEmail: { value: "", dirtyState: false },
      bucAnd: { value: "", dirtyState: false },
      vpc: { value: "", dirtyState: false },
      debugMode: { value: true, dirtyState: false },
    };

    let clientForm = {
      mode: "CLIENT",
      agentId: { value: formData.agent_id, dirtyState: false },
      group: { value: formData.group, dirtyState: false },
      clientId: { value: formData.clientId, dirtyState: false },
      uaaClientId: { value: formData.uaaClientId, dirtyState: false },
      clientSecret: { value: formData.uaaClientSecret, dirtyState: false },
      duration: { value: formData.duration, dirtyState: false },
      OAuth2: { value: formData.oauth_provider, dirtyState: false },
      host: { value: formData.hostUrl, dirtyState: false },
      localPort: { value: formData.localPort, dirtyState: false },
      targetId: { value: formData.targetId, dirtyState: false },
      proxy: { value: "", dirtyState: false },
      allowPlugIn: { value: false, dirtyState: false },
      plugIn: { value: [], dirtyState: false },
    };

    let serverForm = {
      mode: "SERVER",
      agentId: { value: formData.agent_id, dirtyState: false },
      group: { value: formData.group, dirtyState: false },
      clientId: { value: formData.uaaClientId, dirtyState: false },
      serverId: { value: formData.serverId, dirtyState: false },
      userId: { value: formData.userId, dirtyState: false },
      clientSecret: { value: formData.uaaClientSecret, dirtyState: false },
      duration: { value: formData.duration, dirtyState: false },
      OAuth2: { value: formData.oauth_provider, dirtyState: false },
      host: { value: formData.hostUrl, dirtyState: false },
      zone: { value: formData.zone, dirtyState: false },
      serviceUrl: { value: formData.serviceUrl, dirtyState: false },
      remoteHost: { value: formData.remote_host, dirtyState: false },
      remotePort: { value: formData.remote_port, dirtyState: false },
      proxy: { value: "", dirtyState: false },
      allowPlugIn: { value: false, dirtyState: false },
      plugIn: { value: [], dirtyState: false },
    };

    let xclientForm = {
      mode: "X:CLIENT",
      group: { value: formData.group, dirtyState: false },
      clientId: { value: formData.uaaClientId, dirtyState: false },
      OAuth2: { value: formData.oauth_provider, dirtyState: false },
      host: { value: formData.hostUrl, dirtyState: false },
      remoteHost: { value: formData.remote_host, dirtyState: false },
    };

    let xserverForm = {
      mode: "X:SERVER",
      group: { value: formData.group, dirtyState: false },
      clientId: { value: formData.uaaClientId, dirtyState: false },
      OAuth2: { value: formData.oauth_provider, dirtyState: false },
      host: { value: formData.hostUrl, dirtyState: false },
      remoteHost: { value: formData.remote_host, dirtyState: false },
    };

    this.setState({
      agentForm: agentForm,
      clientForm: clientForm,
      serverForm: serverForm,
      xclientForm: xclientForm,
      xserverForm: xserverForm,
    });

    let that = this;
    setTimeout(function () {
      that.handleServerFormValidation();
      that.handleClientFormValidation();
      that.handleXClientFormValidation();
      that.handleXServerFormValidation();
    }, 1000);
  }

  /* istanbul ignore next */
  handleChangeAgentMode(newAgentMode) {
    let currentAgentForm = Object.assign({}, this.state.agentForm);
    currentAgentForm.agentMode.value = newAgentMode;

    this.setState({
      agentForm: currentAgentForm,
    });
  }

  /* istanbul ignore next */
  copyFromServerToClient() {
    let currentServerForm = Object.assign({}, this.state.serverForm);
    let currentClientForm = Object.assign({}, this.state.clientForm);

    currentClientForm.agentId.value = currentServerForm.agentId.value;
    currentClientForm.group.value = currentServerForm.group.value;
    currentClientForm.clientId.value = currentServerForm.clientId.value;
    currentClientForm.clientSecret.value = currentServerForm.clientSecret.value;
    currentClientForm.duration.value = currentServerForm.duration.value;
    currentClientForm.OAuth2.value = currentServerForm.OAuth2.value;
    currentClientForm.host.value = currentServerForm.host.value;
    currentClientForm.allowPlugIn.value = currentServerForm.allowPlugIn.value;
    currentClientForm.plugIn.value = currentServerForm.plugIn.value;

    this.setState({
      clientForm: currentClientForm,
    });

    this.props.showGlobalMessage(
      false,
      true,
      "Data copied from server",
      "custom-success"
    );
    setTimeout(() => {
      this.props.hideGlobalMessage();
    }, 2000);
    this.handleClientFormValidation();
  }

  /* istanbul ignore next */
  copyFromClientToServer() {
    let currentClientForm = Object.assign({}, this.state.clientForm);
    let currentServerForm = Object.assign({}, this.state.serverForm);

    currentServerForm.agentId.value = currentClientForm.agentId.value;
    currentServerForm.group.value = currentClientForm.group.value;
    currentServerForm.clientId.value = currentClientForm.clientId.value;
    currentServerForm.clientSecret.value = currentClientForm.clientSecret.value;
    currentServerForm.duration.value = currentClientForm.duration.value;
    currentServerForm.OAuth2.value = currentClientForm.OAuth2.value;
    currentServerForm.host.value = currentClientForm.host.value;
    currentServerForm.allowPlugIn.value = currentClientForm.allowPlugIn.value;
    currentServerForm.plugIn.value = currentClientForm.plugIn.value;

    this.setState({
      serverForm: currentServerForm,
    });

    this.props.showGlobalMessage(
      false,
      true,
      "Data copied from client",
      "custom-success"
    );
    setTimeout(() => {
      this.props.hideGlobalMessage();
    }, 2000);
    this.handleServerFormValidation();
  }

  /* istanbul ignore next */
  downloadFile(type) {
    let prepareData = {};
    let agentFormData = this.state.agentForm;
    if (type === "server") {
      let serverFormData = this.state.serverForm;
      prepareData.mod = serverFormData.mode;
      prepareData.dbg = agentFormData.debugMode.value;
      prepareData.gatewayId = agentFormData.gateway.value;
      prepareData.aid = serverFormData.agentId.value;
      prepareData.serverId = serverFormData.serverId.value;
      prepareData.userId = serverFormData.userId.value;
      prepareData.grp = serverFormData.group.value;
      prepareData.cid = serverFormData.clientId.value;
      prepareData.csc = serverFormData.clientSecret.value;
      prepareData.dur = parseInt(serverFormData.duration.value);
      prepareData.oa2 = serverFormData.OAuth2.value;
      prepareData.hst = serverFormData.host.value;
      prepareData.zon = serverFormData.zone.value;
      prepareData.cps = 0;
      prepareData.sst = serverFormData.serviceUrl.value;
      prepareData.rht = serverFormData.remoteHost.value;
      prepareData.rpt = serverFormData.remotePort.value;
      prepareData.proxy = serverFormData.proxy.value;
      prepareData.plg = serverFormData.allowPlugIn.value;
      prepareData.hostUrl = serverFormData.host.value;
      for (let statePlugIn of this.state.plugIns) {
        if (serverFormData.plugIn.value.indexOf(statePlugIn.id) !== -1) {
          prepareData[statePlugIn.id] = true;
        } else {
          prepareData[statePlugIn.id] = false;
        }
      }

      fetch(
        this.props.baseUrl +
          "/updateServer?gateway_id=" +
          prepareData.gatewayId +
          "&user_id=" +
          this.props.userId +
          "&server_id=" +
          prepareData.serverId,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: this.props.authToken,
          },
          body: JSON.stringify(prepareData),
        }
      )
        .then((response) => {
          if (response.status === 200) {
            response.json().then((respData) => {
              if (respData.errorStatus.status == "ok") {
                this.props.handleDataTable(true);
                this.props.showGlobalMessage(
                  true,
                  true,
                  "Record updated successfully",
                  "custom-success"
                );

                let filename = "server.yml";
                let data =
                  "ec-config: \n\tconf: \n\t\tmod: " +
                  serverFormData.mode.toLowerCase() +
                  "\n\t\tzon: " +
                  serverFormData.zone.value +
                  " \n\t\tgrp: " +
                  serverFormData.group.value +
                  " \n\t\tsst: " +
                  serverFormData.serviceUrl.value +
                  " \n\t\thst: " +
                  serverFormData.host.value +
                  " \n\t\tdbg: " +
                  agentFormData.debugMode.value +
                  " \n\t\tcid: " +
                  serverFormData.clientId.value +
                  " \n\t\tcsc: " +
                  serverFormData.clientSecret.value +
                  " \n\t\toa2: " +
                  serverFormData.OAuth2.value +
                  " \n\t\tdur: " +
                  serverFormData.duration.value +
                  " \n\t\taid: " +
                  serverFormData.agentId.value +
                  " \n\t\trpt: " +
                  serverFormData.remotePort.value +
                  " \n\t\trht: " +
                  serverFormData.remoteHost.value +
                  " \n\t\tcps: " +
                  0 +
                  " \n\t\tplg: " +
                  serverFormData.allowPlugIn.value +
                  " \n\t\tvln: " +
                  prepareData.vln +
                  " \n\t\ttls: " +
                  prepareData.tls;
                let blob = new Blob([data], { type: "text/yml" });
                if (window.navigator.msSaveOrOpenBlob) {
                  window.navigator.msSaveBlob(blob, filename);
                } else {
                  let elem = window.document.createElement("a");
                  elem.href = window.URL.createObjectURL(blob);
                  elem.download = filename;
                  document.body.appendChild(elem);
                  elem.click();
                  document.body.removeChild(elem);
                }

                setTimeout(() => {
                  this.props.hideGlobalMessage();
                }, 2000);
              } else {
                this.props.showGlobalMessage(
                  true,
                  true,
                  respData.errorStatus.statusMsg,
                  "custom-danger"
                );
                setTimeout(() => {
                  this.props.hideGlobalMessage();
                }, 2000);
              }
            });
          } else {
            this.props.showGlobalMessage(
              true,
              true,
              "Ooops! There is some error",
              "custom-danger"
            );
            setTimeout(() => {
              this.props.hideGlobalMessage();
            }, 2000);
          }
        })
        .catch((err) => {
          console.log(err);
          this.props.showGlobalMessage(
            true,
            true,
            "Please try after sometime",
            "custom-danger"
          );
          setTimeout(() => {
            this.props.hideGlobalMessage();
          }, 2000);
        });
    } else if (type === "x:server") {
      let serverFormData = Object.assign({}, this.state.xserverForm);
      prepareData.mod = serverFormData.mode.toLowerCase();
      prepareData.dbg = agentFormData.debugMode.value;
      prepareData.ecVersion = agentFormData.ecVersion.value;
      prepareData.grp = serverFormData.group.value;
      prepareData.cid = serverFormData.clientId.value;
      prepareData.oa2 = serverFormData.OAuth2.value;
      prepareData.hst = serverFormData.host.value;
      prepareData.cps = 0;
      prepareData.rht = serverFormData.remoteHost.value;
      prepareData.parent = "65c77c4f-fdf4-4c6d-a703-48b12cc21b2d";
      prepareData.name = "server";

      fetch(this.props.baseUrl + "generateXServerScript", {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: this.props.authToken,
        },
        body: JSON.stringify(prepareData),
      })
        .then((response) => {
          if (response.status === 200) {
            response.json().then((respData) => {
              /* if(respData.errorStatus.status == 'ok'){ */
              sessionStorage.setItem("ServerData", JSON.stringify(prepareData));
              this.props.hideGlobalMessage();
              // this.props.showModal(modalHeading, respData.data, buttons);
              setTimeout(() => {
                let selectedHost = "";
                if (this.state.gateways.length > 0) {
                  selectedHost = this.state.gateways[0].id;
                }
                let serverForm = {
                  mode: "X:SERVER",
                  group: {
                    value: serverFormData.group.value,
                    dirtyState: false,
                  },
                  clientId: {
                    value: serverFormData.clientId.value,
                    dirtyState: false,
                  },
                  OAuth2: {
                    value: serverFormData.OAuth2.value,
                    dirtyState: false,
                  },
                  host: { value: selectedHost, dirtyState: false },
                  remoteHost: { value: "", dirtyState: false },
                };

                let filename = "x:server.yml";
                let data = "";
                if (agentFormData.ecVersion.value == "v1.hokkaido.212") {
                  data =
                    "ec-config:\n  conf:\n    mod: " +
                    serverFormData.mode.toLowerCase() +
                    "\n    grp: " +
                    serverFormData.group.value +
                    "\n  hst: " +
                    serverFormData.host.value +
                    "\n    dbg: " +
                    agentFormData.debugMode.value +
                    "\n    cid: " +
                    serverFormData.clientId.value +
                    "\n   oa2: " +
                    serverFormData.OAuth2.value +
                    "\n   rht: " +
                    serverFormData.remoteHost.value;
                } else {
                  data =
                    "ec-config:\n  conf:\n    mod: " +
                    serverFormData.mode.toLowerCase() +
                    "\n    grp: " +
                    serverFormData.group.value +
                    "\n    hst: " +
                    serverFormData.host.value +
                    "\n    dbg: " +
                    agentFormData.debugMode.value +
                    "\n    cid: " +
                    serverFormData.clientId.value +
                    "\n    oa2: " +
                    serverFormData.OAuth2.value +
                    "\n  rht: " +
                    serverFormData.remoteHost.value;
                }

                let blob = new Blob([data], { type: "text/yml" });
                if (window.navigator.msSaveOrOpenBlob) {
                  window.navigator.msSaveBlob(blob, filename);
                } else {
                  let elem = window.document.createElement("a");
                  elem.href = window.URL.createObjectURL(blob);
                  elem.download = filename;
                  document.body.appendChild(elem);
                  elem.click();
                  document.body.removeChild(elem);
                }

                this.setState({
                  xserverForm: serverForm,
                  xserverFormIsValid: false,
                });
              }, 2000);
            });
          } else {
            this.props.showGlobalMessage(
              true,
              true,
              "Please try after sometime",
              "custom-danger"
            );
            setTimeout(() => {
              this.props.hideGlobalMessage();
            }, 2000);
          }
        })
        .catch((err) => {
          console.log(err);
          this.props.showGlobalMessage(
            true,
            true,
            "Please try after sometime",
            "custom-danger"
          );
          setTimeout(() => {
            this.props.hideGlobalMessage();
          }, 2000);
        });
    } else if (type === "x:client") {
      let xClientFormData = Object.assign({}, this.state.xclientForm);
      prepareData.mod = xClientFormData.mode.toLowerCase();
      prepareData.dbg = agentFormData.debugMode.value;
      prepareData.ecVersion = agentFormData.ecVersion.value;
      prepareData.grp = xClientFormData.group.value;
      prepareData.cid = xClientFormData.clientId.value;
      prepareData.oa2 = xClientFormData.OAuth2.value;
      prepareData.hst = xClientFormData.host.value;
      prepareData.cps = 0;
      prepareData.rht = xClientFormData.remoteHost.value;
      prepareData.parent = "65c77c4f-fdf4-4c6d-a703-48b12cc21b2d";
      prepareData.name = "server";

      fetch(this.props.baseUrl + "generateXCLIENTScript", {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: this.props.authToken,
        },
        body: JSON.stringify(prepareData),
      })
        .then((response) => {
          if (response.status === 200) {
            response.json().then((respData) => {
              /* if(respData.errorStatus.status == 'ok'){ */
              sessionStorage.setItem("ServerData", JSON.stringify(prepareData));
              this.props.hideGlobalMessage();
              // this.props.showModal(modalHeading, respData.data, buttons);
              setTimeout(() => {
                let selectedHost = "";
                if (this.state.gateways.length > 0) {
                  selectedHost = this.state.gateways[0].id;
                }
                let XClientForm = {
                  mode: "X:CLIENT",
                  group: {
                    value: xClientFormData.group.value,
                    dirtyState: false,
                  },
                  clientId: {
                    value: xClientFormData.clientId.value,
                    dirtyState: false,
                  },
                  OAuth2: {
                    value: xClientFormData.OAuth2.value,
                    dirtyState: false,
                  },
                  host: { value: selectedHost, dirtyState: false },
                  remoteHost: { value: "", dirtyState: false },
                };

                let filename = "x:client.yml";
                let data = "";
                if (agentFormData.ecVersion.value == "v1.hokkaido.212") {
                  data =
                    "ec-config:\n  conf:\n    mod: " +
                    xClientFormData.mode.toLowerCase() +
                    "\n    grp: " +
                    xClientFormData.group.value +
                    "\n  hst: " +
                    xClientFormData.host.value +
                    "\n    dbg: " +
                    agentFormData.debugMode.value +
                    "\n    cid: " +
                    xClientFormData.clientId.value +
                    "\n   oa2: " +
                    xClientFormData.OAuth2.value +
                    "\n   rht: " +
                    xClientFormData.remoteHost.value;
                } else {
                  data =
                    "ec-config:\n  conf:\n    mod: " +
                    xClientFormData.mode.toLowerCase() +
                    "\n    grp: " +
                    xClientFormData.group.value +
                    "\n    hst: " +
                    xClientFormData.host.value +
                    "\n    dbg: " +
                    agentFormData.debugMode.value +
                    "\n    cid: " +
                    xClientFormData.clientId.value +
                    "\n    oa2: " +
                    xClientFormData.OAuth2.value +
                    "\n  rht: " +
                    xClientFormData.remoteHost.value;
                }

                let blob = new Blob([data], { type: "text/yml" });
                if (window.navigator.msSaveOrOpenBlob) {
                  window.navigator.msSaveBlob(blob, filename);
                } else {
                  let elem = window.document.createElement("a");
                  elem.href = window.URL.createObjectURL(blob);
                  elem.download = filename;
                  document.body.appendChild(elem);
                  elem.click();
                  document.body.removeChild(elem);
                }

                this.setState({
                  xClientFormData: XClientForm,
                  xclientFormIsValid: false,
                });
              }, 2000);
            });
          } else {
            this.props.showGlobalMessage(
              true,
              true,
              "Please try after sometime",
              "custom-danger"
            );
            setTimeout(() => {
              this.props.hideGlobalMessage();
            }, 2000);
          }
        })
        .catch((err) => {
          console.log(err);
          this.props.showGlobalMessage(
            true,
            true,
            "Please try after sometime",
            "custom-danger"
          );
          setTimeout(() => {
            this.props.hideGlobalMessage();
          }, 2000);
        });
    } else if (type === "client") {
      let clientFormData = this.state.clientForm;
      prepareData.mod = clientFormData.mode;
      prepareData.dbg = agentFormData.debugMode.value;
      prepareData.gatewayId = agentFormData.gateway.value;
      prepareData.aid = clientFormData.agentId.value;
      prepareData.cid = clientFormData.clientId.value;
      prepareData.tid = clientFormData.targetId.value;
      prepareData.grp = clientFormData.group.value;
      //prepareData.cid = clientFormData.uaaClientId.value;
      prepareData.csc = clientFormData.clientSecret.value;
      prepareData.dur = parseInt(clientFormData.duration.value);
      prepareData.cps = 0;
      prepareData.oa2 = clientFormData.OAuth2.value;
      prepareData.hst = clientFormData.host.value;
      prepareData.lpt = clientFormData.localPort.value;
      prepareData.tid = clientFormData.targetId.value;
      prepareData.proxy = clientFormData.proxy.value;
      prepareData.plg = clientFormData.allowPlugIn.value;
      for (let statePlugIn of this.state.plugIns) {
        if (clientFormData.plugIn.value.indexOf(statePlugIn.id) !== -1) {
          prepareData[statePlugIn.id] = true;
        } else {
          prepareData[statePlugIn.id] = false;
        }
      }
      console.log(prepareData);

      fetch(
        this.props.baseUrl +
          "/updateClient?gateway_id=" +
          prepareData.gatewayId +
          "&user_id=" +
          this.props.userId +
          "&client_id=" +
          prepareData.cid,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: this.props.authToken,
          },
          body: JSON.stringify(prepareData),
        }
      )
        .then((response) => {
          if (response.status === 200) {
            response.json().then((respData) => {
              if (respData.errorStatus.status == "ok") {
                this.props.handleDataTable(true);
                this.props.showGlobalMessage(
                  true,
                  true,
                  "Record updated successfully",
                  "custom-success"
                );

                let filename = "client.yml";
                let data =
                  "ec-config: \n\tconf: \n\t\tmod: " +
                  clientFormData.mode.toLowerCase() +
                  "\n\t\taid: " +
                  clientFormData.agentId.value +
                  " \n\t\ttid: " +
                  clientFormData.targetId.value +
                  " \n\t\tsst: " +
                  " \n\t\thst: " +
                  clientFormData.host.value +
                  " \n\t\tcid: " +
                  clientFormData.clientId.value +
                  " \n\t\tcsc: " +
                  clientFormData.clientSecret.value +
                  " \n\t\toa2: " +
                  clientFormData.OAuth2.value +
                  " \n\t\tdur: " +
                  clientFormData.duration.value +
                  " \n\t\tdbg: " +
                  agentFormData.debugMode.value +
                  " \n\t\tgrp: " +
                  clientFormData.group.value +
                  " \n\t\tlpt: " +
                  clientFormData.localPort.value +
                  " \n\t\tfup: " +
                  "" +
                  " \n\t\tfdw: " +
                  "" +
                  " \n\t\tcps: " +
                  0 +
                  " \n\t\tplg: " +
                  clientFormData.allowPlugIn.value +
                  " \n\t\tvln: " +
                  prepareData.vln +
                  " \n\t\ttls: " +
                  prepareData.tls;
                let blob = new Blob([data], { type: "text/yml" });
                if (window.navigator.msSaveOrOpenBlob) {
                  window.navigator.msSaveBlob(blob, filename);
                } else {
                  let elem = window.document.createElement("a");
                  elem.href = window.URL.createObjectURL(blob);
                  elem.download = filename;
                  document.body.appendChild(elem);
                  elem.click();
                  document.body.removeChild(elem);
                }

                setTimeout(() => {
                  this.props.hideGlobalMessage();
                }, 2000);
              } else {
                this.props.showGlobalMessage(
                  true,
                  true,
                  respData.errorStatus.statusMsg,
                  "custom-danger"
                );
                setTimeout(() => {
                  this.props.hideGlobalMessage();
                }, 2000);
              }
            });
          } else {
            this.props.showGlobalMessage(
              true,
              true,
              "Ooops! there is some error",
              "custom-danger"
            );
            setTimeout(() => {
              this.props.hideGlobalMessage();
            }, 2000);
          }
        })
        .catch((err) => {
          console.log(err);
          this.props.showGlobalMessage(
            true,
            true,
            "Please try after sometime",
            "custom-danger"
          );
          setTimeout(() => {
            this.props.hideGlobalMessage();
          }, 2000);
        });
    }
  }

  /* istanbul ignore next */
  handleAgentFormData(e) {
    let fieldName = e.target.name;
    let updatedValue =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    let currentAgentForm = Object.assign({}, this.state.agentForm);

    if (fieldName === "gateway") {
      currentAgentForm.gateway.value = updatedValue;
      currentAgentForm.gateway.dirtyState = true;
    } else if (fieldName === "debugMode") {
      currentAgentForm.debugMode.value = updatedValue;
      currentAgentForm.debugMode.dirtyState = true;
    }

    this.setState({
      agentForm: currentAgentForm,
    });
  }

  /* istanbul ignore next */
  handleClientFormData(e) {
    let fieldName = e.target.name;
    let updatedValue =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    let currentClientForm = Object.assign({}, this.state.clientForm);

    if (fieldName === "agentId") {
      if (updatedValue.length > 6) {
        updatedValue = currentClientForm.agentId.value;
      }
      currentClientForm.agentId.value = updatedValue;
      currentClientForm.agentId.dirtyState = true;
    } else if (fieldName === "group") {
      currentClientForm.group.value = updatedValue;
      currentClientForm.group.dirtyState = true;
    } else if (fieldName === "clientId") {
      currentClientForm.clientId.value = updatedValue;
      currentClientForm.clientId.dirtyState = true;
    } else if (fieldName === "clientSecret") {
      currentClientForm.clientSecret.value = updatedValue;
      currentClientForm.clientSecret.dirtyState = true;
    } else if (fieldName === "duration") {
      let durationAfterValidityCheck = e.target.validity.valid
        ? updatedValue
        : currentClientForm.duration.value;
      if (durationAfterValidityCheck.length > 4) {
        durationAfterValidityCheck = currentClientForm.duration.value;
      }
      currentClientForm.duration.value = durationAfterValidityCheck;
      currentClientForm.duration.dirtyState = true;
    } else if (fieldName === "OAuth2") {
      currentClientForm.OAuth2.value = updatedValue;
      currentClientForm.OAuth2.dirtyState = true;
    } else if (fieldName === "host") {
      currentClientForm.host.value = updatedValue;
      currentClientForm.host.dirtyState = true;
    } else if (fieldName === "localPort") {
      let localPortAfterValidityCheck = e.target.validity.valid
        ? updatedValue
        : currentClientForm.localPort.value;
      if (localPortAfterValidityCheck.length > 4) {
        localPortAfterValidityCheck = currentClientForm.localPort.value;
      }
      currentClientForm.localPort.value = localPortAfterValidityCheck;
      currentClientForm.localPort.dirtyState = true;
    } else if (fieldName === "targetId") {
      if (updatedValue.length > 6) {
        updatedValue = currentClientForm.targetId.value;
      }
      currentClientForm.targetId.value = updatedValue;
      currentClientForm.targetId.dirtyState = true;
    } else if (fieldName === "proxy") {
      currentClientForm.proxy.value = updatedValue;
      currentClientForm.proxy.dirtyState = true;
    } else if (fieldName === "allowPlugIn") {
      currentClientForm.allowPlugIn.value = updatedValue;
      currentClientForm.allowPlugIn.dirtyState = true;
    } else if (fieldName === "plugIn") {
      let options = e.target.options;
      let value = [];
      for (let i = 0, l = options.length; i < l; i++) {
        if (options[i].selected) {
          value.push(options[i].value);
        }
      }
      currentClientForm.plugIn.value = value;
      currentClientForm.plugIn.dirtyState = true;
    }

    this.setState({
      clientForm: currentClientForm,
    });

    this.handleClientFormValidation();
  }

  /* istanbul ignore next */
  handleClientFormValidation() {
    let currentFormData = this.state.clientForm;
    let agentIdValue = currentFormData.agentId.value;
    let agentIdDirtyState = currentFormData.agentId.dirtyState;
    let groupValue = currentFormData.group.value;
    let groupDirtyState = currentFormData.group.dirtyState;
    let clientIdValue = currentFormData.clientId.value;
    let clientIdDirtyState = currentFormData.clientId.dirtyState;
    let clientSecretValue = currentFormData.clientSecret.value;
    let clientSecretDirtyState = currentFormData.clientSecret.dirtyState;
    let durationValue = currentFormData.duration.value;
    let durationDirtyState = currentFormData.duration.dirtyState;
    let OAuth2Value = currentFormData.OAuth2.value;
    let OAuth2DirtyState = currentFormData.OAuth2.dirtyState;
    let hostValue = currentFormData.host.value;
    let hostDirtyState = currentFormData.host.dirtyState;
    let localPortValue = currentFormData.localPort.value;
    let localPortDirtyState = currentFormData.localPort.dirtyState;
    let targetIdValue = currentFormData.targetId.value;
    let targetIdDirtyState = currentFormData.targetId.dirtyState;
    let allowPlugInValue = currentFormData.allowPlugIn.value;
    let plugInValue = currentFormData.plugIn.value;
    let plugInDirtyState = currentFormData.plugIn.dirtyState;
    let formIsValid = true;
    let errors = {};
    let urlRegExp =
      /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;

    if (agentIdValue.trim() === "") {
      if (agentIdDirtyState) {
        errors.agentId = "Please enter Agent Id";
      }
      formIsValid = false;
    }

    if (groupValue.trim() === "") {
      if (groupDirtyState) {
        errors.group = "Please enter Group";
      }
      formIsValid = false;
    }

    if (clientIdValue.trim() === "") {
      if (clientIdDirtyState) {
        errors.clientId = "Please enter Client Id";
      }
      formIsValid = false;
    }

    if (clientSecretValue.trim() === "") {
      if (clientSecretDirtyState) {
        errors.clientSecret = "Please enter Client Secret";
      }
      formIsValid = false;
    }

    if (durationValue === "") {
      if (durationDirtyState) {
        errors.duration = "Please enter Duration in digit";
      }
      formIsValid = false;
    } else if (durationValue < 1200) {
      if (durationDirtyState) {
        errors.duration = "Duration at least 1200";
      }
      formIsValid = false;
    }

    if (OAuth2Value.trim() === "") {
      if (OAuth2DirtyState) {
        errors.OAuth2 = "Please enter OAuth2";
      }
      formIsValid = false;
    } else if (!urlRegExp.test(OAuth2Value)) {
      if (OAuth2DirtyState) {
        errors.OAuth2 = "Please enter valid URL";
      }
      formIsValid = false;
    }

    if (hostValue.trim() === "") {
      if (hostDirtyState) {
        errors.host = "Please enter Host";
      }
      formIsValid = false;
    } else if (
      hostValue.substr(0, 6) != "wss://" &&
      hostValue.substr(0, 5) != "ws://"
    ) {
      if (hostDirtyState) {
        errors.host = "Host starts with wss:// or ws://";
      }
      formIsValid = false;
    } else if (hostValue.substr(hostValue.length - 6, 6) != "/agent") {
      if (hostDirtyState) {
        errors.host = "Host ends with /agent";
      }
      formIsValid = false;
    }

    if (localPortValue.trim() === "") {
      if (localPortDirtyState) {
        errors.localPort = "Please enter Local Port in digit";
      }
      formIsValid = false;
    } else if (localPortValue.length != 4) {
      if (localPortDirtyState) {
        errors.localPort = "Local Port must have 4 digit";
      }
      formIsValid = false;
    }

    if (targetIdValue.trim() === "") {
      if (targetIdDirtyState) {
        errors.targetId = "Please enter Target Id";
      }
      formIsValid = false;
    } else if (targetIdValue.length < 6) {
      if (targetIdDirtyState) {
        errors.targetId = "Target Id must have 6 character";
      }
      formIsValid = false;
    }

    if (allowPlugInValue) {
      if (plugInValue.length === 0) {
        if (plugInDirtyState) {
          errors.plugIn = "Please select Plug-In";
        }
        formIsValid = false;
      }
    }

    this.setState({
      clientFormIsValid: formIsValid,
      errorsClientForm: errors,
    });
  }

  /* istanbul ignore next */
  handleServerFormData(e) {
    let fieldName = e.target.name;
    let updatedValue =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    let currentServerForm = Object.assign({}, this.state.serverForm);

    if (fieldName === "agentId") {
      if (updatedValue.length > 6) {
        updatedValue = currentServerForm.agentId.value;
      }
      currentServerForm.agentId.value = updatedValue;
      currentServerForm.agentId.dirtyState = true;
    } else if (fieldName === "group") {
      currentServerForm.group.value = updatedValue;
      currentServerForm.group.dirtyState = true;
    } else if (fieldName === "clientId") {
      currentServerForm.clientId.value = updatedValue;
      currentServerForm.clientId.dirtyState = true;
    } else if (fieldName === "clientSecret") {
      currentServerForm.clientSecret.value = updatedValue;
      currentServerForm.clientSecret.dirtyState = true;
    } else if (fieldName === "duration") {
      let durationAfterValidityCheck = e.target.validity.valid
        ? updatedValue
        : currentServerForm.duration.value;
      if (durationAfterValidityCheck.length > 4) {
        durationAfterValidityCheck = currentServerForm.duration.value;
      }
      currentServerForm.duration.value = durationAfterValidityCheck;
      currentServerForm.duration.dirtyState = true;
    } else if (fieldName === "OAuth2") {
      currentServerForm.OAuth2.value = updatedValue;
      currentServerForm.OAuth2.dirtyState = true;
    } else if (fieldName === "host") {
      currentServerForm.host.value = updatedValue;
      currentServerForm.host.dirtyState = true;
    } else if (fieldName === "zone") {
      if (updatedValue.length > 36) {
        updatedValue = currentServerForm.zone.value;
      }
      currentServerForm.zone.value = updatedValue;
      currentServerForm.zone.dirtyState = true;
    } else if (fieldName === "serviceUrl") {
      currentServerForm.serviceUrl.value = updatedValue;
      currentServerForm.serviceUrl.dirtyState = true;
    } else if (fieldName === "remoteHost") {
      currentServerForm.remoteHost.value = updatedValue;
      currentServerForm.remoteHost.dirtyState = true;
    } else if (fieldName === "remotePort") {
      let remotePortAfterValidityCheck = e.target.validity.valid
        ? updatedValue
        : currentServerForm.remotePort.value;
      if (remotePortAfterValidityCheck.length > 4) {
        remotePortAfterValidityCheck = currentServerForm.remotePort.value;
      }
      currentServerForm.remotePort.value = remotePortAfterValidityCheck;
      currentServerForm.remotePort.dirtyState = true;
    } else if (fieldName === "proxy") {
      currentServerForm.proxy.value = updatedValue;
      currentServerForm.proxy.dirtyState = true;
    } else if (fieldName === "allowPlugIn") {
      currentServerForm.allowPlugIn.value = updatedValue;
      currentServerForm.allowPlugIn.dirtyState = true;
    } else if (fieldName === "plugIn") {
      let options = e.target.options;
      let value = [];
      for (let i = 0, l = options.length; i < l; i++) {
        if (options[i].selected) {
          value.push(options[i].value);
        }
      }
      currentServerForm.plugIn.value = value;
      currentServerForm.plugIn.dirtyState = true;
    }

    this.setState({
      serverForm: currentServerForm,
    });

    this.handleServerFormValidation();
  }

  /* istanbul ignore next */
  handleServerFormValidation() {
    let currentFormData = this.state.serverForm;
    let agentIdValue = currentFormData.agentId.value;
    let agentIdDirtyState = currentFormData.agentId.dirtyState;
    let groupValue = currentFormData.group.value;
    let groupDirtyState = currentFormData.group.dirtyState;
    let clientIdValue = currentFormData.clientId.value;
    let clientIdDirtyState = currentFormData.clientId.dirtyState;
    let clientSecretValue = currentFormData.clientSecret.value;
    let clientSecretDirtyState = currentFormData.clientSecret.dirtyState;
    let durationValue = currentFormData.duration.value;
    let durationDirtyState = currentFormData.duration.dirtyState;
    let OAuth2Value = currentFormData.OAuth2.value;
    let OAuth2DirtyState = currentFormData.OAuth2.dirtyState;
    let hostValue = currentFormData.host.value;
    let hostDirtyState = currentFormData.host.dirtyState;
    let zoneValue = currentFormData.zone.value;
    let zoneDirtyState = currentFormData.zone.dirtyState;
    let serviceUrlValue = currentFormData.serviceUrl.value;
    let serviceUrlDirtyState = currentFormData.serviceUrl.dirtyState;
    let remoteHostValue = currentFormData.remoteHost.value;
    let remoteHostDirtyState = currentFormData.remoteHost.dirtyState;
    let remotePortValue = currentFormData.remotePort.value;
    let remotePortDirtyState = currentFormData.remotePort.dirtyState;
    let allowPlugInValue = currentFormData.allowPlugIn.value;
    let allowPlugInDirtyState = currentFormData.allowPlugIn.dirtyState;
    let plugInValue = currentFormData.plugIn.value;
    let plugInDirtyState = currentFormData.plugIn.dirtyState;
    let formIsValid = true;
    let errors = {};
    let urlRegExp =
      /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;

    if (agentIdValue.trim() === "") {
      if (agentIdDirtyState) {
        errors.agentId = "Please enter Agent Id";
      }
      formIsValid = false;
    } else if (agentIdValue.length < 6) {
      if (agentIdDirtyState) {
        errors.agentId = "Agent Id must have 6 character";
      }
      formIsValid = false;
    }

    if (groupValue.trim() === "") {
      if (groupDirtyState) {
        errors.group = "Please enter Group";
      }
      formIsValid = false;
    }

    if (clientIdValue.trim() === "") {
      if (clientIdDirtyState) {
        errors.clientId = "Please enter Client Id";
      }
      formIsValid = false;
    }

    if (clientSecretValue.trim() === "") {
      if (clientSecretDirtyState) {
        errors.clientSecret = "Please enter Client Secret";
      }
      formIsValid = false;
    }

    if (durationValue === "") {
      if (durationDirtyState) {
        errors.duration = "Please enter Duration in digit";
      }
      formIsValid = false;
    } else if (durationValue < 1200) {
      if (durationDirtyState) {
        errors.duration = "Duration at least 1200";
      }
      formIsValid = false;
    }

    if (OAuth2Value.trim() === "") {
      if (OAuth2DirtyState) {
        errors.OAuth2 = "Please enter OAuth2";
      }
      formIsValid = false;
    } else if (!urlRegExp.test(OAuth2Value)) {
      if (OAuth2DirtyState) {
        errors.OAuth2 = "Please enter valid URL";
      }
      formIsValid = false;
    }

    if (hostValue.trim() === "") {
      if (hostDirtyState) {
        errors.host = "Please enter Host";
      }
      formIsValid = false;
    } else if (
      hostValue.substr(0, 6) != "wss://" &&
      hostValue.substr(0, 5) != "ws://"
    ) {
      if (hostDirtyState) {
        errors.host = "Host starts with wss:// or ws://";
      }
      formIsValid = false;
    } else if (hostValue.substr(hostValue.length - 6, 6) != "/agent") {
      if (hostDirtyState) {
        errors.host = "Host ends with /agent";
      }
      formIsValid = false;
    }

    if (zoneValue.trim() === "") {
      if (zoneDirtyState) {
        errors.zone = "Please enter Zone";
      }
      formIsValid = false;
    } else if (zoneValue.length < 36) {
      if (zoneDirtyState) {
        errors.zone = "Zone must have 36 character";
      }
      formIsValid = false;
    }

    if (serviceUrlValue.trim() === "") {
      if (serviceUrlDirtyState) {
        errors.serviceUrl = "Please enter Service-Url";
      }
      formIsValid = false;
    } else if (!urlRegExp.test(serviceUrlValue)) {
      if (serviceUrlDirtyState) {
        errors.serviceUrl = "Please enter valid URL";
      }
      formIsValid = false;
    }

    if (remoteHostValue.trim() === "") {
      if (remoteHostDirtyState) {
        errors.remoteHost = "Please enter Remote Host";
      }
      formIsValid = false;
    }

    if (remotePortValue.trim() === "") {
      if (remotePortDirtyState) {
        errors.remotePort = "Please enter Remote Port in digit";
      }
      formIsValid = false;
    } else if (remotePortValue.length != 4) {
      if (remotePortDirtyState) {
        errors.remotePort = "Remote Port must have 4 digit";
      }
      formIsValid = false;
    }

    if (allowPlugInValue) {
      if (plugInValue.length === 0) {
        if (plugInDirtyState) {
          errors.plugIn = "Please select Plug-In";
        }
        formIsValid = false;
      }
    }

    this.setState({
      serverFormIsValid: formIsValid,
      errorsServerForm: errors,
    });
  }

  /* istanbul ignore next */
  copyFromXServerToXClient() {
    let currentServerForm = Object.assign({}, this.state.xserverForm);
    let currentClientForm = Object.assign({}, this.state.xclientForm);

    currentClientForm.group.value = currentServerForm.group.value;
    currentClientForm.clientId.value = currentServerForm.clientId.value;
    currentClientForm.OAuth2.value = currentServerForm.OAuth2.value;
    currentClientForm.host.value = currentServerForm.host.value;

    this.setState({
      xclientForm: currentClientForm,
    });

    this.props.showGlobalMessage(
      false,
      true,
      "Data copied from x:server",
      "custom-success"
    );
    setTimeout(() => {
      this.props.hideGlobalMessage();
    }, 2000);
    this.handleXClientFormValidation();
  }

  /* istanbul ignore next */
  copyFromXClientToXServer() {
    let currentClientForm = Object.assign({}, this.state.xclientForm);
    let currentServerForm = Object.assign({}, this.state.xserverForm);

    currentServerForm.group.value = currentClientForm.group.value;
    currentServerForm.clientId.value = currentClientForm.clientId.value;
    currentServerForm.OAuth2.value = currentClientForm.OAuth2.value;
    currentServerForm.host.value = currentClientForm.host.value;

    this.setState({
      xserverForm: currentServerForm,
    });

    this.props.showGlobalMessage(
      false,
      true,
      "Data copied from x:client",
      "custom-success"
    );
    setTimeout(() => {
      this.props.hideGlobalMessage();
    }, 2000);
    this.handleXServerFormValidation();
  }

  /* istanbul ignore next */
  handleXServerFormData(e) {
    let fieldName = e.target.name;
    let updatedValue =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    let currentServerForm = Object.assign({}, this.state.xserverForm);

    if (fieldName === "group") {
      currentServerForm.group.value = updatedValue;
      currentServerForm.group.dirtyState = true;
      //  this.changeAidForServer(updatedValue);
    } else if (fieldName === "clientId") {
      currentServerForm.clientId.value = updatedValue;
      currentServerForm.clientId.dirtyState = true;
    } else if (fieldName === "OAuth2") {
      currentServerForm.OAuth2.value = updatedValue;
      currentServerForm.OAuth2.dirtyState = true;
    } else if (fieldName === "host") {
      currentServerForm.host.value = updatedValue;
      currentServerForm.host.dirtyState = true;
    } else if (fieldName === "remoteHost") {
      currentServerForm.remoteHost.value = updatedValue;
      currentServerForm.remoteHost.dirtyState = true;
    }

    this.setState({
      xserverForm: currentServerForm,
    });

    this.handleXServerFormValidation();
  }

  /* istanbul ignore next */
  handleXServerFormValidation() {
    let currentFormData = this.state.xserverForm;

    let groupValue = currentFormData.group.value;
    let groupDirtyState = currentFormData.group.dirtyState;
    let clientIdValue = currentFormData.clientId.value;
    let clientIdDirtyState = currentFormData.clientId.dirtyState;
    let OAuth2Value = currentFormData.OAuth2.value;
    let OAuth2DirtyState = currentFormData.OAuth2.dirtyState;
    let hostValue = currentFormData.host.value;
    let hostDirtyState = currentFormData.host.dirtyState;
    let remoteHostValue = currentFormData.remoteHost.value;
    let remoteHostDirtyState = currentFormData.remoteHost.dirtyState;
    let formIsValid = true;
    let errors = {};
    let urlRegExp =
      /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;

    if (groupValue.trim() === "") {
      if (groupDirtyState) {
        errors.group = "Please enter Group";
      }
      formIsValid = false;
    }

    if (clientIdValue.trim() === "") {
      if (clientIdDirtyState) {
        errors.clientId = "Please enter Client Id";
      }
      formIsValid = false;
    }

    if (remoteHostValue.trim() === "") {
      if (remoteHostDirtyState) {
        errors.remoteHost = "Please enter Remote Host";
      }
      formIsValid = false;
    }
    if (OAuth2Value.trim() === "") {
      if (OAuth2DirtyState) {
        errors.OAuth2 = "Please enter OAuth2";
      }
      formIsValid = false;
    } else if (!urlRegExp.test(OAuth2Value)) {
      if (OAuth2DirtyState) {
        errors.OAuth2 = "Please enter valid URL";
      }
      formIsValid = false;
    }

    this.setState({
      xserverFormIsValid: formIsValid,
      errorsXServerForm: errors,
    });
  }

  /* istanbul ignore next */
  handleXClientFormData(e) {
    let fieldName = e.target.name;
    let updatedValue =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    let currentServerForm = Object.assign({}, this.state.xclientForm);

    if (fieldName === "group") {
      currentServerForm.group.value = updatedValue;
      currentServerForm.group.dirtyState = true;
      //  this.changeAidForServer(updatedValue);
    } else if (fieldName === "clientId") {
      currentServerForm.clientId.value = updatedValue;
      currentServerForm.clientId.dirtyState = true;
    } else if (fieldName === "OAuth2") {
      currentServerForm.OAuth2.value = updatedValue;
      currentServerForm.OAuth2.dirtyState = true;
    } else if (fieldName === "host") {
      currentServerForm.host.value = updatedValue;
      currentServerForm.host.dirtyState = true;
    } else if (fieldName === "remoteHost") {
      currentServerForm.remoteHost.value = updatedValue;
      currentServerForm.remoteHost.dirtyState = true;
    }

    this.setState({
      xclientForm: currentServerForm,
    });

    this.handleXClientFormValidation();
  }

  /* istanbul ignore next */
  handleXClientFormValidation() {
    let currentFormData = this.state.xclientForm;

    let groupValue = currentFormData.group.value;
    let groupDirtyState = currentFormData.group.dirtyState;
    let clientIdValue = currentFormData.clientId.value;
    let clientIdDirtyState = currentFormData.clientId.dirtyState;
    let OAuth2Value = currentFormData.OAuth2.value;
    let OAuth2DirtyState = currentFormData.OAuth2.dirtyState;
    let hostValue = currentFormData.host.value;
    let hostDirtyState = currentFormData.host.dirtyState;
    let remoteHostValue = currentFormData.remoteHost.value;
    let remoteHostDirtyState = currentFormData.remoteHost.dirtyState;
    let formIsValid = true;
    let errors = {};
    let urlRegExp =
      /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;

    if (groupValue.trim() === "") {
      if (groupDirtyState) {
        errors.group = "Please enter Group";
      }
      formIsValid = false;
    }

    if (clientIdValue.trim() === "") {
      if (clientIdDirtyState) {
        errors.clientId = "Please enter Client Id";
      }
      formIsValid = false;
    }

    if (remoteHostValue.trim() === "") {
      if (remoteHostDirtyState) {
        errors.remoteHost = "Please enter Remote Host";
      }
      formIsValid = false;
    }
    if (OAuth2Value.trim() === "") {
      if (OAuth2DirtyState) {
        errors.OAuth2 = "Please enter OAuth2";
      }
      formIsValid = false;
    } else if (!urlRegExp.test(OAuth2Value)) {
      if (OAuth2DirtyState) {
        errors.OAuth2 = "Please enter valid URL";
      }
      formIsValid = false;
    }

    this.setState({
      xclientFormIsValid: formIsValid,
      errorsXClientForm: errors,
    });
  }

  render() {
    /* jshint ignore:start */
    /* istanbul ignore next */
    return (
      <div className="row Maintainagentcreate">
        <div className="col-md-12 mt-2">
          <div className="row">
            <div className="text-left">
              <ul className="breadcrumb">
                <li className="breadcrumb-item active">Maintain</li>
                <li className="breadcrumb-item active">Edit Agent</li>
              </ul>
            </div>
          </div>
          <div className="centered-div">
            <div className="centered-div-header">
              <div className="row maintainagentcreate-header">
                <div className="col-md-12">
                  <h6>
                    Edit Agent <small>Creating parameters.</small>
                  </h6>
                </div>
              </div>
              <hr></hr>
              <div className="row form-body">
                <div className="col-sm-4">
                  <h6>Agent Mode</h6>
                  <div className="col-sm-12 mb-2">
                    {this.state.agentModeButtons.map(
                      (agentModeButton, buttonIndex) => {
                        return agentModeButton.value ==
                          this.state.agentForm.agentMode.value ? (
                          <button
                            key={"agentModeButton" + buttonIndex}
                            type="button"
                            name="agentMode"
                            className={
                              agentModeButton.value ==
                              this.state.agentForm.agentMode.value
                                ? "btn btn-sm mr-2 btn-selected"
                                : "btn btn-sm mr-2 btn-deselected"
                            }
                            onClick={this.handleChangeAgentMode.bind(
                              this,
                              agentModeButton.value
                            )}
                            disabled={
                              agentModeButton.value !=
                              this.state.agentForm.agentMode.value
                            }
                          >
                            {agentModeButton.text}
                          </button>
                        ) : null;
                      }
                    )}
                  </div>
                </div>
                <div className="col-sm-4">
                  <h6>&nbsp;</h6>
                  <div className="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      className="custom-control-input custom-control-checkbox"
                      id="debugMode"
                      name="debugMode"
                      checked={this.state.agentForm.debugMode.value}
                      onChange={(event) => {
                        this.handleAgentFormData(event);
                      }}
                    />
                    <label className="custom-control-label" htmlFor="debugMode">
                      <small className="theme-color">
                        <strong>DEBUG MODE ENABLED</strong>
                      </small>
                    </label>
                  </div>
                </div>
                {this.state.agentForm.agentMode.value != 1 ? (
                  <div className="col-sm-3">
                    <h6>&nbsp;</h6>
                    <select
                      className="form-control form-control-sm"
                      name="gateway"
                      value={this.state.agentForm.gateway.value}
                      onChange={(event) => {
                        this.handleAgentFormData(event);
                      }}
                    >
                      {this.state.gateways.map((gateway, gatewayIndex) => {
                        return (
                          <option
                            key={"gatewayOption" + gatewayIndex}
                            value={gateway.gatewayId}
                          >
                            {gateway.gatewayId}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                ) : null}
              </div>
              <hr></hr>
              {this.state.agentForm.agentMode.value == 2 ? (
                <div className="changeable-form server-form">
                  <div className="row">
                    <div className="col-sm-3">
                      <div className="col-sm-12 label required">
                        Mode <img alt="down-arrow" src={IconGreenSortingDown} />
                      </div>
                      <div className="col-sm-12 mb-2">
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          name="mode"
                          disabled={true}
                          defaultValue={this.state.serverForm.mode}
                        />
                      </div>
                    </div>
                    <div className="col-sm-3">
                      <div className="col-sm-12 label required">
                        Agent ID{" "}
                        <img alt="down-arrow" src={IconGreenSortingDown} />
                      </div>
                      <div className="col-sm-12 mb-2">
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          name="agentId"
                          value={this.state.serverForm.agentId.value}
                          onChange={(event) => {
                            this.handleServerFormData(event);
                          }}
                        />
                        <small className="text-danger">
                          {this.state.errorsServerForm["agentId"]}
                        </small>
                      </div>
                    </div>
                    <div className="col-sm-3">
                      <div className="col-sm-12 label required">
                        Group{" "}
                        <img alt="down-arrow" src={IconGreenSortingDown} />
                      </div>
                      <div className="col-sm-12 mb-2">
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          name="group"
                          value={this.state.serverForm.group.value}
                          onChange={(event) => {
                            this.handleServerFormData(event);
                          }}
                        />
                        <small className="text-danger">
                          {this.state.errorsServerForm["group"]}
                        </small>
                      </div>
                    </div>
                    <div className="col-sm-3">
                      <div className="col-sm-12 label required">
                        Client ID{" "}
                        <img alt="down-arrow" src={IconGreenSortingDown} />
                      </div>
                      <div className="col-sm-12 mb-2">
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          name="clientId"
                          value={this.state.serverForm.clientId.value}
                          onChange={(event) => {
                            this.handleServerFormData(event);
                          }}
                        />
                        <small className="text-danger">
                          {this.state.errorsServerForm["clientId"]}
                        </small>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-sm-3">
                      <div className="col-sm-12 label required">
                        Client Secret{" "}
                        <img alt="down-arrow" src={IconGreenSortingDown} />
                      </div>
                      <div className="col-sm-12 mb-2">
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          name="clientSecret"
                          value={this.state.serverForm.clientSecret.value}
                          onChange={(event) => {
                            this.handleServerFormData(event);
                          }}
                        />
                        <small className="text-danger">
                          {this.state.errorsServerForm["clientSecret"]}
                        </small>
                      </div>
                    </div>
                    <div className="col-sm-3">
                      <div className="col-sm-12 label required">
                        Duration{" "}
                        <img alt="down-arrow" src={IconGreenSortingDown} />
                      </div>
                      <div className="col-sm-12 mb-2">
                        <input
                          type="text"
                          pattern="^[1-9][0-9]*"
                          className="form-control form-control-sm"
                          name="duration"
                          value={this.state.serverForm.duration.value}
                          onChange={(event) => {
                            this.handleServerFormData(event);
                          }}
                        />
                        <small className="text-danger">
                          {this.state.errorsServerForm["duration"]}
                        </small>
                      </div>
                    </div>
                    <div className="col-sm-3">
                      <div className="col-sm-12 label required">
                        OAUTH2{" "}
                        <img alt="down-arrow" src={IconGreenSortingDown} />
                      </div>
                      <div className="col-sm-12 mb-2">
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          name="OAuth2"
                          value={this.state.serverForm.OAuth2.value}
                          onChange={(event) => {
                            this.handleServerFormData(event);
                          }}
                        />
                        <small className="text-danger">
                          {this.state.errorsServerForm["OAuth2"]}
                        </small>
                      </div>
                    </div>
                    <div className="col-sm-3">
                      <div className="col-sm-12 label required">
                        Host <img alt="down-arrow" src={IconGreenSortingDown} />
                      </div>
                      <div className="col-sm-12 mb-2">
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          name="host"
                          value={this.state.serverForm.host.value}
                          onChange={(event) => {
                            this.handleServerFormData(event);
                          }}
                        />
                        <small className="text-danger">
                          {this.state.errorsServerForm["host"]}
                        </small>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-sm-3">
                      <div className="col-sm-12 label required">
                        Zone <img alt="down-arrow" src={IconGreenSortingDown} />
                      </div>
                      <div className="col-sm-12 mb-2">
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          name="zone"
                          value={this.state.serverForm.zone.value}
                          onChange={(event) => {
                            this.handleServerFormData(event);
                          }}
                        />
                        <small className="text-danger">
                          {this.state.errorsServerForm["zone"]}
                        </small>
                      </div>
                    </div>
                    <div className="col-sm-3">
                      <div className="col-sm-12 label required">
                        Service URL{" "}
                        <img alt="down-arrow" src={IconGreenSortingDown} />
                      </div>
                      <div className="col-sm-12 mb-2">
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          name="serviceUrl"
                          value={this.state.serverForm.serviceUrl.value}
                          onChange={(event) => {
                            this.handleServerFormData(event);
                          }}
                        />
                        <small className="text-danger">
                          {this.state.errorsServerForm["serviceUrl"]}
                        </small>
                      </div>
                    </div>
                    <div className="col-sm-3">
                      <div className="col-sm-12 label required">
                        Remote Host{" "}
                        <img alt="down-arrow" src={IconGreenSortingDown} />
                      </div>
                      <div className="col-sm-12 mb-2">
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          name="remoteHost"
                          value={this.state.serverForm.remoteHost.value}
                          onChange={(event) => {
                            this.handleServerFormData(event);
                          }}
                        />
                        <small className="text-danger">
                          {this.state.errorsServerForm["remoteHost"]}
                        </small>
                      </div>
                    </div>
                    <div className="col-sm-3">
                      <div className="col-sm-12 label required">
                        Remote Port{" "}
                        <img alt="down-arrow" src={IconGreenSortingDown} />
                      </div>
                      <div className="col-sm-12 mb-2">
                        <input
                          type="text"
                          pattern="^[1-9][0-9]*"
                          className="form-control form-control-sm"
                          name="remotePort"
                          value={this.state.serverForm.remotePort.value}
                          onChange={(event) => {
                            this.handleServerFormData(event);
                          }}
                        />
                        <small className="text-danger">
                          {this.state.errorsServerForm["remotePort"]}
                        </small>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-sm-3">
                      <div className="col-sm-12 label required">Proxy</div>
                      <div className="col-sm-12 mb-2">
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          name="proxy"
                          value={this.state.serverForm.proxy.value}
                          onChange={(event) => {
                            this.handleServerFormData(event);
                          }}
                        />
                      </div>
                    </div>
                    <div className="col-sm-3">
                      <div className="col-sm-12 label required">
                        Allow Plug-in{" "}
                        <img alt="down-arrow" src={IconGreenSortingDown} />
                      </div>
                      <div className="col-sm-12 mb-2">
                        <div className="custom-control custom-checkbox">
                          <input
                            type="checkbox"
                            className="custom-control-input custom-control-checkbox"
                            id="allowPlugIn"
                            name="allowPlugIn"
                            checked={this.state.serverForm.allowPlugIn.value}
                            onChange={(event) => {
                              this.handleServerFormData(event);
                            }}
                          />
                          <label
                            className="custom-control-label"
                            htmlFor="allowPlugIn"
                          ></label>
                        </div>
                      </div>
                    </div>
                    {this.state.serverForm.allowPlugIn.value ? (
                      <div className="col-sm-3">
                        <div className="col-sm-12 label">
                          Plug-in{" "}
                          <img alt="down-arrow" src={IconGreenSortingDown} />
                        </div>
                        <div className="col-sm-12 mb-2">
                          <select
                            multiple
                            className="form-control form-control-sm"
                            style={{ height: "45px" }}
                            name="plugIn"
                            value={this.state.serverForm.plugIn.value}
                            onChange={(event) => {
                              this.handleServerFormData(event);
                            }}
                          >
                            {this.state.plugIns.map((plugIn, plugInIndex) => {
                              return (
                                <option
                                  key={"plugInOption" + plugInIndex}
                                  value={plugIn.id}
                                >
                                  {plugIn.name}
                                </option>
                              );
                            })}
                          </select>
                          <small className="text-danger">
                            {this.state.errorsServerForm["plugIn"]}
                          </small>
                        </div>
                      </div>
                    ) : null}
                  </div>

                  <div className="col-sm-12 mb-2">
                    <hr></hr>
                  </div>

                  <div className="row">
                    <div className="col-sm-5 mb-2">
                      {/*<img alt="copy" src="assets/static/images/copy.svg" height="15px" />
                                            <a onClick={this.copyFromClientToServer.bind(this)} href="#" className="theme-color cursor-pointer ml-1"><small>Copy details from client</small></a>*/}
                    </div>
                    <div className="col-sm-7 mb-2">
                      <button
                        disabled={!this.state.serverFormIsValid}
                        onClick={this.downloadFile.bind(this, "server")}
                        className="btn btn-sm customize-view-btn"
                      >
                        CREATE SCRIPT
                      </button>
                      <button
                        onClick={this.props.changeView.bind(this)}
                        className="btn btn-sm customize-view-btn ml-2"
                      >
                        BACK
                      </button>
                    </div>
                  </div>
                </div>
              ) : null}

              {this.state.agentForm.agentMode.value == 3 ? (
                <div className="changeable-form client-form">
                  <div className="row">
                    <div className="col-sm-3">
                      <div className="col-sm-12 label required">
                        Mode <img alt="down-arrow" src={IconGreenSortingDown} />
                      </div>
                      <div className="col-sm-12 mb-2">
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          name="mode"
                          disabled={true}
                          defaultValue={this.state.clientForm.mode}
                        />
                      </div>
                    </div>
                    <div className="col-sm-3">
                      <div className="col-sm-12 label required">
                        Agent ID{" "}
                        <img alt="down-arrow" src={IconGreenSortingDown} />
                      </div>
                      <div className="col-sm-12 mb-2">
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          name="agentId"
                          value={this.state.clientForm.agentId.value}
                          onChange={(event) => {
                            this.handleClientFormData(event);
                          }}
                        />
                        <small className="text-danger">
                          {this.state.errorsClientForm["agentId"]}
                        </small>
                      </div>
                    </div>
                    <div className="col-sm-3">
                      <div className="col-sm-12 label required">
                        Group{" "}
                        <img alt="down-arrow" src={IconGreenSortingDown} />
                      </div>
                      <div className="col-sm-12 mb-2">
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          name="group"
                          value={this.state.clientForm.group.value}
                          onChange={(event) => {
                            this.handleClientFormData(event);
                          }}
                        />
                        <small className="text-danger">
                          {this.state.errorsClientForm["group"]}
                        </small>
                      </div>
                    </div>
                    <div className="col-sm-3">
                      <div className="col-sm-12 label required">
                        Client ID{" "}
                        <img alt="down-arrow" src={IconGreenSortingDown} />
                      </div>
                      <div className="col-sm-12 mb-2">
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          name="clientId"
                          value={this.state.clientForm.clientId.value}
                          onChange={(event) => {
                            this.handleClientFormData(event);
                          }}
                        />
                        <small className="text-danger">
                          {this.state.errorsClientForm["clientId"]}
                        </small>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-sm-3">
                      <div className="col-sm-12 label required">
                        Client Secret{" "}
                        <img alt="down-arrow" src={IconGreenSortingDown} />
                      </div>
                      <div className="col-sm-12 mb-2">
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          name="clientSecret"
                          value={this.state.clientForm.clientSecret.value}
                          onChange={(event) => {
                            this.handleClientFormData(event);
                          }}
                        />
                        <small className="text-danger">
                          {this.state.errorsClientForm["clientSecret"]}
                        </small>
                      </div>
                    </div>
                    <div className="col-sm-3">
                      <div className="col-sm-12 label required">
                        Duration{" "}
                        <img alt="down-arrow" src={IconGreenSortingDown} />
                      </div>
                      <div className="col-sm-12 mb-2">
                        <input
                          type="text"
                          pattern="^[1-9][0-9]*"
                          className="form-control form-control-sm"
                          name="duration"
                          value={this.state.clientForm.duration.value}
                          onChange={(event) => {
                            this.handleClientFormData(event);
                          }}
                        />
                        <small className="text-danger">
                          {this.state.errorsClientForm["duration"]}
                        </small>
                      </div>
                    </div>
                    <div className="col-sm-3">
                      <div className="col-sm-12 label required">
                        OAUTH2{" "}
                        <img alt="down-arrow" src={IconGreenSortingDown} />
                      </div>
                      <div className="col-sm-12 mb-2">
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          name="OAuth2"
                          value={this.state.clientForm.OAuth2.value}
                          onChange={(event) => {
                            this.handleClientFormData(event);
                          }}
                        />
                        <small className="text-danger">
                          {this.state.errorsClientForm["OAuth2"]}
                        </small>
                      </div>
                    </div>
                    <div className="col-sm-3">
                      <div className="col-sm-12 label required">
                        Host <img alt="down-arrow" src={IconGreenSortingDown} />
                      </div>
                      <div className="col-sm-12 mb-2">
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          name="host"
                          value={this.state.clientForm.host.value}
                          onChange={(event) => {
                            this.handleClientFormData(event);
                          }}
                        />
                        <small className="text-danger">
                          {this.state.errorsClientForm["host"]}
                        </small>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-sm-3">
                      <div className="col-sm-12 label required">
                        Local Port{" "}
                        <img alt="down-arrow" src={IconGreenSortingDown} />
                      </div>
                      <div className="col-sm-12 mb-2">
                        <input
                          type="text"
                          pattern="^[1-9][0-9]*"
                          className="form-control form-control-sm"
                          name="localPort"
                          value={this.state.clientForm.localPort.value}
                          onChange={(event) => {
                            this.handleClientFormData(event);
                          }}
                        />
                        <small className="text-danger">
                          {this.state.errorsClientForm["localPort"]}
                        </small>
                      </div>
                    </div>
                    <div className="col-sm-3">
                      <div className="col-sm-12 label required">
                        Target ID{" "}
                        <img alt="down-arrow" src={IconGreenSortingDown} />
                      </div>
                      <div className="col-sm-12 mb-2">
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          name="targetId"
                          value={this.state.clientForm.targetId.value}
                          onChange={(event) => {
                            this.handleClientFormData(event);
                          }}
                        />
                        <small className="text-danger">
                          {this.state.errorsClientForm["targetId"]}
                        </small>
                      </div>
                    </div>
                    <div className="col-sm-3">
                      <div className="col-sm-12 label required">Proxy</div>
                      <div className="col-sm-12 mb-2">
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          name="proxy"
                          value={this.state.clientForm.proxy.value}
                          onChange={(event) => {
                            this.handleClientFormData(event);
                          }}
                        />
                      </div>
                    </div>
                    <div className="col-sm-3">
                      <div className="col-sm-12 label required">
                        Allow Plug-in{" "}
                        <img alt="down-arrow" src={IconGreenSortingDown} />
                      </div>
                      <div className="col-sm-12 mb-2">
                        <div className="custom-control custom-checkbox">
                          <input
                            type="checkbox"
                            className="custom-control-input custom-control-checkbox"
                            id="allowPlugIn"
                            name="allowPlugIn"
                            checked={this.state.clientForm.allowPlugIn.value}
                            onChange={(event) => {
                              this.handleClientFormData(event);
                            }}
                          />
                          <label
                            className="custom-control-label"
                            htmlFor="allowPlugIn"
                          ></label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    {this.state.clientForm.allowPlugIn.value ? (
                      <div className="col-sm-3">
                        <div className="col-sm-12 label">
                          Plug-in
                          <img alt="down-arrow" src={IconGreenSortingDown} />
                        </div>
                        <div className="col-sm-12 mb-2">
                          <select
                            multiple
                            className="form-control form-control-sm"
                            style={{ height: "45px" }}
                            name="plugIn"
                            value={this.state.clientForm.plugIn.value}
                            onChange={(event) => {
                              this.handleClientFormData(event);
                            }}
                          >
                            {this.state.plugIns.map((plugIn, plugInIndex) => {
                              return (
                                <option
                                  key={"plugInOption" + plugInIndex}
                                  value={plugIn.id}
                                >
                                  {plugIn.name}
                                </option>
                              );
                            })}
                          </select>
                          <small className="text-danger">
                            {this.state.errorsClientForm["plugIn"]}
                          </small>
                        </div>
                      </div>
                    ) : null}
                  </div>

                  <div className="col-sm-12 mb-2">
                    <hr></hr>
                  </div>

                  <div className="row">
                    <div className="col-sm-5 mb-2">
                      {/*<img alt="copy" src="assets/static/images/copy.svg" height="15px" />
                                            <a onClick={this.copyFromServerToClient.bind(this)} href="#" className="theme-color cursor-pointer ml-1"><small>Copy details from server</small></a>*/}
                    </div>
                    <div className="col-sm-7 mb-2">
                      <button
                        disabled={!this.state.clientFormIsValid}
                        onClick={this.downloadFile.bind(this, "client")}
                        className="btn btn-sm customize-view-btn"
                      >
                        CREATE SCRIPT
                      </button>
                      <button
                        onClick={this.props.changeView.bind(this)}
                        className="btn btn-sm customize-view-btn ml-2"
                      >
                        BACK
                      </button>
                    </div>
                  </div>
                </div>
              ) : null}

              {this.state.agentForm.agentMode.value == 4 ? (
                <div className="changeable-form x-server-form">
                  <div className="row">
                    <div className="col-sm-4">
                      <div className="col-sm-12 label required">
                        Mode <img alt="down-arrow" src={IconGreenSortingDown} />
                      </div>
                      <div className="col-sm-12 mb-2">
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          name="mode"
                          disabled={true}
                          defaultValue={this.state.xserverForm.mode}
                        />
                      </div>
                    </div>
                    <div className="col-sm-4">
                      <div className="col-sm-12 label required">
                        Group{" "}
                        <img alt="down-arrow" src={IconGreenSortingDown} />
                      </div>
                      <div className="col-sm-12 mb-2">
                        <select
                          className="form-control form-control-sm"
                          name="group"
                          value={this.state.xserverForm.group.value}
                          onChange={(event) => {
                            this.handleXServerFormData(event);
                          }}
                        >
                          {this.state.groups.map((group, groupIndex) => {
                            return (
                              <option
                                key={"groupOption" + groupIndex}
                                value={group.groupId}
                              >
                                {group.groupId}
                              </option>
                            );
                          })}
                        </select>
                        <small className="text-danger">
                          {this.state.errorsXServerForm["group"]}
                        </small>
                      </div>
                    </div>

                    <div className="col-sm-4">
                      <div className="col-sm-12 label required">
                        Client ID{" "}
                        <img alt="down-arrow" src={IconGreenSortingDown} />
                      </div>
                      <div className="col-sm-12 mb-2">
                        <input
                          type="text"
                          autoComplete="off"
                          className="form-control form-control-sm"
                          name="clientId"
                          value={this.state.xserverForm.clientId.value}
                          onChange={(event) => {
                            this.handleXServerFormData(event);
                          }}
                        />
                        <small className="text-danger">
                          {this.state.errorsXServerForm["clientId"]}
                        </small>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-sm-4">
                      <div className="col-sm-12 label required">
                        OAUTH2{" "}
                        <img alt="down-arrow" src={IconGreenSortingDown} />
                      </div>
                      <div className="col-sm-12 mb-2">
                        <input
                          type="text"
                          autoComplete="off"
                          className="form-control form-control-sm"
                          name="OAuth2"
                          value={this.state.xserverForm.OAuth2.value}
                          onChange={(event) => {
                            this.handleXServerFormData(event);
                          }}
                        />
                        <small className="text-danger">
                          {this.state.errorsXServerForm["OAuth2"]}
                        </small>
                      </div>
                    </div>
                    <div className="col-sm-4">
                      <div className="col-sm-12 label required">
                        Host <img alt="down-arrow" src={IconGreenSortingDown} />
                      </div>
                      <div className="col-sm-12 mb-2">
                        <select
                          className="form-control form-control-sm"
                          name="host"
                          value={this.state.xserverForm.host.value}
                          onChange={(event) => {
                            this.handleXServerFormData(event);
                          }}
                        >
                          {this.state.gateways.map((gateway, gatewayIndex) => {
                            return (
                              <option
                                key={"gatewayOption" + gatewayIndex}
                                value={gateway.id}
                              >
                                {gateway.name}
                              </option>
                            );
                          })}
                        </select>
                        <small className="text-danger">
                          {this.state.errorsXServerForm["host"]}
                        </small>
                      </div>
                    </div>
                    <div className="col-sm-4">
                      <div className="col-sm-12 label required">
                        Remote Host{" "}
                        <img alt="down-arrow" src={IconGreenSortingDown} />
                      </div>
                      <div className="col-sm-12 mb-2">
                        <input
                          type="text"
                          autoComplete="off"
                          className="form-control form-control-sm"
                          name="remoteHost"
                          value={this.state.xserverForm.remoteHost.value}
                          onChange={(event) => {
                            this.handleXServerFormData(event);
                          }}
                        />
                        <small className="text-danger">
                          {this.state.errorsXServerForm["remoteHost"]}
                        </small>
                      </div>
                    </div>
                  </div>

                  <div className="col-sm-12 mb-2">
                    <hr></hr>
                  </div>

                  <div className="row">
                    <div className="col-sm-5 mb-2">
                      <img alt="copy" src={CopyImg} height="15px" />
                      <a
                        onClick={this.copyFromXClientToXServer.bind(this)}
                        href="#"
                        className="theme-color cursor-pointer ml-1"
                      >
                        <small>Copy details from x:client</small>
                      </a>
                    </div>
                    <div className="col-sm-7 mb-2">
                      <button
                        id="create-client-btn"
                        disabled={!this.state.xserverFormIsValid}
                        onClick={this.downloadFile.bind(this, "x:server")}
                        className="btn btn-sm customize-view-btn"
                      >
                        CREATE SCRIPT
                      </button>
                    </div>
                  </div>
                </div>
              ) : null}

              {this.state.agentForm.agentMode.value == 5 ? (
                <div className="changeable-form x-client-form">
                  <div className="row">
                    <div className="col-sm-4">
                      <div className="col-sm-12 label required">
                        Mode <img alt="down-arrow" src={IconGreenSortingDown} />
                      </div>
                      <div className="col-sm-12 mb-2">
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          name="mode"
                          disabled={true}
                          defaultValue={this.state.xclientForm.mode}
                        />
                      </div>
                    </div>
                    <div className="col-sm-4">
                      <div className="col-sm-12 label required">
                        Group{" "}
                        <img alt="down-arrow" src={IconGreenSortingDown} />
                      </div>
                      <div className="col-sm-12 mb-2">
                        <select
                          className="form-control form-control-sm"
                          name="group"
                          value={this.state.xclientForm.group.value}
                          onChange={(event) => {
                            this.handleXClientFormData(event);
                          }}
                        >
                          {this.state.groups.map((group, groupIndex) => {
                            return (
                              <option
                                key={"groupOption" + groupIndex}
                                value={group.groupId}
                              >
                                {group.groupId}
                              </option>
                            );
                          })}
                        </select>
                        <small className="text-danger">
                          {this.state.errorsXClientForm["group"]}
                        </small>
                      </div>
                    </div>

                    <div className="col-sm-4">
                      <div className="col-sm-12 label required">
                        Client ID{" "}
                        <img alt="down-arrow" src={IconGreenSortingDown} />
                      </div>
                      <div className="col-sm-12 mb-2">
                        <input
                          type="text"
                          autoComplete="off"
                          className="form-control form-control-sm"
                          name="clientId"
                          value={this.state.xclientForm.clientId.value}
                          onChange={(event) => {
                            this.handleXClientFormData(event);
                          }}
                        />
                        <small className="text-danger">
                          {this.state.errorsXClientForm["clientId"]}
                        </small>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-sm-4">
                      <div className="col-sm-12 label required">
                        OAUTH2{" "}
                        <img alt="down-arrow" src={IconGreenSortingDown} />
                      </div>
                      <div className="col-sm-12 mb-2">
                        <input
                          type="text"
                          autoComplete="off"
                          className="form-control form-control-sm"
                          name="OAuth2"
                          value={this.state.xclientForm.OAuth2.value}
                          onChange={(event) => {
                            this.handleXClientFormData(event);
                          }}
                        />
                        <small className="text-danger">
                          {this.state.errorsXClientForm["OAuth2"]}
                        </small>
                      </div>
                    </div>
                    <div className="col-sm-4">
                      <div className="col-sm-12 label required">
                        Host <img alt="down-arrow" src={IconGreenSortingDown} />
                      </div>
                      <div className="col-sm-12 mb-2">
                        <select
                          className="form-control form-control-sm"
                          name="host"
                          value={this.state.xclientForm.host.value}
                          onChange={(event) => {
                            this.handleXClientFormData(event);
                          }}
                        >
                          {this.state.gateways.map((gateway, gatewayIndex) => {
                            return (
                              <option
                                key={"gatewayOption" + gatewayIndex}
                                value={gateway.id}
                              >
                                {gateway.name}
                              </option>
                            );
                          })}
                        </select>
                        <small className="text-danger">
                          {this.state.errorsXClientForm["host"]}
                        </small>
                      </div>
                    </div>
                    <div className="col-sm-4">
                      <div className="col-sm-12 label required">
                        Remote Host{" "}
                        <img alt="down-arrow" src={IconGreenSortingDown} />
                      </div>
                      <div className="col-sm-12 mb-2">
                        <input
                          type="text"
                          autoComplete="off"
                          className="form-control form-control-sm"
                          name="remoteHost"
                          value={this.state.xclientForm.remoteHost.value}
                          onChange={(event) => {
                            this.handleXClientFormData(event);
                          }}
                        />
                        <small className="text-danger">
                          {this.state.errorsXClientForm["remoteHost"]}
                        </small>
                      </div>
                    </div>
                  </div>

                  <div className="col-sm-12 mb-2">
                    <hr></hr>
                  </div>

                  <div className="row">
                    <div className="col-sm-5 mb-2">
                      <img alt="copy" src={CopyImg} height="15px" />
                      <a
                        onClick={this.copyFromXServerToXClient.bind(this)}
                        href="#"
                        className="theme-color cursor-pointer ml-1"
                      >
                        <small>Copy details from x:server</small>
                      </a>
                    </div>
                    <div className="col-sm-7 mb-2">
                      <button
                        id="create-client-btn"
                        disabled={!this.state.xclientFormIsValid}
                        onClick={this.downloadFile.bind(this, "x:client")}
                        className="btn btn-sm customize-view-btn"
                      >
                        CREATE SCRIPT
                      </button>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    );
    /* jshint ignore:end */
  }
}

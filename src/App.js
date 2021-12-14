import React, { lazy, Suspense } from "react";
//import ReactDOM from "react-dom";
import $ from "jquery";
import GeLogo from "./assets/images/GE_logo.svg";
import EcIcon from "./assets/images/ec-icon.png";
import Maximize from "./assets/images/maximize.svg";
import * as helpTextFile from "./static/helpText/helpText.js";
// from ;
import Loader from "./Loader/Loader.js";
//const Loader = lazy(() => import("./Loader/Loader.js"));
const Dashboard = lazy(() => import("./Dashboard/Dashboard.js"));
const SubscriptionDashboard = lazy(() =>
  import("./Subscription/Dashboard/SubscriptionDashboard.js")
);
const SubscriptionAdd = lazy(() =>
  import("./Subscription/SubscriptionCreate/SubscriptionAdd.js")
);
const View = lazy(() => import("./View/View.js"));
const Maintain = lazy(() => import("./Maintain/Maintain.js"));
const LicenseCreate = lazy(() => import("./Maintain/LicenseCreate.js"));
const LicenseUpgrade = lazy(() => import("./Maintain/LicenseUpgrade.js"));
const Groupcreate = lazy(() => import("./Maintain/Groupcreate.js"));
const Groupupgrade = lazy(() => import("./Maintain/Groupupgrade.js"));
const GroupView = lazy(() => import("./Maintain/GroupView.js"));
const Maintainagentcreate = lazy(() =>
  import("./Maintain/Maintainagentcreate.js")
);
/* istanbul ignore next */
const Maintainagentupgrade = lazy(() =>
  import("./Maintain/Maintainagentupgrade.js")
);
const Maintainagentview = lazy(() => import("./Maintain/Maintainagentview.js"));
const RequestCreate = lazy(() => import("./Maintain/RequestCreate.js"));
const RequestUpgrade = lazy(() => import("./Maintain/RequestUpgrade.js"));
const RequestView = lazy(() => import("./Maintain/RequestView.js"));
const LicenseView = lazy(() => import("./Maintain/LicenseView.js"));
/* istanbul ignore next */
const Monitor = lazy(() => import("./Monitor/Monitor.js"));
const Notification = lazy(() => import("./Monitor/Notification.js"));
const Alert = lazy(() => import("./Monitor/Alert.js"));
const Healthstatus = lazy(() => import("./Monitor/Healthstatus.js"));

const Report = lazy(() => import("./Report/Report.js"));
const UserManagement = lazy(() => import("./Settings/UserManagement.js"));
const UserProfile = lazy(() => import("./Settings/UserProfile.js"));
const WebHooks = lazy(() => import("./Settings/WebHooks.js"));
const Navbar = lazy(() => import("./Navbar/Navbar.js"));
const Header = lazy(() => import("./Header/Header.js"));
const Support = lazy(() => import("./Support/Support.js"));
const Cookienotification = lazy(() =>
  import("./Cookienotification/Cookienotification.js")
);
const FloaterHelp = lazy(() => import("./FloaterHelp/FloaterHelp.js"));
const Footer = lazy(() => import("./Footer/Footer.js"));

const HELPTEXT = helpTextFile.default;
//const API_URL = "v1.2beta/ops/api/";

const API_URL =
  process.env.REACT_APP_ENV && process.env.REACT_APP_ENV === "development"
    ? process.env.REACT_APP_BACKEND_URL + "/v1.2beta/ops/api/"
    : "/v1.2beta/ops/api/";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentView: "",
      /* istanbul ignore next */
      ajaxBusy: {
        flag: false,
        showLoader: false,
        showText: false,
        text: "",
        classname: "",
      },
      maximizeModal: true,
      userId: "",
      authToken: "",
      profileData: {
        email: "",
        name: "",
      },
      permissions: {},
      apiEndPoints: {
        baseUrl: API_URL,
      },
      isFullScreenModal: false,
      notificationModal: {
        headerText: "",
        bodyText: "",
        buttons: [],
        commands: [],
      },
      isCommandPrompt: false,
      user: "OpsAdmin",
      isNewUser: true,
      scope : {},
    };
  }

  /* istanbul ignore next */
  componentDidMount() {
    this.fullScreenModal();
    let authToken = this.getToken("ec-config");
    this.setState({
      authToken: authToken,
    });

    this.showGlobalMessage(true, true, "Please wait...", "custom-success");

    let permission = {
      roleId: 1,
      roleName: "Admin",
      accesses: {
        dashboard: {
          haveAccess: true,
        },
        view: {
          haveAccess: true,
        },
        maintain: {
          haveAccess: true,
          subMenus: {
            subscriptions: {
              create: true,
              view: true,
              edit: true,
              delete: true,
            },
            groups: {
              create: true,
              view: true,
              edit: true,
              delete: true,
            },
            agents: {
              create: true,
              view: true,
              edit: true,
              delete: true,
            },
            watchers: {
              create: true,
              view: true,
              edit: true,
              delete: true,
            },
          },
        },
        monitor: {
          haveAccess: true,
          subMenus: {
            notifications: {
              view: true,
              edit: true,
              delete: true,
            },
            alerts: {
              view: true,
              edit: true,
              delete: true,
            },
            healthStatus: {
              view: true,
              edit: true,
              delete: true,
              isUser: true,
            },
          },
        },
        reports: {
          haveAccess: true,
        },
        settings: {
          haveAccess: true,
        },
        support: {
          haveAccess: true,
        },
      },
    };

    let scopeEndPoint = this.state.apiEndPoints.baseUrl + "scope";
    fetch(scopeEndPoint, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + authToken,
      },
    }).then((response) => {
      if (response.status === 200) {
        response.json().then((respData) => {
          this.hideGlobalMessage();
          sessionStorage.setItem("scope", JSON.stringify(respData));
          this.setState({
            scope: respData
          });
        });
      } else {
        this.showGlobalMessage(
          true,
          true,
          "Please try after sometime",
          "custom-danger"
        );
      }
    });

    let userEndPoint = this.state.apiEndPoints.baseUrl + "user";
    fetch(userEndPoint, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + authToken,
      },
    }).then((response) => {
      if (response.status === 200) {
        response.json().then((respData) => {
          this.hideGlobalMessage();
          sessionStorage.setItem("userData", JSON.stringify(respData));
          let userId = respData[0].userId;
          let profileName = respData[0].fullName;
          let profileEmailId = respData[0].email;
          let permissions = permission;
          let isNewUser = true;
          let currentView = isNewUser?"SubscriptionDashboard":"Dashboard";
          this.setState({
            profileData: {
              email: profileEmailId,
              name: profileName,
            },
            userId: userId,
            permissions: permissions,
            currentView: currentView,
            isNewUser: isNewUser
          });

          //console.log(userId, profileName);
        });
      } else {
        this.showGlobalMessage(
          true,
          true,
          "Please try after sometime",
          "custom-danger"
        );
      }
    });
    // Get logged user's userId start
    let snapshotData = sessionStorage.getItem("snapshotData"); // data layer class
    let userData = sessionStorage.getItem("userData");
    fetch("/setcookie").then((response) => {
      console.log(response);
    });
    if (snapshotData !== null) {
      let jsonData = JSON.parse(snapshotData);
      let data = jsonData["ab2a2691-a563-486c-9883-5111ff36ba9b"];
      //console.log("optimized Data" , data);
      this.hideGlobalMessage();
      let userId = data.userId === undefined ? "" : data.userId;
      let profileName = data.fullName === undefined ? "" : data.fullName;
      let profileEmailId = data.email === undefined ? "" : data.email;
      let permissions = permission === undefined ? "" : permission;
      this.setState({
        profileData: {
          email: profileEmailId,
          name: profileName,
        },
        userId: userId,
        permissions: permissions,
        currentView: "Dashboard",
      }); 
    } else {
      let apiEndPoint = this.state.apiEndPoints.baseUrl + "snapshot"; //"https://reqres.in/api/users/2"  //baseUrl -this.state.apiEndPoints.baseUrl + '/snapshot'
      fetch(apiEndPoint, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + authToken,
        },
      }).then((response) => {
        if (response.status === 200) {
          response.json().then((respData) => {
            let data = respData["ab2a2691-a563-486c-9883-5111ff36ba9b"];
            sessionStorage.setItem("snapshotData", JSON.stringify(respData));

            this.hideGlobalMessage();
            let userId = data.user_id;
            let profileName = data.username;
            let profileEmailId = data.email;
            let permissions = permission;
            this.setState({
              profileData: {
                email: profileEmailId,
                name: profileName,
              },
              userId: userId,
              permissions: permissions,
              currentView: "Dashboard",
            }); 
          });
        } else {
          this.showGlobalMessage(
            true,
            true,
            "Please try after sometime",
            "custom-danger"
          );
        }
      });
    }
    // Get logged user's userId end
  }

  /* istanbul ignore next */
  getToken(name) {
    var cookieName = name + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(";");
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) === " ") {
        c = c.substring(1);
      }
      if (c.indexOf(cookieName) === 0) {
        return c.substring(cookieName.length, c.length);
      }
    }
  }

  /* istanbul ignore next */
  handleUser(user) {
    let newpermission = { ...this.state.permissions };
    if (user === "OpsAdmin") {
      newpermission.accesses.maintain.subMenus.subscriptions.create = false;
      newpermission.accesses.maintain.subMenus.subscriptions.edit = false;
      newpermission.accesses.maintain.subMenus.subscriptions.delete = false;

      newpermission.accesses.maintain.subMenus.groups.create = false;
      newpermission.accesses.maintain.subMenus.groups.edit = false;
      newpermission.accesses.maintain.subMenus.groups.delete = false;

      newpermission.accesses.maintain.subMenus.agents.create = false;
      newpermission.accesses.maintain.subMenus.agents.edit = false;
      newpermission.accesses.maintain.subMenus.agents.delete = false;
      newpermission.accesses.monitor.subMenus.healthStatus.isUser = false;
      newpermission.accesses.settings.haveAccess = false;
      this.setState({
        permissions: newpermission,
        user: "User",
      });
    }
    if (user === "User") {
      newpermission.accesses.maintain.subMenus.subscriptions.create = true;
      newpermission.accesses.maintain.subMenus.subscriptions.edit = true;
      newpermission.accesses.maintain.subMenus.subscriptions.delete = true;
      newpermission.accesses.maintain.subMenus.groups.create = true;
      newpermission.accesses.maintain.subMenus.groups.edit = true;
      newpermission.accesses.maintain.subMenus.groups.delete = true;
      newpermission.accesses.maintain.subMenus.agents.create = true;
      newpermission.accesses.maintain.subMenus.agents.edit = true;
      newpermission.accesses.maintain.subMenus.agents.delete = true;
      newpermission.accesses.monitor.subMenus.healthStatus.isUser = true;
      newpermission.accesses.settings.haveAccess = true;

      this.setState({
        permissions: newpermission,
        user: "OpsAdmin",
      });
    }
  }

  /* istanbul ignore next */
  servedView() {
    const currentView = this.state.currentView;
    switch (currentView) {
      case "Dashboard":
        return (
          <Dashboard
            helpText={HELPTEXT}
            authToken={this.state.authToken}
            showGlobalMessage={this.showGlobalMessage.bind(this)}
            hideGlobalMessage={this.hideGlobalMessage.bind(this)}
          />
        );
      case "SubscriptionDashboard":
        return (
          <SubscriptionDashboard
            helpText={HELPTEXT}
            authToken={this.state.authToken}
            showGlobalMessage={this.showGlobalMessage.bind(this)}
            hideGlobalMessage={this.hideGlobalMessage.bind(this)}
          />
        ); // jshint ignore:line
      case "View":
        return (
          <View
            baseUrl={this.state.apiEndPoints.baseUrl}
            authToken={this.state.authToken}
            userId={this.state.userId}
            showGlobalMessage={this.showGlobalMessage.bind(this)}
            hideGlobalMessage={this.hideGlobalMessage.bind(this)}
            permissions={this.state.permissions}
          />
        ); // jshint ignore:line
      case "Maintain":
        return <Maintain />; // jshint ignore:line
      case "LicenseCreate":
        return (
          <LicenseCreate
            helpText={HELPTEXT}
            baseUrl={this.state.apiEndPoints.baseUrl}
            authToken={this.state.authToken}
            userId={this.state.userId}
            showGlobalMessage={this.showGlobalMessage.bind(this)}
            hideGlobalMessage={this.hideGlobalMessage.bind(this)}
          />
        ); // jshint ignore:line
      case "LicenseUpgrade":
        return (
          <LicenseUpgrade
            helpText={HELPTEXT}
            baseUrl={this.state.apiEndPoints.baseUrl}
            authToken={this.state.authToken}
            userId={this.state.userId}
            showGlobalMessage={this.showGlobalMessage.bind(this)}
            hideGlobalMessage={this.hideGlobalMessage.bind(this)}
            permissions={this.state.permissions}
          />
        ); // jshint ignore:line
      case "LicenseView":
        return (
          <LicenseView
            helpText={HELPTEXT}
            baseUrl={this.state.apiEndPoints.baseUrl}
            authToken={this.state.authToken}
            userId={this.state.userId}
            showGlobalMessage={this.showGlobalMessage.bind(this)}
            hideGlobalMessage={this.hideGlobalMessage.bind(this)}
          />
        ); // jshint ignore:line
      case "Groupcreate":
        return (
          <Groupcreate
            helpText={HELPTEXT}
            baseUrl={this.state.apiEndPoints.baseUrl}
            authToken={this.state.authToken}
            userId={this.state.userId}
            showGlobalMessage={this.showGlobalMessage.bind(this)}
            hideGlobalMessage={this.hideGlobalMessage.bind(this)}
          />
        ); // jshint ignore:line
      case "Groupupgrade":
        return (
          <Groupupgrade
            helpText={HELPTEXT}
            baseUrl={this.state.apiEndPoints.baseUrl}
            authToken={this.state.authToken}
            userId={this.state.userId}
            showGlobalMessage={this.showGlobalMessage.bind(this)}
            hideGlobalMessage={this.hideGlobalMessage.bind(this)}
            permissions={this.state.permissions}
          />
        ); // jshint ignore:line
      case "GroupView":
        return (
          <GroupView
            helpText={HELPTEXT}
            baseUrl={this.state.apiEndPoints.baseUrl}
            authToken={this.state.authToken}
            userId={this.state.userId}
            showGlobalMessage={this.showGlobalMessage.bind(this)}
            hideGlobalMessage={this.hideGlobalMessage.bind(this)}
            permissions={this.state.permissions}
            initTable={this.initTable.bind(this)}
          />
        ); // jshint ignore:line
      case "Maintainagentcreate":
        return (
          <Maintainagentcreate
            helpText={HELPTEXT}
            baseUrl={this.state.apiEndPoints.baseUrl}
            authToken={this.state.authToken}
            userId={this.state.userId}
            showGlobalMessage={this.showGlobalMessage.bind(this)}
            hideGlobalMessage={this.hideGlobalMessage.bind(this)}
            showModal={this.showModal.bind(this)}
          />
        ); // jshint ignore:line
      case "Maintainagentupgrade":
        return (
          <Maintainagentupgrade
            baseUrl={this.state.apiEndPoints.baseUrl}
            authToken={this.state.authToken}
            userId={this.state.userId}
            showGlobalMessage={this.showGlobalMessage.bind(this)}
            hideGlobalMessage={this.hideGlobalMessage.bind(this)}
            initTable={this.initTable.bind(this)}
          />
        ); // jshint ignore:line
      case "Maintainagentview":
        return (
          <Maintainagentview
            baseUrl={this.state.apiEndPoints.baseUrl}
            authToken={this.state.authToken}
            userId={this.state.userId}
            showGlobalMessage={this.showGlobalMessage.bind(this)}
            hideGlobalMessage={this.hideGlobalMessage.bind(this)}
          />
        ); // jshint ignore:line
      case "Requestcreate":
        return (
          <RequestCreate
            baseUrl={this.state.apiEndPoints.baseUrl}
            authToken={this.state.authToken}
            userId={this.state.userId}
            showGlobalMessage={this.showGlobalMessage.bind(this)}
            hideGlobalMessage={this.hideGlobalMessage.bind(this)}
          />
        ); // jshint ignore:line
      case "RequestUpgrade":
        return (
          <RequestUpgrade
            baseUrl={this.state.apiEndPoints.baseUrl}
            authToken={this.state.authToken}
            userId={this.state.userId}
            showGlobalMessage={this.showGlobalMessage.bind(this)}
            hideGlobalMessage={this.hideGlobalMessage.bind(this)}
            permissions={this.state.permissions}
          />
        ); // jshint ignore:line
      case "RequestView":
        return (
          <RequestView
            baseUrl={this.state.apiEndPoints.baseUrl}
            authToken={this.state.authToken}
            userId={this.state.userId}
            showGlobalMessage={this.showGlobalMessage.bind(this)}
            hideGlobalMessage={this.hideGlobalMessage.bind(this)}
          />
        ); // jshint ignore:line
        case "SubscriptionAdd":
        return (
          <SubscriptionAdd
            helpText={HELPTEXT}
            authToken={this.state.authToken}
            showGlobalMessage={this.showGlobalMessage.bind(this)}
            hideGlobalMessage={this.hideGlobalMessage.bind(this)}
          />
        );
      case "Monitor":
        return <Monitor />; // jshint ignore:line
      case "Notification":
        return (
          <Notification
            userId={this.state.userId}
            showGlobalMessage={this.showGlobalMessage.bind(this)}
            hideGlobalMessage={this.hideGlobalMessage.bind(this)}
          />
        ); // jshint ignore:line
      case "Alert":
        return (
          <Alert
            userId={this.state.userId}
            showGlobalMessage={this.showGlobalMessage.bind(this)}
            hideGlobalMessage={this.hideGlobalMessage.bind(this)}
          />
        ); // jshint ignore:line
      case "Healthstatus":
        return (
          <Healthstatus
            userId={this.state.userId}
            showGlobalMessage={this.showGlobalMessage.bind(this)}
            hideGlobalMessage={this.hideGlobalMessage.bind(this)}
          />
        ); // jshint ignore:line
      case "Report":
        return <Report />; // jshint ignore:line
      case "Usermanagement":
        return (
          <UserManagement
            baseUrl={this.state.apiEndPoints.baseUrl}
            authToken={this.state.authToken}
            userId={this.state.userId}
            showGlobalMessage={this.showGlobalMessage.bind(this)}
            hideGlobalMessage={this.hideGlobalMessage.bind(this)}
          />
        ); // jshint ignore:line
      case "UserProfile":
        return (
          <UserProfile
            baseUrl={this.state.apiEndPoints.baseUrl}
            authToken={this.state.authToken}
            userId={this.state.userId}
            showGlobalMessage={this.showGlobalMessage.bind(this)}
            hideGlobalMessage={this.hideGlobalMessage.bind(this)}
          />
        ); // jshint ignore:line
      case "WebHooks":
        return (
          <WebHooks
            baseUrl={this.state.apiEndPoints.baseUrl}
            authToken={this.state.authToken}
            userId={this.state.userId}
            showGlobalMessage={this.showGlobalMessage.bind(this)}
            hideGlobalMessage={this.hideGlobalMessage.bind(this)}
          />
        ); // jshint ignore:line
      case "Support":
        return <Support />; // jshint ignore:line
      default:
        return null;
    }
  }

  /* istanbul ignore next */
  changeView(changeViewTo) {
    this.setState({
      currentView: changeViewTo,
    });
  }

  /* istanbul ignore next */
  showGlobalMessage(showLoader, showText, text, classname) {
    this.setState({
      ajaxBusy: {
        flag: true,
        showLoader: showLoader,
        showText: showText,
        text: text,
        classname: classname,
      },
    });
  }

  /* istanbul ignore next */
  hideGlobalMessage() {
    this.setState({
      ajaxBusy: {
        flag: false,
        showLoader: false,
        showText: false,
        text: "",
        classname: "",
      },
    });
  }

  /* istanbul ignore next */
  maxMinModal() {
    this.setState({
      maximizeModal: !this.state.maximizeModal,
    });
  }

  extraLargeModal(currentView) {
    $("#mediumModal").addClass("largeModal");
    $("#mediumModalContent").addClass("largeModalContent");
    $("#mediumModalContent").addClass("rounded-0");
    $("#mediumModalContent header").addClass("rounded-0");
    /* if (document.getElementsByClassName("table").length > 0) {
      let tableInitial = currentView.toLowerCase();
      // initTable(tableInitial + "Table", true);
    } */
  }

  initTable(tableId, preserveState) {
    var pageLength = 5;
    let tableWidth = 0;
    if (tableId === "viewTable") {
      tableWidth = $("#viewTableDiv")[0].offsetWidth - 200;
      $("#" + tableId).DataTable({
        dom: '<"top"f>rt<"bottom"lp>',
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
    } else if (tableId === "maintainagentupgradeTable") {
      tableWidth = $("#maintainagentupgradeTableDiv")[0].offsetWidth - 200;
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
    } else if (tableId === "subscriptionupgradeTable") {
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
    } else if (tableId === "groupupgradeTable") {
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
    } else {
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
    }
    $(".bottom").addClass("row");
    $(".dataTables_length").addClass("col-sm-6");
    $(".dataTables_paginate").addClass("col-sm-6");
  }

  /* istanbul ignore next */
  fullScreenModal() {
    this.extraLargeModal(this.state.currentView);
    this.setState({
      isFullScreenModal: true,
    });
  }

  /* istanbul ignore next */
  medModal(currentView) {
    $("#mediumModal").removeClass("largeModal");
    $("#mediumModalContent").removeClass("largeModalContent");
    $("#mediumModalContent").removeClass("rounded-0");
    $("#mediumModalContent header").removeClass("rounded-0");
    this.setState({
      isFullScreenModal: false,
    });

    if (document.getElementsByClassName("table").length > 0) {
      this.changeView("");
      setTimeout(() => {
        this.changeView(currentView);
      }, 200);
    }
  }

  /* istanbul ignore next */
  forceLogout() {
    localStorage.clear();
    window.location.href =
      window.location.origin +
      window.location.pathname.replace("/ops", "") +
      "/logout";
  }

  StartWarningTimer() {
    // let warningTimer = setTimeout("IdleWarning()", timoutWarning);
  }

  ResetTimeOutTimer() {
    // clearTimeout(timeoutTimer);
    // clearTimeout(warningTimer);
    // StartWarningTimer();
  }

  /* istanbul ignore next */
  continueSession() {
    $("#logoutWarningModal").modal("hide");
    this.ResetTimeOutTimer();

    // Reset timers.
  }

  /* istanbul ignore next */
  copyAndcloseModal() {
    /* var dummy = $("<input>")
      .val(this.state.notificationModal.bodyText)
      .appendTo("body")
      .select(); */
    document.execCommand("copy");
    $("#notificationModal").modal("hide");
  }

  /* istanbul ignore next */
  copyToClipboard() {
    /* var dummy = $("<input>")
      .val(this.state.notificationModal.bodyText)
      .appendTo("body")
      .select();
    document.execCommand("copy"); */
    this.showGlobalMessage(false, true, "Statement copied", "custom-success");
    setTimeout(() => {
      this.hideGlobalMessage();
    }, 2000);
  }

  /* istanbul ignore next */
  actionPerform(action) {
    switch (action) {
      case "copyAndcloseModal":
        this.copyAndcloseModal(this);
        break;
      case "copyToClipboard":
        this.copyToClipboard();
        break;
      case "closeModal":
        $("#notificationModal").modal("hide");
        break;
    }
  }

  /* istanbul ignore next */
  showModal(headerText, bodyText, buttons, isCommandPrompt) {
    let cmndArr = bodyText.split("\n");
    this.setState({
      notificationModal: {
        headerText: headerText,
        bodyText: bodyText,
        buttons: buttons,
        commands: cmndArr,
      },
      isCommandPrompt: isCommandPrompt,
    });
    $("#notificationModal").modal("show");
  }

  render() {
    /* jshint ignore:start */
    /* istanbul ignore next */
    return (
      <Suspense fallback={<Loader />}>
        <div className="App container">
          {this.state.maximizeModal ? (
            <div className="modal" tabIndex="-1" role="dialog" id="dive_panel">
              <div
                id="mediumModal"
                className="modal-dialog modal-xl"
                role="document"
              >
                <div id="mediumModalContent" className="modal-content">
                  {this.state.ajaxBusy.flag ? (
                    <div
                      className={
                        "alert-notification alert " +
                        this.state.ajaxBusy.classname
                      }
                    >
                      <button
                        type="button"
                        className="close"
                        aria-label="Close"
                        onClick={this.hideGlobalMessage.bind(this)}
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                      {this.state.ajaxBusy.showLoader ? (
                        <div className="ajaxBusy"></div>
                      ) : null}
                      {this.state.ajaxBusy.showText ? (
                        <p>{this.state.ajaxBusy.text}</p>
                      ) : null}
                    </div>
                  ) : null}

                  <div className="modal-body">
                    <Header
                      profileData={this.state.profileData}
                      maxMinModal={this.maxMinModal.bind(this)}
                      fullScreenModal={this.fullScreenModal.bind(this)}
                      isFullScreenModal={this.state.isFullScreenModal}
                      medModal={this.medModal.bind(
                        this,
                        this.state.currentView
                      )}
                      handleUser={this.handleUser.bind(this)}
                      user={this.state.user}
                      clickEve={this.changeView.bind(this)}
                    ></Header>
                    {!this.state.isNewUser && <Navbar
                      currentView={this.state.currentView}
                      clickEve={this.changeView.bind(this)}
                      permissions={this.state.permissions}
                    ></Navbar>}
                    <div className="col-md-12 dynamic-container">
                      {this.servedView()}
                    </div>
                    <Cookienotification />
                    <FloaterHelp />
                    <Footer />
                    <div
                      className="modal fade logoutWarningModal"
                      id="logoutWarningModal"
                      role="dialog"
                      data-backdrop="static"
                      data-keyboard="false"
                    >
                      <div className="modal-dialog modal-sm">
                        <div className="modal-content rounded-0">
                          <div className="modal-header rounded-0">
                            <h6 className="modal-title">
                              Auto logout for inactivity
                            </h6>
                          </div>
                          <div className="modal-body">
                            <p>
                              Your session will end in a minute. Do you want to
                              continue your session?
                            </p>
                          </div>
                          <div className="modal-footer">
                            <button
                              type="button"
                              className="btn btn-default"
                              onClick={this.forceLogout.bind(this)}
                            >
                              No
                            </button>
                            <button
                              type="button"
                              className="btn btn-default customize-view-btn"
                              onClick={this.continueSession.bind(this)}
                            >
                              Yes
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      className="modal fade notificationModal"
                      id="notificationModal"
                      role="dialog"
                      data-backdrop="static"
                      data-keyboard="false"
                    >
                      <div className="modal-dialog modal-md">
                        <div
                          className={
                            this.state.isCommandPrompt
                              ? "modal-content rounded-0 command-prompt"
                              : "modal-content rounded-0"
                          }
                        >
                          <div className="modal-header rounded-0">
                            <h6 className="modal-title text-middle">
                              {this.state.notificationModal.headerText}
                            </h6>
                          </div>
                          <div className="modal-body">
                            {this.state.isCommandPrompt ? (
                              <div>
                                <pre>
                                  <code>
                                    {this.state.notificationModal.commands.map(
                                      (cmd, indx) => {
                                        return (
                                          <p
                                            key={indx + "cmd"}
                                            className="text-left"
                                          >
                                            {cmd}
                                          </p>
                                        );
                                      }
                                    )}
                                  </code>
                                </pre>
                                <button
                                  type="button"
                                  className="copy-icon"
                                  onClick={this.actionPerform.bind(
                                    this,
                                    "copyToClipboard"
                                  )}
                                >
                                  <svg
                                    viewBox="0 0 1000 1000"
                                    height="25"
                                    width="25"
                                    role="img"
                                  >
                                    <title>Copy to Clipboard</title>
                                    <path d="M704 896H64V320h640v192h64V192c0-35-29-64-64-64H512C512 57 455 0 384 0S256 57 256 128H64c-35 0-64 29-64 64v704c0 35 29 64 64 64h640c35 0 64-29 64-64V768h-64v128zM192 192h64s64-29 64-64 29-64 64-64 64 29 64 64 32 64 64 64h64s64 29 64 64H128c0-39 28-64 64-64zm-64 512h128v-64H128v64zm448-128V448L320 640l256 192V704h320V576H576zM128 832h192v-64H128v64zm320-448H128v64h320v-64zM256 512H128v64h128v-64z" />
                                  </svg>
                                </button>
                              </div>
                            ) : (
                              <p> {this.state.notificationModal.bodyText} </p>
                            )}
                          </div>
                          <div className="modal-footer">
                            {this.state.notificationModal.buttons.map(
                              (button, buttonIndex) => {
                                return (
                                  <button
                                    key={"notificationButton" + buttonIndex}
                                    type="button"
                                    id={"notificationButton" + buttonIndex}
                                    name="button"
                                    className={button.className}
                                    onClick={this.actionPerform.bind(
                                      this,
                                      button.action
                                    )}
                                  >
                                    {button.text}
                                  </button>
                                );
                              }
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="modal minimized-modal">
              <div className="modal-dialog minimized-modal-dialog">
                <div className="modal-content">
                  <div className="modal-body">
                    <div className="row">
                      <div className="col-sm-10">
                        <img src={GeLogo} />
                        <img src={EcIcon} width="100" height="60" />
                      </div>
                      <div className="col-sm-2 maximize-image-div">
                        <img
                          onClick={this.maxMinModal.bind(this)}
                          alt="maximize-window"
                          src={Maximize}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </Suspense>
    );
    /* jshint ignore:end */
  }
}

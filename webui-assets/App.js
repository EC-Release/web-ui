import React from "react";
import ReactDOM from "react-dom";

import Dashboard from './Dashboard/Dashboard.js';
import View from './View/View.js';
import Maintain from './Maintain/Maintain.js';
import Subscriptioncreate from './Maintain/Subscriptioncreate.js';
import Subscriptionupgrade from './Maintain/Subscriptionupgrade.js';
import Maintainagentcreate from './Maintain/Maintainagentcreate.js';
import Maintainagentupgrade from './Maintain/Maintainagentupgrade.js';
import Maintainagentview from './Maintain/Maintainagentview.js';
import Maintainwatchercreate from './Maintain/Maintainwatchercreate.js';
import Maintainwatcherupgrade from './Maintain/Maintainwatcherupgrade.js';
import Maintainwatcherview from './Maintain/Maintainwatcherview.js';
import Monitor from './Monitor/Monitor.js';
import Notification from './Monitor/Notification.js';
import Alert from './Monitor/Alert.js';
import Healthstatus from './Monitor/Healthstatus.js';
import Report from './Report/Report.js';
import Usermanagement from './Settings/Usermanagement.js';
import Navbar from './Navbar/Navbar.js';
import Header from './Header/Header.js';
import Support from './Support/Support.js';

import * as helpTextFile from './static/helpText/helpText.js';
const HELPTEXT = helpTextFile.default;

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentView: 'Dashboard',
      ajaxBusy: {
        flag: false,
        showLoader: false,
        showText: false,
        text: '',
        classname: ''
      },
      maximizeModal: true,
      userId: '12fd119f-1b00-41bf-ab82-85182df9c64f',
      authToken: '',
      apiEndPoints: {
        baseUrl : 'http://localhost:17990/v1.1beta/ec',
      }
    };
  }

  componentDidMount(){
    let authToken = this.getToken('ec-config');
    this.setState({
      authToken: authToken
    });
  }

  getToken(name){
    var cookieName = name+"=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(cookieName) == 0) {
          return c.substring(cookieName.length, c.length);
        }
    }
  }

  servedView() {
    const currentView = this.state.currentView;
    switch(currentView) {
      case 'Dashboard':
        return <Dashboard />; // jshint ignore:line
      case 'View':
        return <View baseUrl={this.state.apiEndPoints.baseUrl} authToken={this.state.authToken} userId={this.state.userId} showGlobalMessage={this.showGlobalMessage.bind(this)} hideGlobalMessage={this.hideGlobalMessage.bind(this)} />; // jshint ignore:line
      case 'Maintain':
        return <Maintain />; // jshint ignore:line
      case 'Subscriptioncreate':
        return <Subscriptioncreate helpText={HELPTEXT} baseUrl={this.state.apiEndPoints.baseUrl} authToken={this.state.authToken} userId={this.state.userId} showGlobalMessage={this.showGlobalMessage.bind(this)} hideGlobalMessage={this.hideGlobalMessage.bind(this)} />; // jshint ignore:line
      case 'Subscriptionupgrade':
        return <Subscriptionupgrade helpText={HELPTEXT} baseUrl={this.state.apiEndPoints.baseUrl} authToken={this.state.authToken} userId={this.state.userId} showGlobalMessage={this.showGlobalMessage.bind(this)} hideGlobalMessage={this.hideGlobalMessage.bind(this)} />; // jshint ignore:line
      case 'Maintainagentcreate':
        return <Maintainagentcreate helpText={HELPTEXT} baseUrl={this.state.apiEndPoints.baseUrl} authToken={this.state.authToken} userId={this.state.userId} showGlobalMessage={this.showGlobalMessage.bind(this)} hideGlobalMessage={this.hideGlobalMessage.bind(this)} />; // jshint ignore:line
      case 'Maintainagentupgrade':
        return <Maintainagentupgrade baseUrl={this.state.apiEndPoints.baseUrl} authToken={this.state.authToken} userId={this.state.userId} showGlobalMessage={this.showGlobalMessage.bind(this)} hideGlobalMessage={this.hideGlobalMessage.bind(this)} />; // jshint ignore:line
      case 'Maintainagentview':
        return <Maintainagentview baseUrl={this.state.apiEndPoints.baseUrl} authToken={this.state.authToken} userId={this.state.userId} showGlobalMessage={this.showGlobalMessage.bind(this)} hideGlobalMessage={this.hideGlobalMessage.bind(this)} />; // jshint ignore:line
      case 'Maintainwatchercreate':
        return <Maintainwatchercreate baseUrl={this.state.apiEndPoints.baseUrl} authToken={this.state.authToken} userId={this.state.userId} showGlobalMessage={this.showGlobalMessage.bind(this)} hideGlobalMessage={this.hideGlobalMessage.bind(this)} />; // jshint ignore:line
      case 'Maintainwatcherupgrade':
        return <Maintainwatcherupgrade baseUrl={this.state.apiEndPoints.baseUrl} authToken={this.state.authToken} userId={this.state.userId} showGlobalMessage={this.showGlobalMessage.bind(this)} hideGlobalMessage={this.hideGlobalMessage.bind(this)} />; // jshint ignore:line
      case 'Maintainwatcherview':
        return <Maintainwatcherview />; // jshint ignore:line
      case 'Monitor':
        return <Monitor />; // jshint ignore:line
      case 'Notification':
        return <Notification userId={this.state.userId} showGlobalMessage={this.showGlobalMessage.bind(this)} hideGlobalMessage={this.hideGlobalMessage.bind(this)} />; // jshint ignore:line
      case 'Alert':
        return <Alert userId={this.state.userId} showGlobalMessage={this.showGlobalMessage.bind(this)} hideGlobalMessage={this.hideGlobalMessage.bind(this)} />; // jshint ignore:line
      case 'Healthstatus':
        return <Healthstatus userId={this.state.userId} showGlobalMessage={this.showGlobalMessage.bind(this)} hideGlobalMessage={this.hideGlobalMessage.bind(this)} />; // jshint ignore:line
      case 'Report':
        return <Report />; // jshint ignore:line
      case 'Usermanagement':
        return <Usermanagement />; // jshint ignore:line
      case 'Support':
        return <Support />; // jshint ignore:line
      default:
        return null;
    }
  }

  changeView(changeViewTo){
    this.setState({
      currentView: changeViewTo
    });
  }

  showGlobalMessage(showLoader, showText, text, classname){
		this.setState({
			ajaxBusy:{
				flag: true,
        showLoader: showLoader,
        showText: showText,
        text: text,
        classname: classname
			}
    });
  }
  
  hideGlobalMessage(){
    this.setState({
      ajaxBusy: {
        flag: false,
        showLoader: false,
        showText: false,
        text: '',
        classname: ''
      }
    });
  }

  maxMinModal(){
    this.setState({
      maximizeModal: !this.state.maximizeModal
    });
  }

  render() {
    /* jshint ignore:start */
    return (
      <div className="App container">
        {
          this.state.maximizeModal ?
            <div className="modal" tabIndex="-1" role="dialog" id="dive_panel">
              <div className="modal-dialog modal-xl" role="document">
                <div className="modal-content">
                  {this.state.ajaxBusy.flag ?
                    <div className={"alert-notification alert "+ this.state.ajaxBusy.classname}>
                      {this.state.ajaxBusy.showLoader ?
                        <div className="ajaxBusy"></div>
                        : null
                      }
                      {this.state.ajaxBusy.showText ?
                        <p>{this.state.ajaxBusy.text}</p>
                        : null
                      }
                    </div>
                    : null
                  }
                
                  <div className="modal-body">
                    <Header maxMinModal={this.maxMinModal.bind(this)}></Header>
                    <Navbar currentView={this.state.currentView} clickEve={this.changeView.bind(this)}></Navbar>
                    <div className="col-md-12 dynamic-container">
                      { this.servedView() }
                    </div>
                  </div>
                </div>
              </div>
            </div> :
            <div className="modal minimized-modal">
              <div className="modal-dialog minimized-modal-dialog">
                <div className="modal-content">
                  <div className="modal-body">
                    <div className="row">
                      <div className="col-sm-10">
                        <img src="assets/static/images/GE_logo.svg" />
                        <img src="assets/static/images/ec-icon.png" width="100" height="60" />
                      </div>
                      <div className="col-sm-2 maximize-image-div">
                        <img onClick={this.maxMinModal.bind(this)} alt="maximize-window" src="assets/static/images/maximize.svg" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          }
        </div>
    );
    /* jshint ignore:end */
  }
}

import React from "react";
import ReactDOM from "react-dom";

import Dashboard from './Dashboard/Dashboard.js';
import View from './View/View.js';
import Maintain from './Maintain/Maintain.js';
import Maintainagentcreate from './Maintain/Maintainagentcreate.js';
import Maintainagentupgrade from './Maintain/Maintainagentupgrade.js';
import Maintainagentview from './Maintain/Maintainagentview.js';
import Maintainwatchercreate from './Maintain/Maintainwatchercreate.js';
import Maintainwatcherupgrade from './Maintain/Maintainwatcherupgrade.js';
import Maintainwatcherview from './Maintain/Maintainwatcherview.js';
import Monitor from './Monitor/Monitor.js';
import Report from './Report/Report.js';
import Settings from './Settings/Settings.js';
import Navbar from './Navbar/Navbar.js';
import Header from './Header/Header.js';
import Support from './Support/Support.js';

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
      maximizeModal: true
    };
  }

  servedView() {
    const currentView = this.state.currentView;
    switch(currentView) {
      case 'Dashboard':
        return <Dashboard />;
      case 'View':
        return <View showGlobalMessage={this.showGlobalMessage.bind(this)} hideGlobalMessage={this.hideGlobalMessage.bind(this)} />;
      case 'Maintain':
        return <Maintain />;
      case 'Maintainagentcreate':
        return <Maintainagentcreate showGlobalMessage={this.showGlobalMessage.bind(this)} hideGlobalMessage={this.hideGlobalMessage.bind(this)} />;
      case 'Maintainagentupgrade':
        return <Maintainagentupgrade showGlobalMessage={this.showGlobalMessage.bind(this)} hideGlobalMessage={this.hideGlobalMessage.bind(this)} />;
      case 'Maintainagentview':
        return <Maintainagentview />;
      case 'Maintainwatchercreate':
        return <Maintainwatchercreate />;
      case 'Maintainwatcherupgrade':
        return <Maintainwatcherupgrade />;
      case 'Maintainwatcherview':
        return <Maintainwatcherview />;
      case 'Monitor':
        return <Monitor />;
      case 'Report':
        return <Report />;
      case 'Settings':
        return <Settings />;
      case 'Support':
        return <Support />;
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
  }
}

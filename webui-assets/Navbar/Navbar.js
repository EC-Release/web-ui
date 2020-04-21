import React from "react";
import ReactDOM from "react-dom";

export default class Navbar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        /* jshint ignore:start */
        return (
            <nav className="navbar navbar-expand-lg navbar-light">
                <a className="navbar-brand pb-2" href="#">&nbsp;</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav lower-navbar">
                        <li className={this.props.currentView === 'Dashboard' ? 'nav-item active' : 'nav-item'}>
                            <a id="nav-dashboard" className="nav-link" href="#" onClick={this.props.clickEve.bind(this, 'Dashboard')}>
                                <img src={'assets/static/images/dashboard_icon.svg'} alt="nav-dashboard" />
                                Dashboard <span className="sr-only">(current)</span>
                            </a>
                        </li>
                        <li id="nav-view" className={this.props.currentView === 'View' ? 'nav-item active' : 'nav-item'}>
                            <a className="nav-link" href="#" onClick={this.props.clickEve.bind(this, 'View')}>
                                <img src={'assets/static/images/view_icon.svg'} alt="nav-view" />
                                View
                            </a>
                        </li>
                        <li id="nav-maintain" className={this.props.currentView === 'Maintain' || this.props.currentView === 'Maintainagentcreate'  || this.props.currentView === 'Maintainagentupgrade' || this.props.currentView === 'Maintainagentview' || this.props.currentView === 'Maintainwatchercreate'  || this.props.currentView === 'Maintainwatcherupgrade' || this.props.currentView === 'Maintainwatcherview' || this.props.currentView === 'Subscriptioncreate' || this.props.currentView === 'Subscriptionupgrade' || this.props.currentView === 'Groupcreate' || this.props.currentView === 'Groupupgrade' ? "nav-item dropdown active" : "nav-item dropdown"}>
                            <a className="nav-link" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> 
                                <img src={'assets/static/images/maintain_icon.svg'} alt="nav-maintain" />
                                Maintain 
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                <li className="dropdown-submenu">
                                    <a id="nav-subscription" className="dropdown-item" href="#">
                                        Subscriptions
                                    </a>
                                    <ul className="dropdown-menu">
                                        <li>
                                            <a id="nav-subscription-create" className="dropdown-item" onClick={this.props.clickEve.bind(this, 'Subscriptioncreate')} href="#">Create</a>
                                        </li>
                                        <li>
                                            <a id="nav-subscription-update-disable" className="dropdown-item" onClick={this.props.clickEve.bind(this, 'Subscriptionupgrade')} href="#">Update/Delete</a>
                                        </li>
                                    </ul>
                                </li>
                                <li className="dropdown-submenu">
                                    <a id="nav-group" className="dropdown-item" href="#">
                                        Groups
                                    </a>
                                    <ul className="dropdown-menu">
                                        <li>
                                            <a id="nav-group-create" className="dropdown-item" onClick={this.props.clickEve.bind(this, 'Groupcreate')} href="#">Create</a>
                                        </li>
                                        <li>
                                            <a id="nav-group-view-delete" className="dropdown-item" onClick={this.props.clickEve.bind(this, 'Groupupgrade')} href="#">View/Delete</a>
                                        </li>
                                    </ul>
                                </li>
                                <li className="dropdown-submenu">
                                    <a id="nav-agent" className="dropdown-item" href="#">
                                        Agents
                                    </a>
                                    <ul className="dropdown-menu">
                                        <li>
                                            <a id="nav-agent-create" className="dropdown-item" onClick={this.props.clickEve.bind(this, 'Maintainagentcreate')} href="#">Create</a>
                                        </li>
                                        {/*<li>
                                            <a id="nav-agent-update-disable" className="dropdown-item" onClick={this.props.clickEve.bind(this, 'Maintainagentupgrade')} href="#">Update/Disable</a>
                                        </li>
                                        <li>
                                            <a id="nav-agent-view" className="dropdown-item" onClick={this.props.clickEve.bind(this, 'Maintainagentview')} href="#">View</a>
                                        </li> */}
                                    </ul>
                                </li>
                                <li className="dropdown-submenu">
                                    <a className="dropdown-item" href="#">
                                        Watchers
                                    </a>
                                    <ul className="dropdown-menu">
                                        <li>
                                            <a className="dropdown-item" onClick={this.props.clickEve.bind(this, 'Maintainwatchercreate')} href="#">Create</a>
                                        </li>
                                        <li>
                                            <a className="dropdown-item" onClick={this.props.clickEve.bind(this, 'Maintainwatcherupgrade')} href="#">Update/Disable</a>
                                        </li>
                                        <li>
                                            <a className="dropdown-item" onClick={this.props.clickEve.bind(this, 'Maintainwatcherview')} href="#">View</a>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                        <li id="nav-monitor" className={this.props.currentView === 'Notification' || this.props.currentView === 'Alert' || this.props.currentView === 'Healthstatus' ? 'nav-item dropdown active' : 'nav-item dropdown'}>
                            <a className="nav-link" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> 
                                <img src={'assets/static/images/monitor_icon.svg'} alt="nav-monitor" />
                                Monitor
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                <li>
                                    <a id="nav-notification" className="dropdown-item" onClick={this.props.clickEve.bind(this, 'Notification')} href="#">
                                        Notifications
                                    </a>
                                </li>
                                <li>
                                    <a id="nav-alert" className="dropdown-item" onClick={this.props.clickEve.bind(this, 'Alert')} href="#">
                                        Alert
                                    </a>
                                </li>
                                <li>
                                    <a id="nav-healthStatus" className="dropdown-item" onClick={this.props.clickEve.bind(this, 'Healthstatus')} href="#">
                                        Health Status
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li className={this.props.currentView === 'Report' ? 'nav-item active' : 'nav-item'}>
                            <a className="nav-link" href="#" onClick={this.props.clickEve.bind(this, 'Report')}>
                                <img src={'assets/static/images/report_icon.svg'} alt="nav-report" />
                                Report
                            </a>
                        </li>
                        <li className={this.props.currentView === 'Usermanagement' ? 'nav-item dropdown active' : 'nav-item dropdown'}>
                            <a className="nav-link" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> 
                                <img src={'assets/static/images/settings_icon.svg'} alt="nav-settings" />
                                Settings
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                <li>
                                    <a className="dropdown-item" onClick={this.props.clickEve.bind(this, 'Usermanagement')} href="#">
                                        User Management
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li className={this.props.currentView === 'Support' ? 'nav-item active' : 'nav-item'}>
                            <a className="nav-link" href="#" onClick={this.props.clickEve.bind(this, 'Support')}>
                                <img src={'assets/static/images/support_icon.svg'} alt="nav-support" />
                                Support
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
        )
        /* jshint ignore:end */
    }
}
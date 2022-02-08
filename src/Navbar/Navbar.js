import React from "react";

import IconDashboard from "../assets/images/dashboard_icon.svg";
import IconMaintain from "../assets/images/maintain_icon.svg";
import IconMonitor from "../assets/images/monitor_icon.svg";
import IconReport from "../assets/images/report_icon.svg";
import IconSetting from "../assets/images/settings_icon.svg";
import IconSupport from "../assets/images/support_icon.svg";

export default class Navbar extends React.Component {
  /* istanbul ignore next */
  /* constructor(props) {
    super(props);
  } */

  /* istanbul ignore next */
  render() {
    /* jshint ignore:start */
    return (
      <nav className="navbar navbar-expand-lg navbar-light">
        <button className="navbar-brand pb-2">
          &nbsp;
        </button>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav lower-navbar">
            {this.props.permissions.accesses &&
            this.props.permissions.accesses.dashboard.haveAccess ? (
              <li
                className={
                  this.props.currentView === "Dashboard"
                    ? "nav-item active"
                    : "nav-item"
                }
              >
                <button
                  id="nav-dashboard"
                  className="nav-link"
                  onClick={this.props.clickEve.bind(this, "Dashboard")}
                >
                  <img src={IconDashboard} alt="nav-dashboard" />
                  Dashboard <span className="sr-only">(current)</span>
                </button>
              </li>
            ) : null}
            {this.props.permissions.accesses &&
            this.props.permissions.accesses.maintain.haveAccess ? (
              <li
                id="nav-maintain"
                className={
                  this.props.currentView === "Maintain" ||
                  this.props.currentView === "Maintainagentcreate" ||
                  this.props.currentView === "Maintainagentupgrade" ||
                  this.props.currentView === "Maintainagentview" ||
                  this.props.currentView === "Requestcreate" ||
                  this.props.currentView === "RequestUpgrade" ||
                  this.props.currentView === "RequestView" ||
                  this.props.currentView === "LicenseCreate" ||
                  this.props.currentView === "LicenseView" ||
                  this.props.currentView === "LicenseUpgrade" ||
                  this.props.currentView === "Groupcreate" ||
                  this.props.currentView === "Groupupgrade" ||
                  this.props.currentView === "GroupView"
                    ? "nav-item dropdown active"
                    : "nav-item dropdown"
                }
              >
                <button
                  className="nav-link"
                  id="navbarDropdownMenuLink"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <img src={IconMaintain} alt="nav-maintain" />
                  Maintain
                </button>
                <ul
                  className={
                    this.props.currentView === "Maintain" ||
                    this.props.currentView === "Maintainagentcreate" ||
                    this.props.currentView === "Maintainagentupgrade" ||
                    this.props.currentView === "Maintainagentview" ||
                    this.props.currentView === "Requestcreate" ||
                    this.props.currentView === "RequestUpgrade" ||
                    this.props.currentView === "RequestView" ||
                    this.props.currentView === "LicenseCreate" ||
                    this.props.currentView === "LicenseView" ||
                    this.props.currentView === "LicenseUpgrade" ||
                    this.props.currentView === "Groupcreate" ||
                    this.props.currentView === "Groupupgrade" ||
                    this.props.currentView === "GroupView"
                      ? "dropdown-menu"
                      : "dropdown-menu hide"
                  }
                  aria-labelledby="navbarDropdownMenuLink"
                >
                  {this.props.permissions.accesses.maintain.subMenus
                    .subscriptions.view ||
                  this.props.permissions.accesses.maintain.subMenus
                    .subscriptions.create ||
                  this.props.permissions.accesses.maintain.subMenus
                    .subscriptions.edit ||
                  this.props.permissions.accesses.maintain.subMenus
                    .subscriptions.delete ? (
                    <li className="dropdown-submenu">
                      <button
                        id="nav-subscription"
                        className="dropdown-item"
                      >
                        License
                      </button>
                      <ul className="dropdown-menu">
                        {this.props.permissions.accesses.maintain.subMenus
                          .subscriptions.create ? (
                          <li>
                            <button
                              id="nav-subscription-create"
                              className="dropdown-item"
                              onClick={this.props.clickEve.bind(
                                this,
                                "LicenseCreate"
                              )}
                            >
                              Create
                            </button>
                          </li>
                        ) : null}
                        {this.props.permissions.accesses.maintain.subMenus
                          .subscriptions.edit ||
                        this.props.permissions.accesses.maintain.subMenus
                          .subscriptions.delete ? (
                          <li>
                            <button
                              id="nav-subscription-update-disable"
                              className="dropdown-item"
                              onClick={this.props.clickEve.bind(
                                this,
                                "LicenseUpgrade"
                              )}
                            >
                              Update/Delete
                            </button>
                          </li>
                        ) : null}
                        {this.props.permissions.accesses.maintain.subMenus
                          .subscriptions.view ? (
                          <li>
                            <button
                              id="nav-subscription-view-disable"
                              className="dropdown-item"
                              onClick={this.props.clickEve.bind(
                                this,
                                "LicenseView"
                              )}
                            >
                              View
                            </button>
                          </li>
                        ) : null}
                      </ul>
                    </li>
                  ) : null}

                  {this.props.permissions.accesses.maintain.subMenus.groups
                    .view ||
                  this.props.permissions.accesses.maintain.subMenus.groups
                    .create ||
                  this.props.permissions.accesses.maintain.subMenus.groups
                    .edit ||
                  this.props.permissions.accesses.maintain.subMenus.groups
                    .delete ? (
                    <li className="dropdown-submenu">
                      <button id="nav-group" className="dropdown-item">
                        Groups
                      </button>
                      <ul className="dropdown-menu">
                        {this.props.permissions.accesses.maintain.subMenus
                          .groups.create ? (
                          <li>
                            <button
                              id="nav-group-create"
                              className="dropdown-item"
                              onClick={this.props.clickEve.bind(
                                this,
                                "Groupcreate"
                              )}
                            >
                              Create
                            </button>
                          </li>
                        ) : null}
                        {this.props.permissions.accesses.maintain.subMenus
                          .groups.edit ||
                        this.props.permissions.accesses.maintain.subMenus.groups
                          .delete ? (
                          <li>
                            <button
                              id="nav-group-view-delete"
                              className="dropdown-item"
                              onClick={this.props.clickEve.bind(
                                this,
                                "Groupupgrade"
                              )}
                            >
                              Update/Delete
                            </button>
                          </li>
                        ) : null}
                        {this.props.permissions.accesses.maintain.subMenus
                          .groups.view ? (
                          <li>
                            <button
                              id="nav-group-view-delete"
                              className="dropdown-item"
                              onClick={this.props.clickEve.bind(
                                this,
                                "GroupView"
                              )}
                            >
                              View
                            </button>
                          </li>
                        ) : null}
                      </ul>
                    </li>
                  ) : null}

                  {this.props.permissions.accesses.maintain.subMenus.agents
                    .create ? (
                    <li className="dropdown-submenu">
                      <button id="nav-agent" className="dropdown-item">
                        Launch Scripts
                      </button>
                      <ul className="dropdown-menu">
                        {this.props.permissions.accesses.maintain.subMenus
                          .agents.create ? (
                          <li>
                            <button
                              id="nav-agent-create"
                              className="dropdown-item"
                              onClick={this.props.clickEve.bind(
                                this,
                                "Maintainagentcreate"
                              )}
                            >
                              Create
                            </button>
                          </li>
                        ) : null}
                        <li>
                          <button
                            id="nav-agent-update-disable"
                            className="dropdown-item"
                            onClick={this.props.clickEve.bind(
                              this,
                              "Maintainagentupgrade"
                            )}
                          >
                            View
                          </button>
                        </li>
                        {/*  <li>
                                                <a id="nav-agent-view" className="dropdown-item" onClick={this.props.clickEve.bind(this, 'Maintainagentview')} href="#">View</a>
                                            </li>  */}
                      </ul>
                    </li>
                  ) : null}

                  {this.props.permissions.accesses.maintain.subMenus.watchers
                    .view ||
                  this.props.permissions.accesses.maintain.subMenus.watchers
                    .create ||
                  this.props.permissions.accesses.maintain.subMenus.watchers
                    .edit ||
                  this.props.permissions.accesses.maintain.subMenus.watchers
                    .delete ? (
                    <li className="dropdown-submenu">
                      <button className="dropdown-item">
                        Requests
                      </button>
                      <ul className="dropdown-menu">
                        {this.props.permissions.accesses.maintain.subMenus
                          .watchers.create ? (
                          <li>
                            <button
                              className="dropdown-item"
                              onClick={this.props.clickEve.bind(
                                this,
                                "Requestcreate"
                              )}
                            >
                              Create
                            </button>
                          </li>
                        ) : null}
                        {this.props.permissions.accesses.maintain.subMenus
                          .watchers.edit ||
                        this.props.permissions.accesses.maintain.subMenus
                          .watchers.delete ? (
                          <li>
                            <button
                              className="dropdown-item"
                              onClick={this.props.clickEve.bind(
                                this,
                                "RequestUpgrade"
                              )}
                            >
                              Update/Disable
                            </button>
                          </li>
                        ) : null}
                        {this.props.permissions.accesses.maintain.subMenus
                          .watchers.view ? (
                          <li>
                            <button
                              className="dropdown-item"
                              onClick={this.props.clickEve.bind(
                                this,
                                "RequestView"
                              )}
                            >
                              View
                            </button>
                          </li>
                        ) : null}
                      </ul>
                    </li>
                  ) : null}
                  {this.props.permissions.accesses.maintain.subMenus.watchers
                    .view ||
                  this.props.permissions.accesses.maintain.subMenus.watchers
                    .create ||
                  this.props.permissions.accesses.maintain.subMenus.watchers
                    .edit ||
                  this.props.permissions.accesses.maintain.subMenus.watchers
                    .delete ? (
                    <li className="dropdown-submenu">
                      <button className="dropdown-item">
                        Subscription
                      </button>
                      <ul className="dropdown-menu">
                        {this.props.permissions.accesses.maintain.subMenus
                          .watchers.create ? (
                          <li>
                            <button
                              className="dropdown-item"
                              onClick={this.props.clickEve.bind(
                                this,
                                "SubscriptionAdd"
                              )}
                            >
                              Add
                            </button>
                          </li>
                        ) : null}
                      </ul>
                    </li>
                  ) : null}
                </ul>
              </li>
            ) : null}

            {this.props.permissions.accesses &&
            this.props.permissions.accesses.monitor.haveAccess ? (
              <li
                id="nav-monitor"
                className={
                  this.props.currentView === "Notification" ||
                  this.props.currentView === "Alert" ||
                  this.props.currentView === "View"
                    ? "nav-item dropdown active"
                    : "nav-item dropdown"
                }
              >
                <button
                  className="nav-link"
                  id="navbarDropdownMenuLink1"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <img src={IconMonitor} alt="nav-monitor" />
                  Monitor
                </button>
                <ul
                  className={
                    this.props.currentView === "Notification" ||
                    this.props.currentView === "Alert" ||
                    this.props.currentView === "View"
                      ? "dropdown-menu"
                      : "dropdown-menu hide"
                  }
                  aria-labelledby="navbarDropdownMenuLink1"
                >
                  {this.props.permissions.accesses.monitor.subMenus
                    .notifications.view ? (
                    <li>
                      <button
                        id="nav-notification"
                        className="dropdown-item"
                        onClick={this.props.clickEve.bind(this, "Notification")}
                      >
                        Events
                      </button>
                    </li>
                  ) : null}
                  {/* {this.props.permissions.accesses.monitor.subMenus.alerts.view ?
                                    <li>
                                        <a id="nav-alert" className="dropdown-item" onClick={this.props.clickEve.bind(this, 'Alert')} href="#">
                                            Alerts
                                        </a>
                                    </li>
                                    :
                                    null} */}
                  {this.props.permissions.accesses.monitor.subMenus.healthStatus
                    .view ? (
                    <li>
                      <button
                        id="nav-healthStatus"
                        className="dropdown-item"
                        onClick={this.props.clickEve.bind(this, "View")}
                      >
                        Health Operations
                      </button>
                    </li>
                  ) : null}
                </ul>
              </li>
            ) : null}
            {this.props.permissions.accesses &&
            this.props.permissions.accesses.reports.haveAccess ? (
              <li
                className={
                  this.props.currentView === "Report"
                    ? "nav-item active"
                    : "nav-item"
                }
              >
                <button
                  className="nav-link"
                  onClick={this.props.clickEve.bind(this, "Report")}
                >
                  <img src={IconReport} alt="nav-report" />
                  Report
                </button>
              </li>
            ) : null}
            {this.props.permissions.accesses &&
            this.props.permissions.accesses.settings.haveAccess ? (
              <li
                className={
                  this.props.currentView === "Usermanagement" ||
                  this.props.currentView === "WebHooks" ||
                  this.props.currentView === "UserProfile"
                    ? "nav-item dropdown active"
                    : "nav-item dropdown"
                }
              >
                <button
                  className="nav-link"
                  id="navbarDropdownMenuLink2"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <img src={IconSetting} alt="nav-settings" />
                  Settings
                </button>
                <ul
                  className={
                    this.props.currentView === "Usermanagement" ||
                    this.props.currentView === "WebHooks" ||
                    this.props.currentView === "UserProfile"
                      ? "dropdown-menu"
                      : "dropdown-menu hide"
                  }
                  aria-labelledby="navbarDropdownMenuLink2"
                >
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={this.props.clickEve.bind(this, "WebHooks")}
                    >
                      Webhooks
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={this.props.clickEve.bind(this, "UserProfile")}
                    >
                      User Profile
                    </button>
                  </li>
                </ul>
              </li>
            ) : null}
            {this.props.permissions.accesses &&
            this.props.permissions.accesses.support.haveAccess ? (
              <li
                className={
                  this.props.currentView === "Support"
                    ? "nav-item active"
                    : "nav-item"
                }
              >
                <button
                  className="nav-link"
                  onClick={this.props.clickEve.bind(this, "Support")}
                >
                  <img src={IconSupport} alt="nav-support" />
                  Support
                </button>
              </li>
            ) : null}
          </ul>
        </div>
      </nav>
    );
    /* jshint ignore:end */
  }
}

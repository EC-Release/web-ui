import React from "react";
import $ from "jquery";

import IconGreenSortingDown from "../../assets/images/icon_greensortingdown.svg";
import IconInfo from "../../assets/images/info.svg";

export default class SubscriptionAdd extends React.Component {
  constructor(props) {
    super(props);
  }
  /* istanbul ignore next */

  /* istanbul ignore next */
  render() {
    /* jshint ignore:start */
    /* istanbul ignore next */
    return (
      /* istanbul ignore next */

      <div className="centered-div-header">
        <div className="row maintainagentcreate-header">
          <div className="col-md-12">
            <h6 id="maintainlicenseCreate-title">
              Share Subscription{" "}
              <small>
                One Subscription ID can be share among your team.
              </small>
            </h6>
          </div>
        </div>
        <hr></hr>
        <div className="changeable-form subscription-form">
          <div className="row">
            <div className="col-sm-6">
              <div className="col-sm-12 label required">Subscription ID</div>
              <div className="col-sm-12 mb-2">
                <input
                  type="text"
                  className="form-control form-control-sm"
                  name="licenseId"
                  readOnly={true}
                  /*  onChange={(event) => {
                          this.handleFormData(event);
                        }}*/
                />
              </div>
            </div>
            <div className="col-sm-6">
              <div className="col-sm-12 label required">
                SSO
                <span className="float-right help-text">
                  <img
                    alt="info"
                    src={IconInfo}
                    data-toggle="popover"
                    data-trigger="hover"
                    data-placement="top"
                  />
                </span>
              </div>
              <div className="col-sm-12 mb-2">
                <input
                  type="text"
                  autoComplete="off"
                  className="form-control form-control-sm"
                  name="date"
                />
                <small className="text-danger"></small>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
    /* jshint ignore:end */
  }
}

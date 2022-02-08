import React from "react";

import IconInfo from "../../assets/images/info.svg";

export default class SubscriptionAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      transactionForm: {
        revision: { value: "v1.2beta", dirtyState: false },
        transactionId: { value: "", dirtyState: false },
        oidcUserId: { value: "", dirtyState: false }
      }, 
      transactionFormIsValid: false,
      errorsForm : {},
    }
  }
  /* istanbul ignore next */
  handleFormData(e) {
    let currentForm = Object.assign({}, this.state.transactionForm);
    let updatedValue = e.target.value;
    currentForm.oidcUserId.value = updatedValue;
    currentForm.oidcUserId.dirtyState = true;

    this.setState({
      transactionForm: currentForm
    });
    this.handleFormValidation();

  }

  /* istanbul ignore next */
  handleFormValidation(){
    let formData  = this.state.transactionForm;
    let formIsValid = true;
    let errors = {};
    let oidcUserId = formData.oidcUserId;

    if(oidcUserId.value.trim() === ""){
      if (oidcUserId.dirtyState) {
        errors.oidcUserId = "Please enter SSO";
      }
      formIsValid = false;
    }
    this.setState({
      errorsForm:errors,
      transactionFormIsValid: formIsValid
    })
  }
  /* istanbul ignore next */
  shareSubscription(){
    this.props.showGlobalMessage(
      true,
      true,
      "Please wait...",
      "custom-success"
    );
    let currentForm = Object.assign({}, this.state.transactionForm);
    let prepareData = {};
    let url = this.props.baseUrl + currentForm.revision.value +"/trs/add/oidc-user-id";
   
    prepareData.trid  = currentForm.transactionId.value;
    prepareData.oidcUserId = currentForm.oidcUserId.value;
    prepareData.revision = currentForm.revision.value;
    

    console.log(prepareData);
    fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.props.authToken,
      },
      body: JSON.stringify(prepareData),
    })
      .then((response) => {
        if (response.status === 200) {
          //this.snapshotUpdate();
          response.json().then((respData) => {
            respData = {
              errorStatus: {
                status: "ok",
              },
            };
            if (respData.errorStatus.status === "ok") {
              this.props.showGlobalMessage(
                false,
                true,
                "Record saved successfully",
                "custom-success"
              );
              setTimeout(() => {
                this.props.hideGlobalMessage();
                let transactionForm =  {
                  revision: { value: "v1.2beta", dirtyState: false },
                  transactionId: { value: "", dirtyState: false },
                  oidcUserId: { value: "", dirtyState: false }
                };
                this.setState({
                  transactionForm: transactionForm,
                  transactionFormIsValid: false,
                });
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
  }
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
                  name="sso"
                  onChange={(event) => {
                    this.handleFormData(event);
                  }}
                />
                <small className="text-danger">
                  {this.state.errorsForm["oidcUserId"]}
                </small>
              </div>
            </div>
          </div>
          <div className="row">
                    <div className="col-sm-12 mb-2 text-center">
                      <button
                        id="create-subscription-btn"
                        disabled={!this.state.transactionFormIsValid}
                        onClick={this.shareSubscription.bind(this)}
                        className="btn btn-sm customize-view-btn"
                      >
                        CREATE SUBCRIPTION
                      </button>
                    </div>
                  </div>
        </div>
      </div>
    );
    /* jshint ignore:end */
  }
}

import React from "react";
import $ from 'jquery';

import IconGreenSortingDown from "../../assets/images/icon_greensortingdown.svg";
import IconInfo from "../../assets/images/info.svg";

export default class SubscriptionDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      objId: [
        { objName: "EC", objIndex: "1" },
        { objName: "TC", objIndex: "2" },
        { objName: "DIVE", objIndex: "3" },
        { objName: "GlobalScape", objIndex: "4" },
        { objName: "EKS-SMALL", objIndex: "5" },
        { objName: "EKS-MEDIUM", objIndex: "6" },
        { objName: "EKS_LARGE", objIndex: "7" },
        { objName: "EKS_XL", objIndex: "8" },
        { objName: "Tesla-Model-Y", objIndex: "9" },
      ],
      currencyId: [
        {name: "USD", id: "1"},
        {name: "INR", id: "2"},
        {name: "YEN", id: "3"},
        {name: "SDC", id: "4"}
      ],
      transactionForm: {
        revision: { value: "v1.2beta", dirtyState: false },
        licenseId: { value: "", dirtyState: false },
        objId: { value: "1", dirtyState: false },
        currencyId: { value: "1", dirtyState: false },
        eaAmount: { value: "1", dirtyState: false },
        qty : { value: "1", dirtyState: false },
        oidcUserId: { value: "", dirtyState: false },
        paymentVadStr1: { value: "", dirtyState: false },
        paymentVadStr2: { value: "", dirtyState: false },
        paymentVadStr3: { value: "", dirtyState: false },
      },      
      transactionFormIsValid: false,
      errorsForm : {},

    };
  }
  /* istanbul ignore next */
  componentDidMount() {
    let currentForm = Object.assign({}, this.state.transactionForm);

    this.props.showGlobalMessage(true, true, 'Please wait...', 'custom-success');
        if (sessionStorage.getItem("userData") !== null) {
          let userData =  JSON.parse(sessionStorage.getItem("userData"));
          console.log(userData);
          currentForm.licenseId.value = userData[0].license;
          currentForm.oidcUserId.value = userData[0].userId;
          this.setState({
            transactionForm: currentForm
          });
          this.props.hideGlobalMessage();
        }
  }

  handleFormData(e) {
    let currentForm = Object.assign({}, this.state.transactionForm);
    let fieldName = e.target.name;
    let updatedValue = e.target.value;
    /* if (fieldName === "licenseId") {
      currentForm.licenseId.value = updatedValue;
      currentForm.licenseId.dirtyState = true;
    }
    else if (fieldName === "objId") {
      currentForm.objId.value = updatedValue;
      currentForm.objId.dirtyState = true;
    }
    else if (fieldName === "currencyId") {
      currentForm.currencyId.value = updatedValue;
      currentForm.currencyId.dirtyState = true;
    }
    else if (fieldName === "eaAmount") {
      currentForm.eaAmount.value = isNaN(updatedValue)?currentForm.eaAmount.value:updatedValue;
      currentForm.eaAmount.dirtyState = true;
    }
    else if (fieldName === "qty") {
      currentForm.qty.value =  isNaN(updatedValue)?currentForm.qty.value:updatedValue;
      currentForm.qty.dirtyState = true;
    }
    else if (fieldName === "oidcUserId") {
      currentForm.oidcUserId.value = updatedValue;
      currentForm.oidcUserId.dirtyState = true;
    }
    else  */if (fieldName === "paymentVadStr1") {
      currentForm.paymentVadStr1.value = updatedValue;
      currentForm.paymentVadStr1.dirtyState = true;
    }
    else if (fieldName === "paymentVadStr2") {
      currentForm.paymentVadStr2.value = updatedValue;
      currentForm.paymentVadStr2.dirtyState = true;
    }

    this.setState({
      transactionForm: currentForm
    });
    this.handleFormValidation();
  }
  handleFormValidation(){
    let formData  = this.state.transactionForm;
    let formIsValid = true;
    let errors = {};
    let licenseId = formData.licenseId;
    let objId = formData.objId;
    let currencyId = formData.currencyId;
    let eaAmount = formData.eaAmount;
    let qty = formData.qty;
    let oidcUserId = formData.oidcUserId;
    let buc  = formData.paymentVadStr1;
    let adn = formData.paymentVadStr2;
    /* if(licenseId.value.trim() === ""){
      if (licenseId.dirtyState) {
        errors.licenseId = "Please enter license Id";
      }
      formIsValid = false;
    } */
    /* if(objId.value.trim() === ""){
      if (objId.dirtyState) {
        errors.objId = "Please enter Object";
      }
      formIsValid = false;
    }
    if(currencyId.value.trim() === ""){
      if (currencyId.dirtyState) {
        errors.currencyId = "Please enter Currency";
      }
      formIsValid = false;
    } */
    /* if(eaAmount.value.trim() === ""){
      if (eaAmount.dirtyState) {
        errors.eaAmount = "Please enter amount per each object";
      }
      formIsValid = false;
    }
    if(qty.value.trim() === ""){
      if (qty.dirtyState) {
        errors.qty = "Please enter Quantity";
      }
      formIsValid = false;
    }
    if(oidcUserId.value.trim() === ""){
      if (oidcUserId.dirtyState) {
        errors.oidcUserId = "Please enter OIDC User Id";
      }
      formIsValid = false;
    } */
    if(buc.value.trim() === ""){
      if (buc.dirtyState) {
        errors.paymentVadStr1 = "Please enter BUC";
      }
      formIsValid = false;
    }
    if(adn.value.trim() === ""){
      if (adn.dirtyState) {
        errors.paymentVadStr2 = "Please enter ADN";
      }
      formIsValid = false;
    }
    this.setState({
      errorsForm:errors,
      transactionFormIsValid: formIsValid
    })
  }

  createSubscription(){
    this.props.showGlobalMessage(
      true,
      true,
      "Please wait...",
      "custom-success"
    );
    let currentForm = Object.assign({}, this.state.transactionForm);
    let prepareData = {};
    let url = "https://ec-oauth-sso.run.aws-usw02-dev.ice.predix.io/"+ currentForm.revision.value +"/seeds";
   
    prepareData.licenseId = currentForm.licenseId.value;
    prepareData.objId = currentForm.objId.value;
    prepareData.currencyId = currentForm.currencyId.value
    prepareData.eaAmount = currentForm.eaAmount.value;
    prepareData.qty = currentForm.qty.value;
    prepareData.oidcUserId = currentForm.oidcUserId.value;
    prepareData.revision = currentForm.revision.value;
    prepareData.paymentVadStr1 = currentForm.paymentVadStr1.value;
    prepareData.paymentVadStr2 = currentForm.paymentVadStr2.value;
    prepareData.paymentVadStr3 = currentForm.paymentVadStr3.value;

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
            if (respData.errorStatus.status == "ok") {
              this.props.showGlobalMessage(
                false,
                true,
                "Record saved successfully",
                "custom-success"
              );
              setTimeout(() => {
                this.props.hideGlobalMessage();
                let transactionForm =  {
                  revision: { value: "", dirtyState: false },
                  licenseId: { value: "", dirtyState: false },
                  objId: { value: "1", dirtyState: false },
                  currencyId: { value: "1", dirtyState: false },
                  eaAmount: { value: "1", dirtyState: false },
                  qty : { value: "", dirtyState: false },
                  oidcUserId: { value: "", dirtyState: false },
                  paymentVadStr1: { value: "", dirtyState: false },
                  paymentVadStr2: { value: "", dirtyState: false },
                  paymentVadStr3: { value: "", dirtyState: false },
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
      <div className="Dashboard mt-4">
        {/* <div className="row">
          <div className="col-md-8 text-right">
            <p>
              You don't have any active subscription. Want to create new
              subscription.
            </p>
          </div>
          <div className="col-md-4">
            {/* <button className="btn btn-sm customize-view-btn">
              Create Subscription
            </button> }
          </div>
        </div> */}
        <div className="row licenseCreate">
          <div className="col-md-12 mt-2">
              <div className="centered-div-header">
                <div className="row maintainagentcreate-header">
                  <div className="col-md-12">
                    <h6 id="maintainlicenseCreate-title">
                      Create Your Subscription ID <small>One Subscription ID is all you need to access all services.</small>
                    </h6>
                  </div>
                </div>
                <hr></hr>
                <div className="changeable-form subscription-form">
                  {/* <div className="row">
                    <div className="col-sm-6">
                      <div className="col-sm-12 label required">
                        License Id
                        <img alt="down-arrow" src={IconGreenSortingDown} />
                        <span className="float-right help-text">
                          <img
                            alt="info"
                            src={IconInfo}
                            data-toggle="popover"
                            data-trigger="hover"
                            data-placement="top"
                            data-content={this.props.helpText.subscriptionName}
                          />
                        </span>
                      </div>
                      <div className="col-sm-12 mb-2">
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          name="licenseId"
                          value={this.state.transactionForm.licenseId.value}
                          onChange={(event) => {
                            this.handleFormData(event);
                          }}
                        />
                        <small className="text-danger">
                          {this.state.errorsForm["licenseId"]}
                        </small>
                      </div>
                    </div>
                    {/* <div className="col-sm-6">
                      <div className="col-sm-12 label required">
                        Object
                        <img alt="down-arrow" src={IconGreenSortingDown} />
                        <span className="float-right help-text">
                          <img
                            alt="info"
                            src={IconInfo}
                            data-toggle="popover"
                            data-trigger="hover"
                            data-placement="top"
                            data-content={this.props.helpText.objId}
                          />
                        </span>
                      </div>
                      <div className="col-sm-12 mb-2">
                        <select
                          className="form-control form-control-sm"
                          name="objId"
                          value={this.state.transactionForm.objId.value}
                          onChange={(event) => {
                            this.handleFormData(event);
                          }}
                        >
                          {this.state.objId.map(
                            (obj, objIndex) => {
                              return (
                                <option
                                  key={"objId" + objIndex}
                                  value={obj.objIndex}
                                >
                                  {obj.objName}
                                </option>
                              );
                            }
                          )}
                        </select>
                        <small className="text-danger">
                          {this.state.errorsForm["objId"]}
                        </small>
                      </div>
                    </div> 
                  </div> */}
                  {/* <div className="row">
                    <div className="col-sm-6">
                      <div className="col-sm-12 label required">
                        Currency
                        <img alt="down-arrow" src={IconGreenSortingDown} />
                        <span className="float-right help-text">
                          <img
                            alt="info"
                            src={IconInfo}
                            data-toggle="popover"
                            data-trigger="hover"
                            data-placement="top"
                            data-content={this.props.helpText.currencyId}
                          />
                        </span>
                      </div>
                      <div className="col-sm-12 mb-2">
                      <select
                          className="form-control form-control-sm"
                          name="currencyId"
                          value={this.state.transactionForm.currencyId.value}
                          onChange={(event) => {
                            this.handleFormData(event);
                          }}
                        >
                          {this.state.currencyId.map(
                            (currency, id) => {
                              return (
                                <option
                                  key={"currency" + id}
                                  value={currency.index}
                                >
                                  {currency.name}
                                </option>
                              );
                            }
                          )}
                        </select>
                        <small className="text-danger">
                          {this.state.errorsForm["currencyId"]}
                        </small>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="col-sm-12 label required">
                        The amount per each object
                        <img alt="down-arrow" src={IconGreenSortingDown} />
                        <span className="float-right help-text">
                          <img
                            alt="info"
                            src={IconInfo}
                            data-toggle="popover"
                            data-trigger="hover"
                            data-placement="top"
                            data-content={this.props.helpText.eaAmount}
                          />
                        </span>
                      </div>
                      <div className="col-sm-12 mb-2">
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          name="eaAmount"
                          value={this.state.transactionForm.eaAmount.value}
                          onChange={(event) => {
                            this.handleFormData(event);
                          }}
                        />
                        <small className="text-danger">
                          {this.state.errorsForm["eaAmount"]}
                        </small>
                      </div>
                    </div>
                  </div> */}
                  {/* <div className="row">
                    <div className="col-sm-6">
                      <div className="col-sm-12 label required">
                        Quantity
                        <img alt="down-arrow" src={IconGreenSortingDown} />
                        <span className="float-right help-text">
                          <img
                            alt="info"
                            src={IconInfo}
                            data-toggle="popover"
                            data-trigger="hover"
                            data-placement="top"
                            data-content={this.props.helpText.qty}
                          />
                        </span>
                      </div>
                      <div className="col-sm-12 mb-2">
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          name="qty"
                          value={this.state.transactionForm.qty.value}
                          onChange={(event) => {
                            this.handleFormData(event);
                          }}
                        />
                        <small className="text-danger">
                          {this.state.errorsForm["qty"]}
                        </small>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="col-sm-12 label required">
                        Revision
                        <img alt="down-arrow" src={IconGreenSortingDown} />
                        <span className="float-right help-text">
                          <img
                            alt="info"
                            src={IconInfo}
                            data-toggle="popover"
                            data-trigger="hover"
                            data-placement="top"
                            data-content={this.props.helpText.revision}
                          />
                        </span>
                      </div>
                      <div className="col-sm-12 mb-2">
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          name="licenseId"
                          value={this.state.transactionForm.revision.value}
                          onChange={(event) => {
                            this.handleFormData(event);
                          }}
                        />
                      </div>
                    </div>
                  </div> */}
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="col-sm-12 label required">
                        BUC
                        <img alt="down-arrow" src={IconGreenSortingDown} />
                        <span className="float-right help-text">
                          <img
                            alt="info"
                            src={IconInfo}
                            data-toggle="popover"
                            data-trigger="hover"
                            data-placement="top"
                            data-content={this.props.helpText.paymentVadStr1}
                          />
                        </span>
                      </div>
                      <div className="col-sm-12 mb-2">
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          name="paymentVadStr1"
                          value={this.state.transactionForm.paymentVadStr1.value}
                          onChange={(event) => {
                            this.handleFormData(event);
                          }}
                        />
                        <small className="text-danger">
                          {this.state.errorsForm["paymentVadStr1"]}
                        </small>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="col-sm-12 label required">
                        ADN
                        <img alt="down-arrow" src={IconGreenSortingDown} />
                        <span className="float-right help-text">
                          <img
                            alt="info"
                            src={IconInfo}
                            data-toggle="popover"
                            data-trigger="hover"
                            data-placement="top"
                            data-content= "Hello"/* {this.props.helpText.oidcUserId} */
                          />
                        </span>
                      </div>
                      <div className="col-sm-12 mb-2">
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          name="paymentVadStr2"
                          value={this.state.transactionForm.paymentVadStr2.value}
                          onChange={(event) => {
                          this.handleFormData(event);
                        }}
                        />
                        <small className="text-danger">
                          {this.state.errorsForm["paymentVadStr2"]}
                        </small>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-12 mb-2 text-center">
                      <button
                        id="create-subscription-btn"
                        disabled={!this.state.transactionFormIsValid}
                        onClick={this.createSubscription.bind(this)}
                        className="btn btn-sm customize-view-btn"
                      >
                        CREATE SUBCRIPTION
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            
          </div>
        </div>
      </div>
    );
    /* jshint ignore:end */
  }
}

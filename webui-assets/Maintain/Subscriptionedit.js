import React from "react";

export default class Subscriptionedit extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            subscriptionForm:{
                subscriptionName: { value: '', dirtyState: false },
                subscriptionId: { value: '', dirtyState: false },
                serviceUri: { value: '', dirtyState: false },
                clientId: { value: '', dirtyState: false },
                clientSecret: { value: '', dirtyState: false, type: 'password' },
                OAuth2: { value: '', dirtyState: false },
                adminToken: { value: '', dirtyState: false, type: 'password' },
                applicationRole: { value: '', dirtyState: false },
                bucAdn: { value: '', dirtyState: false },
                compliance: { value: '', dirtyState: false },
                confidentiality: { value: 'true', dirtyState: false },
                customer: { value: '', dirtyState: false },
                cluster: { value: '', dirtyState: false },
                date: { value: '', dirtyState: false },
                environment: { value: '', dirtyState: false },
                managementHostType: { value: '', dirtyState: false },
                optInoptOut: { value: 'true', dirtyState: false },
                preserve: { value: 'true', dirtyState: false },
                owner: { value: '', dirtyState: false },
                project: { value: '', dirtyState: false },
                security: { value: '', dirtyState: false },
                version: { value: '', dirtyState: false },
                app: { value: '', dirtyState: false },
                assetId: { value: '', dirtyState: false },
                uai: { value: '', dirtyState: false },
                developerId: { value: '', dirtyState: false },
                
                licenseId: { value: "", dirtyState: false },
                emailAddress: { value: "", dirtyState: false },
                sso: { value: "", dirtyState: false },
                date: { value: "", dirtyState: false },
                key:"",
		parent:"",
		name:""
            },
            errorsSubscriptionForm: {},
            subscriptionFormIsValid: false,
            confidentialities: [
                { name: 'True', id: 'true' },
                { name: 'False', id: 'false' }
            ],
            environments: [
                { name: 'DEV', id: 'DEV' },
                { name: 'TEST', id: 'TEST' },
                { name: 'STAGE', id: 'STAGE' },
                { name: 'PROD', id: 'PROD' }
            ],
            optInoptOuts: [
                { name: 'True', id: 'true' },
                { name: 'False', id: 'false' }
            ],
            preserves: [
                { name: 'True', id: 'true' },
                { name: 'False', id: 'false' }
            ],
        };
    }

    /* istanbul ignore next */
    componentDidMount() {
        let formData = Object.assign({}, this.props.editItemData);
        let subscriptionForm = {
            date: { value: formData.date, dirtyState: false },
            licenseId: { value: formData.licenseId, dirtyState: false },
            emailAddress: { value: formData.emailAddress, dirtyState: false },
            sso: { value: formData.sso, dirtyState: false },
            key : formData.key,
            parent : formData.parent,
            name : formData.name
        };

        this.setState({
            subscriptionForm: subscriptionForm,
        });
        window.enableToolTip();

        let that = this;
        setTimeout(function () {
            that.handleFormValidation();
        }, 1000);
    }

    /* istanbul ignore next */
    editSubscription(){
        this.props.showGlobalMessage(true, true, 'Please wait...', 'custom-success');
        let currentForm =  Object.assign({}, this.state.subscriptionForm);
        let prepareData = {};
        prepareData.licenseId = currentForm.licenseId.value;
        prepareData.emailAddress = currentForm.emailAddress.value;
        prepareData.sso = currentForm.sso.value;
        prepareData.date = currentForm.date.value;
        prepareData.parent = currentForm.parent;
        prepareData.name = currentForm.name;
	console.log(prepareData);

        fetch(this.props.baseUrl+ currentForm.key, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+this.props.authToken
            },
            body: JSON.stringify(prepareData)
        })
        .then((response) => {
            if (response.status === 200) {
                response.json().then((respData) => {
                    /* if(respData.errorStatus.status == 'ok'){ */
                        this.props.showGlobalMessage(false, true, 'Record saved successfully', 'custom-success');
                        this.props.handleDataTable(true);
                        setTimeout(()=> {
                            this.props.hideGlobalMessage();
                        }, 2000);
                 
                        let localData =  JSON.parse(localStorage.getItem("snapshotData"))
                        let allData =[]
                          Object.keys(localData).forEach((key)=> {
                              allData.push(localData[key])
                          });
                         
                          allData.forEach((item,index)=>{
                            if(item.parent){
                              if(item.key === currentForm.key){
                                item.licenseId = currentForm.licenseId.value;
                                item.emailAddress = currentForm.emailAddress.value;
                                item.sso = currentForm.sso.value;
                                item.date = currentForm.date.value;
                                item.parent = currentForm.parent;
                                item.name = currentForm.name;
                              }}
                          })
                localStorage.setItem("snapshotData", JSON.stringify(allData))
                });
            }
            else{
                this.props.showGlobalMessage(true, true, 'Please try after sometime', 'custom-danger');
                setTimeout(()=> {
                    this.props.hideGlobalMessage();
                }, 2000);
            }
        })
        .catch((err) => {
            console.log(err);
            this.props.showGlobalMessage(true, true, 'Please try after sometime', 'custom-danger');
            setTimeout(()=> {
                this.props.hideGlobalMessage();
            }, 2000);
        });
    }

    /* istanbul ignore next */
    handleFormValidation(){

        let currentFormData = this.state.subscriptionForm;
        let licenseId = currentFormData.licenseId.value;
        let licenseIdDirtyState = currentFormData.licenseId.dirtyState;
        let emailAddress = currentFormData.emailAddress.value;
        let emailAddressDirtyState = currentFormData.emailAddress.dirtyState;
        let expdate = currentFormData.date.value;
        let expdateDirtyState = currentFormData.date.dirtyState;

        let formIsValid = true;
        let errors = {};
        let urlRegExp =  /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;

        if (licenseId.trim() === "") {
            if (licenseIdDirtyState) {
              errors.licenseId = "Please enter License Id";
            }
            formIsValid = false;
          }
      
          if (emailAddress.trim() === "") {
            if (emailAddressDirtyState) {
              errors.emailAddress = "Please enter Email Address";
            }
            formIsValid = false;
          }
      
          if (expdate.trim() === "") {
            if (expdateDirtyState) {
              errors.date = "Please enter Expiry Date";
            }
            formIsValid = false;
          }

        this.setState({
			subscriptionFormIsValid: formIsValid,
			errorsSubscriptionForm: errors
		});
    }

    /* istanbul ignore next */
    handleFormData(e){
        let fieldName = e.target.name;
        let updatedValue = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        let currentForm =  Object.assign({}, this.state.subscriptionForm);

         if (fieldName === "licenseId") {
            currentForm.licenseId.value = updatedValue;
            currentForm.licenseId.dirtyState = true;
          } else if (fieldName === "emailAddress") {
            currentForm.emailAddress.value = updatedValue;
            currentForm.emailAddress.dirtyState = true;
          } else if (fieldName === "sso") {
            currentForm.sso.value = updatedValue;
            currentForm.sso.dirtyState = true;
          } else if (fieldName === "date") {
            currentForm.date.value = updatedValue;
            currentForm.date.dirtyState = true;
          }
        this.setState({
            subscriptionForm: currentForm
        });
        this.handleFormValidation();
    }

    /* istanbul ignore next */
    showHideField(e, formName, fieldName){
        let currentForm = Object.assign({}, this.state.subscriptionForm);

        if(currentForm[fieldName].type == 'password'){
            currentForm[fieldName].type = 'text'; 
        }
        else{
            currentForm[fieldName].type = 'password';
        }
        
        this.setState({
            subscriptionForm: currentForm
        });
    }

    render() {
        /* jshint ignore:start */
        /* istanbul ignore next */
        return (
            <div className="row Subscriptioncreate">
                <div className="col-md-12 mt-2">
                    <div className="centered-div">
                        <div className="centered-div-header">
                            <div className="row maintainagentcreate-header">
                                <div className="col-md-12">
                                      {this.props.isViewOnly ? 
                                      <h6 id="maintainsubscriptioncreate-title">View Subscription <small>View parameters.</small></h6> :
                                      <h6 id="maintainsubscriptioncreate-title">Edit Subscription <small>Creating parameters.</small></h6> }
                                </div>
                            </div>
                            <hr></hr>
                            <div className="changeable-form subscription-form">
                <div className="row">
                  <div className="col-sm-6">
                    <div className="col-sm-12 label required">
                      LICENSE ID
                      <img
                        alt="down-arrow"
                        src="assets/static/images/icon_greensortingdown.svg"
                      />
                      <span className="float-right help-text">
                        <img
                          alt="info"
                          src="assets/static/images/info.svg"
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
                        disabled={this.props.isViewOnly}
                        value={this.state.subscriptionForm.licenseId.value}
                        onChange={(event) => {
                          this.handleFormData(event);
                        }}
                      />
                      <small className="text-danger">
                        {this.state.errorsSubscriptionForm["licenseId"]}
                      </small>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="col-sm-12 label required">
                      EMAIL ADDRESS
                      <img
                        alt="down-arrow"
                        src="assets/static/images/icon_greensortingdown.svg"
                      />
                      <span className="float-right help-text">
                        <img
                          alt="info"
                          src="assets/static/images/info.svg"
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
                        name="emailAddress"
                        disabled={this.props.isViewOnly}
                        value={this.state.subscriptionForm.emailAddress.value}
                        onChange={(event) => {
                          this.handleFormData(event);
                        }}
                      />
                      <small className="text-danger">
                        {this.state.errorsSubscriptionForm["emailAddress"]}
                      </small>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-6">
                    <div className="col-sm-12 label required">
                      EXPIRY
                      <img
                        alt="down-arrow"
                        src="assets/static/images/icon_greensortingdown.svg"
                      />
                      <span className="float-right help-text">
                        <img
                          alt="info"
                          src="assets/static/images/info.svg"
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
                        name="date"
                        disabled={this.props.isViewOnly}
                        value={this.state.subscriptionForm.date.value}
                        onChange={(event) => {
                          this.handleFormData(event);
                        }}
                      />
                      <small className="text-danger">
                        {this.state.errorsSubscriptionForm["date"]}
                      </small>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="col-sm-12 label required">
                      SSO
                      <img
                        alt="down-arrow"
                        src="assets/static/images/icon_greensortingdown.svg"
                      />
                      <span className="float-right help-text">
                        <img
                          alt="info"
                          src="assets/static/images/info.svg"
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
                        name="sso"
                        disabled={this.props.isViewOnly}
                        value={this.state.subscriptionForm.sso.value}
                        onChange={(event) => {
                          this.handleFormData(event);
                        }}
                      />
                      <small className="text-danger">
                        {this.state.errorsSubscriptionForm["sso"]}
                      </small>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-12 mb-2 text-center">
                    {!this.props.isViewOnly ? (
                      <button
                        id="create-subscription-btn"
                        disabled={!this.state.subscriptionFormIsValid}
                        onClick={this.editSubscription.bind(this)}
                        className="btn btn-sm customize-view-btn"
                      >
                        EDIT SUBSCRIPTION
                      </button>
                    ) : null}
                    <button
                      onClick={this.props.changeView.bind(this)}
                      className="btn btn-sm customize-view-btn ml-2"
                    >
                      BACK
                    </button>
                  </div>
                </div>
              </div>

                            </div>
                    </div>
                </div>
            </div>
        )
        /* jshint ignore:end */
    }
}

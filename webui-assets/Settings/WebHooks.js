import React from "react";

export default class WebHooks extends React.Component {
   /* istanbul ignore next */
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        name: { value: "", dirtyState: false },
        eventType: { value: "", dirtyState: false },
        endpoint: { value: "", dirtyState: false },
        secret: { value: "", dirtyState: false, type: "password" },
      },
      errorsForm: {},
      formIsValid: false,
    };
  }
  
   /* istanbul ignore next */
  handleFormData(e) {
    let fieldName = e.target.name;
    let updatedValue =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    let currentForm = Object.assign({}, this.state.formData);

    if (fieldName === "eventType") {
      currentForm.eventType.value = updatedValue;
      currentForm.eventType.dirtyState = true;
    } else if (fieldName === "endpoint") {
      currentForm.endpoint.value = updatedValue;
      currentForm.endpoint.dirtyState = true;
    } else if (fieldName === "name") {
      currentForm.name.value = updatedValue;
      currentForm.name.dirtyState = true;
    }else if (fieldName === "secret") {
      currentForm.secret.value = updatedValue;
      currentForm.secret.dirtyState = true;
    }

    this.setState({
      formData: currentForm,
    });
    this.handleFormValidation();
  }

  /* istanbul ignore next */
  handleFormValidation() {
    let currentFormData = this.state.formData;
    let nameValue = currentFormData.name.value;
    let nameDirtyState = currentFormData.name.dirtyState;
    let endpointValue = currentFormData.endpoint.value;
    let endpointDirtyState = currentFormData.endpoint.dirtyState;
    let eventTypeValue = currentFormData.eventType.value;
    let eventTypeDirtyState = currentFormData.eventType.dirtyState;
    let secretValue = currentFormData.secret.value;
    let secretDirtyState = currentFormData.secret.dirtyState;
    let formIsValid = true;
    let errors = {};

    if (nameValue.trim() === "") {
      if (nameDirtyState) errors.name = "Please enter Name";
      formIsValid = false;
    }

    if (endpointValue.trim() === "") {
      if (endpointDirtyState) errors.endpoint = "Please enter Api Endpoint";
      formIsValid = false;
    }

    if (eventTypeValue.trim() === "") {
      if (eventTypeDirtyState) errors.eventType = "Please enter Event Type";
      formIsValid = false;
    }

    if (secretValue.trim() === "") {
      if (secretDirtyState) errors.secret = "Please enter Secret";
      formIsValid = false;
    }

    this.setState({
      formIsValid: formIsValid,
      errorsForm: errors,
    });
  }
 /* istanbul ignore next */
  createNotification() {
    this.props.showGlobalMessage(
      false,
      true,
      "Record saving initiated. Please check after some time.",
      "custom-success"
    );
    let currentForm = Object.assign({}, this.state.formData);
    let prepareData = {};
    prepareData.name = currentForm.name.value;
    prepareData.eventType = currentForm.eventType.value;
    prepareData.endpoint = currentForm.endpoint.value;
    console.log(prepareData);
    this.props.hideGlobalMessage();
  }

   /* istanbul ignore next */
   showHideField(e, fieldName) {
    let currentForm = {};
     currentForm = Object.assign({}, this.state.formData);

    if (currentForm[fieldName].type == "password") {
      currentForm[fieldName].type = "text";
    } else {
      currentForm[fieldName].type = "password";
    }

      this.setState({
        formData: currentForm,
      });

  }


  render() {
    /* jshint ignore:start */
    return (
      <div className="row web-hook">
        <div className="col-md-12 mt-2">
          <div className="centered-div">
            <div className="centered-div-header">
              <div className="row WebHooks-header">
                <div className="col-md-12">
                  <h6 id="WebHooks-title">
                    Web Hooks
                     <small> Creating Parameters.</small>
                  </h6>
                </div>
              </div>
              <hr></hr>
              <div className="changeable-form group-form">
                <div className="row">
                  <div className="col-sm-6">
                    <div className="col-sm-12 label required">
                      NAME
                      <img
                        alt="down-arrow"
                        src="assets/static/images/icon_greensortingdown.svg"
                      />
                    </div>
                    <div className="col-sm-12 mb-2">
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        name="name"
                        value={this.state.formData.name.value}
                        onChange={(event) => {
                          this.handleFormData(event);
                        }}
                      />
                      <small className="text-danger">
                        {this.state.errorsForm["name"]}
                      </small>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="col-sm-12 label required">
                      EVENT TYPE
                      <img
                        alt="down-arrow"
                        src="assets/static/images/icon_greensortingdown.svg"
                      />
                    </div>
                    <div className="col-sm-12 mb-2">
                      <select 
                          className="form-control form-control-sm" 
                          name="eventType" 
                          value={this.state.formData.eventType.value}
                          onChange={(event)=>{this.handleFormData(event)}}>
                              <option value="" >Choose an event </option>
                              <option value="push" >Just a push event </option>
                              <option value="sendAll" >Send me everything </option>
                              <option value="selectIndividual" >Let me select individual event</option>
                      </select>
                      <small className="text-danger">
                        {this.state.errorsForm["eventType"]}
                      </small>
                    </div>
                  </div>
                 
                </div>
                <div className="row">
                <div className="col-sm-6">
                      <div className="col-sm-12 label required">
                        SECRET
                        <img
                          alt="down-arrow"
                          src="assets/static/images/icon_greensortingdown.svg"
                        />
                        {this.state.formData.secret.type == "password" ? (
                          <i
                            onClick={(event) => {
                              this.showHideField(event, "secret");
                            }}
                            className="fa fa-eye cursor-pointer"
                            title="Show"
                          ></i>
                        ) : (
                          <i
                            onClick={(event) => {
                              this.showHideField(event, "secret");
                            }}
                            className="fa fa-eye-slash cursor-pointer"
                            title="Hide"
                          ></i>
                        )}
                      </div>
                      <div className="col-sm-12 mb-2">
                        <input
                          type={this.state.formData.secret.type}
                          autoComplete="off"
                          className="form-control form-control-sm"
                          name="secret"
                          value={this.state.formData.secret.value}
                          onChange={(event) => {
                            this.handleFormData(event);
                          }}
                        />
                        <small className="text-danger">
                          {this.state.errorsForm["secret"]}
                        </small>
                      </div>
                    </div>

                    <div className="col-sm-6">
                    <div className="col-sm-12 label required">
                      TARGET ENDPOINT
                      <img
                        alt="down-arrow"
                        src="assets/static/images/icon_greensortingdown.svg"
                      />
                    </div>
                    <div className="col-sm-12 mb-2">
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        name="endpoint"
                        value={this.state.formData.endpoint.value}
                        onChange={(event) => {
                          this.handleFormData(event);
                        }}
                      />
                      <small className="text-danger">
                        {this.state.errorsForm["endpoint"]}
                      </small>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-12 mb-2 text-center">
                    <button
                      id="create-group-btn"
                      disabled={!this.state.formIsValid}
                      onClick={this.createNotification.bind(this)}
                      className="btn btn-sm customize-view-btn"
                    >
                      CREATE WEBHOOKS
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

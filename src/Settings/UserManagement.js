import React from "react";
import  IconGreenSortingDown from '../assets/images/icon_greensortingdown.svg';
import IconEdit from '../assets/images/iconedit_tablemaintainmonitor.svg';
import IconDelete from '../assets/images/icondelete_tablemaintainmonitor.svg';
import IconTable from '../assets/images/icon_tablemaintainmonitor.svg';
import IconPlus from '../assets/images/plus.svg';

export default class UserManagement extends React.Component {
  /* istanbul ignore next */
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        name: { value: "", dirtyState: false },
        sso: { value: "", dirtyState: false },
        email: { value: "", dirtyState: false },
        makerSso: { value: "", dirtyState: false, type: "password" },
      },
      errorsForm: {},
      formIsValid: false,
      showForm: false,
      Users: [],
    };
  }

  /* istanbul ignore next */
  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/todos/1", {
      // Get gateways
      method: "GET",
    }).then((response) => {
      if (response.status === 200) {
        response.json().then((user) => {
          user = [
            {
              name: "Adam johnson",
              sso: "312042341",
              email: "adam.Johnson@ge.com",
              makersso: "31232341",
            },
            {
              name: "Mark Wood",
              sso: "21312341",
              email: "mark.wood@ge.com",
              makersso: "31232341",
            },
            {
              name: "Mary Lou",
              sso: "50213012",
              email: "mary.lou@ge.com",
              makersso: "31232341",
            },
          ];
          this.setState({
            Users: user,
          });
          console.log(this.state.users);
        });
      }
    });
  }

  /* istanbul ignore next */
  handleFormData(e) {
    let fieldName = e.target.name;
    let updatedValue =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    let currentForm = Object.assign({}, this.state.formData);

    if (fieldName === "sso") {
      currentForm.sso.value = updatedValue;
      currentForm.sso.dirtyState = true;
    } else if (fieldName === "email") {
      currentForm.email.value = updatedValue;
      currentForm.email.dirtyState = true;
    } else if (fieldName === "name") {
      currentForm.name.value = updatedValue;
      currentForm.name.dirtyState = true;
    } else if (fieldName === "makerSso") {
      currentForm.makerSso.value = updatedValue;
      currentForm.makerSso.dirtyState = true;
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
    let emailValue = currentFormData.email.value;
    let emailDirtyState = currentFormData.email.dirtyState;
    let ssoValue = currentFormData.sso.value;
    let ssoDirtyState = currentFormData.sso.dirtyState;
    let makerSsoValue = currentFormData.makerSso.value;
    let makerSsoDirtyState = currentFormData.makerSso.dirtyState;
    let formIsValid = true;
    let errors = {};

    if (nameValue.trim() === "") {
      if (nameDirtyState) errors.name = "Please enter Name";
      formIsValid = false;
    }

    if (emailValue.trim() === "") {
      if (emailDirtyState) errors.email = "Please enter a valid Email Address ";
      formIsValid = false;
    }

    if (ssoValue.trim() === "") {
      if (ssoDirtyState) errors.sso = "Please enter User SSO";
      formIsValid = false;
    }

    if (makerSsoValue.trim() === "") {
      if (makerSsoDirtyState) errors.makerSso = "Please enter Maker SSO";
      formIsValid = false;
    }

    this.setState({
      formIsValid: formIsValid,
      errorsForm: errors,
    });
  }
  /* istanbul ignore next */
  createUser() {
    this.props.showGlobalMessage(
      false,
      true,
      "Record saving initiated. Please check after some time.",
      "custom-success"
    );
    let currentForm = Object.assign({}, this.state.formData);
    let prepareData = {};
    prepareData.name = currentForm.name.value;
    prepareData.sso = currentForm.sso.value;
    prepareData.email = currentForm.email.value;
    console.log(prepareData);
    this.props.hideGlobalMessage();
    this.setState({
      showForm: false,
    });
  }

  /* istanbul ignore next */
  showHideField(e, fieldName) {
    let currentForm = {};
    currentForm = Object.assign({}, this.state.formData);

    if (currentForm[fieldName].type === "password") {
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
    /* istanbul ignore next */
    return (
      <div className="row web-hook">
        {this.state.showForm ? (
          <div className="col-md-12 mt-2">
            <div className="centered-div">
              <div className="centered-div-header">
                <div className="row WebHooks-header">
                  <div className="col-md-12">
                    <h6 id="WebHooks-title text-blue">
                      User Management
                      <span className="text-black"> Add Users</span>
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
                          src={IconGreenSortingDown}
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
                        USER SSO
                        <img
                          alt="down-arrow"
                          src={IconGreenSortingDown}
                        />
                      </div>
                      <div className="col-sm-12 mb-2">
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          name="sso"
                          value={this.state.formData.sso.value}
                          onChange={(event) => {
                            this.handleFormData(event);
                          }}
                        />
                        <small className="text-danger">
                          {this.state.errorsForm["sso"]}
                        </small>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="col-sm-12 label required">
                        Email Address
                        <img
                          alt="down-arrow"
                          src={IconGreenSortingDown}
                        />
                      </div>
                      <div className="col-sm-12 mb-2">
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          name="email"
                          value={this.state.formData.email.value}
                          onChange={(event) => {
                            this.handleFormData(event);
                          }}
                        />
                        <small className="text-danger">
                          {this.state.errorsForm["email"]}
                        </small>
                      </div>
                    </div>

                    <div className="col-sm-6">
                      <div className="col-sm-12 label required">
                        Maker SSO
                        <img
                          alt="down-arrow"
                          src={IconGreenSortingDown}
                        />
                      </div>
                      <div className="col-sm-12 mb-2">
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          name="makerSso"
                          value={this.state.formData.makerSso.value}
                          onChange={(event) => {
                            this.handleFormData(event);
                          }}
                        />
                        <small className="text-danger">
                          {this.state.errorsForm["makerSso"]}
                        </small>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-sm-12 mb-2 text-center">
                      <button
                        id="create-group-btn"
                        disabled={!this.state.formIsValid}
                        onClick={this.createUser.bind(this)}
                        className="btn btn-sm customize-view-btn"
                      >
                        ADD USER
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="row">
            <div className="col-md-12 mt-2">
              <div className="centered-div">
                <div className="centered-div-header">
                  <div className="row mt-2 mb-2 WebHooks-header">
                    <div className="col-md-8">
                      <h6 id="WebHooks-title">User Management</h6>
                    </div>
                    <div className="col-md-4 text-right">
                      <button
                        onClick={() => this.setState({ showForm: true })}
                        className="btn btn-sm customize-view-btn"
                      >
                        Add User
                      </button>
                    </div>
                  </div>
                  <hr />
                  <div className="row small">
                    <div className="col-sm-12 text-center">
                      <table className="table ">
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>SSO</th>
                            <th>Email Address</th>
                            <th>Maker SSO</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.Users.map((user, key) => {
                            return (
                              <tr key={"user" + key}>
                                <td>{user.name} </td>
                                <td>{user.sso} </td>
                                <td> {user.email}</td>
                                <td>{user.makersso} </td>
                                <td>
                                  <span className="action-img">
                                    <img
                                      alt="plus-icon"
                                      title=""
                                      src={IconPlus}
                                    />
                                    <img
                                      alt="edit-icon"
                                      title="Edit"
                                      src={IconEdit}
                                    />
                                    <img
                                      alt="-icon"
                                      title=""
                                      src={IconTable}
                                    />
                                    <img
                                      alt="delete-icon"
                                      title="Delete"
                                      src={IconDelete}
                                    />
                                  </span>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
    /* jshint ignore:end */
  }
}

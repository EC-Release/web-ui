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
                developerId: { value: '', dirtyState: false } 
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
            subscriptionName: { value: formData.subscriptionName, dirtyState: false },
            subscriptionId: { value: formData.subscriptionId, dirtyState: false },
            serviceUri: { value: formData.serviceUri, dirtyState: false },
            clientId: { value: formData.clientId, dirtyState: false },
            clientSecret: { value: formData.clientSc, dirtyState: false, type: 'password' },
            OAuth2: { value: formData.uaaUrl, dirtyState: false },
            adminToken: { value: formData.adminToken, dirtyState: false, type: 'password' },
            applicationRole: { value: formData.role, dirtyState: false },
            bucAdn: { value: formData.bucAdn, dirtyState: false },
            compliance: { value: formData.compliance, dirtyState: false },
            confidentiality: { value: formData.confidentiality, dirtyState: false },
            customer: { value: formData.customer, dirtyState: false },
            cluster: { value: formData.cluster, dirtyState: false },
            date: { value: formData.date, dirtyState: false },
            environment: { value: formData.env, dirtyState: false },
            managementHostType: { value: formData.managementHostType, dirtyState: false },
            optInoptOut: { value: formData.optInoptOut, dirtyState: false },
            preserve: { value: formData.preserve, dirtyState: false },
            owner: { value: formData.owner, dirtyState: false },
            project: { value: formData.project, dirtyState: false },
            security: { value: formData.security, dirtyState: false },
            version: { value: formData.version, dirtyState: false },
            app: { value: formData.app, dirtyState: false },
            assetId: { value: formData.assetId, dirtyState: false },
            uai: { value: formData.uai, dirtyState: false },
            developerId: { value: formData.developerId, dirtyState: false } 
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

        prepareData.subscriptionName = currentForm.subscriptionName.value;
        prepareData.subscriptionId = currentForm.subscriptionId.value;
        prepareData.serviceUri = currentForm.serviceUri.value;
        prepareData.clientId = currentForm.clientId.value;
        prepareData.clientSc = currentForm.clientSecret.value;
        prepareData.uaaUrl = currentForm.OAuth2.value;
        prepareData.adminToken = currentForm.adminToken.value;
        prepareData.role = currentForm.applicationRole.value;
        prepareData.bucAdn = currentForm.bucAdn.value;
        prepareData.compliance = currentForm.compliance.value;
        prepareData.confidentiality = currentForm.confidentiality.value;
        prepareData.customer = currentForm.customer.value;
        prepareData.cluster = currentForm.cluster.value;
        prepareData.date = currentForm.date.value;
        prepareData.env = currentForm.environment.value;
        prepareData.managementHostType = currentForm.managementHostType.value;
        prepareData.optInoptOut = currentForm.optInoptOut.value;
        prepareData.preserve = currentForm.preserve.value;
        prepareData.owner = currentForm.owner.value;
        prepareData.project = currentForm.project.value;
        prepareData.security = currentForm.security.value;
        prepareData.version = currentForm.version.value;
        prepareData.app = currentForm.app.value;
        prepareData.assetId = currentForm.assetId.value;
        prepareData.uai = currentForm.uai.value;
        prepareData.developerId = currentForm.developerId.value; 

        fetch(this.props.baseUrl+'/updateSubscription', {
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
                    if(respData.errorStatus.status == 'ok'){
                        this.props.showGlobalMessage(false, true, 'Record saved successfully', 'custom-success');
                        this.props.handleDataTable(true);
                        setTimeout(()=> {
                            this.props.hideGlobalMessage();
                        }, 2000);
                    }
                    else{
                        this.props.showGlobalMessage(true, true, respData.errorStatus.statusMsg, 'custom-danger');
                        setTimeout(()=> {
                            this.props.hideGlobalMessage();
                        }, 2000);
                    }
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
        let subscriptionNameValue = currentFormData.subscriptionName.value;
        let subscriptionNameDirtyState = currentFormData.subscriptionName.dirtyState;
        let subscriptionIdValue = currentFormData.subscriptionId.value;
        let subscriptionIdDirtyState = currentFormData.subscriptionId.dirtyState;
        let serviceUriValue = currentFormData.serviceUri.value;
        let serviceUriDirtyState = currentFormData.serviceUri.dirtyState;
        let clientIdValue = currentFormData.clientId.value;
        let clientIdDirtyState = currentFormData.clientId.dirtyState;
        let clientSecretValue = currentFormData.clientSecret.value;
        let clientSecretDirtyState = currentFormData.clientSecret.dirtyState;
        let OAuth2Value = currentFormData.OAuth2.value;
        let OAuth2DirtyState = currentFormData.OAuth2.dirtyState;
        let adminTokenValue = currentFormData.adminToken.value;
        let adminTokenDirtyState = currentFormData.adminToken.dirtyState;
        let applicationRoleValue = currentFormData.applicationRole.value;
        let applicationRoleDirtyState = currentFormData.applicationRole.dirtyState;
        let bucAdnValue = currentFormData.bucAdn.value;
        let bucAdnDirtyState = currentFormData.bucAdn.dirtyState;
        let complianceValue = currentFormData.compliance.value;
        let complianceDirtyState = currentFormData.compliance.dirtyState;
        let customerValue = currentFormData.customer.value;
        let customerDirtyState = currentFormData.customer.dirtyState;
        let ownerValue = currentFormData.owner.value;
        let ownerDirtyState = currentFormData.owner.dirtyState;
        let formIsValid = true;
        let errors = {};
        let urlRegExp =  /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;

        if(subscriptionNameValue.trim() === ''){
            if(subscriptionNameDirtyState)
                errors.subscriptionName = 'Please enter Subscription Name';
            formIsValid = false;
        }

        if(subscriptionIdValue.trim() === ''){
            if(subscriptionIdDirtyState)
                errors.subscriptionId = 'Please enter Subscription ID';
            formIsValid = false;
        }

        if(serviceUriValue.trim() === ''){
            if(serviceUriDirtyState)
                errors.serviceUri = 'Please enter Service URI';
            formIsValid = false;
        }
        else if(!urlRegExp.test(serviceUriValue)){
            if(serviceUriDirtyState){
                errors.serviceUri = 'Please enter valid URL';
            }
            formIsValid = false;
        }

        if(clientIdValue.trim() === ''){
            if(clientIdDirtyState)
                errors.clientId = 'Please enter Client Id';
            formIsValid = false;
        }

        if(clientSecretValue.trim() === ''){
            if(clientSecretDirtyState)
                errors.clientSecret = 'Please enter Client Secret';
            formIsValid = false;
        }

        if(OAuth2Value.trim() === ''){
            if(OAuth2DirtyState)
                errors.OAuth2 = 'Please enter OAuth2';
            formIsValid = false;
        }
        else if(!urlRegExp.test(OAuth2Value)){
            if(OAuth2DirtyState){
                errors.OAuth2 = 'Please enter valid URL';
            }
            formIsValid = false;
        }

        if(adminTokenValue.trim() === ''){
            if(adminTokenDirtyState)
                errors.adminToken = 'Please enter Admin Token';
            formIsValid = false;
        }

        if(applicationRoleValue.trim() === ''){
            if(applicationRoleDirtyState)
                errors.applicationRole = 'Please enter Application Role';
            formIsValid = false;
        }

        if(bucAdnValue.trim() === ''){
            if(bucAdnDirtyState)
                errors.bucAdn = 'Please enter BUC/ADN';
            formIsValid = false;
        }

        if(complianceValue.trim() === ''){
            if(complianceDirtyState)
                errors.compliance = 'Please enter Compliance';
            formIsValid = false;
        }

        if(customerValue.trim() === ''){
            if(customerDirtyState)
                errors.customer = 'Please enter Customer';
            formIsValid = false;
        }

        if(ownerValue.trim() === ''){
            if(ownerDirtyState)
                errors.owner = 'Please enter Owner';
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

        if(fieldName === 'subscriptionName'){
            currentForm.subscriptionName.value = updatedValue;
            currentForm.subscriptionName.dirtyState = true;
        }
        else if(fieldName === 'subscriptionId'){
            currentForm.subscriptionId.value = updatedValue;
            currentForm.subscriptionId.dirtyState = true;
        }
        else if(fieldName === 'serviceUri'){
            currentForm.serviceUri.value = updatedValue;
            currentForm.serviceUri.dirtyState = true;
        }
        else if(fieldName === 'clientId'){
            currentForm.clientId.value = updatedValue;
            currentForm.clientId.dirtyState = true;
        }
        else if(fieldName === 'clientSecret'){
            currentForm.clientSecret.value = updatedValue;
            currentForm.clientSecret.dirtyState = true;
        }
        else if(fieldName === 'OAuth2'){
            currentForm.OAuth2.value = updatedValue;
            currentForm.OAuth2.dirtyState = true;
        }
        else if(fieldName === 'adminToken'){
            currentForm.adminToken.value = updatedValue;
            currentForm.adminToken.dirtyState = true;
        }
        else if(fieldName === 'applicationRole'){
            currentForm.applicationRole.value = updatedValue;
            currentForm.applicationRole.dirtyState = true;
        }
        else if(fieldName === 'bucAdn'){
            currentForm.bucAdn.value = updatedValue;
            currentForm.bucAdn.dirtyState = true;
        }
        else if(fieldName === 'compliance'){
            currentForm.compliance.value = updatedValue;
            currentForm.compliance.dirtyState = true;
        }
        else if(fieldName === 'confidentiality'){
            currentForm.confidentiality.value = updatedValue;
            currentForm.confidentiality.dirtyState = true;
        }
        else if(fieldName === 'customer'){
            currentForm.customer.value = updatedValue;
            currentForm.customer.dirtyState = true;
        }
        else if(fieldName === 'cluster'){
            currentForm.cluster.value = updatedValue;
            currentForm.cluster.dirtyState = true;
        }
        else if(fieldName === 'date'){
            currentForm.date.value = updatedValue;
            currentForm.date.dirtyState = true;
        }
        else if(fieldName === 'environment'){
            currentForm.environment.value = updatedValue;
            currentForm.environment.dirtyState = true;
        }
        else if(fieldName === 'managementHostType'){
            currentForm.managementHostType.value = updatedValue;
            currentForm.managementHostType.dirtyState = true;
        }
        else if(fieldName === 'optInoptOut'){
            currentForm.optInoptOut.value = updatedValue;
            currentForm.optInoptOut.dirtyState = true;
        }
        else if(fieldName === 'preserve'){
            currentForm.preserve.value = updatedValue;
            currentForm.preserve.dirtyState = true;
        }
        else if(fieldName === 'owner'){
            currentForm.owner.value = updatedValue;
            currentForm.owner.dirtyState = true;
        }
        else if(fieldName === 'project'){
            currentForm.project.value = updatedValue;
            currentForm.project.dirtyState = true;
        }
        else if(fieldName === 'security'){
            currentForm.security.value = updatedValue;
            currentForm.security.dirtyState = true;
        }
        else if(fieldName === 'version'){
            currentForm.version.value = updatedValue;
            currentForm.version.dirtyState = true;
        }
        else if(fieldName === 'app'){
            currentForm.app.value = updatedValue;
            currentForm.app.dirtyState = true;
        }
        else if(fieldName === 'assetId'){
            currentForm.assetId.value = updatedValue;
            currentForm.assetId.dirtyState = true;
        }
        else if(fieldName === 'uai'){
            currentForm.uai.value = updatedValue;
            currentForm.uai.dirtyState = true;
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
                                    <h6 id="maintainsubscriptioncreate-title">Edit Subscription <small>Creating parameters.</small></h6>
                                </div>
                            </div>
                            <hr></hr>
                            <div className="changeable-form subscription-form">
                                <div className="row">
                                    <div className="col-sm-3">
                                        <div className="col-sm-12 label required">
                                            SUBSCRIPTION NAME <img alt="down-arrow" src="assets/static/images/icon_greensortingdown.svg" />
                                            <span className="float-right help-text" >
                                                <img alt="info" src="assets/static/images/info.svg" data-toggle="popover" data-trigger="hover" data-placement="top" data-content={this.props.helpText.subscriptionName} />
                                            </span>
                                        </div>
                                        <div className="col-sm-12 mb-2">
                                            <input
                                                type="text"
                                                className="form-control form-control-sm"
                                                name="subscriptionName"
                                                value={this.state.subscriptionForm.subscriptionName.value}
                                                onChange={(event)=>{this.handleFormData(event)}} />
                                            <small className="text-danger">{ this.state.errorsSubscriptionForm['subscriptionName']}</small>
                                        </div>
                                    </div>
                                    <div className="col-sm-3">
                                        <div className="col-sm-12 label required">
                                            OWNER <img alt="down-arrow" src="assets/static/images/icon_greensortingdown.svg" />
                                            <span className="float-right help-text" >
                                                <img alt="info" src="assets/static/images/info.svg" data-toggle="popover" data-trigger="hover" data-placement="top" data-content={this.props.helpText.owner} />
                                            </span>
                                        </div>
                                        <div className="col-sm-12 mb-2">
                                            <input
                                                type="text"
                                                autoComplete="off"
                                                className="form-control form-control-sm"
                                                name="owner"
                                                value={this.state.subscriptionForm.owner.value}
                                                onChange={(event)=>{this.handleFormData(event)}} />
                                            <small className="text-danger">{ this.state.errorsSubscriptionForm['owner']}</small>
                                        </div>
                                    </div>
                                    <div className="col-sm-3">
                                        <div className="col-sm-12 label required">
                                            SUBSCRIPTION ID <img alt="down-arrow" src="assets/static/images/icon_greensortingdown.svg" />
                                            <span className="float-right help-text" >
                                                <img alt="info" src="assets/static/images/info.svg" data-toggle="popover" data-trigger="hover" data-placement="top" data-content={this.props.helpText.subscriptionId} />
                                            </span>
                                        </div>
                                        <div className="col-sm-12 mb-2">
                                            <input
                                                type="text"
                                                autoComplete="off"
                                                className="form-control form-control-sm"
                                                name="subscriptionId"
                                                disabled={true}
                                                value={this.state.subscriptionForm.subscriptionId.value}
                                                onChange={(event)=>{this.handleFormData(event)}} />
                                            <small className="text-danger">{ this.state.errorsSubscriptionForm['subscriptionId']}</small>
                                        </div>
                                    </div>
                                    <div className="col-sm-3">
                                        <div className="col-sm-12 label required">
                                            SERVICE URI <img alt="down-arrow" src="assets/static/images/icon_greensortingdown.svg" />
                                            <span className="float-right help-text" >
                                                <img alt="info" src="assets/static/images/info.svg" data-toggle="popover" data-trigger="hover" data-placement="top" data-content={this.props.helpText.serviceUri} />
                                            </span>
                                        </div>
                                        <div className="col-sm-12 mb-2">
                                            <input
                                                type="text"
                                                autoComplete="off"
                                                className="form-control form-control-sm"
                                                name="serviceUri"
                                                value={this.state.subscriptionForm.serviceUri.value}
                                                onChange={(event)=>{this.handleFormData(event)}} />
                                            <small className="text-danger">{ this.state.errorsSubscriptionForm['serviceUri']}</small>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-sm-3">
                                        <div className="col-sm-12 label required">
                                            CLIENT ID <img alt="down-arrow" src="assets/static/images/icon_greensortingdown.svg" />
                                            <span className="float-right help-text" >
                                                <img alt="info" src="assets/static/images/info.svg" data-toggle="popover" data-trigger="hover" data-placement="top" data-content={this.props.helpText.clientId} />
                                            </span>
                                        </div>
                                        <div className="col-sm-12 mb-2">
                                            <input
                                                type="text"
                                                autoComplete="off"
                                                className="form-control form-control-sm"
                                                name="clientId"
                                                value={this.state.subscriptionForm.clientId.value}
                                                onChange={(event)=>{this.handleFormData(event)}} />
                                            <small className="text-danger">{ this.state.errorsSubscriptionForm['clientId']}</small>
                                        </div>
                                    </div>
                                    <div className="col-sm-3">
                                        <div className="col-sm-12 label required">
                                            CLIENT SECRET <img alt="down-arrow" src="assets/static/images/icon_greensortingdown.svg" /> { this.state.subscriptionForm.clientSecret.type == 'password' ? <i onClick={(event)=>{this.showHideField(event, 'subscriptionForm', 'clientSecret')}} className="fa fa-eye cursor-pointer" title="Show"></i> : <i onClick={(event)=>{this.showHideField(event, 'subscriptionForm', 'clientSecret')}} className="fa fa-eye-slash cursor-pointer" title="Hide"></i> }
                                            <span className="float-right help-text" >
                                                <img alt="info" src="assets/static/images/info.svg" data-toggle="popover" data-trigger="hover" data-placement="top" data-content={this.props.helpText.clientSecret} />
                                            </span>
                                        </div>
                                        <div className="col-sm-12 mb-2">
                                            <input
                                                type={this.state.subscriptionForm.clientSecret.type}
                                                className="form-control form-control-sm"
                                                name="clientSecret"
                                                value={this.state.subscriptionForm.clientSecret.value}
                                                onChange={(event)=>{this.handleFormData(event)}} />
                                            <small className="text-danger">{ this.state.errorsSubscriptionForm['clientSecret']}</small>
                                        </div>
                                    </div>
                                    <div className="col-sm-3">
                                        <div className="col-sm-12 label required">
                                            OAUTH2 <img alt="down-arrow" src="assets/static/images/icon_greensortingdown.svg" />
                                            <span className="float-right help-text" >
                                                <img alt="info" src="assets/static/images/info.svg" data-toggle="popover" data-trigger="hover" data-placement="top" data-content={this.props.helpText.OAuth2} />
                                            </span>
                                        </div>
                                        <div className="col-sm-12 mb-2">
                                            <input
                                                type="text"
                                                autoComplete="off"
                                                className="form-control form-control-sm"
                                                name="OAuth2"
                                                value={this.state.subscriptionForm.OAuth2.value}
                                                onChange={(event)=>{this.handleFormData(event)}} />
                                            <small className="text-danger">{ this.state.errorsSubscriptionForm['OAuth2']}</small>
                                        </div>
                                    </div>
                                    <div className="col-sm-3">
                                        <div className="col-sm-12 label required">
                                            ADMIN TOKEN <img alt="down-arrow" src="assets/static/images/icon_greensortingdown.svg" /> { this.state.subscriptionForm.adminToken.type == 'password' ? <i onClick={(event)=>{this.showHideField(event, 'subscriptionForm', 'adminToken')}} className="fa fa-eye cursor-pointer" title="Show"></i> : <i onClick={(event)=>{this.showHideField(event, 'subscriptionForm', 'adminToken')}} className="fa fa-eye-slash cursor-pointer" title="Hide"></i> }
                                            <span className="float-right help-text" >
                                                <img alt="info" src="assets/static/images/info.svg" data-toggle="popover" data-trigger="hover" data-placement="top" data-content={this.props.helpText.adminToken} />
                                            </span>
                                        </div>
                                        <div className="col-sm-12 mb-2">
                                            <input
                                                type={this.state.subscriptionForm.adminToken.type}
                                                autoComplete="off"
                                                className="form-control form-control-sm"
                                                name="adminToken"
                                                value={this.state.subscriptionForm.adminToken.value}
                                                onChange={(event)=>{this.handleFormData(event)}} />
                                            <small className="text-danger">{ this.state.errorsSubscriptionForm['adminToken']}</small>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="row">
                                    <div className="col-sm-3">
                                        <div className="col-sm-12 label required">
                                            APPLICATION ROLE <img alt="down-arrow" src="assets/static/images/icon_greensortingdown.svg" />
                                            <span className="float-right help-text" >
                                                <img alt="info" src="assets/static/images/info.svg" data-toggle="popover" data-trigger="hover" data-placement="top" data-content={this.props.helpText.applicationRole} />
                                            </span>
                                        </div>
                                        <div className="col-sm-12 mb-2">
                                            <input
                                                type="text"
                                                autoComplete="off"
                                                className="form-control form-control-sm"
                                                name="applicationRole"
                                                value={this.state.subscriptionForm.applicationRole.value}
                                                onChange={(event)=>{this.handleFormData(event)}} />
                                            <small className="text-danger">{ this.state.errorsSubscriptionForm['applicationRole']}</small>
                                        </div>
                                    </div>
                                    <div className="col-sm-3">
                                        <div className="col-sm-12 label required">
                                            BUC/ADN <img alt="down-arrow" src="assets/static/images/icon_greensortingdown.svg" />
                                            <span className="float-right help-text" >
                                                <img alt="info" src="assets/static/images/info.svg" data-toggle="popover" data-trigger="hover" data-placement="top" data-content={this.props.helpText.bucAdn} />
                                            </span>
                                        </div>
                                        <div className="col-sm-12 mb-2">
                                            <input
                                                type="text"
                                                autoComplete="off"
                                                className="form-control form-control-sm"
                                                name="bucAdn"
                                                value={this.state.subscriptionForm.bucAdn.value}
                                                onChange={(event)=>{this.handleFormData(event)}} />
                                            <small className="text-danger">{ this.state.errorsSubscriptionForm['bucAdn']}</small>
                                        </div>
                                    </div>
                                    <div className="col-sm-3">
                                        <div className="col-sm-12 label required">
                                            COMPLIANCE <img alt="down-arrow" src="assets/static/images/icon_greensortingdown.svg" />
                                            <span className="float-right help-text" >
                                                <img alt="info" src="assets/static/images/info.svg" data-toggle="popover" data-trigger="hover" data-placement="top" data-content={this.props.helpText.compliance} />
                                            </span>
                                        </div>
                                        <div className="col-sm-12 mb-2">
                                            <input
                                                type="text"
                                                autoComplete="off"
                                                className="form-control form-control-sm"
                                                name="compliance"
                                                value={this.state.subscriptionForm.compliance.value}
                                                onChange={(event)=>{this.handleFormData(event)}} />
                                            <small className="text-danger">{ this.state.errorsSubscriptionForm['compliance']}</small>
                                        </div>
                                    </div>
                                    <div className="col-sm-3">
                                        <div className="col-sm-12 label required">
                                            CONFIDENTIALITY <img alt="down-arrow" src="assets/static/images/icon_greensortingdown.svg" />
                                        </div>
                                        <div className="col-sm-12 mb-2">
                                            <select 
                                                className="form-control form-control-sm" 
                                                name="confidentiality" 
                                                value={this.state.subscriptionForm.confidentiality.value}
                                                onChange={(event)=>{this.handleFormData(event)}}>
                                                    {
                                                    this.state.confidentialities.map((confidentiality, confidentialityIndex) => {
                                                        return(
                                                            <option
                                                                key={"confidentialityOption"+confidentialityIndex}
                                                                value={ confidentiality.id }>{ confidentiality.name }</option>)
                                                    })}
                                            </select>
                                            <small className="text-danger">{ this.state.errorsSubscriptionForm['confidentiality']}</small>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="row">
                                    <div className="col-sm-3">
                                        <div className="col-sm-12 label required">
                                            CUSTOMER <img alt="down-arrow" src="assets/static/images/icon_greensortingdown.svg" />
                                            <span className="float-right help-text" >
                                                <img alt="info" src="assets/static/images/info.svg" data-toggle="popover" data-trigger="hover" data-placement="top" data-content={this.props.helpText.customer} />
                                            </span>
                                        </div>
                                        <div className="col-sm-12 mb-2">
                                            <input
                                                type="text"
                                                className="form-control form-control-sm"
                                                name="customer"
                                                value={this.state.subscriptionForm.customer.value}
                                                onChange={(event)=>{this.handleFormData(event)}} />
                                            <small className="text-danger">{ this.state.errorsSubscriptionForm['customer']}</small>
                                        </div>
                                    </div>
                                    <div className="col-sm-3">
                                        <div className="col-sm-12 label required">
                                            CLUSTER
                                            <span className="float-right help-text" >
                                                <img alt="info" src="assets/static/images/info.svg" data-toggle="popover" data-trigger="hover" data-placement="top" data-content={this.props.helpText.cluster} />
                                            </span>
                                        </div>
                                        <div className="col-sm-12 mb-2">
                                            <input
                                                type="text"
                                                autoComplete="off"
                                                className="form-control form-control-sm"
                                                name="cluster"
                                                value={this.state.subscriptionForm.cluster.value}
                                                onChange={(event)=>{this.handleFormData(event)}} />
                                            <small className="text-danger">{ this.state.errorsSubscriptionForm['cluster']}</small>
                                        </div>
                                    </div>
                                    <div className="col-sm-3">
                                        <div className="col-sm-12 label required">
                                            EXPIRY DATE/TIME
                                            <span className="float-right help-text" >
                                                <img alt="info" src="assets/static/images/info.svg" data-toggle="popover" data-trigger="hover" data-placement="top" data-content={this.props.helpText.expdate} />
                                            </span>
                                        </div>
                                        <div className="col-sm-12 mb-2">
                                            <input
                                                type="text"
                                                autoComplete="off"
                                                placeholder="YYYY/DD/MM"
                                                className="form-control form-control-sm"
                                                name="date"
                                                value={this.state.subscriptionForm.date.value}
                                                onChange={(event)=>{this.handleFormData(event)}} />
                                            <small className="text-danger">{ this.state.errorsSubscriptionForm['date']}</small>
                                        </div>
                                    </div>
                                    <div className="col-sm-3">
                                        <div className="col-sm-12 label required">
                                            ENVIRONMENT <img alt="down-arrow" src="assets/static/images/icon_greensortingdown.svg" />
                                        </div>
                                        <div className="col-sm-12 mb-2">
                                            <select 
                                                className="form-control form-control-sm" 
                                                name="environment" 
                                                value={this.state.subscriptionForm.environment.value}
                                                onChange={(event)=>{this.handleFormData(event)}}>
                                                    {
                                                    this.state.environments.map((environment, environmentIndex) => {
                                                        return(
                                                            <option
                                                                key={"environmentOption"+environmentIndex}
                                                                value={ environment.id }>{ environment.name }</option>)
                                                    })}
                                            </select>
                                            <small className="text-danger">{ this.state.errorsSubscriptionForm['environment']}</small>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-sm-3">
                                        <div className="col-sm-12 label">
                                            MANAGEMENT HOST TYPE
                                            <span className="float-right help-text" >
                                                <img alt="info" src="assets/static/images/info.svg" data-toggle="popover" data-trigger="hover" data-placement="top" data-content={this.props.helpText.managementHostType} />
                                            </span>
                                        </div>
                                        <div className="col-sm-12 mb-2">
                                            <input
                                                type="text"
                                                className="form-control form-control-sm"
                                                name="managementHostType"
                                                value={this.state.subscriptionForm.managementHostType.value}
                                                onChange={(event)=>{this.handleFormData(event)}} />
                                            <small className="text-danger">{ this.state.errorsSubscriptionForm['managementHostType']}</small>
                                        </div>
                                    </div>
                                    <div className="col-sm-3">
                                        <div className="col-sm-12 label required">
                                            OPTIN OPTOUT <img alt="down-arrow" src="assets/static/images/icon_greensortingdown.svg" />
                                        </div>
                                        <div className="col-sm-12 mb-2">
                                            <select 
                                                className="form-control form-control-sm" 
                                                name="optInoptOut" 
                                                value={this.state.subscriptionForm.optInoptOut.value}
                                                onChange={(event)=>{this.handleFormData(event)}}>
                                                    {
                                                    this.state.optInoptOuts.map((optInoptOut, optInoptOutIndex) => {
                                                        return(
                                                            <option
                                                                key={"optInoptOutOption"+optInoptOutIndex}
                                                                value={ optInoptOut.id }>{ optInoptOut.name }</option>)
                                                    })}
                                            </select>
                                            <small className="text-danger">{ this.state.errorsSubscriptionForm['optInoptOut']}</small>
                                        </div>
                                    </div>
                                    <div className="col-sm-3">
                                        <div className="col-sm-12 label required">
                                            PRESERVE <img alt="down-arrow" src="assets/static/images/icon_greensortingdown.svg" />
                                        </div>
                                        <div className="col-sm-12 mb-2">
                                            <select 
                                                className="form-control form-control-sm" 
                                                name="preserve" 
                                                value={this.state.subscriptionForm.preserve.value}
                                                onChange={(event)=>{this.handleFormData(event)}}>
                                                    {
                                                    this.state.preserves.map((preserve, preserveIndex) => {
                                                        return(
                                                            <option
                                                                key={"preserveOption"+preserveIndex}
                                                                value={ preserve.id }>{ preserve.name }</option>)
                                                    })}
                                            </select>
                                            <small className="text-danger">{ this.state.errorsSubscriptionForm['preserve']}</small>
                                        </div>
                                    </div>
                                    <div className="col-sm-3">
                                        <div className="col-sm-12 label">
                                            ASSET ID
                                            <span className="float-right help-text" >
                                                <img alt="info" src="assets/static/images/info.svg" data-toggle="popover" data-trigger="hover" data-placement="top" data-content={this.props.helpText.assetId} />
                                            </span>
                                        </div>
                                        <div className="col-sm-12 mb-2">
                                            <input
                                                type="text"
                                                className="form-control form-control-sm"
                                                name="assetId"
                                                value={this.state.subscriptionForm.assetId.value}
                                                onChange={(event)=>{this.handleFormData(event)}} />
                                            <small className="text-danger">{ this.state.errorsSubscriptionForm['assetId']}</small>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-sm-3">
                                        <div className="col-sm-12 label">
                                            PROJECT
                                            <span className="float-right help-text" >
                                                <img alt="info" src="assets/static/images/info.svg" data-toggle="popover" data-trigger="hover" data-placement="top" data-content={this.props.helpText.project} />
                                            </span>
                                        </div>
                                        <div className="col-sm-12 mb-2">
                                            <input
                                                type="text"
                                                className="form-control form-control-sm"
                                                name="project"
                                                value={this.state.subscriptionForm.project.value}
                                                onChange={(event)=>{this.handleFormData(event)}} />
                                            <small className="text-danger">{ this.state.errorsSubscriptionForm['project']}</small>
                                        </div>
                                    </div>
                                    <div className="col-sm-3">
                                        <div className="col-sm-12 label required">
                                            SECURITY
                                            <span className="float-right help-text" >
                                                <img alt="info" src="assets/static/images/info.svg" data-toggle="popover" data-trigger="hover" data-placement="top" data-content={this.props.helpText.security} />
                                            </span>
                                        </div>
                                        <div className="col-sm-12 mb-2">
                                            <input
                                                type="text"
                                                autoComplete="off"
                                                className="form-control form-control-sm"
                                                name="security"
                                                value={this.state.subscriptionForm.security.value}
                                                onChange={(event)=>{this.handleFormData(event)}} />
                                            <small className="text-danger">{ this.state.errorsSubscriptionForm['security']}</small>
                                        </div>
                                    </div>
                                    <div className="col-sm-3">
                                        <div className="col-sm-12 label required">
                                            VERSION
                                            <span className="float-right help-text" >
                                                <img alt="info" src="assets/static/images/info.svg" data-toggle="popover" data-trigger="hover" data-placement="top" data-content={this.props.helpText.version} />
                                            </span>
                                        </div>
                                        <div className="col-sm-12 mb-2">
                                            <input
                                                type="text"
                                                autoComplete="off"
                                                className="form-control form-control-sm"
                                                name="version"
                                                value={this.state.subscriptionForm.version.value}
                                                onChange={(event)=>{this.handleFormData(event)}} />
                                            <small className="text-danger">{ this.state.errorsSubscriptionForm['version']}</small>
                                        </div>
                                    </div>
                                    <div className="col-sm-3">
                                        <div className="col-sm-12 label required">
                                            APPLICATION NAME
                                            <span className="float-right help-text" >
                                                <img alt="info" src="assets/static/images/info.svg" data-toggle="popover" data-trigger="hover" data-placement="top" data-content={this.props.helpText.appName} />
                                            </span>
                                        </div>
                                        <div className="col-sm-12 mb-2">
                                            <input
                                                type="text"
                                                autoComplete="off"
                                                className="form-control form-control-sm"
                                                name="app"
                                                value={this.state.subscriptionForm.app.value}
                                                onChange={(event)=>{this.handleFormData(event)}} />
                                            <small className="text-danger">{ this.state.errorsSubscriptionForm['app']}</small>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-sm-3">
                                        <div className="col-sm-12 label">
                                            UNIFIED APPLICATION IDENTIFIER
                                            <span className="float-right help-text" >
                                                <img alt="info" src="assets/static/images/info.svg" data-toggle="popover" data-trigger="hover" data-placement="top" data-content={this.props.helpText.uai} />
                                            </span>
                                        </div>
                                        <div className="col-sm-12 mb-2">
                                            <input
                                                type="text"
                                                className="form-control form-control-sm"
                                                name="uai"
                                                value={this.state.subscriptionForm.uai.value}
                                                onChange={(event)=>{this.handleFormData(event)}} />
                                            <small className="text-danger">{ this.state.errorsSubscriptionForm['uai']}</small>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-sm-12 mb-2 text-center">
                                        <button 
                                            id="create-subscription-btn"
                                            disabled={!this.state.subscriptionFormIsValid}
                                            onClick={this.editSubscription.bind(this)} 
                                            className="btn btn-sm customize-view-btn">EDIT SUBSCRIPTION</button>
                                        <button
                                            onClick={this.props.changeView.bind(this)}
                                            className="btn btn-sm customize-view-btn ml-2">BACK</button>
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
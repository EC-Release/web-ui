import React from "react";

export default class Subscriptionviewform extends React.Component {

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
                confidentiality: { value: '', dirtyState: false },
                customer: { value: '', dirtyState: false },
                cluster: { value: '', dirtyState: false },
                date: { value: '', dirtyState: false },
                environment: { value: '', dirtyState: false },
                managementHostType: { value: '', dirtyState: false },
                optInoptOut: { value: '', dirtyState: false },
                preserve: { value: '', dirtyState: false },
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
            confidentiality: { value: formData.confidentiality == null?'':formData.confidentiality, dirtyState: false },
            customer: { value: formData.customer, dirtyState: false },
            cluster: { value: formData.cluster, dirtyState: false },
            date: { value: formData.date == null?'':formData.date, dirtyState: false },
            environment: { value: formData.env, dirtyState: false },
            managementHostType: { value: formData.managementHostType, dirtyState: false },
            optInoptOut: { value: formData.optInoptOut == null?'':formData.optInoptOut, dirtyState: false },
            preserve: { value: formData.preserve == null?'':formData.preserve, dirtyState: false },
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
    }
    
    /* istanbul ignore next */
    /* showHideField(e, formName, fieldName){
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
    } */

    render() {
        /* jshint ignore:start */
        /* istanbul ignore next */
        return (
            <div className="row Subscriptioncreate Subscriptionviewform">
                <div className="col-md-12 mt-2">
                    <div className="centered-div">
                        <div className="centered-div-header">
                            <div className="row maintainagentcreate-header">
                                <div className="col-md-12">
                                    <h6 id="maintainsubscriptioncreate-title">View Subscription <small>View parameters.</small></h6>
                                </div>
                            </div>
                            <hr></hr>
                            <div className="changeable-form subscription-form">
                                <div className="row">
                                    <div className="col-sm-3">
                                        <div className="col-sm-12 label required">
                                            SUBSCRIPTION NAME
                                        </div>
                                        <div className="col-sm-12 mb-2">
                                            <input
                                                type="text"
                                                className="form-control form-control-sm"
                                                name="subscriptionName"
                                                disabled={true}
                                                defaultValue={this.state.subscriptionForm.subscriptionName.value}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-sm-3">
                                        <div className="col-sm-12 label required">
                                            OWNER
                                        </div>
                                        <div className="col-sm-12 mb-2">
                                            <input
                                                type="text"
                                                autoComplete="off"
                                                className="form-control form-control-sm"
                                                name="owner"
                                                disabled={true}
                                                defaultValue={this.state.subscriptionForm.owner.value}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-sm-3">
                                        <div className="col-sm-12 label required">
                                            SUBSCRIPTION ID
                                        </div>
                                        <div className="col-sm-12 mb-2">
                                            <input
                                                type="text"
                                                autoComplete="off"
                                                className="form-control form-control-sm"
                                                name="subscriptionId"
                                                disabled={true}
                                                defaultValue={this.state.subscriptionForm.subscriptionId.value}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-sm-3">
                                        <div className="col-sm-12 label required">
                                            SERVICE URI
                                        </div>
                                        <div className="col-sm-12 mb-2">
                                            <input
                                                type="text"
                                                autoComplete="off"
                                                className="form-control form-control-sm"
                                                name="serviceUri"
                                                disabled={true}
                                                defaultValue={this.state.subscriptionForm.serviceUri.value}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-sm-3">
                                        <div className="col-sm-12 label required">
                                            CLIENT ID 
                                        </div>
                                        <div className="col-sm-12 mb-2">
                                            <input
                                                type="text"
                                                autoComplete="off"
                                                className="form-control form-control-sm"
                                                name="clientId"
                                                disabled={true}
                                                defaultValue={this.state.subscriptionForm.clientId.value}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-sm-3">
                                        <div className="col-sm-12 label required">
                                            CLIENT SECRET{/* { this.state.subscriptionForm.clientSecret.type == 'password' ? <i onClick={(event)=>{this.showHideField(event, 'subscriptionForm', 'clientSecret')}} className="fa fa-eye cursor-pointer" title="Show"></i> : <i onClick={(event)=>{this.showHideField(event, 'subscriptionForm', 'clientSecret')}} className="fa fa-eye-slash cursor-pointer" title="Hide"></i> } */}
                                        </div>
                                        <div className="col-sm-12 mb-2">
                                            <input
                                                type={this.state.subscriptionForm.clientSecret.type}
                                                className="form-control form-control-sm"
                                                name="clientSecret"
                                                disabled={true}
                                                defaultValue={this.state.subscriptionForm.clientSecret.value}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-sm-3">
                                        <div className="col-sm-12 label required">
                                            OAUTH2
                                        </div>
                                        <div className="col-sm-12 mb-2">
                                            <input
                                                type="text"
                                                autoComplete="off"
                                                className="form-control form-control-sm"
                                                name="OAuth2"
                                                disabled={true}
                                                defaultValue={this.state.subscriptionForm.OAuth2.value}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-sm-3">
                                        <div className="col-sm-12 label required">
                                            ADMIN TOKEN{/* { this.state.subscriptionForm.adminToken.type == 'password' ? <i onClick={(event)=>{this.showHideField(event, 'subscriptionForm', 'adminToken')}} className="fa fa-eye cursor-pointer" title="Show"></i> : <i onClick={(event)=>{this.showHideField(event, 'subscriptionForm', 'adminToken')}} className="fa fa-eye-slash cursor-pointer" title="Hide"></i> } */}
                                        </div>
                                        <div className="col-sm-12 mb-2">
                                            <input
                                                type={this.state.subscriptionForm.adminToken.type}
                                                autoComplete="off"
                                                className="form-control form-control-sm"
                                                name="adminToken"
                                                disabled={true}
                                                defaultValue={this.state.subscriptionForm.adminToken.value}
                                            />
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="row">
                                    <div className="col-sm-3">
                                        <div className="col-sm-12 label required">
                                            APPLICATION ROLE
                                        </div>
                                        <div className="col-sm-12 mb-2">
                                            <input
                                                type="text"
                                                autoComplete="off"
                                                className="form-control form-control-sm"
                                                name="applicationRole"
                                                disabled={true}
                                                defaultValue={this.state.subscriptionForm.applicationRole.value}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-sm-3">
                                        <div className="col-sm-12 label required">
                                            BUC/ADN
                                        </div>
                                        <div className="col-sm-12 mb-2">
                                            <input
                                                type="text"
                                                autoComplete="off"
                                                className="form-control form-control-sm"
                                                name="bucAdn"
                                                disabled={true}
                                                defaultValue={this.state.subscriptionForm.bucAdn.value}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-sm-3">
                                        <div className="col-sm-12 label required">
                                            COMPLIANCE
                                        </div>
                                        <div className="col-sm-12 mb-2">
                                            <input
                                                type="text"
                                                autoComplete="off"
                                                className="form-control form-control-sm"
                                                name="compliance"
                                                disabled={true}
                                                defaultValue={this.state.subscriptionForm.compliance.value}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-sm-3">
                                        <div className="col-sm-12 label required">
                                            CONFIDENTIALITY
                                        </div>
                                        <div className="col-sm-12 mb-2">
                                            <input
                                                type="text"
                                                className="form-control form-control-sm"
                                                name="confidentiality"
                                                disabled={true}
                                                defaultValue={this.state.subscriptionForm.confidentiality.value}
                                            />
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="row">
                                    <div className="col-sm-3">
                                        <div className="col-sm-12 label required">
                                            CUSTOMER
                                        </div>
                                        <div className="col-sm-12 mb-2">
                                            <input
                                                type="text"
                                                className="form-control form-control-sm"
                                                name="customer"
                                                disabled={true}
                                                defaultValue={this.state.subscriptionForm.customer.value}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-sm-3">
                                        <div className="col-sm-12 label required">
                                            CLUSTER
                                        </div>
                                        <div className="col-sm-12 mb-2">
                                            <input
                                                type="text"
                                                autoComplete="off"
                                                className="form-control form-control-sm"
                                                name="cluster"
                                                disabled={true}
                                                defaultValue={this.state.subscriptionForm.cluster.value}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-sm-3">
                                        <div className="col-sm-12 label required">
                                            EXPIRY DATE/TIME
                                        </div>
                                        <div className="col-sm-12 mb-2">
                                            <input
                                                type="text"
                                                className="form-control form-control-sm"
                                                name="date"
                                                disabled={true}
                                                defaultValue={this.state.subscriptionForm.date.value}
                                             />
                                        </div>
                                    </div>
                                    <div className="col-sm-3">
                                        <div className="col-sm-12 label required">
                                            ENVIRONMENT
                                        </div>
                                        <div className="col-sm-12 mb-2">
                                            <input
                                                type="text"
                                                className="form-control form-control-sm"
                                                name="managementHostType"
                                                disabled={true}
                                                defaultValue={this.state.subscriptionForm.environment.value}
                                             />
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-sm-3">
                                        <div className="col-sm-12 label">
                                            MANAGEMENT HOST TYPE
                                        </div>
                                        <div className="col-sm-12 mb-2">
                                            <input
                                                type="text"
                                                className="form-control form-control-sm"
                                                name="managementHostType"
                                                disabled={true}
                                                defaultValue={this.state.subscriptionForm.managementHostType.value}
                                             />
                                        </div>
                                    </div>
                                    <div className="col-sm-3">
                                        <div className="col-sm-12 label required">
                                            OPTIN OPTOUT
                                        </div>
                                        <div className="col-sm-12 mb-2">
                                            <input
                                                type="text"
                                                className="form-control form-control-sm"
                                                name="optInoptOut"
                                                disabled={true}
                                                defaultValue={this.state.subscriptionForm.optInoptOut.value}
                                            />
                                            
                                        </div>
                                    </div>
                                    <div className="col-sm-3">
                                        <div className="col-sm-12 label required">
                                            PRESERVE
                                        </div>
                                        <div className="col-sm-12 mb-2">
                                            <input
                                                type="text"
                                                className="form-control form-control-sm"
                                                name="preserve"
                                                disabled={true}
                                                defaultValue={this.state.subscriptionForm.preserve.value}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-sm-3">
                                        <div className="col-sm-12 label">
                                            ASSET ID
                                        </div>
                                        <div className="col-sm-12 mb-2">
                                            <input
                                                type="text"
                                                className="form-control form-control-sm"
                                                name="assetId"
                                                disabled={true}
                                                defaultValue={this.state.subscriptionForm.assetId.value}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-sm-3">
                                        <div className="col-sm-12 label">
                                            PROJECT
                                        </div>
                                        <div className="col-sm-12 mb-2">
                                            <input
                                                type="text"
                                                className="form-control form-control-sm"
                                                name="project"
                                                disabled={true}
                                                defaultValue={this.state.subscriptionForm.project.value}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-sm-3">
                                        <div className="col-sm-12 label required">
                                            SECURITY
                                        </div>
                                        <div className="col-sm-12 mb-2">
                                            <input
                                                type="text"
                                                autoComplete="off"
                                                className="form-control form-control-sm"
                                                name="security"
                                                disabled={true}
                                                defaultValue={this.state.subscriptionForm.security.value}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-sm-3">
                                        <div className="col-sm-12 label required">
                                            VERSION
                                        </div>
                                        <div className="col-sm-12 mb-2">
                                            <input
                                                type="text"
                                                autoComplete="off"
                                                className="form-control form-control-sm"
                                                name="version"
                                                disabled={true}
                                                defaultValue={this.state.subscriptionForm.version.value}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-sm-3">
                                        <div className="col-sm-12 label required">
                                            APPLICATION NAME
                                        </div>
                                        <div className="col-sm-12 mb-2">
                                            <input
                                                type="text"
                                                autoComplete="off"
                                                className="form-control form-control-sm"
                                                name="app"
                                                disabled={true}
                                                defaultValue={this.state.subscriptionForm.app.value}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-sm-3">
                                        <div className="col-sm-12 label">
                                            UNIFIED APPLICATION IDENTIFIER
                                        </div>
                                        <div className="col-sm-12 mb-2">
                                            <input
                                                type="text"
                                                className="form-control form-control-sm"
                                                name="uai"
                                                disabled={true}
                                                defaultValue={this.state.subscriptionForm.uai.value}
                                             />
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-sm-12 mb-2 text-center">
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
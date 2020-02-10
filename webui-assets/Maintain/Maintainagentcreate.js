import React from "react";

export default class Maintainagentcreate extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            agentForm: {
                agentMode: { value: 1, dirtyState: false },
                gateway: { value: '', dirtyState: false },
                businessId: { value: 0, dirtyState: false },
                businessName: { value: '', dirtyState: false },
                requestor: { value: '', dirtyState: false },
                requestedDate: { value: '', dirtyState: false },
                customerEmail: { value: '', dirtyState: false },
                bucAnd: { value: '', dirtyState: false },
                vpc: { value: '', dirtyState: false },
                debugMode: { value: true, dirtyState: false },
            },
            errorsAgentForm: {},
            agentFormIsValid: false,
            gatewayForm: {
                mode: 'GATEWAY',
                environment: { value: '', dirtyState: false },
                gatewayPort: { value: '', dirtyState: false },
                zone: { value: '', dirtyState: false },
                serviceUrl: { value: '', dirtyState: false },
                token: { value: '', dirtyState: false },
                host: { value: '', dirtyState: false },
            },
            errorsGatewayForm: {},
            gatewayFormIsValid: false,
            serverForm: {
                mode: 'SERVER',
                agentId: { value: '', dirtyState: false },
                group: { value: '', dirtyState: false },
                clientId: { value: '', dirtyState: false },
                clientSecret: { value: '', dirtyState: false },
                duration: { value: '', dirtyState: false },
                OAuth2:{ value: '', dirtyState: false },
                host: { value: '', dirtyState: false },
                zone: { value: '', dirtyState: false },
                serviceUrl: { value: '', dirtyState: false },
                remoteHost: { value: '', dirtyState: false },
                remotePort: { value: '', dirtyState: false },
                proxy: { value: '', dirtyState: false },
                allowPlugIn: { value: false, dirtyState: false },
                plugIn: { value: [], dirtyState: false },
            },
            errorsServerForm: {},
            serverFormIsValid: false,
            clientForm: {
                mode: 'CLIENT',
                agentId: { value: '', dirtyState: false },
                group: { value: '', dirtyState: false },
                clientId: { value: '', dirtyState: false },
                clientSecret: { value: '', dirtyState: false },
                duration: { value: '', dirtyState: false },
                OAuth2: { value: '', dirtyState: false },
                host: { value: '', dirtyState: false },
                localPort: { value: '', dirtyState: false },
                targetId: { value: '', dirtyState: false },
                proxy: { value: '', dirtyState: false },
                allowPlugIn: { value: false, dirtyState: false },
                plugIn: { value: [], dirtyState: false },
            },
            errorsClientForm: {},
            clientFormIsValid: false,
            // API will provide this agentModeButtons
            agentModeButtons: [
                { text: 'GATEWAY', value: 1 },
                { text: 'SERVER', value: 2 },
                { text: 'CLIENT', value: 3 }
            ],
            // API will provide this gateways
            gateways: [],
            // API will provide this businesses
            businesses: [
                { name: 'Aviation', id: '1' },
                { name: 'Power', id: '2' },
                { name: 'Capital', id: '3' },
                { name: 'External', id: '4' },
            ],
            // API will provide this ecVersions
            ecVersions: [
                { name: 'v 212 stable', id: '1' },
                { name: 'v 1724 beta', id: '2' }
            ],
            // API will provide this ecSubVersions
            ecSubVersions: [
                { name: 'v1.hokkaido.212 stable', id: '1', ecVersionId: '1' },
                { name: 'v1beta.fukuoka.1724', id: '2', ecVersionId: '2' }
            ],
            // API will provide this osTypes
            osTypes: [
                { name: 'Linux', id: '1' },
                { name: 'Windows', id: '2' },
                { name: 'Solaris', id: '3' },
                { name: 'MAC', id: '4' }
            ],
            // API will provide this plugIns
            plugIns: [
                { name: 'VLN', id: 'vln' },
                { name: 'TLS', id: 'tls' }
            ],
            apiEndPoints: {
                baseUrl: 'https://jsonplaceholder.typicode.com/todos/1'
            }
        }
    }

    componentDidMount(){
        window.enableToolTip();
        let businesses = [...this.state.businesses];
        let agentForm = Object.assign({}, this.state.agentForm);
        if(businesses.length > 0){
            agentForm.businessId.value = businesses[0].id;
            this.setState({
                agentForm: agentForm
            });
        }

        // get gateway list start
        fetch(this.state.apiEndPoints.baseUrl, { // Get gateways '/listGateways?user_id'+this.props.userId
            method: 'GET'
        })
        .then((response) => {
            if (response.status === 200) {
                response.json().then((gateways) => {
                    gateways = [
                        {
                          "gatewayId": "Gateway-10afc420-d8ad-41ec-8be6-6f723e6fb18a",
                          "userId": "212712078",
                          "gatewayPort": "8080",
                          "zone": "b3a2e606-eaa8-4d3c-aadc-c27f12260a1b",
                          "serviceUrl": "https://b3a2e606-eaa8-4d3c-aadc-c27f12260a1b.run.aws-usw02-dev.ice.predix.io",
                          "admToken": "YWRtaW46WUo1NVBpWUkwWXpZcmpFQjVsc0dNNGdOcVRTSDlwS1l5RFJXcldOTElwSjA0TlBJM1M=",
                          "hostUrl": "wss://gateway-url/agent"
                        },
                        {
                          "gatewayId": "Gateway-d4b7844c-f9b2-4ab3-bab3-592b8ca1629d",
                          "userId": "212712078",
                          "gatewayPort": "8080",
                          "zone": "b3a2e606-eaa8-4d3c-aadc-c27f12260a1d",
                          "serviceUrl": "https://b3a2e606-eaa8-4d3c-aadc-c27f12260a1b.run.aws-usw02-dev.ice.predix.io",
                          "admToken": "YWRtaW46WUo1NVBpWUkwWXpZcmpFQjVsc0dNNGdOcVRTSDlwS1l5RFJXcldOTElwSjA0TlBJM1M=",
                          "hostUrl": "wss://gateway-url/agent"
                        }
                    ];
                    this.setState({
                        gateways: gateways
                    })
                })
            }
        })
    }

    handleChangeAgentMode(newAgentMode){
        let currentAgentForm =  Object.assign({}, this.state.agentForm);
        currentAgentForm.agentMode.value = newAgentMode;

        this.setState({
            agentForm: currentAgentForm
        });
        window.enableToolTip();
    }

    handleAgentFormData(e){
        let fieldName = e.target.name;
        let updatedValue = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        let currentAgentForm =  Object.assign({}, this.state.agentForm);

        if(fieldName === 'gateway'){
            currentAgentForm.gateway.value = updatedValue;
            currentAgentForm.gateway.dirtyState = true;
        }
        else if(fieldName === 'businessId'){
            currentAgentForm.businessId.value = updatedValue;
            currentAgentForm.businessId.dirtyState = true;
        }
        else if(fieldName === 'businessName'){
            currentAgentForm.businessName.value = updatedValue;
            currentAgentForm.businessName.dirtyState = true;
        }
        else if(fieldName === 'requestor'){
            currentAgentForm.requestor.value = updatedValue;
            currentAgentForm.requestor.dirtyState = true;
        }
        else if(fieldName === 'requestedDate'){
            currentAgentForm.requestedDate.value = updatedValue;
            currentAgentForm.requestedDate.dirtyState = true;
        }
        else if(fieldName === 'customerEmail'){
            currentAgentForm.customerEmail.value = updatedValue;
            currentAgentForm.customerEmail.dirtyState = true;
        }
        else if(fieldName === 'bucAnd'){
            currentAgentForm.bucAnd.value = updatedValue;
            currentAgentForm.bucAnd.dirtyState = true;
        }
        else if(fieldName === 'vpc'){
            currentAgentForm.vpc.value = updatedValue;
            currentAgentForm.vpc.dirtyState = true;
        }
        else if(fieldName === 'debugMode'){
            currentAgentForm.debugMode.value = updatedValue;
            currentAgentForm.debugMode.dirtyState = true;
        }

        this.setState({
            agentForm: currentAgentForm
        });
        this.handleAgentFormValidation();
    }

    handleAgentFormValidation(){
        let currentFormData = this.state.agentForm;
        let businessIdValue = currentFormData.businessId.value;
        let businessNameValue = currentFormData.businessName.value;
        let businessNameDirtyState = currentFormData.businessName.dirtyState;
        let requestorValue = currentFormData.requestor.value;
        let requestorDirtyState = currentFormData.requestor.dirtyState;
        let requestedDateValue = currentFormData.requestedDate.value;
        let requestedDateDirtyState = currentFormData.requestedDate.dirtyState;
        let customerEmailValue = currentFormData.customerEmail.value;
        let customerEmailDirtyState = currentFormData.customerEmail.dirtyState;
        let bucAndValue = currentFormData.bucAnd.value;
        let bucAndDirtyState = currentFormData.bucAnd.dirtyState;
        let formIsValid = true;
		let errors = {};

        if(businessIdValue === ''){
            errors['businessId'] = 'Please select Business';
            formIsValid = false;
        }

        if(businessIdValue == 0){
            if(businessNameValue.trim() === ''){
                if(businessNameDirtyState){
                    errors['businessName'] = 'Please enter Business Name';
                }
                formIsValid = false;
            }
        }

        if(requestorValue.trim() === ''){
            if(requestorDirtyState){
                errors['requestor'] = 'Please enter Requestor';
            }
            formIsValid = false;
        }

        if(requestedDateValue.trim() === ''){
            if(requestedDateDirtyState){
                errors['requestedDate'] = 'Please enter Requested Date';
            }
            formIsValid = false;
        }

        if(customerEmailValue.trim() === ''){
            if(customerEmailDirtyState){
                errors['customerEmail'] = 'Please enter Customer Email';
            }
            formIsValid = false;
        }

        if(bucAndValue.trim() === ''){
            if(bucAndDirtyState){
                errors['bucAnd'] = 'Please enter BUC/AND';
            }
            formIsValid = false;
        }

        this.setState({
			agentFormIsValid: formIsValid,
			errorsAgentForm: errors
		});
    }

    handleGatewayFormData(e){
        let fieldName = e.target.name;
        let updatedValue = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        let currentGatewayForm =  Object.assign({}, this.state.gatewayForm);

        if(fieldName === 'environment'){
            currentGatewayForm.environment.value = updatedValue;
            currentGatewayForm.environment.dirtyState = true;
        }
        else if(fieldName === 'gatewayPort'){
            currentGatewayForm.gatewayPort.value = updatedValue;
            currentGatewayForm.gatewayPort.dirtyState = true;
        }
        else if(fieldName === 'zone'){
            currentGatewayForm.zone.value = updatedValue;
            currentGatewayForm.zone.dirtyState = true;
        }
        else if(fieldName === 'serviceUrl'){
            currentGatewayForm.serviceUrl.value = updatedValue;
            currentGatewayForm.serviceUrl.dirtyState = true;
        }
        else if(fieldName === 'token'){
            currentGatewayForm.token.value = updatedValue;
            currentGatewayForm.token.dirtyState = true;
        }
        else if(fieldName === 'host'){
            currentGatewayForm.host.value = updatedValue;
            currentGatewayForm.host.dirtyState = true;
        }

        this.setState({
            gatewayForm: currentGatewayForm
        });
        this.handleGatewayFormValidation();
    }

    handleGatewayFormValidation(){
        let currentFormData = this.state.gatewayForm;
        let environmentValue = currentFormData.environment.value;
        let environmentDirtyState = currentFormData.environment.dirtyState;
        let gatewayPortValue = currentFormData.gatewayPort.value;
        let gatewayPortDirtyState = currentFormData.gatewayPort.dirtyState;
        let zoneValue = currentFormData.zone.value;
        let zoneDirtyState = currentFormData.zone.dirtyState;
        let serviceUrlValue = currentFormData.serviceUrl.value;
        let serviceUrlDirtyState = currentFormData.serviceUrl.dirtyState;
        let tokenValue = currentFormData.token.value;
        let tokenDirtyState = currentFormData.token.dirtyState;
        let hostValue = currentFormData.host.value;
        let hostDirtyState = currentFormData.host.dirtyState;
        let formIsValid = true;
        let errors = {};
        
        if(environmentValue.trim() === ''){
            if(environmentDirtyState){
                errors['environment'] = 'Please enter Environment';
            }
            formIsValid = false;
        }
        if(gatewayPortValue.trim() === ''){
            if(gatewayPortDirtyState){
                errors['gatewayPort'] = 'Please enter Gateway Port';
            }
            formIsValid = false;
        }
        if(zoneValue.trim() === ''){
            if(zoneDirtyState){
                errors['zone'] = 'Please enter Zone';
            }
            formIsValid = false;
        }
        if(serviceUrlValue.trim() === ''){
            if(serviceUrlDirtyState){
                errors['serviceUrl'] = 'Please enter Service Url';
            }
            formIsValid = false;
        }
        if(tokenValue.trim() === ''){
            if(tokenDirtyState){
                errors['token'] = 'Please enter Token';
            }
            formIsValid = false;
        }
        if(hostValue.trim() === ''){
            if(hostDirtyState){
                errors['host'] = 'Please enter Host';
            }
            formIsValid = false;
        }
        this.setState({
            gatewayFormIsValid: formIsValid,
            errorsGatewayForm: errors
        });
    }

    handleServerFormData(e){
        let fieldName = e.target.name;
        let updatedValue = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        let currentServerForm =  Object.assign({}, this.state.serverForm);

        if(fieldName === 'agentId'){
            currentServerForm.agentId.value = updatedValue;
            currentServerForm.agentId.dirtyState = true;
        }
        else if(fieldName === 'group'){
            currentServerForm.group.value = updatedValue;
            currentServerForm.group.dirtyState = true;
        }
        else if(fieldName === 'clientId'){
            currentServerForm.clientId.value = updatedValue;
            currentServerForm.clientId.dirtyState = true;
        }
        else if(fieldName === 'clientSecret'){
            currentServerForm.clientSecret.value = updatedValue;
            currentServerForm.clientSecret.dirtyState = true;
        }
        else if(fieldName === 'duration'){
            const durationAfterValidityCheck = (e.target.validity.valid) ? updatedValue : currentServerForm.duration.value;
            currentServerForm.duration.value = durationAfterValidityCheck;
            currentServerForm.duration.dirtyState = true;
        }
        else if(fieldName === 'OAuth2'){
            currentServerForm.OAuth2.value = updatedValue;
            currentServerForm.OAuth2.dirtyState = true;
        }
        else if(fieldName === 'host'){
            currentServerForm.host.value = updatedValue;
            currentServerForm.host.dirtyState = true;
        }
        else if(fieldName === 'zone'){
            currentServerForm.zone.value = updatedValue;
            currentServerForm.zone.dirtyState = true;
        }
        else if(fieldName === 'serviceUrl'){
            currentServerForm.serviceUrl.value = updatedValue;
            currentServerForm.serviceUrl.dirtyState = true;
        }
        else if(fieldName === 'remoteHost'){
            currentServerForm.remoteHost.value = updatedValue;
            currentServerForm.remoteHost.dirtyState = true;
        }
        else if(fieldName === 'remotePort'){
            currentServerForm.remotePort.value = updatedValue;
            currentServerForm.remotePort.dirtyState = true;
        }
        else if(fieldName === 'proxy'){
            currentServerForm.proxy.value = updatedValue;
            currentServerForm.proxy.dirtyState = true;
        }
        else if(fieldName === 'allowPlugIn'){
            currentServerForm.allowPlugIn.value = updatedValue;
            currentServerForm.allowPlugIn.dirtyState = true;
        }
        else if(fieldName === 'plugIn'){
            let options = e.target.options;
            let value = [];
            for (let i = 0, l = options.length; i < l; i++) {
                if (options[i].selected) {
                    value.push(options[i].value);
                }
            }
            currentServerForm.plugIn.value = value;
            currentServerForm.plugIn.dirtyState = true;
        }

        this.setState({
            serverForm: currentServerForm
        });

        this.handleServerFormValidation();
    }

    handleServerFormValidation(){
        let currentFormData = this.state.serverForm;
        let agentIdValue = currentFormData.agentId.value;
        let agentIdDirtyState = currentFormData.agentId.dirtyState;
        let groupValue = currentFormData.group.value;
        let groupDirtyState = currentFormData.group.dirtyState;
        let clientIdValue = currentFormData.clientId.value;
        let clientIdDirtyState = currentFormData.clientId.dirtyState;
        let clientSecretValue = currentFormData.clientSecret.value;
        let clientSecretDirtyState = currentFormData.clientSecret.dirtyState;
        let durationValue = currentFormData.duration.value;
        let durationDirtyState = currentFormData.duration.dirtyState;
        let OAuth2Value = currentFormData.OAuth2.value;
        let OAuth2DirtyState = currentFormData.OAuth2.dirtyState;
        let hostValue = currentFormData.host.value;
        let hostDirtyState = currentFormData.host.dirtyState;
        let zoneValue = currentFormData.zone.value;
        let zoneDirtyState = currentFormData.zone.dirtyState;
        let serviceUrlValue = currentFormData.serviceUrl.value;
        let serviceUrlDirtyState = currentFormData.serviceUrl.dirtyState;
        let remoteHostValue = currentFormData.remoteHost.value;
        let remoteHostDirtyState = currentFormData.remoteHost.dirtyState;
        let remotePortValue = currentFormData.remotePort.value;
        let remotePortDirtyState = currentFormData.remotePort.dirtyState;
        let allowPlugInValue = currentFormData.allowPlugIn.value;
        let allowPlugInDirtyState = currentFormData.allowPlugIn.dirtyState;
        let plugInValue = currentFormData.plugIn.value;
        let plugInDirtyState = currentFormData.plugIn.dirtyState;
        let formIsValid = true;
        let errors = {};

        if(agentIdValue.trim() === ''){
            if(agentIdDirtyState){
                errors['agentId'] = 'Please enter Agent Id';
            }
            formIsValid = false;
        }
        if(groupValue.trim() === ''){
            if(groupDirtyState){
                errors['group'] = 'Please enter Group';
            }
            formIsValid = false;
        }
        if(clientIdValue.trim() === ''){
            if(clientIdDirtyState){
                errors['clientId'] = 'Please enter Client Id';
            }
            formIsValid = false;
        }
        if(clientSecretValue.trim() === ''){
            if(clientSecretDirtyState){
                errors['clientSecret'] = 'Please enter Client Secret';
            }
            formIsValid = false;
        }
        if(durationValue === ''){
            if(durationDirtyState){
                errors['duration'] = 'Please enter Duration';
            }
            formIsValid = false;
        }

        if(OAuth2Value.trim() === ''){
            if(OAuth2DirtyState){
                errors['OAuth2'] = 'Please enter OAuth2';
            }
            formIsValid = false;
        }
        if(hostValue.trim() === ''){
            if(hostDirtyState){
                errors['host'] = 'Please enter Host';
            }
            formIsValid = false;
        }
        if(zoneValue.trim() === ''){
            if(zoneDirtyState){
                errors['zone'] = 'Please enter Zone';
            }
            formIsValid = false;
        }
        if(serviceUrlValue.trim() === ''){
            if(serviceUrlDirtyState){
                errors['serviceUrl'] = 'Please enter Service-Url';
            }
            formIsValid = false;
        }
        if(remoteHostValue.trim() === ''){
            if(remoteHostDirtyState){
                errors['remoteHost'] = 'Please enter Remote Host';
            }
            formIsValid = false;
        }
        if(remotePortValue.trim() === ''){
            if(remotePortDirtyState){
                errors['remotePort'] = 'Please enter Remote Port';
            }
            formIsValid = false;
        }
        if(allowPlugInValue){
            if(plugInValue.length === 0){
                if(plugInDirtyState){
                    errors['plugIn'] = 'Please select Plug-In';
                }
                formIsValid = false;
            }
        }
        
        this.setState({
            serverFormIsValid: formIsValid,
            errorsServerForm: errors
        });
    }

    handleClientFormData(e){
        let fieldName = e.target.name;
        let updatedValue = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        let currentClientForm =  Object.assign({}, this.state.clientForm);

        if(fieldName === 'agentId'){
            currentClientForm.agentId.value = updatedValue;
            currentClientForm.agentId.dirtyState = true;
        }
        else if(fieldName === 'group'){
            currentClientForm.group.value = updatedValue;
            currentClientForm.group.dirtyState = true;
        }
        else if(fieldName === 'clientId'){
            currentClientForm.clientId.value = updatedValue;
            currentClientForm.clientId.dirtyState = true;
        }
        else if(fieldName === 'clientSecret'){
            currentClientForm.clientSecret.value = updatedValue;
            currentClientForm.clientSecret.dirtyState = true;
        }
        else if(fieldName === 'duration'){
            const durationAfterValidityCheck = (e.target.validity.valid) ? updatedValue : currentClientForm.duration.value;
            currentClientForm.duration.value = durationAfterValidityCheck;
            currentClientForm.duration.dirtyState = true;
        }
        else if(fieldName === 'OAuth2'){
            currentClientForm.OAuth2.value = updatedValue;
            currentClientForm.OAuth2.dirtyState = true;
        }
        else if(fieldName === 'host'){
            currentClientForm.host.value = updatedValue;
            currentClientForm.host.dirtyState = true;
        }
        else if(fieldName === 'localPort'){
            currentClientForm.localPort.value = updatedValue;
            currentClientForm.localPort.dirtyState = true;
        }
        else if(fieldName === 'targetId'){
            currentClientForm.targetId.value = updatedValue;
            currentClientForm.targetId.dirtyState = true;
        }
        else if(fieldName === 'proxy'){
            currentClientForm.proxy.value = updatedValue;
            currentClientForm.proxy.dirtyState = true;
        }
        else if(fieldName === 'allowPlugIn'){
            currentClientForm.allowPlugIn.value = updatedValue;
            currentClientForm.allowPlugIn.dirtyState = true;
        }
        else if(fieldName === 'plugIn'){
            let options = e.target.options;
            let value = [];
            for (let i = 0, l = options.length; i < l; i++) {
                if (options[i].selected) {
                    value.push(options[i].value);
                }
            }
            currentClientForm.plugIn.value = value;
            currentClientForm.plugIn.dirtyState = true;
        }

        this.setState({
            clientForm: currentClientForm
        });

        this.handleClientFormValidation();
    }

    handleClientFormValidation(){
        let currentFormData = this.state.clientForm;
        let agentIdValue = currentFormData.agentId.value;
        let agentIdDirtyState = currentFormData.agentId.dirtyState;
        let groupValue = currentFormData.group.value;
        let groupDirtyState = currentFormData.group.dirtyState;
        let clientIdValue = currentFormData.clientId.value;
        let clientIdDirtyState = currentFormData.clientId.dirtyState;
        let clientSecretValue = currentFormData.clientSecret.value;
        let clientSecretDirtyState = currentFormData.clientSecret.dirtyState;
        let durationValue = currentFormData.duration.value;
        let durationDirtyState = currentFormData.duration.dirtyState;
        let OAuth2Value = currentFormData.OAuth2.value;
        let OAuth2DirtyState = currentFormData.OAuth2.dirtyState;
        let hostValue = currentFormData.host.value;
        let hostDirtyState = currentFormData.host.dirtyState;
        let localPortValue = currentFormData.localPort.value;
        let localPortDirtyState = currentFormData.localPort.dirtyState;
        let targetIdValue = currentFormData.targetId.value;
        let targetIdDirtyState = currentFormData.targetId.dirtyState;
        let allowPlugInValue = currentFormData.allowPlugIn.value;
        let plugInValue = currentFormData.plugIn.value;
        let plugInDirtyState = currentFormData.plugIn.dirtyState;
        let formIsValid = true;
        let errors = {};

        if(agentIdValue.trim() === ''){
            if(agentIdDirtyState){
                errors['agentId'] = 'Please enter Agent Id';
            }
            formIsValid = false;
        }
        if(groupValue.trim() === ''){
            if(groupDirtyState){
                errors['group'] = 'Please enter Group';
            }
            formIsValid = false;
        }
        if(clientIdValue.trim() === ''){
            if(clientIdDirtyState){
                errors['clientId'] = 'Please enter Client Id';
            }
            formIsValid = false;
        }
        if(clientSecretValue.trim() === ''){
            if(clientSecretDirtyState){
                errors['clientSecret'] = 'Please enter Client Secret';
            }
            formIsValid = false;
        }
        if(durationValue === ''){
            if(durationDirtyState){
                errors['duration'] = 'Please enter Duration';
            }
            formIsValid = false;
        }

        if(OAuth2Value.trim() === ''){
            if(OAuth2DirtyState){
                errors['OAuth2'] = 'Please enter OAuth2';
            }
            formIsValid = false;
        }
        if(hostValue.trim() === ''){
            if(hostDirtyState){
                errors['host'] = 'Please enter Host';
            }
            formIsValid = false;
        }
        if(localPortValue.trim() === ''){
            if(localPortDirtyState){
                errors['localPort'] = 'Please enter Local Port';
            }
            formIsValid = false;
        }
        if(targetIdValue.trim() === ''){
            if(targetIdDirtyState){
                errors['targetId'] = 'Please enter Target Id';
            }
            formIsValid = false;
        }
        
        if(allowPlugInValue){
            if(plugInValue.length === 0){
                if(plugInDirtyState){
                    errors['plugIn'] = 'Please select Plug-In';
                }
                formIsValid = false;
            }
        }
        
        this.setState({
            clientFormIsValid: formIsValid,
            errorsClientForm: errors
        });
    }

    copyFromClientToGateway(){
        let currentClientForm =  Object.assign({}, this.state.clientForm);
        let currentGatewayForm =  Object.assign({}, this.state.gatewayForm);

        currentGatewayForm.host.value = currentClientForm.host.value;

        this.setState({
            gatewayForm: currentGatewayForm
        });

        this.props.showGlobalMessage(false, true, 'Data copied from client', 'custom-success');
        setTimeout(()=> {
            this.props.hideGlobalMessage();
        }, 2000);
        this.handleGatewayFormValidation();
    }

    copyFromClientToServer(){
        let currentClientForm =  Object.assign({}, this.state.clientForm);
        let currentServerForm =  Object.assign({}, this.state.serverForm);

        currentServerForm.agentId.value = currentClientForm.agentId.value;
        currentServerForm.group.value = currentClientForm.group.value;
        currentServerForm.clientId.value = currentClientForm.clientId.value;
        currentServerForm.clientSecret.value = currentClientForm.clientSecret.value;
        currentServerForm.duration.value = currentClientForm.duration.value;
        currentServerForm.OAuth2.value = currentClientForm.OAuth2.value;
        currentServerForm.host.value = currentClientForm.host.value;
        currentServerForm.proxy.value = currentClientForm.proxy.value;
        currentServerForm.allowPlugIn.value = currentClientForm.allowPlugIn.value;
        currentServerForm.plugIn.value = currentClientForm.plugIn.value;

        this.setState({
            serverForm: currentServerForm
        });

        this.props.showGlobalMessage(false, true, 'Data copied from client', 'custom-success');
        setTimeout(()=> {
            this.props.hideGlobalMessage();
        }, 2000);
        this.handleServerFormValidation();
    }

    copyFromServerToClient(){
        let currentServerForm =  Object.assign({}, this.state.serverForm);
        let currentClientForm =  Object.assign({}, this.state.clientForm);

        currentClientForm.agentId.value = currentServerForm.agentId.value;
        currentClientForm.group.value = currentServerForm.group.value;
        currentClientForm.clientId.value = currentServerForm.clientId.value;
        currentClientForm.clientSecret.value = currentServerForm.clientSecret.value;
        currentClientForm.duration.value = currentServerForm.duration.value;
        currentClientForm.OAuth2.value = currentServerForm.OAuth2.value;
        currentClientForm.host.value = currentServerForm.host.value;
        currentClientForm.proxy.value = currentServerForm.proxy.value;
        currentClientForm.allowPlugIn.value = currentServerForm.allowPlugIn.value;
        currentClientForm.plugIn.value = currentServerForm.plugIn.value;

        this.setState({
            clientForm: currentClientForm
        });

        this.props.showGlobalMessage(false, true, 'Data copied from server', 'custom-success');
        setTimeout(()=> {
            this.props.hideGlobalMessage();
        }, 2000);
        this.handleClientFormValidation();
    }

    downloadFile(type){
        this.props.showGlobalMessage(true, true, 'Please wait...', 'custom-success');
        let prepareData = {};
        let agentFormData = this.state.agentForm;
        if(type === 'gateway'){
            let gatewayFormData = Object.assign({}, this.state.gatewayForm);
            prepareData.mod = gatewayFormData.mode;
            prepareData.dbg = agentFormData.debugMode.value;
            prepareData.env = gatewayFormData.environment.value;
            prepareData.gpt = gatewayFormData.gatewayPort.value;
            prepareData.zon = gatewayFormData.zone.value;
            prepareData.sst = gatewayFormData.serviceUrl.value;
            prepareData.tkn = gatewayFormData.token.value;
            prepareData.hst = gatewayFormData.host.value;
            console.log(prepareData);
            fetch(this.state.apiEndPoints.baseUrl, { // '/generateGatewayScript?user_id'+this.props.userId
                method: 'GET'
            })
            .then((response) => {
                if (response.status === 200) {
                    this.props.showGlobalMessage(true, true, 'Record saved successfully', 'custom-success');
                    setTimeout(()=> {
                        this.props.hideGlobalMessage();
                        let gatewayForm = {
                            mode: 'GATEWAY',
                            environment: { value: '', dirtyState: false },
                            gatewayPort: { value: '', dirtyState: false },
                            zone: { value: '', dirtyState: false },
                            serviceUrl: { value: '', dirtyState: false },
                            token: { value: '', dirtyState: false },
                            host: { value: '', dirtyState: false },
                        };
                        this.setState({
                            gatewayForm: gatewayForm,
                            gatewayFormIsValid: false
                        });
                    }, 2000);
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
        else if(type === 'server'){
            let serverFormData = Object.assign({}, this.state.serverForm);
            prepareData.mod = serverFormData.mode;
            prepareData.dbg = agentFormData.debugMode.value;
            prepareData.gatewayId = agentFormData.gateway.value;
            prepareData.aid = serverFormData.agentId.value;
            prepareData.grp = serverFormData.group.value;
            prepareData.cid = serverFormData.clientId.value;
            prepareData.csc = serverFormData.clientSecret.value;
            prepareData.dur = serverFormData.duration.value;
            prepareData.oa2 = serverFormData.OAuth2.value;
            prepareData.hst = serverFormData.host.value;
            prepareData.zon = serverFormData.zone.value;
            prepareData.cps = 0;
            prepareData.sst = serverFormData.serviceUrl.value;
            prepareData.rht = serverFormData.remoteHost.value;
            prepareData.rpt = serverFormData.remotePort.value;
            prepareData.prx = serverFormData.proxy.value;
            prepareData.plg = serverFormData.allowPlugIn.value;
            for(let statePlugIn of this.state.plugIns){
                if(serverFormData.plugIn.value.indexOf(statePlugIn.id) !== -1){
                    prepareData[statePlugIn.id] = true;
                }
                else{
                    prepareData[statePlugIn.id] = false;
                }
            }
            console.log(prepareData);
            fetch(this.state.apiEndPoints.baseUrl, {  // '/generateServerScript?user_id='+this.props.userId+'&gateway_id='+agentFormData.gateway.value
                method: 'GET'
            })
            .then((response) => {
                if (response.status === 200) {
                    this.props.showGlobalMessage(true, true, 'Record saved successfully', 'custom-success');
                    setTimeout(()=> {
                        this.props.hideGlobalMessage();
                        let serverForm = {
                            mode: 'SERVER',
                            agentId: { value: '', dirtyState: false },
                            group: { value: '', dirtyState: false },
                            clientId: { value: '', dirtyState: false },
                            clientSecret: { value: '', dirtyState: false },
                            duration: { value: '', dirtyState: false },
                            OAuth2:{ value: '', dirtyState: false },
                            host: { value: '', dirtyState: false },
                            zone: { value: '', dirtyState: false },
                            serviceUrl: { value: '', dirtyState: false },
                            remoteHost: { value: '', dirtyState: false },
                            remotePort: { value: '', dirtyState: false },
                            proxy: { value: '', dirtyState: false },
                            allowPlugIn: { value: false, dirtyState: false },
                            plugIn: { value: [], dirtyState: false },
                        };
                        this.setState({
                            serverForm: serverForm,
                            serverFormIsValid: false
                        });
                    }, 2000);
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
        else if(type === 'client'){
            let clientFormData = this.state.clientForm;
            prepareData.gatewayId = agentFormData.gateway.value;
            prepareData.agentId = clientFormData.agentId.value;
            prepareData.group = clientFormData.group.value;
            prepareData.clientId = clientFormData.clientId.value;
            prepareData.clientSecret = clientFormData.clientSecret.value;
            prepareData.duration = clientFormData.duration.value;
            prepareData.OAuth2 = clientFormData.OAuth2.value;
            prepareData.host = clientFormData.host.value;
            prepareData.localPort = clientFormData.localPort.value;
            prepareData.targetId = clientFormData.targetId.value;
            prepareData.proxy = clientFormData.proxy.value;
            prepareData.allowPlugIn = clientFormData.allowPlugIn.value;
            prepareData.plugIn = clientFormData.plugIn.value;
            console.log(prepareData);

            fetch(this.state.apiEndPoints.baseUrl, {
                method: 'GET'
            })
            .then((response) => {
                if (response.status === 200) {
                    this.props.showGlobalMessage(true, true, 'Record saved successfully', 'custom-success');
                    setTimeout(()=> {
                        this.props.hideGlobalMessage();
                        let clientForm = {
                            mode: 'CLIENT',
                            agentId: { value: '', dirtyState: false },
                            group: { value: '', dirtyState: false },
                            clientId: { value: '', dirtyState: false },
                            clientSecret: { value: '', dirtyState: false },
                            duration: { value: '', dirtyState: false },
                            OAuth2: { value: '', dirtyState: false },
                            host: { value: '', dirtyState: false },
                            localPort: { value: '', dirtyState: false },
                            targetId: { value: '', dirtyState: false },
                            proxy: { value: '', dirtyState: false },
                            allowPlugIn: { value: false, dirtyState: false },
                            plugIn: { value: [], dirtyState: false },
                        };
                        this.setState({
                            clientForm: clientForm,
                            clientFormIsValid: false
                        });
                    }, 2000);
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
    }

    render() {
        return (
            <div className="row Maintainagentcreate">
                <div className="col-md-12 mt-2">
                    <div className="row">
                        <div className="text-left">
                            <ul className="breadcrumb">
                                <li className="breadcrumb-item active">Maintain</li>
                                <li className="breadcrumb-item active">Create Agent</li>
                            </ul>  
                        </div>
                    </div>
                    <div className="centered-div">
                        <div className="centered-div-header">
                            <div className="row maintainagentcreate-header">
                                <div className="col-md-12">
                                    <h6 id="maintainagentcreate-title">Create Agent <small>Creating parameters.</small></h6>
                                </div>
                            </div>
                            <hr></hr>
                            <div className="row form-body">
                                <div className="col-sm-4">
                                    <h6>AGENT MODE</h6>
                                        <div className="col-sm-12 mb-2">
                                            {this.state.agentModeButtons.map((agentModeButton, buttonIndex) => {
                                                return(
                                                    <button
                                                        key={"agentModeButton"+buttonIndex} 
                                                        type="button"
                                                        id={"agentModeButton"+buttonIndex}
                                                        name="agentMode" 
                                                        className={agentModeButton.value == this.state.agentForm.agentMode.value ? "btn btn-sm mr-2 btn-selected" : "btn btn-sm mr-2 btn-deselected"}
                                                        onClick={this.handleChangeAgentMode.bind(this, agentModeButton.value)} >{agentModeButton.text}</button>
                                                )
                                            })}
                                        </div>
                                </div>
                                <div className="col-sm-4">
                                    <h6>&nbsp;</h6>
                                    <div className="custom-control custom-checkbox">
                                        <input 
                                            type="checkbox" 
                                            className="custom-control-input custom-control-checkbox" 
                                            id="debugMode" 
                                            name="debugMode" 
                                            checked={this.state.agentForm.debugMode.value}
                                            onChange={(event)=>{this.handleAgentFormData(event)}} />
                                        <label className="custom-control-label" htmlFor="debugMode"><small className="theme-color"><strong>DEBUG MODE ENABLED</strong></small></label>
                                    </div>
                                </div>
                                {this.state.agentForm.agentMode.value != 1 ?
                                        <div className="col-sm-3">
                                            <h6>&nbsp;</h6>
                                            <select className="form-control form-control-sm" name="gateway" value={this.state.agentForm.gateway.value} onChange={(event)=>{this.handleAgentFormData(event)}}>
                                                {this.state.gateways.map((gateway, gatewayIndex) => {
                                                    return(
                                                        <option
                                                            key={"gatewayOption"+gatewayIndex}
                                                            value={ gateway.gatewayId }>{ gateway.gatewayId }</option>)
                                                })}
                                            </select>
                                        </div>:
                                    null
                                }
                            </div>
                            <hr></hr>
                            {this.state.agentForm.agentMode.value == 1 ?
                                <div className="changeable-form gateway-form">
                                    <div className="row">
                                        <div className="col-sm-4">
                                            <div className="col-sm-12 label required">
                                                MODE <img alt="down-arrow" src="assets/static/images/icon_greensortingdown.svg" />
                                                <span className="float-right help-text" >
                                                    <img alt="info" src="assets/static/images/info.svg" data-toggle="popover" data-trigger="hover" data-placement="top" data-content={this.props.helpText.mode} />
                                                </span>
                                            </div>
                                            <div className="col-sm-12 mb-2">
                                                <input
                                                    type="text"
                                                    className="form-control form-control-sm"
                                                    name="mode"
                                                    disabled={true}
                                                    defaultValue={this.state.gatewayForm.mode} />
                                            </div>
                                        </div>
                                        <div className="col-sm-4">
                                            <div className="col-sm-12 label required">
                                                ENVIRONMENT <img alt="down-arrow" src="assets/static/images/icon_greensortingdown.svg" />
                                                <span className="float-right help-text" >
                                                    <img alt="info" src="assets/static/images/info.svg" data-toggle="popover" data-trigger="hover" data-placement="top" data-content={this.props.helpText.environment} />
                                                </span>
                                            </div>
                                            <div className="col-sm-12 mb-2">
                                                <input
                                                    type="text"
                                                    autoComplete="off"
                                                    className="form-control form-control-sm"
                                                    name="environment"
                                                    value={this.state.gatewayForm.environment.value}
                                                    onChange={(event)=>{this.handleGatewayFormData(event)}} />
                                                <small className="text-danger">{ this.state.errorsGatewayForm['environment'] }</small>
                                            </div>
                                        </div>
                                        <div className="col-sm-4">
                                            <div className="col-sm-12 label required">
                                                GATEWAY PORT <img alt="down-arrow" src="assets/static/images/icon_greensortingdown.svg" />
                                            </div>
                                            <div className="col-sm-12 mb-2">
                                                <input
                                                    type="text"
                                                    autoComplete="off"
                                                    className="form-control form-control-sm"
                                                    name="gatewayPort"
                                                    value={this.state.gatewayForm.gatewayPort.value}
                                                    onChange={(event)=>{this.handleGatewayFormData(event)}} />
                                                <small className="text-danger">{ this.state.errorsGatewayForm['gatewayPort'] }</small>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-sm-4">
                                            <div className="col-sm-12 label required">
                                                ZONE <img alt="down-arrow" src="assets/static/images/icon_greensortingdown.svg" />
                                            </div>
                                            <div className="col-sm-12 mb-2">
                                                <input
                                                    type="text"
                                                    autoComplete="off"
                                                    className="form-control form-control-sm"
                                                    name="zone"
                                                    value={this.state.gatewayForm.zone.value}
                                                    onChange={(event)=>{this.handleGatewayFormData(event)}} />
                                                <small className="text-danger">{ this.state.errorsGatewayForm['zone'] }</small>
                                            </div>
                                        </div>
                                        <div className="col-sm-4">
                                            <div className="col-sm-12 label required">
                                                SERVICE URL <img alt="down-arrow" src="assets/static/images/icon_greensortingdown.svg" />
                                            </div>
                                            <div className="col-sm-12 mb-2">
                                                <input
                                                    type="text"
                                                    autoComplete="off"
                                                    className="form-control form-control-sm"
                                                    name="serviceUrl"
                                                    value={this.state.gatewayForm.serviceUrl.value}
                                                    onChange={(event)=>{this.handleGatewayFormData(event)}} />
                                                <small className="text-danger">{ this.state.errorsGatewayForm['serviceUrl'] }</small>
                                            </div>
                                        </div>
                                        <div className="col-sm-4">
                                            <div className="col-sm-12 label required">
                                                TOKEN <img alt="down-arrow" src="assets/static/images/icon_greensortingdown.svg" />
                                            </div>
                                            <div className="col-sm-12 mb-2">
                                                <input
                                                    type="text"
                                                    autoComplete="off"
                                                    className="form-control form-control-sm"
                                                    name="token"
                                                    value={this.state.gatewayForm.token.value}
                                                    onChange={(event)=>{this.handleGatewayFormData(event)}} />
                                                <small className="text-danger">{ this.state.errorsGatewayForm['token'] }</small>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-sm-4">
                                            <div className="col-sm-12 label required">
                                                HOST <img alt="down-arrow" src="assets/static/images/icon_greensortingdown.svg" />
                                            </div>
                                            <div className="col-sm-12 mb-2">
                                                <input
                                                    type="text"
                                                    autoComplete="off"
                                                    className="form-control form-control-sm"
                                                    name="host"
                                                    value={this.state.gatewayForm.host.value}
                                                    onChange={(event)=>{this.handleGatewayFormData(event)}} />
                                                <small className="text-danger">{ this.state.errorsGatewayForm['host'] }</small>
                                            </div>
                                        </div>
                                        <div className="col-sm-4">
                                            
                                        </div>
                                        <div className="col-sm-4">
                                            
                                        </div>
                                    </div>

                                    <div className="col-sm-12 mb-2"><hr></hr></div>
                                    <div className="row">
                                        <div className="col-sm-5 mb-2">
                                            <img alt="copy" src="assets/static/images/copy.svg" height="15px" />
                                            <a onClick={this.copyFromClientToGateway.bind(this)} href="#" className="theme-color cursor-pointer ml-1"><small>Copy details from client</small></a>
                                        </div>
                                        <div className="col-sm-7 mb-2">
                                            <button 
                                                disabled = {!this.state.gatewayFormIsValid}
                                                onClick={this.downloadFile.bind(this, 'gateway')} 
                                                id="create-gateway-btn"
                                                className="btn btn-sm customize-view-btn">CREATE SCRIPT</button>
                                            {/*<button type="button" data-toggle="modal" data-target="#executeModal" className="btn btn-sm customize-view-btn ml-2">EXECUTE SCRIPT</button>*/}
                                        </div>
                                    </div>
                                </div>
                                : null
                            }

                            {this.state.agentForm.agentMode.value == 2 ?
                                <div className="changeable-form server-form">
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <div className="col-sm-12 label required">
                                                MODE <img alt="down-arrow" src="assets/static/images/icon_greensortingdown.svg" />
                                            </div>
                                            <div className="col-sm-12 mb-2">
                                                <input
                                                    type="text"
                                                    className="form-control form-control-sm"
                                                    name="mode"
                                                    disabled={true}
                                                    defaultValue={this.state.serverForm.mode} />
                                            </div>
                                        </div>
                                        <div className="col-sm-3">
                                            <div className="col-sm-12 label required">
                                                AGENT ID <img alt="down-arrow" src="assets/static/images/icon_greensortingdown.svg" />
                                            </div>
                                            <div className="col-sm-12 mb-2">
                                                <input
                                                    type="text"
                                                    autoComplete="off"
                                                    className="form-control form-control-sm"
                                                    name="agentId"
                                                    value={this.state.serverForm.agentId.value}
                                                    onChange={(event)=>{this.handleServerFormData(event)}} />
                                                <small className="text-danger">{ this.state.errorsServerForm['agentId']}</small>
                                            </div>
                                        </div>
                                        <div className="col-sm-3">
                                            <div className="col-sm-12 label required">
                                                GROUP <img alt="down-arrow" src="assets/static/images/icon_greensortingdown.svg" />
                                            </div>
                                            <div className="col-sm-12 mb-2">
                                                <input
                                                    type="text"
                                                    autoComplete="off"
                                                    className="form-control form-control-sm"
                                                    name="group"
                                                    value={this.state.serverForm.group.value}
                                                    onChange={(event)=>{this.handleServerFormData(event)}} />
                                                <small className="text-danger">{ this.state.errorsServerForm['group']}</small>
                                            </div>
                                        </div>
                                        <div className="col-sm-3">
                                            <div className="col-sm-12 label required">
                                                CLIENT ID <img alt="down-arrow" src="assets/static/images/icon_greensortingdown.svg" />
                                            </div>
                                            <div className="col-sm-12 mb-2">
                                                <input
                                                    type="text"
                                                    autoComplete="off"
                                                    className="form-control form-control-sm"
                                                    name="clientId"
                                                    value={this.state.serverForm.clientId.value}
                                                    onChange={(event)=>{this.handleServerFormData(event)}} />
                                                <small className="text-danger">{ this.state.errorsServerForm['clientId']}</small>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <div className="col-sm-12 label required">
                                                CLIENT SECRET <img alt="down-arrow" src="assets/static/images/icon_greensortingdown.svg" />
                                            </div>
                                            <div className="col-sm-12 mb-2">
                                                <input
                                                    type="text"
                                                    autoComplete="off"
                                                    className="form-control form-control-sm"
                                                    name="clientSecret"
                                                    value={this.state.serverForm.clientSecret.value}
                                                    onChange={(event)=>{this.handleServerFormData(event)}} />
                                                <small className="text-danger">{ this.state.errorsServerForm['clientSecret']}</small>
                                            </div>
                                        </div>
                                        <div className="col-sm-3">
                                            <div className="col-sm-12 label required">
                                                DURATION <img alt="down-arrow" src="assets/static/images/icon_greensortingdown.svg" />
                                            </div>
                                            <div className="col-sm-12 mb-2">
                                                <input
                                                    type="text"
                                                    autoComplete="off"
                                                    pattern="^[1-9][0-9]*"
                                                    className="form-control form-control-sm"
                                                    name="duration"
                                                    value={this.state.serverForm.duration.value}
                                                    onChange={(event)=>{this.handleServerFormData(event)}} />
                                                <small className="text-danger">{ this.state.errorsServerForm['duration']}</small>
                                            </div>
                                        </div>
                                        <div className="col-sm-3">
                                            <div className="col-sm-12 label required">
                                                OAUTH2 <img alt="down-arrow" src="assets/static/images/icon_greensortingdown.svg" />
                                            </div>
                                            <div className="col-sm-12 mb-2">
                                                <input
                                                    type="text"
                                                    autoComplete="off"
                                                    className="form-control form-control-sm"
                                                    name="OAuth2"
                                                    value={this.state.serverForm.OAuth2.value}
                                                    onChange={(event)=>{this.handleServerFormData(event)}} />
                                                <small className="text-danger">{ this.state.errorsServerForm['OAuth2']}</small>
                                            </div>
                                        </div>
                                        <div className="col-sm-3">
                                            <div className="col-sm-12 label required">
                                                HOST <img alt="down-arrow" src="assets/static/images/icon_greensortingdown.svg" />
                                            </div>
                                            <div className="col-sm-12 mb-2">
                                                <input
                                                    type="text"
                                                    autoComplete="off"
                                                    className="form-control form-control-sm"
                                                    name="host"
                                                    value={this.state.serverForm.host.value}
                                                    onChange={(event)=>{this.handleServerFormData(event)}} />
                                                <small className="text-danger">{ this.state.errorsServerForm['host']}</small>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <div className="col-sm-12 label required">
                                                ZONE <img alt="down-arrow" src="assets/static/images/icon_greensortingdown.svg" />
                                            </div>
                                            <div className="col-sm-12 mb-2">
                                                <input
                                                    type="text"
                                                    autoComplete="off"
                                                    className="form-control form-control-sm"
                                                    name="zone"
                                                    value={this.state.serverForm.zone.value}
                                                    onChange={(event)=>{this.handleServerFormData(event)}} />
                                                <small className="text-danger">{ this.state.errorsServerForm['zone']}</small>
                                            </div>
                                        </div>
                                        <div className="col-sm-3">
                                            <div className="col-sm-12 label required">
                                                SERVICE URL <img alt="down-arrow" src="assets/static/images/icon_greensortingdown.svg" />
                                            </div>
                                            <div className="col-sm-12 mb-2">
                                                <input
                                                    type="text"
                                                    className="form-control form-control-sm"
                                                    name="serviceUrl"
                                                    value={this.state.serverForm.serviceUrl.value}
                                                    onChange={(event)=>{this.handleServerFormData(event)}} />
                                                <small className="text-danger">{ this.state.errorsServerForm['serviceUrl']}</small>
                                            </div>
                                        </div>
                                        <div className="col-sm-3">
                                            <div className="col-sm-12 label required">
                                                REMOTE HOST <img alt="down-arrow" src="assets/static/images/icon_greensortingdown.svg" />
                                            </div>
                                            <div className="col-sm-12 mb-2">
                                                <input
                                                    type="text"
                                                    autoComplete="off"
                                                    className="form-control form-control-sm"
                                                    name="remoteHost"
                                                    value={this.state.serverForm.remoteHost.value}
                                                    onChange={(event)=>{this.handleServerFormData(event)}} />
                                                <small className="text-danger">{ this.state.errorsServerForm['remoteHost']}</small>
                                            </div>
                                        </div>
                                        <div className="col-sm-3">
                                            <div className="col-sm-12 label required">
                                                REMOTE PORT <img alt="down-arrow" src="assets/static/images/icon_greensortingdown.svg" />
                                            </div>
                                            <div className="col-sm-12 mb-2">
                                                <input
                                                    type="text"
                                                    autoComplete="off"
                                                    className="form-control form-control-sm"
                                                    name="remotePort"
                                                    value={this.state.serverForm.remotePort.value}
                                                    onChange={(event)=>{this.handleServerFormData(event)}} />
                                                <small className="text-danger">{ this.state.errorsServerForm['remotePort']}</small>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <div className="col-sm-12 label required">
                                                PROXY
                                            </div>
                                            <div className="col-sm-12 mb-2">
                                                <input
                                                    type="text"
                                                    autoComplete="off"
                                                    className="form-control form-control-sm"
                                                    name="proxy"
                                                    value={this.state.serverForm.proxy.value}
                                                    onChange={(event)=>{this.handleServerFormData(event)}} />
                                            </div>
                                        </div>
                                        <div className="col-sm-3">
                                            <div className="col-sm-12 label required">
                                                ALLOW PLUG-IN <img alt="down-arrow" src="assets/static/images/icon_greensortingdown.svg" />
                                            </div>
                                            <div className="col-sm-12 mb-2">
                                                <div className="custom-control custom-checkbox">
                                                    <input 
                                                        type="checkbox" 
                                                        className="custom-control-input custom-control-checkbox" 
                                                        id="allowPlugIn" 
                                                        name="allowPlugIn" 
                                                        checked={this.state.serverForm.allowPlugIn.value}
                                                        onChange={(event)=>{this.handleServerFormData(event)}} />
                                                    <label className="custom-control-label" htmlFor="allowPlugIn"></label>
                                                </div>
                                            </div>
                                        </div>
                                            {
                                            this.state.serverForm.allowPlugIn.value ? 
                                            <div className="col-sm-3">
                                                <div className="col-sm-12 label">
                                                    PLUG-IN <img alt="down-arrow" src="assets/static/images/icon_greensortingdown.svg" />
                                                </div>
                                                <div className="col-sm-12 mb-2">
                                                <select multiple className="form-control form-control-sm" style={{height:'45px'}} name="plugIn" value={this.state.serverForm.plugIn.value} onChange={(event)=>{this.handleServerFormData(event)}}>
                                                        {
                                                        this.state.plugIns.map((plugIn, plugInIndex) => {
                                                            return(
                                                                <option
                                                                    key={"plugInOption"+plugInIndex}
                                                                    value={ plugIn.id }>{ plugIn.name }</option>)
                                                        })}
                                                    </select>
                                                    <small className="text-danger">{ this.state.errorsServerForm['plugIn']}</small>
                                                </div>
                                            </div>
                                            : null
                                        }
                                    </div>
                                    
                                    <div className="col-sm-12 mb-2"><hr></hr></div>

                                    <div className="row">
                                        <div className="col-sm-5 mb-2">
                                            <img alt="copy" src="assets/static/images/copy.svg" height="15px" />
                                            <a onClick={this.copyFromClientToServer.bind(this)} href="#" className="theme-color cursor-pointer ml-1"><small>Copy details from client</small></a>
                                        </div>
                                        <div className="col-sm-7 mb-2">
                                            <button 
                                                id="create-server-btn"
                                                disabled={!this.state.serverFormIsValid}
                                                onClick={this.downloadFile.bind(this, 'server')} 
                                                className="btn btn-sm customize-view-btn">CREATE SCRIPT</button>
                                            {/*<button type="button" data-toggle="modal" data-target="#executeModal" className="btn btn-sm customize-view-btn ml-2">EXECUTE SCRIPT</button>*/}
                                        </div>
                                    </div>
                                </div>
                                : null
                            }

                            {this.state.agentForm.agentMode.value == 3 ?
                                <div className="changeable-form client-form">
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <div className="col-sm-12 label required">
                                                MODE <img alt="down-arrow" src="assets/static/images/icon_greensortingdown.svg" />
                                            </div>
                                            <div className="col-sm-12 mb-2">
                                                <input
                                                    type="text"
                                                    className="form-control form-control-sm"
                                                    name="mode"
                                                    disabled={true}
                                                    defaultValue={this.state.clientForm.mode} />
                                            </div>
                                        </div>
                                        <div className="col-sm-3">
                                            <div className="col-sm-12 label required">
                                                AGENT ID <img alt="down-arrow" src="assets/static/images/icon_greensortingdown.svg" />
                                            </div>
                                            <div className="col-sm-12 mb-2">
                                                <input
                                                    type="text"
                                                    autoComplete="off"
                                                    className="form-control form-control-sm"
                                                    name="agentId"
                                                    value={this.state.clientForm.agentId.value}
                                                    onChange={(event)=>{this.handleClientFormData(event)}} />
                                                <small className="text-danger">{ this.state.errorsClientForm['agentId']}</small>
                                            </div>
                                        </div>
                                        <div className="col-sm-3">
                                            <div className="col-sm-12 label required">
                                                GROUP <img alt="down-arrow" src="assets/static/images/icon_greensortingdown.svg" />
                                            </div>
                                            <div className="col-sm-12 mb-2">
                                                <input
                                                    type="text"
                                                    autoComplete="off"
                                                    className="form-control form-control-sm"
                                                    name="group"
                                                    value={this.state.clientForm.group.value}
                                                    onChange={(event)=>{this.handleClientFormData(event)}} />
                                                <small className="text-danger">{ this.state.errorsClientForm['group']}</small>
                                            </div>
                                        </div>
                                        <div className="col-sm-3">
                                            <div className="col-sm-12 label required">
                                                CLIENT ID <img alt="down-arrow" src="assets/static/images/icon_greensortingdown.svg" />
                                            </div>
                                            <div className="col-sm-12 mb-2">
                                                <input
                                                    type="text"
                                                    autoComplete="off"
                                                    className="form-control form-control-sm"
                                                    name="clientId"
                                                    value={this.state.clientForm.clientId.value}
                                                    onChange={(event)=>{this.handleClientFormData(event)}} />
                                                <small className="text-danger">{ this.state.errorsClientForm['clientId']}</small>
                                            </div>
                                        </div>
                                    </div> 

                                    <div className="row">
                                        <div className="col-sm-3">
                                            <div className="col-sm-12 label required">
                                                CLIENT SECRET <img alt="down-arrow" src="assets/static/images/icon_greensortingdown.svg" />
                                            </div>
                                            <div className="col-sm-12 mb-2">
                                                <input
                                                    type="text"
                                                    autoComplete="off"
                                                    className="form-control form-control-sm"
                                                    name="clientSecret"
                                                    value={this.state.clientForm.clientSecret.value}
                                                    onChange={(event)=>{this.handleClientFormData(event)}} />
                                                <small className="text-danger">{ this.state.errorsClientForm['clientSecret']}</small>
                                            </div>
                                        </div>
                                        <div className="col-sm-3">
                                            <div className="col-sm-12 label required">
                                                DURATION <img alt="down-arrow" src="assets/static/images/icon_greensortingdown.svg" />
                                            </div>
                                            <div className="col-sm-12 mb-2">
                                                <input
                                                    type="text"
                                                    autoComplete="off"
                                                    pattern="^[1-9][0-9]*"
                                                    className="form-control form-control-sm"
                                                    name="duration"
                                                    value={this.state.clientForm.duration.value}
                                                    onChange={(event)=>{this.handleClientFormData(event)}} />
                                                <small className="text-danger">{ this.state.errorsClientForm['duration']}</small>
                                            </div>
                                        </div>
                                        <div className="col-sm-3">
                                            <div className="col-sm-12 label required">
                                                OAUTH2 <img alt="down-arrow" src="assets/static/images/icon_greensortingdown.svg" />
                                            </div>
                                            <div className="col-sm-12 mb-2">
                                                <input
                                                    type="text"
                                                    autoComplete="off"
                                                    className="form-control form-control-sm"
                                                    name="OAuth2"
                                                    value={this.state.clientForm.OAuth2.value}
                                                    onChange={(event)=>{this.handleClientFormData(event)}} />
                                                <small className="text-danger">{ this.state.errorsClientForm['OAuth2']}</small>
                                            </div>
                                        </div>
                                        <div className="col-sm-3">
                                            <div className="col-sm-12 label required">
                                                HOST <img alt="down-arrow" src="assets/static/images/icon_greensortingdown.svg" />
                                            </div>
                                            <div className="col-sm-12 mb-2">
                                                <input
                                                    type="text"
                                                    autoComplete="off"
                                                    className="form-control form-control-sm"
                                                    name="host"
                                                    value={this.state.clientForm.host.value}
                                                    onChange={(event)=>{this.handleClientFormData(event)}} />
                                                <small className="text-danger">{ this.state.errorsClientForm['host']}</small>
                                            </div>
                                        </div>
                                    </div> 

                                    <div className="row">
                                        <div className="col-sm-3">
                                            <div className="col-sm-12 label required">
                                                LOCAL PORT <img alt="down-arrow" src="assets/static/images/icon_greensortingdown.svg" />
                                            </div>
                                            <div className="col-sm-12 mb-2">
                                                <input
                                                    type="text"
                                                    autoComplete="off"
                                                    className="form-control form-control-sm"
                                                    name="localPort"
                                                    value={this.state.clientForm.localPort.value}
                                                    onChange={(event)=>{this.handleClientFormData(event)}} />
                                                <small className="text-danger">{ this.state.errorsClientForm['localPort']}</small>
                                            </div>
                                        </div>
                                        <div className="col-sm-3">
                                            <div className="col-sm-12 label required">
                                                TARGET ID <img alt="down-arrow" src="assets/static/images/icon_greensortingdown.svg" />
                                            </div>
                                            <div className="col-sm-12 mb-2">
                                                <input
                                                    type="text"
                                                    autoComplete="off"
                                                    className="form-control form-control-sm"
                                                    name="targetId"
                                                    value={this.state.clientForm.targetId.value}
                                                    onChange={(event)=>{this.handleClientFormData(event)}} />
                                                <small className="text-danger">{ this.state.errorsClientForm['targetId']}</small>
                                            </div>
                                        </div>
                                        <div className="col-sm-3">
                                            <div className="col-sm-12 label required">
                                                PROXY
                                            </div>
                                            <div className="col-sm-12 mb-2">
                                                <input
                                                    type="text"
                                                    autoComplete="off"
                                                    className="form-control form-control-sm"
                                                    name="proxy"
                                                    value={this.state.clientForm.proxy.value}
                                                    onChange={(event)=>{this.handleClientFormData(event)}} />
                                                
                                            </div>
                                        </div>
                                        <div className="col-sm-3">
                                            <div className="col-sm-12 label required">
                                                ALLOW PLUG-IN <img alt="down-arrow" src="assets/static/images/icon_greensortingdown.svg" />
                                            </div>
                                            <div className="col-sm-12 mb-2">
                                                <div className="custom-control custom-checkbox">
                                                    <input 
                                                        type="checkbox" 
                                                        className="custom-control-input custom-control-checkbox" 
                                                        id="allowPlugIn" 
                                                        name="allowPlugIn" 
                                                        checked={this.state.clientForm.allowPlugIn.value}
                                                        onChange={(event)=>{this.handleClientFormData(event)}} />
                                                    <label className="custom-control-label" htmlFor="allowPlugIn"></label>
                                                </div>
                                            </div>
                                        </div>
                                    </div> 

                                    <div className="row">
                                        {
                                            this.state.clientForm.allowPlugIn.value ? 
                                            <div className="col-sm-3">
                                                <div className="col-sm-12 label">
                                                    PLUG-IN <img alt="down-arrow" src="assets/static/images/icon_greensortingdown.svg" />
                                                </div>
                                                <div className="col-sm-12 mb-2">
                                                    <select multiple className="form-control form-control-sm" style={{height:'45px'}} name="plugIn" value={this.state.clientForm.plugIn.value} onChange={(event)=>{this.handleClientFormData(event)}}>
                                                        {
                                                        this.state.plugIns.map((plugIn, plugInIndex) => {
                                                            return(
                                                                <option
                                                                    key={"plugInOption"+plugInIndex}
                                                                    value={ plugIn.id }>{ plugIn.name }</option>)
                                                        })}
                                                    </select>
                                                    <small className="text-danger">{ this.state.errorsClientForm['plugIn']}</small>
                                                </div>
                                            </div>
                                            : null
                                        }
                                    </div> 

                                    <div className="col-sm-12 mb-2"><hr></hr></div>
                                    
                                    <div className="row">
                                        <div className="col-sm-5 mb-2">
                                            <img alt="copy" src="assets/static/images/copy.svg" height="15px" />
                                            <a onClick={this.copyFromServerToClient.bind(this)} href="#" className="theme-color cursor-pointer ml-1"><small>Copy details from server</small></a>
                                        </div>
                                        <div className="col-sm-7 mb-2">
                                            <button
                                                id="create-client-btn"
                                                disabled = {!this.state.clientFormIsValid} 
                                                onClick={this.downloadFile.bind(this, 'client')} 
                                                className="btn btn-sm customize-view-btn">CREATE SCRIPT</button>
                                        </div>
                                    </div>
                                </div>
                                : null
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
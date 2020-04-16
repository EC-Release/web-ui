import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import fetchMock from 'fetch-mock';

import Subscriptioncreate from '../Maintain/Subscriptioncreate.js';

configure({ adapter: new Adapter() });

window.enableToolTip = () => { };

describe('Testing from Subscriptioncreate.test.js <Subscriptioncreate />', () => {

    it('should render the Subscriptioncreate component', () => {
        const propsToPass = {
            helpText: {
                subscriptionName: '',
                subscriptionId: '',
                serviceUri: '',
                clientId: '',
                clientSecret: '',
                OAuth2: '',
                adminToken: '',
                applicationRole: '',
                bucAdn: '',
                compliance: '',
                customer: '',
                cluster: '',
                expdate: '',
                managementHostType: '',
                owner: '',
                project: '',
                security: '',
                version: ''
            }
        }
        fetchMock.get(`*`, JSON.stringify('SECONDGETOBJ'), { overwriteRoutes: false });
        const wrapper = shallow(<Subscriptioncreate helpText={propsToPass.helpText} />, { disableLifecycleMethods: true });
        
        wrapper.setState({
            subscriptionForm:{
                subscriptionName: { value: '', dirtyState: false },
                subscriptionId: { value: '', dirtyState: false },
                serviceUri: { value: '', dirtyState: false },
                clientId: { value: '', dirtyState: false },
                clientSecret: { value: '', dirtyState: false },
                OAuth2: { value: '', dirtyState: false },
                adminToken: { value: '', dirtyState: false },
                applicationRole: { value: '', dirtyState: false },
                bucAdn: { value: '', dirtyState: false },
                compliance: { value: '', dirtyState: false },
                confidentiality: { value: 'true', dirtyState: false },
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
                uai: { value: '', dirtyState: false }
            }
        });
        expect(wrapper).toBeTruthy();
    });

    it('should have "Subscription form" with div only once', () => {
        const propsToPass = {
            helpText: {
                subscriptionName: '',
                subscriptionId: '',
                serviceUri: '',
                clientId: '',
                clientSecret: '',
                OAuth2: '',
                adminToken: '',
                applicationRole: '',
                bucAdn: '',
                compliance: '',
                customer: '',
                cluster: '',
                expdate: '',
                managementHostType: '',
                owner: '',
                project: '',
                security: '',
                version: ''
            }
        }
        fetchMock.get(`*`, JSON.stringify('SECONDGETOBJ'), { overwriteRoutes: false });
        const wrapper = shallow(<Subscriptioncreate helpText={propsToPass.helpText} />, { disableLifecycleMethods: true });
        
        wrapper.setState({
            subscriptionForm:{
                subscriptionName: { value: '', dirtyState: false },
                subscriptionId: { value: '', dirtyState: false },
                serviceUri: { value: '', dirtyState: false },
                clientId: { value: '', dirtyState: false },
                clientSecret: { value: '', dirtyState: false },
                OAuth2: { value: '', dirtyState: false },
                adminToken: { value: '', dirtyState: false },
                applicationRole: { value: '', dirtyState: false },
                bucAdn: { value: '', dirtyState: false },
                compliance: { value: '', dirtyState: false },
                confidentiality: { value: 'true', dirtyState: false },
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
                uai: { value: '', dirtyState: false }
            }
        });
        expect(wrapper.find('div.subscription-form').length).toBe(1);
    });

});
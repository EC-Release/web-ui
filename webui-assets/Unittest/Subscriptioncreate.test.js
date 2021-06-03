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
                expdate: '',
                username: ''
            }
        }
        fetchMock.get(`*`, JSON.stringify('SECONDGETOBJ'), { overwriteRoutes: false });
        const wrapper = shallow(<Subscriptioncreate helpText={propsToPass.helpText} />, { disableLifecycleMethods: true });
        
        wrapper.setState({
            subscriptionForm:{
                        licenseId: { value: "", dirtyState: false },
                        emailAddress: { value: "", dirtyState: false },
                        sso: { value: "", dirtyState: false },
                        desc: { value: "", dirtyState: false },
                        username: { value: "", dirtyState: false },
                        date: { value: "", dirtyState: false }
            }
        });
        expect(wrapper).toBeTruthy();
    });

    it('should have "Subscription form" with div only once', () => {
        const propsToPass = {
            helpText: {
                subscriptionName: '',
                expdate: '',
                username: ''
            }
        }
        fetchMock.get(`*`, JSON.stringify('SECONDGETOBJ'), { overwriteRoutes: false });
        const wrapper = shallow(<Subscriptioncreate helpText={propsToPass.helpText} />, { disableLifecycleMethods: true });
        
        wrapper.setState({
            subscriptionForm:{
                        licenseId: { value: "", dirtyState: false },
                        emailAddress: { value: "", dirtyState: false },
                        sso: { value: "", dirtyState: false },
                        desc: { value: "", dirtyState: false },
                        username: { value: "", dirtyState: false },
                        date: { value: "", dirtyState: false }
            }
        });
        expect(wrapper.find('div.subscription-form').length).toBe(1);
    });
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
        const wrapper = shallow(<Subscriptioncreate  helpText={propsToPass.helpText}/>);
        expect(wrapper.find('div.Subscriptioncreate').length).toBe(1);
    });
     

});

import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import fetchMock from 'fetch-mock';

import Subscriptionedit from '../Maintain/Subscriptionedit.js';

configure({ adapter: new Adapter() });

window.enableToolTip = () => { };

describe('Testing from Subscriptionedit.test.js <Subscriptionedit />', () => {

    it('should render the Subscriptionedit component', () => {
        const propsToPass = {
            helpText: {
                licenseId:'',
                emailAddress: '',
                sso: '',
                expdate: '',
                desc: '',
                username: ''
            }
        }
        fetchMock.get(`*`, JSON.stringify('SECONDGETOBJ'), { overwriteRoutes: false });
        const wrapper = shallow(<Subscriptionedit helpText={propsToPass.helpText} changeView={() => { }} />, { disableLifecycleMethods: true });
        
        wrapper.setState({
            subscriptionForm:{
                licenseId: { value: "", dirtyState: false },
                emailAddress: { value: "", dirtyState: false },
                sso: { value: "", dirtyState: false },
                date: { value: "", dirtyState: false },
                desc: { value: "", dirtyState: false },
                username: { value: "", dirtyState: false },
                key:"",
                parent:"",
                name:""
            }
        });
        expect(wrapper).toBeTruthy();
    });

    it('should have "Subscription form" with div only once', () => {
        const propsToPass = {
            helpText: {
                licenseId:'',
                emailAddress: '',
                sso: '',
                expdate: '',
                desc: '',
                username: ''
            }
        }
        fetchMock.get(`*`, JSON.stringify('SECONDGETOBJ'), { overwriteRoutes: false });
        const wrapper = shallow(<Subscriptionedit helpText={propsToPass.helpText} changeView={() => { }} />, { disableLifecycleMethods: true });
        
        wrapper.setState({
            subscriptionForm:{
                licenseId: { value: "", dirtyState: false },
                emailAddress: { value: "", dirtyState: false },
                sso: { value: "", dirtyState: false },
                date: { value: "", dirtyState: false },
                desc: { value: "", dirtyState: false },
                username: { value: "", dirtyState: false },
                key:"",
                parent:"",
                name:""
            }
        });
        expect(wrapper.find('div.subscription-form').length).toBe(1);
    });

});

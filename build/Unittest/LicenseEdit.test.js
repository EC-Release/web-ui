import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import fetchMock from 'fetch-mock';

import LicenseEdit from '../Maintain/LicenseEdit.js';

configure({ adapter: new Adapter() });

window.enableToolTip = () => { };

describe('Testing from LicenseEdit.test.js <LicenseEdit />', () => {

    it('should render the LicenseEdit component', () => {
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
        const wrapper = shallow(<LicenseEdit helpText={propsToPass.helpText} changeView={() => { }} />, { disableLifecycleMethods: true });
        
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

    it('should have "License form" with div only once', () => {
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
        const wrapper = shallow(<LicenseEdit helpText={propsToPass.helpText} changeView={() => { }} />, { disableLifecycleMethods: true });
        
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

import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import fetchMock from 'fetch-mock';

import LicenseCreate from '../Maintain/LicenseCreate.js';

configure({ adapter: new Adapter() });

window.enableToolTip = () => { };

describe('Testing from LicenseCreate.test.js <LicenseCreate />', () => {
    it('should render the LicenseCreate component', () => {
        const propsToPass = {
            helpText: {
                subscriptionName: '',
                expdate: '',
                username: ''
            }
        }
        fetchMock.get(`*`, JSON.stringify('SECONDGETOBJ'), { overwriteRoutes: false });
        const wrapper = shallow(<LicenseCreate helpText={propsToPass.helpText} />, { disableLifecycleMethods: true });
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

    it('should have "License form" with div only once', () => {
        const propsToPass = {
            helpText: {
                subscriptionName: '',
                expdate: '',
                username: ''
            }
        }
        fetchMock.get(`*`, JSON.stringify('SECONDGETOBJ'), { overwriteRoutes: false });
        const wrapper = shallow(<LicenseCreate helpText={propsToPass.helpText} />, { disableLifecycleMethods: true });
        
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
      it('should render the LicenseCreate component', () => {
        const propsToPass = {
            helpText: {
                subscriptionName: '',
                expdate: '',
                username: ''
            }
        }
        fetchMock.get(`*`, JSON.stringify('SECONDGETOBJ'), { overwriteRoutes: false });
        const wrapper = shallow(<LicenseCreate  helpText={propsToPass.helpText}/> , { disableLifecycleMethods: true });
        expect(wrapper.find('div.LicenseCreate').length).toBe(0);
    });
     

});

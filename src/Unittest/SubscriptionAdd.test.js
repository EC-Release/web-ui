import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import fetchMock from 'fetch-mock';

import SubscriptionAdd from '../Subscription/SubscriptionCreate/SubscriptionAdd';

configure({ adapter: new Adapter() });

window.enableToolTip = () => { };

describe('Testing from SubscriptionAdd.test.js <SubscriptionAdd />', () => {
    it('should render the SubscriptionAdd component', () => {
        const propsToPass = {
            helpText: {
                subscriptionName: '',
                expdate: '',
                username: ''
            }
        }
        fetchMock.get(`*`, JSON.stringify('SECONDGETOBJ'), { overwriteRoutes: false });
        const wrapper = shallow(<SubscriptionAdd helpText={propsToPass.helpText} />, { disableLifecycleMethods: true });
        wrapper.setState({
            transactionForm: {
                revision: { value: "v1.2beta", dirtyState: false },
                transactionId: { value: "", dirtyState: false },
                oidcUserId: { value: "", dirtyState: false }
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
        const wrapper = shallow(<SubscriptionAdd helpText={propsToPass.helpText} />, { disableLifecycleMethods: true });
        
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
      it('should render the SubscriptionAdd component', () => {
        const propsToPass = {
            helpText: {
                subscriptionName: '',
                expdate: '',
                username: ''
            }
        }
        fetchMock.get(`*`, JSON.stringify('SECONDGETOBJ'), { overwriteRoutes: false });
        const wrapper = shallow(<SubscriptionAdd  helpText={propsToPass.helpText}/> , { disableLifecycleMethods: true });
        expect(wrapper.find('div.SubscriptionAdd').length).toBe(0);
    });
     

});

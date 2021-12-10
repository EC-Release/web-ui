import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import fetchMock from 'fetch-mock';

import SubscriptionDashboard from '../Subscription/Dashboard/SubscriptionDashboard';

configure({ adapter: new Adapter() });

window.enableToolTip = () => { };

describe('Testing from SubscriptionDashboard.test.js <SubscriptionDashboard />', () => {
    it('should render the SubscriptionDashboard component', () => {
        const propsToPass = {
            helpText: {
                subscriptionName: '',
                expdate: '',
                username: ''
            }
        }
        fetchMock.get(`*`, JSON.stringify('SECONDGETOBJ'), { overwriteRoutes: false });
        const wrapper = shallow(<SubscriptionDashboard helpText={propsToPass.helpText} />, { disableLifecycleMethods: true });
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
        const wrapper = shallow(<SubscriptionDashboard helpText={propsToPass.helpText} />, { disableLifecycleMethods: true });
        
        wrapper.setState({
            transactionForm: {
                revision: { value: "v1.2beta", dirtyState: false },
                licenseId: { value: "", dirtyState: false },
                objId: { value: "1", dirtyState: false },
                currencyId: { value: "1", dirtyState: false },
                eaAmount: { value: "98", dirtyState: false },
                qty : { value: "1", dirtyState: false },
                oidcUserId: { value: "", dirtyState: false },
                paymentVadStr1: { value: "", dirtyState: false },
                paymentVadStr2: { value: "", dirtyState: false },
                paymentVadStr3: { value: "", dirtyState: false },
              },
        });
        expect(wrapper.find('div.subscription-form').length).toBe(1);
    });
      it('should render the SubscriptionDashboard component', () => {
        const propsToPass = {
            helpText: {
                subscriptionName: '',
                expdate: '',
                username: ''
            }
        }
        fetchMock.get(`*`, JSON.stringify('SECONDGETOBJ'), { overwriteRoutes: false });
        const wrapper = shallow(<SubscriptionDashboard  helpText={propsToPass.helpText}/> , { disableLifecycleMethods: true });
        expect(wrapper.find('div.SubscriptionDashboard').length).toBe(0);
    });
     

});

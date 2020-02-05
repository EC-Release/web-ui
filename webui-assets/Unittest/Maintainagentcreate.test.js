import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import fetchMock from 'fetch-mock';

import Maintainagentcreate from '../Maintain/Maintainagentcreate.js';

configure({ adapter: new Adapter() });


describe('Testing from Maintainagentcreate.test.js <View />', () => {

    it('should render the Maintainagentcreate component', () => {
        fetchMock.get(`*`, JSON.stringify('SECONDGETOBJ'), { overwriteRoutes: false });
        const wrapper = shallow(<Maintainagentcreate />);
        expect(wrapper).toBeTruthy();
    });

    it('should have "GATEWAY" button with div only once', () => {

        fetchMock.get(`*`, JSON.stringify('SECONDGETOBJ'), { overwriteRoutes: false });
        const wrapper = shallow(<Maintainagentcreate />);
        wrapper.setState({
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
            }
        });
        expect(wrapper.find('div.gateway-form').length).toBe(1);
    });

    it('should have "SERVER" button with div only once', () => {

        fetchMock.get(`*`, JSON.stringify('SECONDGETOBJ'), { overwriteRoutes: false });
        const wrapper = shallow(<Maintainagentcreate />);
        wrapper.setState({
            agentForm: {
                agentMode: { value: 2, dirtyState: false },
                gateway: { value: '', dirtyState: false },
                businessId: { value: 0, dirtyState: false },
                businessName: { value: '', dirtyState: false },
                requestor: { value: '', dirtyState: false },
                requestedDate: { value: '', dirtyState: false },
                customerEmail: { value: '', dirtyState: false },
                bucAnd: { value: '', dirtyState: false },
                vpc: { value: '', dirtyState: false },
                debugMode: { value: true, dirtyState: false },
            }
        });
        expect(wrapper.find('div.server-form').length).toBe(1);
    });
    it('should have "CLIENT" class with div only once', () => {

        fetchMock.get(`*`, JSON.stringify('SECONDGETOBJ'), { overwriteRoutes: false });
        const wrapper = shallow(<Maintainagentcreate />);
        wrapper.setState({
            agentForm: {
                agentMode: { value: 3, dirtyState: false },
                gateway: { value: '', dirtyState: false },
                businessId: { value: 0, dirtyState: false },
                businessName: { value: '', dirtyState: false },
                requestor: { value: '', dirtyState: false },
                requestedDate: { value: '', dirtyState: false },
                customerEmail: { value: '', dirtyState: false },
                bucAnd: { value: '', dirtyState: false },
                vpc: { value: '', dirtyState: false },
                debugMode: { value: true, dirtyState: false },
            }
        });
        expect(wrapper.find('div.client-form').length).toBe(1);
    });


});
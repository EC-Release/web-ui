import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import fetchMock from 'fetch-mock';
import Subscriptionupgrade from '../Maintain/Subscriptionupgrade';

configure({ adapter: new Adapter() });

window.initTable = () => { };
window.destroyDataTable = () => { };

describe('Testing from Subscriptionupgrade.test.js <Subscriptionupgrade />', () => {
    it('should render the Subscriptionupgrade component', () => {
        fetchMock.get(`*`, JSON.stringify('SECONDGETOBJ'), { overwriteRoutes: false });
        const wrapper = shallow(<Subscriptionupgrade />, { disableLifecycleMethods: true });
        expect(wrapper).toBeTruthy();
    }); 
});
import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import fetchMock from 'fetch-mock';
import LicenseView from '../Maintain/LicenseView';

configure({ adapter: new Adapter() });

window.initTable = () => { };
window.destroyDataTable = () => { };

describe('Testing from LicenseView.test.js <LicenseView />', () => {
    it('should render the LicenseView component', () => {
        fetchMock.get(`*`, JSON.stringify('SECONDGETOBJ'), { overwriteRoutes: false });
        const wrapper = shallow(<LicenseView />, { disableLifecycleMethods: true });
        expect(wrapper).toBeTruthy();
    }); 
});
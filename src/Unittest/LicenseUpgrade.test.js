import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import fetchMock from 'fetch-mock';
import LicenseUpgrade from '../Maintain/LicenseUpgrade';

configure({ adapter: new Adapter() });

window.initTable = () => { };
window.destroyDataTable = () => { };

describe('Testing from LicenseUpgrade.test.js <LicenseUpgrade />', () => {
    it('should render the LicenseUpgrade component', () => {
        fetchMock.get(`*`, JSON.stringify('SECONDGETOBJ'), { overwriteRoutes: false });
        const wrapper = shallow(<LicenseUpgrade />, { disableLifecycleMethods: true });
        expect(wrapper).toBeTruthy();
    }); 
});
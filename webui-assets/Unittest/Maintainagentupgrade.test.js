import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import fetchMock from 'fetch-mock';
import Maintainagentupgrade from '../Maintain/Maintainagentupgrade'

configure({ adapter: new Adapter() });

window.initTable = () => { };
window.destroyDataTable = () => { };

describe('Testing from Maintainagentupgrade.test.js <Maintainagentupgrade />', () => {
    it('should render the Maintainagentupgrade component', () => {
        fetchMock.get(`*`, JSON.stringify('SECONDGETOBJ'), { overwriteRoutes: false });
        const wrapper = shallow(<Maintainagentupgrade />);
        expect(wrapper).toBeTruthy();
    });
});
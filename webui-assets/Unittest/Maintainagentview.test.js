import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import fetchMock from 'fetch-mock';
import Maintainagentview from '../Maintain/Maintainagentview'

configure({ adapter: new Adapter() });

window.initTable = () => { };
window.destroyDataTable = () => { };

describe('Testing from Maintainagentview.test.js <View />', () => {
    it('should render the Maintainagentview component', () => {
        fetchMock.get(`*`, JSON.stringify('SECONDGETOBJ'), { overwriteRoutes: false });
        const wrapper = shallow(<Maintainagentview />);
        expect(wrapper).toBeTruthy();
    });
});
import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import fetchMock from 'fetch-mock';
import Maintainagentview from '../Maintain/Maintainagentview';

configure({ adapter: new Adapter() });

window.initTable = () => { };
window.destroyDataTable = () => { };

describe('Testing from Maintainagentview.test.js <Maintainagentview />', () => {
    it('should render the Maintainagentview component', () => {
        fetchMock.get(`*`, JSON.stringify('SECONDGETOBJ'), { overwriteRoutes: false });
        const wrapper = shallow(<Maintainagentview />, { disableLifecycleMethods: true });
        wrapper.setState({ newTableData: [] });
        expect(wrapper).toBeTruthy();
    });
    
       it('should have "Maintainagentview" class with div only once', () => {
        const wrapper = shallow(<Maintainagentview />, { disableLifecycleMethods: true });
         expect(wrapper.find('div.Maintainagentview').length).toBe(1);
     });

     it('should have "Maintainagentview" class with div only once', () => {
        const wrapper = shallow(<Maintainagentview />, { disableLifecycleMethods: true });
         expect(wrapper.find('div.centered-div').length).toBe(1);
     });
});

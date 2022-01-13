import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import fetchMock from 'fetch-mock';
import Maintainagentupgrade from '../Maintain/Maintainagentupgrade'

configure({ adapter: new Adapter() });

window.initTable = () => { };
window.destroyDataTable = () => { };

describe('Testing from Maintainagentupgrade.test.js <Maintainagentupgrade />', () => {
    it('should render the Maintainagentupgrade component', () => {
        fetchMock.get(`*`, JSON.stringify('SECONDGETOBJ'), { overwriteRoutes: false });
        const wrapper = shallow(<Maintainagentupgrade />, { disableLifecycleMethods: true });
        expect(wrapper).toBeTruthy();
    });
    
      it('should have "Maintainagentupgrade" class with div only once', () => {
       const wrapper = shallow(<Maintainagentupgrade />, { disableLifecycleMethods: true });
        expect(wrapper.find('div.Maintainagentupgrade').length).toBe(1);
    });
    it('should have "Maintainagentupgrade" class with div only once', () => {
        const wrapper = shallow(<Maintainagentupgrade />, { disableLifecycleMethods: true });
         expect(wrapper.find('div.centered-div').length).toBe(1);
     });
});

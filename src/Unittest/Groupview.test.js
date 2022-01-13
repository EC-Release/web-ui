import React from 'react';
import { configure, shallow, render } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import fetchMock from 'fetch-mock';

import Groupview from '../Maintain/GroupView';

configure({ adapter: new Adapter() });

window.initTable = () => { };
window.destroyDataTable = () => { }; 

describe('Testing from Groupview.test.js <Groupview />', () => {
    it('should render the Groupview component', () => {
        fetchMock.get(`*`, JSON.stringify('SECONDGETOBJ'), { overwriteRoutes: false });
        const wrapper = shallow(<Groupview />, { disableLifecycleMethods: true });
        expect(wrapper).toBeTruthy();
    });    
    
      it('should render the Groupview component', () => {
        const wrapper = shallow(<Groupview />, { disableLifecycleMethods: true });
        expect(wrapper).toBeTruthy();
      });
});

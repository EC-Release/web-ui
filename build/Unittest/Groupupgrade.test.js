import React from 'react';
import { configure, shallow, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import fetchMock from 'fetch-mock';

import Groupupgrade from '../Maintain/Groupupgrade';

configure({ adapter: new Adapter() });

window.initTable = () => { };
window.destroyDataTable = () => { }; 

describe('Testing from Groupupgrade.test.js <Groupupgrade />', () => {
    it('should render the Groupupgrade component', () => {
        fetchMock.get(`*`, JSON.stringify('SECONDGETOBJ'), { overwriteRoutes: false });
        const wrapper = shallow(<Groupupgrade />, { disableLifecycleMethods: true });
        expect(wrapper).toBeTruthy();
    });

    
      it('should have "Monitorhealthstatus" class with div only once', () => {
          
       const propsToPass = {
                permissions: {
                    accesses: {
                       maintain: {
                         subMenus :{
                           groups:{
                             delete :true
                                       }
                                  }
                               }
                           }
                       }
                    }
       fetchMock.get(`*`, JSON.stringify('SECONDGETOBJ'), { overwriteRoutes: false });
         const wrapper = shallow(<Groupupgrade permissions={propsToPass.permissions }/> , { disableLifecycleMethods: true } );
         expect(wrapper.find('div.Groupupgrade').length).toBe(1);
      });
    
    
      it('should render the Groupupgrade component', () => {
        const wrapper = shallow(<Groupupgrade />, { disableLifecycleMethods: true });
        expect(wrapper).toBeTruthy();
      });
});

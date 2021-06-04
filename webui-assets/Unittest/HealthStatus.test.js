import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Healthstatus from '../Monitor/Healthstatus.js';

configure({adapter: new Adapter()});

describe('Testing from HealthStatus.test.js <View />', () => {

it('should render the View component', () => {
  const wrapper = shallow(<Healthstatus />, { disableLifecycleMethods: true });
  expect(wrapper).toBeTruthy();
});
    
it('should have "Monitorhealthstatus" class with div only once', () => {
  let demoAllFields = [
      {gatewayId: "345435"}
  ];
   const propsToPass = {
            permissions: {
                accesses: {
                   monitor: {
                     subMenus :{
                       healthStatus:{
                         isUser :true
                                   }
                              }
                           }
                       }
                   }
                }
  const wrapper = shallow(<Healthstatus createView={()=>{}} allFields={demoAllFields} selectedFields={[]} permissions={propsToPass.permissions} />);
  expect(wrapper.find('div.Monitorhealthstatus').length).toBe(1);
});
});

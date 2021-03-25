import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Notification from '../Monitor/Notification.js';

configure({adapter: new Adapter()});

describe('Testing from Notification.test.js <View />', () => {

it('should render the View component', () => {
  const wrapper = shallow(<Notification />, { disableLifecycleMethods: true });
  expect(wrapper).toBeTruthy();
});
    
it('should have "searchString" class with div only once', () => {
  let demoAllFields = [
      {searchString: "abc"}
  ];
  const wrapper = shallow(<Notification createView={()=>{}} allFields={demoAllFields} selectedFields={[]} />);
  expect(wrapper.find('div.Notification').length).toBe(1);
});
});

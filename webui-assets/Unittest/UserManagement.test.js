import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import UserManagement from '../Settings/UserManagement.js';

configure({adapter: new Adapter()});

describe('Testing from UserManagement.test.js <View />', () => {

it('should render the View component', () => {
  const wrapper = shallow(<UserManagement />, { disableLifecycleMethods: true });
  expect(wrapper).toBeTruthy();
});
    

});

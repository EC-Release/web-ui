import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import UserManagement from '../Settings/UserManagement.js';

configure({adapter: new Adapter()});

describe('Testing from UserManagement.test.js <View />', () => {

it('should render the View component', () => {
  const wrapper = shallow(<UserManagement />, { disableLifecycleMethods: true });
  expect(wrapper).toBeTruthy();
});
    

});

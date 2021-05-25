import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Usermanagement from '../Settings/Usermanagement.js';

configure({adapter: new Adapter()});

describe('Testing from Usermanagement.test.js <View />', () => {

it('should render the View component', () => {
  const wrapper = shallow(<Usermanagement />, { disableLifecycleMethods: true });
  expect(wrapper).toBeTruthy();
});
    

});

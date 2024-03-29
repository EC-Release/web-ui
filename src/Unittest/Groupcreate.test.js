import React from 'react';
import { configure, shallow, render } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import fetchMock from 'fetch-mock';

import Groupcreate from '../Maintain/Groupcreate.js';

configure({ adapter: new Adapter() });

window.enableToolTip = () => { };

describe('Testing from Groupcreate.test.js <Groupcreate />', () => {

    it('should render the Groupcreate component', () => {
        const propsToPass = {
            helpText: {
            }
        }
        fetchMock.get(`*`, JSON.stringify('SECONDGETOBJ'), { overwriteRoutes: false });
        const wrapper = shallow(<Groupcreate helpText={propsToPass.helpText} />, { disableLifecycleMethods: true });
        
        wrapper.setState({
            groupForm:{
                subscriptionId: { value: '', dirtyState: false },
                groupId: { value: '', dirtyState: false },
            }
        });
        expect(wrapper).toBeTruthy();
    }); 

    it('should have "Group form" with div only once', () => {
        const propsToPass = {
            helpText: {
            }
        }
        fetchMock.get(`*`, JSON.stringify('SECONDGETOBJ'), { overwriteRoutes: false });
        const wrapper = shallow(<Groupcreate helpText={propsToPass.helpText} />, { disableLifecycleMethods: true });
        
        wrapper.setState({
            groupForm:{
                subscriptionId: { value: '', dirtyState: false },
                groupId: { value: '', dirtyState: false },
            }
        });
        expect(wrapper.find('div.group-form').length).toBe(1);
    });
    
      it('should render the Groupcreate component', () => {
        const wrapper = render(<Groupcreate />);
        expect(wrapper.find('div.group-form').length).toBe(1);
  });
    
    it('should render the Groupcreate component', () => {
    const wrapper = shallow(<Groupcreate />, { disableLifecycleMethods: true });
    expect(wrapper).toBeTruthy();
  });
});

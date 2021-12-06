import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import View from '../View/View.js';
import Technicalview from '../View/Technicalview.js';
import Businessview from '../View/Businessview.js';

configure({adapter: new Adapter()});

describe('Testing from View.test.js <View />', () => {
    
    it('should render the View component', () => {
        const wrapper = shallow(<View />, { disableLifecycleMethods: true });
        expect(wrapper).toBeTruthy();
    });

    it('View component should have one Technicalview component', () => {
        const wrapper = shallow(<View />, { disableLifecycleMethods: true });
        wrapper.setState({ topologyView: false });
        expect(wrapper.find(Technicalview).length).toBe(1);
    });

    it('View component should have one Businessview component', () => {
        const wrapper = shallow(<View />, { disableLifecycleMethods: true });
        wrapper.setState({ topologyView: true });
        expect(wrapper.find(Businessview).length).toBe(1);
    });
});
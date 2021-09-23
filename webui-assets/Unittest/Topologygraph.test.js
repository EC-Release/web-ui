import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Topologygraph from '../Topologygraph/Topologygraph.js';

configure({adapter: new Adapter()});

window.generateTopology = () => {};

describe('Testing from Topologygraph.test.js <Topologygraph />', () => {

    it('should render the Topologygraph component', () => {
        const wrapper = shallow(<Topologygraph />);
        expect(wrapper).toBeTruthy();
    });

    it('should render "Topologygraph" class with div only once', () => {
        const wrapper = shallow(<Topologygraph />);
        expect(wrapper.find('div.Topologygraph').length).toBe(1);
    });
});
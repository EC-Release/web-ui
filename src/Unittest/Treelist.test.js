import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Treelist from '../Treelist/Treelist.js';

configure({adapter: new Adapter()});

window.loadTree = () => {};

describe('Testing from Treelist.test.js <Treelist />', () => {

    it('should render the Treelist component', () => {
        const wrapper = shallow(<Treelist treeValue={[]}/>);
        expect(wrapper).toBeTruthy();
    });

    it('should render "treeList" id with ul only once', () => {
        const wrapper = shallow(<Treelist treeValue={[]} />);
        expect(wrapper.find('ul#treeList').length).toBe(1);
    });
});
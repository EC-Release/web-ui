import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import Businessview from '../View/Businessview.js';
import Treelist from '../Treelist/Treelist.js';
import Topologygraph from '../Topologygraph/Topologygraph.js';

configure({adapter: new Adapter()});

describe('Testing from Businessview.test.js <Businessview />', () => {

    it('should render the Businessview component', () => {
        const wrapper = shallow(<Businessview showHideTableTdData={()=>{}} goToSearch={()=>{}} />);
        expect(wrapper).toBeTruthy();
    });

    it('should render Treelist component only once', () => {
        const wrapper = shallow(<Businessview showHideTableTdData={()=>{}} goToSearch={()=>{}} />);
        expect(wrapper.find(Treelist).length).toBe(1);
    });

    it('should render Topologygraph component only once', () => {
        const wrapper = shallow(<Businessview showHideTableTdData={()=>{}} goToSearch={()=>{}} />);
        expect(wrapper.find(Topologygraph).length).toBe(1);
    });
});
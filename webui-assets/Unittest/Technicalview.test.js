import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import fetchMock from 'fetch-mock';
import renderer from 'react-test-renderer';

import Technicalview from '../View/Technicalview.js';
import Treelist from '../Treelist/Treelist.js';
import Topologygraph from '../Topologygraph/Topologygraph.js';

configure({adapter: new Adapter()});

describe('Testing from Technicalview.test.js <Technicalview />', () => {

    it('should render the Technicalview component', () => {
        fetchMock.mock('*', 'Hello World!');
        const wrapper = shallow(<Technicalview showHideTableTdData={()=>{}} goToSearch={()=>{}} />);
        expect(wrapper).toBeTruthy();
    });

    it('should render Treelist component only once', () => {
        fetchMock.mock('*', 'Hello World!');
        const wrapper = shallow(<Technicalview showHideTableTdData={()=>{}} goToSearch={()=>{}} />);
        expect(wrapper.find(Treelist).length).toBe(1);
    });

    it('should render Topologygraph component only once', () => {
        fetchMock.mock('*', 'Hello World!');
        const wrapper = shallow(<Technicalview showHideTableTdData={()=>{}} goToSearch={()=>{}} />);
        expect(wrapper.find(Topologygraph).length).toBe(1);
    });
});
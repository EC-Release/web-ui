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
        fetchMock.get(`*`, JSON.stringify('SECONDGETOBJ'), { overwriteRoutes: false });
        const wrapper = shallow(<Technicalview showHideTableTdData={()=>{}} goToSearch={()=>{}} />, { disableLifecycleMethods: true });
        expect(wrapper).toBeTruthy();
    });

    it('should render Treelist component only once', () => {
        const graph = {nodes: [{key: 'value'}]};
        const treeValue = [{key: 'value'}];
        fetchMock.get(`*`, JSON.stringify('SECONDGETOBJ'), { overwriteRoutes: false });
        const wrapper = shallow(<Technicalview showHideTableTdData={()=>{}} goToSearch={()=>{}} />, { disableLifecycleMethods: true });
        wrapper.setState({ loadTreeJs: true});
        wrapper.setState({ graph: graph });
        wrapper.setState({ treeValue: treeValue });
        expect(wrapper.find(Treelist).length).toBe(1);
    });

    it('should render Topologygraph component only once', () => {
        const graph = {nodes: [{key: 'value'}]};
        const treeValue = [{key: 'value'}];
        fetchMock.get(`*`, JSON.stringify('SECONDGETOBJ'), { overwriteRoutes: false });
        const wrapper = shallow(<Technicalview showHideTableTdData={()=>{}} goToSearch={()=>{}} />, { disableLifecycleMethods: true });
        wrapper.setState({ loadTreeJs: true});
        wrapper.setState({ graph: graph });
        wrapper.setState({ treeValue: treeValue });
        expect(wrapper.find(Topologygraph).length).toBe(1);
    });

     it('should render the Topologygraph component', () => {
        const wrapper = shallow(<Topologygraph />, { disableLifecycleMethods: true });
        expect(wrapper).toBeTruthy();
      });
});

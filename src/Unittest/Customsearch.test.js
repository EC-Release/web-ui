import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import Customsearch from '../View/Customsearch.js';

configure({adapter: new Adapter()});

describe('Testing from Customsearch.test.js <Customsearch />', () => {

    it('should render the Customsearch component', () => {
        let demoAllFields = [
            {fieldId: "agent_id", fieldName: "Agent Id"}
        ];
        const wrapper = shallow(<Customsearch createView={()=>{}} allFields={demoAllFields} selectedFields={[]} />);
        expect(wrapper).toBeTruthy();
    });

    it('should have "Customsearch" class with div only once', () => {
        let demoAllFields = [
            {fieldId: "agent_id", fieldName: "Agent Id"}
        ];
        const wrapper = shallow(<Customsearch createView={()=>{}} allFields={demoAllFields} selectedFields={[]} />);
        expect(wrapper.find('div.Customsearch').length).toBe(1);
    });

    it('should have "search-form" class with div only once', () => {
        let demoAllFields = [
            {fieldId: "agent_id", fieldName: "Agent Id"}
        ];
        const wrapper = shallow(<Customsearch createView={()=>{}} allFields={demoAllFields} selectedFields={[]} />);
        expect(wrapper.find('div.search-form').length).toBe(1);
    });

    it('should have "view-selection-panel" class with div only once', () => {
        let demoAllFields = [
            {fieldId: "agent_id", fieldName: "Agent Id"}
        ];
        const wrapper = shallow(<Customsearch createView={()=>{}} allFields={demoAllFields} selectedFields={[]} />);
        expect(wrapper.find('div.view-selection-panel').length).toBe(1);
    });

    it('should have "list-group" class with div twice for Available Fields and Selected Fields', () => {
        let demoAllFields = [
            {fieldId: "agent_id", fieldName: "Agent Id"}
        ];
        const wrapper = shallow(<Customsearch createView={()=>{}} allFields={demoAllFields} selectedFields={[]} />);
        expect(wrapper.find('div.list-group').length).toBe(2);
    });

});
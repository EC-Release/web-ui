import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import App from '../App.js';
import Header from '../Header/Header.js';
import Navbar from '../Navbar/Navbar.js';

configure({adapter: new Adapter()});

describe('Testing from App.test.js <App />', () => {

    it('should render the App component', () => {
        const wrapper = shallow(<App />);
        expect(wrapper).toBeTruthy();
    });

    it('should render Header component only once', () => {
        const wrapper = shallow(<App />);
        expect(wrapper.find(Header).length).toBe(1);
    });

    it('should render Navbar component only once', () => {
        const wrapper = shallow(<App />);
        expect(wrapper.find(Navbar).length).toBe(1);
    });

});
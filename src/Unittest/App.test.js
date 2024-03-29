import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import fetchMock from 'fetch-mock';

import App from '../App.js';
import Header from '../Header/Header.js';
import Navbar from '../Navbar/Navbar.js';

configure({adapter: new Adapter()});

describe('Testing from App.test.js <App />', () => {

    it('should render the App component', () => {
        fetchMock.get(`*`, JSON.stringify('SECONDGETOBJ'), { overwriteRoutes: false });
        const wrapper = shallow(<App />, { disableLifecycleMethods: true });
        expect(wrapper).toBeTruthy();
    });

    it('should render Header component only once', () => {
        fetchMock.get(`*`, JSON.stringify('SECONDGETOBJ'), { overwriteRoutes: false });
        const wrapper = shallow(<App />, { disableLifecycleMethods: true });
        expect(wrapper.find(Header).length).toBe(0);
    });

    it('should render Navbar component only once', () => {
        fetchMock.get(`*`, JSON.stringify('SECONDGETOBJ'), { overwriteRoutes: false });
        const wrapper = shallow(<App />, { disableLifecycleMethods: true });
        expect(wrapper.find(Navbar).length).toBe(0);
    });

});
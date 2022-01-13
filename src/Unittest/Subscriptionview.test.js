import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import fetchMock from 'fetch-mock';
import Subscriptionview from '../Maintain/Subscriptionview';

configure({ adapter: new Adapter() });

window.initTable = () => { };
window.destroyDataTable = () => { };

describe('Testing from Subscriptionview.test.js <Subscriptionview />', () => {
    it('should render the Subscriptionview component', () => {
        fetchMock.get(`*`, JSON.stringify('SECONDGETOBJ'), { overwriteRoutes: false });
        const wrapper = shallow(<Subscriptionview />, { disableLifecycleMethods: true });
        expect(wrapper).toBeTruthy();
    }); 
});
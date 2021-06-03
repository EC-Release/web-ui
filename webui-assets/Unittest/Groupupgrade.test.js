import React from 'react';
import { configure, shallow, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import fetchMock from 'fetch-mock';

import Groupupgrade from '../Maintain/Groupupgrade';

configure({ adapter: new Adapter() });

window.initTable = () => { };
window.destroyDataTable = () => { }; 

describe('Testing from Groupupgrade.test.js <Groupupgrade />', () => {
    it('should render the Groupupgrade component', () => {
        fetchMock.get(`*`, JSON.stringify('SECONDGETOBJ'), { overwriteRoutes: false });
        const wrapper = shallow(<Groupupgrade />, { disableLifecycleMethods: true });
        expect(wrapper).toBeTruthy();
    });

    
      it('should render the Groupupgrade component', () => {
            const wrapper = render(<Groupupgrade />);
            expect(wrapper.html()).toEqual('<div class="col-md-12"><div class="row mt-2"><div class="col-sm-6"><select class="form-control form-control-sm" name="subscriptionId"></select></div><div class="col-sm-6 text-left"><div class="d-inline"><button type="button" class="btn btn-sm btn-outline-secondary disabled"><i class="fa fa-filter"></i>FILTER</button></div><div class="d-inline p-2"><input type="text" class="d-inline form-control form-control-sm search-field"></div></div></div><div class="centered-div"><div id="groupupgradeTableDiv"><p class="text-center loader-icon"><img alt="loading" src="assets/static/images/rolling.svg"></p></div></div></div>');
      });
    
      it('should render the Groupupgrade component', () => {
        const wrapper = shallow(<Groupupgrade />, { disableLifecycleMethods: true });
        expect(wrapper).toBeTruthy();
      });
});

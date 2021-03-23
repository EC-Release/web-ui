import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import fetchMock from 'fetch-mock';
import Maintainagetedit from '../Maintain/Maintainagentedit'

configure({ adapter: new Adapter() });

describe('Testing from Maintainagetedit.test.js <Maintainagetedit />', () => {

    it('should render the Maintainagetedit component', () => {
        fetchMock.get(`*`, JSON.stringify('SECONDGETOBJ'), { overwriteRoutes: false });
        const wrapper = shallow(<Maintainagetedit changeView={() => { }} />);
        wrapper.setState({
            agentForm: {
                agentMode: { value: 1, dirtyState: false },
                gateway: { value: '', dirtyState: false },
                businessId: { value: 0, dirtyState: false },
                businessName: { value: '', dirtyState: false },
                requestor: { value: '', dirtyState: false },
                requestedDate: { value: '', dirtyState: false },
                customerEmail: { value: '', dirtyState: false },
                bucAnd: { value: '', dirtyState: false },
                vpc: { value: '', dirtyState: false },
                debugMode: { value: true, dirtyState: false },
            },
            gatewayForm: {
                mode: 'GATEWAY',
                environment: { value: '', dirtyState: false },
                gatewayPort: { value: '', dirtyState: false },
                zone: { value: '', dirtyState: false },
                serviceUrl: { value: '', dirtyState: false },
                token: { value: '', dirtyState: false },
                host: { value: '', dirtyState: false },
            },
            serverForm: {
                mode: 'SERVER',
                agentId: { value: '1', dirtyState: false },
                group: { value: '1', dirtyState: false },
                clientId: { value: '1', dirtyState: false },
                clientSecret: { value: '1', dirtyState: false },
                duration: { value: '1', dirtyState: false },
                OAuth2: { value: '1', dirtyState: false },
                host: { value: '1', dirtyState: false },
                zone: { value: '1', dirtyState: false },
                serviceUrl: { value: '1', dirtyState: false },
                remoteHost: { value: '1', dirtyState: false },
                remotePort: { value: '1', dirtyState: false },
                proxy: { value: '1', dirtyState: false },
                allowPlugIn: { value: false, dirtyState: false },
                plugIn: { value: [1], dirtyState: false },
            },
            clientForm: {
                mode: 'CLIENT',
                agentId: { value: '', dirtyState: false },
                group: { value: '', dirtyState: false },
                clientId: { value: '', dirtyState: false },
                uaaClientId: { value: '', dirtyState: false },
                clientSecret: { value: '', dirtyState: false },
                duration: { value: '', dirtyState: false },
                OAuth2: { value: '', dirtyState: false },
                host: { value: '', dirtyState: false },
                localPort: { value: '', dirtyState: false },
                targetId: { value: '', dirtyState: false },
                proxy: { value: '', dirtyState: false },
                allowPlugIn: { value: false, dirtyState: false },
                plugIn: { value: [], dirtyState: false },
            }
        });
        expect(wrapper).toBeTruthy();
    });
  it("should render upgrade Button", () => {
        // when
        const component = shallow(<Maintainagentcreate   />);
        // then
        expect(component.getElements()).toMatchSnapshot();
    });
});

describe('ec-web-ui test cases', function () {

    beforeEach(function () {
        browser.waitForAngularEnabled(false);
        browser.driver.sleep(10000);
        browser.get('http://localhost:17990/v1.1beta/ec');
        browser.driver.sleep(1000);
        element(by.name('usr_id')).sendKeys("Place your login id");
        element(by.name('usr_pwd')).sendKeys("Place your login password");
        element(by.name('btn_signin')).click();
        browser.driver.sleep(1000);
        element(by.name('btn_continue')).click(); 
    });

    // Login test start
    it('Login test', function () {
        browser.driver.sleep(10000);
        expect(browser.getTitle()).toEqual('EC Admin Console');
    });
    // Login test end

    // View component test start
    it('View component test', function () {
        browser.driver.sleep(10000);
        element(by.id('nav-view')).click();
        browser.driver.sleep(10000);
        expect(element(by.id('view-header-title')).getText()).toEqual('Topology view');
    });
    // View component test end

    // Subscription create component test start
    it('Subscription create component test', function () {
        browser.driver.sleep(10000);
        element(by.id('nav-maintain')).click();
        browser.driver.sleep(1000);
        element(by.id('nav-subscription')).click();
        browser.driver.sleep(1000);
        element(by.id('nav-subscription-create')).click();
        browser.driver.sleep(1000);
        expect(element(by.id('maintainsubscriptioncreate-title')).getText()).toEqual('Create Subscription Creating parameters.');
    });
    // Subscription create component test end

    // Subscription submit button should be disable initially test start
    it('Subscription--> Gateway create button should be disable initially', function () {
        browser.driver.sleep(10000);
        element(by.id('nav-maintain')).click();
        browser.driver.sleep(2000);
        element(by.id('nav-subscription')).click();
        browser.driver.sleep(2000);
        element(by.id('nav-subscription-create')).click();
        browser.driver.sleep(2000);
        element(by.id('create-subscription-btn')).getAttribute('disabled').then(function (attr) {
            expect(attr).toBe('true');
        });
    });
    // Subscription submit button should be disable initially test end

    // Subscription update/delete component test start
    it('Subscription update/delete component test', function () {
        browser.driver.sleep(10000);
        element(by.id('nav-maintain')).click();
        browser.driver.sleep(1000);
        element(by.id('nav-subscription')).click();
        browser.driver.sleep(1000);
        element(by.id('nav-subscription-update-disable')).click();
        browser.driver.sleep(1000);
        expect(element.all(by.css('.Subscriptionupgrade')).isPresent()).toBe(true);
    });
    // Subscription update/delete component test end

    // Agent create component test start
    it('Agent create component test', function () {
        browser.driver.sleep(10000);
        element(by.id('nav-maintain')).click();
        browser.driver.sleep(1000);
        element(by.id('nav-agent')).click();
        browser.driver.sleep(1000);
        element(by.id('nav-agent-create')).click();
        browser.driver.sleep(1000);
        expect(element(by.id('maintainagentcreate-title')).getText()).toEqual('Create Agent Creating parameters.');
    });
    // Agent create component test end

    // Agent create (Gateway) button should be disable initially test start
    it('Agent--> Gateway create button should be disable initially', function () {
        browser.driver.sleep(10000);
        element(by.id('nav-maintain')).click();
        browser.driver.sleep(2000);
        element(by.id('nav-agent')).click();
        browser.driver.sleep(2000);
        element(by.id('nav-agent-create')).click();
        browser.driver.sleep(2000);
        element(by.id('create-gateway-btn')).getAttribute('disabled').then(function (attr) {
            expect(attr).toBe('true');
        });
    });
    // Agent create (Gateway) button should be disable initially test end

    // Agent create (Server) button should be disable initially test start
    it('Agent--> Gateway create button should be disable initially', function () {
        browser.driver.sleep(10000);
        element(by.id('nav-maintain')).click();
        browser.driver.sleep(1000);
        element(by.id('nav-agent')).click();
        browser.driver.sleep(1000);
        element(by.id('nav-agent-create')).click();
        browser.driver.sleep(1000);
        element(by.id('agentModeButton1')).click();
        browser.driver.sleep(1000);
        element(by.id('create-server-btn')).getAttribute('disabled').then(function (attr) {
            expect(attr).toBe('true');
        });
    });
    // Agent create (Server) button should be disable initially test end

    // Agent create (Client) button should be disable initially test start
    it('Agent--> Client create button should be disable initially', function () {
        browser.driver.sleep(10000);
        element(by.id('nav-maintain')).click();
        browser.driver.sleep(1000);
        element(by.id('nav-agent')).click();
        browser.driver.sleep(1000);
        element(by.id('nav-agent-create')).click();
        browser.driver.sleep(1000);
        element(by.id('agentModeButton2')).click();
        browser.driver.sleep(1000);
        element(by.id('create-client-btn')).getAttribute('disabled').then(function (attr) {
            expect(attr).toBe('true');
        });
    });
    // Agent create (Client) button should be disable initially test end

    // Agent update/disable component test start
    it('Agent update/disable component test', function () {
        browser.driver.sleep(10000);
        element(by.id('nav-maintain')).click();
        browser.driver.sleep(1000);
        element(by.id('nav-agent')).click();
        browser.driver.sleep(1000);
        element(by.id('nav-agent-update-disable')).click();
        browser.driver.sleep(1000);
        expect(element.all(by.css('.Maintainagentupgrade')).isPresent()).toBe(true);
    });
    // Agent update/disable component test end

    // Agent view component test start
    it('Agent view component test', function () {
        browser.driver.sleep(10000);
        element(by.id('nav-maintain')).click();
        browser.driver.sleep(1000);
        element(by.id('nav-agent')).click();
        browser.driver.sleep(1000);
        element(by.id('nav-agent-view')).click();
        browser.driver.sleep(1000);
        expect(element.all(by.css('.Maintainagentview')).isPresent()).toBe(true);
    });
    // Agent view component test end
    /*
    //Monitor Notification Component test start
    it('Monitor Notification component test', function () {
        browser.driver.sleep(10000);
        element(by.id('nav-monitor')).click();
        browser.driver.sleep(1000);
        element(by.id('nav-notification')).click();
        browser.driver.sleep(1000);
        expect(element.all(by.css('.Notification')).isPresent()).toBe(true);
    });
    //Monitor Notification Component test end

    //Monitor Alert Component test start
    it('Monitor Alert component test', function () {
         browser.driver.sleep(10000);
         element(by.id('nav-monitor')).click();
         browser.driver.sleep(1000);
         element(by.id('nav-alert')).click();
         browser.driver.sleep(1000);
         expect(element.all(by.css('.Alert')).isPresent()).toBe(true);
     }); 
    //Monitor alert Component test end

    //Monitor Health Status Component test start
    it('Monitor Health Status component test', function () {
        browser.driver.sleep(10000);
        element(by.id('nav-monitor')).click();
        browser.driver.sleep(1000);
        element(by.id('nav-healthStatus')).click();
        browser.driver.sleep(1000);
        expect(element.all(by.css('.Monitorhealthstatus')).isPresent()).toBe(true);
    });
    //Maintain Health Status Component test end

    //Monitor  Health Status button disable Component test start
    it('Monitor component test', function () {
        browser.driver.sleep(10000);
        element(by.id('nav-monitor')).click();
        browser.driver.sleep(1000);
        element(by.id('nav-healthStatus')).click();
        browser.driver.sleep(1000);
        element(by.id('fetch-health-status-btn')).getAttribute('disabled').then(function (attr) {
            expect(attr).toBe('true');
        }); 
    });*/

    afterEach(function () {
        browser.driver.sleep(4000);
    });
});
exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['todo-spec.js'],
    directConnect: true,
    jasmineNodeOpts: {
        defaultTimeoutInterval: 2500000
    }
};
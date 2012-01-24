var RestClientTestCase = require('./RestClientTestCase');

var oAuthCredentials = {
    consumerKey: 'CONSUMER_KEY',
    consumerSecret: 'CONSUMER_SECRET',
    token: 'TOKEN',
    tokenSecret: 'TOKEN_SECRET'
};

var restClientTestCase = new RestClientTestCase(oAuthCredentials);
restClientTestCase.setUp();
restClientTestCase.testCreate();
restClientTestCase.testStatusesHomeTimeline();
restClientTestCase.testStatusesMentions();
restClientTestCase.tearDown();

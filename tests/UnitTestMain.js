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
restClientTestCase.testStatusesPublicTimeline();
restClientTestCase.testStatusesRetweetedByMe();
restClientTestCase.testStatusesRetweetedByUser();
restClientTestCase.testStatusesRetweetedToMe();
restClientTestCase.teststatusesRetweetedToUser();
restClientTestCase.testStatusesRetweetsOfMe();
restClientTestCase.testStatusesUserTimeline();
restClientTestCase.testStatusesRetweetedBy();
restClientTestCase.testStatusesRetweetedByIds();
restClientTestCase.testStatusesRetweets();
restClientTestCase.testStatusesShow();
restClientTestCase.testStatusesOEmbed();

// Tests create and delete of a tweet.
restClientTestCase.testStatusesUpdate();

// Tests create and delete of a retweet.
restClientTestCase.testStatusesRetweet();

// Test create and delete of a tweet containing media.
restClientTestCase.testStatusesUpdateWithMedia();

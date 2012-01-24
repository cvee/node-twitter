var assert = require('assert');
var Twitter = require('../lib/Twitter');
var Util = require('util');

/**
 * Creates an instance of RestClientTestCase.
 *
 * @constructor
 */
var RestClientTestCase = function(oAuthCredentials)
{
    Object.call(this);

    this._oAuthCredentials = null;
    this._twitterRestClient = null;
};

Util.inherits(RestClientTestCase, Object);

RestClientTestCase.prototype.setUp = function()
{
    this._twitterRestClient = new Twitter.RestClient(
        this._oAuthCredentials['consumerKey'],
        this._oAuthCredentials['consumerSecret'],
        this._oAuthCredentials['token'],
        this._oAuthCredentials['tokenSecret']
    );
};

RestClientTestCase.prototype.tearDown = function()
{
    delete(this._twitterRestClient);
    this._twitterRestClient = null;
};

RestClientTestCase.prototype.testCreate = function()
{
    assert.equal(true, this._twitterRestClient instanceof Twitter.RestClient);
};

RestClientTestCase.prototype.testValidators = function()
{
    
};

RestClientTestCase.prototype.testHomeTimeline = function()
{
    this._twitterRestClient.getHomeTimeline({}, function(error, result) {
        assert.ifError(error);
        assert.deepEqual(typeof(result), 'object');
    });
};

RestClientTestCase.prototype.testMentions = function()
{
    this._twitterRestClient.getMentions({}, function(error, result) {
        assert.ifError(error);
        assert.deepEqual(typeof(result), 'object');
    });
};

module.exports = RestClientTestCase;

var Util = require('util');
var Client = require('./Client');
var Constants = require('./Constants');

/**
 * Creates an instance of RestClient.
 *
 * @constructor
 * @this {RestClient}
 * @param {String} consumerKey OAuth consumer key.
 * @param {String} consumerSecret OAuth consumer secret.
 * @param {String} token OAuth token.
 * @param {String} tokenSecret OAuth token secret.
 */
var RestClient = function(consumerKey, consumerSecret, token, tokenSecret)
{
    Client.call(this, consumerKey, consumerSecret, token, tokenSecret);

    this._apiBaseUrlString = Constants.RestApiBaseURLString;
    this._apiVersion = Constants.RestApiVersion;
};

Util.inherits(RestClient, Client);

// Timelines
//
// Timelines are collections of Tweets, ordered with the most recent first.

/**
 *
 *
 * For a information on acceptable parameters see:
 *
 * https://dev.twitter.com/docs/api/1/get/statuses/home_timeline 
 *
 * @this {RestClient}
 * @param {Dictionary} parameters
 * @param {Function} callback The callback function.
 */
RestClient.prototype.getHomeTimeline = function(parameters, callback)
{
    var contributorDetails = parameters['contributor_details'];
    if (contributorDetails !== undefined && typeof contributorDetails !== 'boolean')
    {
        throw new Error('Expected boolean.');
    }

    var count = parameters['count'];
    if (count !== undefined && typeof count !== 'int')
    {
        throw new Error('Expected int.');
    }

    var excludeReplies = parameters['exclude_replies'];
    if (excludeReplies !== undefined && typeof excludeReplies !== 'boolean')
    {
        throw new Error('Expected boolean.');
    }

    var includeEntities = parameters['include_entities'];
    if (includeEntities !== undefined && typeof includeEntities !== 'boolean')
    {
        throw new Error('Expected boolean.');
    }

    var includeRetweets = parameters['include_rts'];
    if (includeRetweets !== undefined && typeof includeRetweets !== 'boolean')
    {
        throw new Error('Expected boolean.');
    }

    var maxId = parameters['max_id'];
    if (maxId !== undefined && typeof maxId !== 'int')
    {
        throw new Error('Expected int.');
    }

    var page = parameters['page'];
    if (page !== undefined && typeof page !== 'int')
    {
        throw new Error('Expected int.');
    }

    var sinceId = parameters['since_id'];
    if (sinceId !== undefined && typeof sinceId !== 'int')
    {
        throw new Error('Expected int.');
    }

	var trimUser = parameters['trim_user'];
    if (trimUser !== undefined && typeof trimUser !== 'boolean')
    {
        throw new Error('Expected boolean.');
    }

	this._createGetRequest('statuses/home_timeline', 'json', parameters, callback);
};

/**
 *
 *
 * For a information on acceptable parameters see:
 *
 * https://dev.twitter.com/docs/api/1/get/statuses/mentions 
 *
 * @this {RestClient}
 * @param {Dictionary} parameters
 * @param {Function} callback The callback function.
 */
RestClient.prototype.getMentions = function(parameters, callback)
{
    var contributorDetails = parameters['contributor_details'];
    if (contributorDetails !== undefined && typeof contributorDetails !== 'boolean')
    {
        throw new Error('Expected boolean.');
    }

    var count = parameters['count'];
    if (count !== undefined && typeof count !== 'int')
    {
        throw new Error('Expected int.');
    }

    var excludeReplies = parameters['exclude_replies'];
    if (excludeReplies !== undefined && typeof excludeReplies !== 'boolean')
    {
        throw new Error('Expected boolean.');
    }

    var includeEntities = parameters['include_entities'];
    if (includeEntities !== undefined && typeof includeEntities !== 'boolean')
    {
        throw new Error('Expected boolean.');
    }

    var includeRetweets = parameters['include_rts'];
    if (includeRetweets !== undefined && typeof includeRetweets !== 'boolean')
    {
        throw new Error('Expected boolean.');
    }

    var maxId = parameters['max_id'];
    if (maxId !== undefined && typeof maxId !== 'int')
    {
        throw new Error('Expected int.');
    }

    var page = parameters['page'];
    if (page !== undefined && typeof page !== 'int')
    {
        throw new Error('Expected int.');
    }

    var sinceId = parameters['since_id'];
    if (sinceId !== undefined && typeof sinceId !== 'int')
    {
        throw new Error('Expected int.');
    }

    var trimUser = parameters['trim_user'];
    if (trimUser !== undefined && typeof trimUser !== 'boolean')
    {
        throw new Error('Expected boolean.');
    }

    this._createGetRequest('statuses/mentions', 'json', parameters, callback);
};

/**
 *
 *
 * For a information on acceptable parameters see:
 *
 * https://dev.twitter.com/docs/api/1/get/statuses/public_timeline 
 *
 * @this {RestClient}
 * @param {Dictionary} parameters
 * @param {Function} callback The callback function.
 */
RestClient.prototype.getPublicTimeline = function(parameters, callback)
{
    var count = parameters['count'];
    if (count !== undefined && typeof count !== 'int')
    {
        throw new Error('Expected int.');
    }

    var includeEntities = parameters['includeEntities'];
    if (includeEntities !== undefined && typeof includeEntities !== 'boolean')
    {
        throw new Error('Expected boolean.');
    }

    var trimUser = parameters['trim_user'];
    if (trimUser !== undefined && typeof trimUser !== 'boolean')
    {
        throw new Error('Expected boolean.');
    }

    this._createGetRequest('statuses/public_timeline', 'json', parameters, callback);
};

module.exports = RestClient;

// Tweets
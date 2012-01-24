var Util = require('util');
var Client = require('./Client');
var Constants = require('./Constants');
var RestParameterValidator = require('./RestParameterValidator');

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
    this._validator = new RestParameterValidator();
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
    this._validator.validateContributerDetails(parameters);
    this._validator.validateCount(parameters);
    this._validator.validateExcludeReplies(parameters);
    this._validator.validateIncludeEntities(parameters);
    this._validator.validateIncludeRetweets(parameters);
    this._validator.validateMaxId(parameters);
    this._validator.validatePage(parameters);
    this._validator.validateSinceId(parameters);
    this._validator.validateTrimUser(parameters);

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
    this._validator.validateContributerDetails(parameters);
    this._validator.validateCount(parameters);
    this._validator.validateExcludeReplies(parameters);
    this._validator.validateIncludeEntities(parameters);
    this._validator.validateIncludeRetweets(parameters);
    this._validator.validateMaxId(parameters);
    this._validator.validatePage(parameters);
    this._validator.validateSinceId(parameters);
    this._validator.validateTrimUser(parameters);

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
    this._validator.validateCount(parameters);
    this._validator.validateIncludeEntities(parameters);
    this._validator.validateTrimUser(parameters);

    this._createGetRequest('statuses/public_timeline', 'json', parameters, callback);
};

/**
 *
 *
 * For a information on acceptable parameters see:
 *
 * https://dev.twitter.com/docs/api/1/get/statuses/retweeted_by_me
 *
 * @this {RestClient}
 * @param {Dictionary} parameters
 * @param {Function} callback The callback function.
 */
RestClient.prototype.getStatusesRetweetedByMe = function(parameters, callback)
{
    this._validator.validateCount(parameters);
    this._validator.validateIncludeEntities(parameters);
    this._validator.validateMaxId(parameters);
    this._validator.validatePage(parameters);
    this._validator.validateSinceId(parameters);
    this._validator.validateTrimUser(parameters);

    this._createGetRequest('statuses/retweeted_by_me', 'json', parameters, callback);
};

/**
 *
 *
 * For a information on acceptable parameters see:
 *
 * https://dev.twitter.com/docs/api/1/get/statuses/retweeted_by_user
 *
 * @this {RestClient}
 * @param {Dictionary} parameters
 * @param {Function} callback The callback function.
 */
RestClient.prototype.getStatusesRetweetedByUser = function(parameters, callback)
{
    this._validator.validateCount(parameters);
    this._validator.validateIncludeEntities(parameters);
    this._validator.validateMaxId(parameters);
    this._validator.validatePage(parameters);
    this._validator.validateScreenName(parameters);
    this._validator.validateSinceId(parameters);
    this._validator.validateTrimUser(parameters);
    this._validator.validateUserId(parameters);

    this._createGetRequest('statuses/retweeted_by_user', 'json', parameters, callback);
};

/**
 *
 *
 * For a information on acceptable parameters see:
 *
 * https://dev.twitter.com/docs/api/1/get/statuses/retweeted_to_me
 *
 * @this {RestClient}
 * @param {Dictionary} parameters
 * @param {Function} callback The callback function.
 */
RestClient.prototype.getStatusesRetweetedToMe = function(parameters, callback)
{
    this._validator.validateCount(parameters);
    this._validator.validateIncludeEntities(parameters);
    this._validator.validateMaxId(parameters);
    this._validator.validatePage(parameters);
    this._validator.validateSinceId(parameters);
    this._validator.validateTrimUser(parameters);

    this._createGetRequest('statuses/retweeted_to_me', 'json', parameters, callback);
};

/**
 *
 *
 * For a information on acceptable parameters see:
 *
 * https://dev.twitter.com/docs/api/1/get/statuses/retweeted_to_user
 *
 * @this {RestClient}
 * @param {Dictionary} parameters
 * @param {Function} callback The callback function.
 */
RestClient.prototype.getStatusesRetweetedToUser = function(parameters, callback)
{
    this._validator.validateCount(parameters);
    this._validator.validateIncludeEntities(parameters);
    this._validator.validateMaxId(parameters);
    this._validator.validatePage(parameters);
    this._validator.validateScreenName(parameters);
    this._validator.validateSinceId(parameters);
    this._validator.validateTrimUser(parameters);
    this._validator.validateUserId(parameters);

    this._createGetRequest('statuses/retweeted_to_user', 'json', parameters, callback);
};

/**
 *
 *
 * For a information on acceptable parameters see:
 *
 * https://dev.twitter.com/docs/api/1/get/statuses/retweets_of_me
 *
 * @this {RestClient}
 * @param {Dictionary} parameters
 * @param {Function} callback The callback function.
 */
RestClient.prototype.getStatusesRetweetsOfMe = function(parameters, callback)
{
    this._validator.validateCount(parameters);
    this._validator.validateIncludeEntities(parameters);
    this._validator.validateMaxId(parameters);
    this._validator.validatePage(parameters);
    this._validator.validateSinceId(parameters);
    this._validator.validateTrimUser(parameters);

    this._createGetRequest('statuses/retweets_of_me', 'json', parameters, callback);
};

/**
 *
 *
 * For a information on acceptable parameters see:
 *
 * https://dev.twitter.com/docs/api/1/get/statuses/user_timeline
 *
 * @this {RestClient}
 * @param {Dictionary} parameters
 * @param {Function} callback The callback function.
 */
RestClient.prototype.getUserTimeline = function(parameters, callback)
{
    this._validator.validateContributorDetails(parameters);
    this._validator.validateCount(parameters);
    this._validator.validateExcludeReplies(parameters);
    this._validator.validateIncludeEntities(parameters);
    this._validator.validateIncludeRetweets(parameters);
    this._validator.validateMaxId(parameters);
    this._validator.validatePage(parameters);
    this._validator.validateSinceId(parameters);
    this._validator.validateScreenName(parameters);
    this._validator.validateTrimUser(parameters);
    this._validator.validateUserId(parameters);

    this._createGetRequest('statuses/user_timeline', 'json', parameters, callback);
};

// Tweets

module.exports = RestClient;

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

/**
 * Disconnect from the Twitter Streaming API.
 *
 * @this {RestClient}
 * @param {Function} callback
 */
RestClient.prototype.getHomeTimeline = function(callback)
{
	var parameters = {};

	this._createGetRequest('statuses/home_timeline', 'json', parameters, callback);
};

module.exports = RestClient;

var Util = require('util');
var Client = require('./Client');
var Constants = require('./Constants');

/**
 * Creates an instance of RestClient.
 *
 * @constructor
 * @this {Client}
 * @param {String} consumerKey OAuth consumer key.
 * @param {String} consumerSecret OAuth consumer secret.
 * @param {String} token OAuth token.
 * @param {String} tokenSecret OAuth token secret.
 */
var RestClient = function(consumerKey, consumerSecret, token, tokenSecret)
{
    Client.call(this, consumerKey, consumerSecret, token, tokenSecret);
};

Util.inherits(RestClient, Client);

module.exports = RestClient;

var Util = require('util');
var Client = require('./Client');
var Constants = require('./Constants');

/**
 * Creates an instance of RestClient.
 *
 * @constructor
 * @this {Client}
 * @param {String} consumerKey The OAuth consumer key.
 * @param {String} consumerSecret The OAuth consumer secret.
 * @param {String} token The OAuth token.
 * @param {String} tokenSecret The OAuth token secret.
 */
var RestClient = function(consumerKey, consumerSecret, token, tokenSecret)
{
    Client.call(this, consumerKey, consumerSecret, token, tokenSecret);
};

Util.inherits(RestClient, Client);

// Private

module.exports = RestClient;

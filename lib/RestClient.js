var Util = require('util');
var Client = require('./Client');
var Constants = require('./Constants');

/**
 * Creates a new instance of RestClient.
 *
 * @param consumerKey
 * @param consumerSecret
 * @param token
 * @parak tokenSecret
 */
var RestClient = function(consumerKey, consumerSecret, token, tokenSecret)
{
    Client.call(this, consumerKey, consumerSecret, token, tokenSecret);
};

Util.inherits(RestClient, Client);

// Private

module.exports = RestClient;

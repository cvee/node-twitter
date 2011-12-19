var Events = require('events');
var request = require('request');
var Util = require('util');
var Client = require('./Client');

var RestClient = function(consumerKey, consumerSecret, token, tokenSecret)
{
    Client.call(this, consumerKey, consumerSecret, token, tokenSecret);
};

Util.inherits(RestClient, Client);

module.exports = RestClient;

var Events = require('events');
var request = require('request');
var Util = require('util');

/**
 * Creates an instance of Client.
 *
 * @constructor
 * @this {Client}
 * @param {String} consumerKey The OAuth consumer key.
 * @param {String} consumerSecret The OAuth consumer secret.
 * @param {String} token The OAuth token.
 * @param {String} tokenSecret The OAuth token secret.
 */
var Client = function(consumerKey, consumerSecret, token, tokenSecret)
{
    Events.EventEmitter.call(this);

    /** @private */
    this._apiBaseUrlString = null;
    /** @private */
    this._apiVersion = null;
    /** @private */
    this._data = '';
    /** @private */
    this._oauth = {
        consumer_key: consumerKey,
        consumer_secret: consumerSecret,
        token: token,
        token_secret: tokenSecret
    };
    /** @private */
    this._r = null;
};

Util.inherits(Client, Events.EventEmitter);

/**
 * Returns the OAuth credentials. 
 *
 * @this {Client}
 * @return {Dictionary} The OAuth credentials.
 */
Client.prototype.oauth = function()
{
    return this._oauth;
}

/**
 * Creates an HTTP GET request.
 *
 * @private
 * @this {Client}
 * @param {String} resource The Twitter API resource to call.
 * @param {String} format The format in which to return data.
 * @param {Dictionary} parameters Parameters required to access the resource.
 */
Client.prototype._createGetRequest = function(resource, format, parameters)
{
    var self = this;
    var requestUrlString = this._apiBaseUrlString + '/' + this._apiVersion + '/' + resource + '.' + format;
    var requestOptions = {uri: requestUrlString, oauth: this.oauth(), form: parameters};
    
    this._r = request.get(requestOptions);
    this._createEventListenersForRequest(this._r);
};

/**
 * Creates an HTTP POST request.
 *
 * @private
 * @this {Client}
 * @param {String} resource The Twitter API resource to call.
 * @param {String} format The format in which to return data.
 * @param {Dictionary} parameters Parameters required to access the resource.
 */
Client.prototype._createPostRequest = function(resource, format, parameters)
{
    var self = this;
    var requestUrlString = this._apiBaseUrlString + '/' + this._apiVersion + '/' + resource + '.' + format;
    var requestOptions = {uri: requestUrlString, oauth: this.oauth(), form: parameters};
    
    this._r = request.post(requestOptions);
    this._createEventListenersForRequest(this._r);
};

/**
 * Creates listeners that respond to events triggered by the specified 
 * Request object.
 *
 * @private
 * @this {Client}
 * @param {Request} req The request object.
 */
Client.prototype._createEventListenersForRequest = function(req)
{
    var self = this;

    req.on('close', function() {
        self.emit('close');
    });
    
    req.on('data', function(data) {
        self._requestDidReceiveData(data);
    });
    
    req.on('end', function(data) {
        self.emit('end', data);
    });

    req.on('error', function(error) {
        self.emit('error', error);
    });

    req.on('response', function(response) {
        // Error handling for status codes documented at
        // https://dev.twitter.com/docs/error-codes-responses
        var error = null;
        if (response.statusCode !== 200)
        {
            error = new Error();
            error.code = response.statusCode;
        }

        switch(response.statusCode)
        {
            case 304:
                error.message = 'Not Modified.';
                break;
            case 400:
                error.message = 'Bad Request';
                break;
            case 401:
                error.message = 'Unauthorized';
                break;
            case 403:
                error.message = 'Forbidden';
                break;
            case 404:
                error.message = 'Not Found';
                break;
            case 406:
                error.message = 'Not Acceptable';
                break;
            case 420:
                error.message = 'Enhance Your Calm';
                break;
            case 500:
                error.message = 'Internal Server Error';
                break;
            case 502:
                error.message = 'Bad Gateway';
            case 503:
                error.message = 'Service Unavailable';
                break;
        }

        if (error !== null)
        {
            self.emit('error', error);

            return;
        }
    });
};

/**
 *
 *
 * @private
 * @param {String} data
 */
Client.prototype._requestDidReceiveData = function(data) {};

module.exports = Client;

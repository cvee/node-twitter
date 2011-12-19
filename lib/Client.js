var Events = require('events');
var request = require('request');
var Util = require('util');

var Client = function(consumerKey, consumerSecret, token, tokenSecret) {
    Events.EventEmitter.call(this);

    this._apiBaseUrlString = null;
    this._apiVersion = null;
    this._data = '';
    this._oauth = {
        consumer_key: consumerKey,
        consumer_secret: consumerSecret,
        token: token,
        token_secret: tokenSecret
    };
    this._r = null;
};

Util.inherits(Client, Events.EventEmitter);

// Accessors

Client.prototype.oauth = function()
{
    return this._oauth;
}

// Private

Client.prototype._createConnection = function(resource, format, parameters, callback)
{
    var self = this;

    var requestUrlString = this._apiBaseUrlString + '/' + this._apiVersion + '/' + resource + '.' + format;

    var postOptions = {uri: requestUrlString, oauth: this.oauth(), form: parameters};
    
    this._r = request.post(postOptions);
    
    this._createEventListenersForRequest(this._r);
};

Client.prototype._createEventListenersForRequest = function(req)
{
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

Client.prototype._requestDidReceiveData = function(data) {};

module.exports = Client;

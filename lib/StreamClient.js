var Events = require('events');
var request = require('request');
var Util = require('util');
var Constants = require('./Constants');

var StreamClient = function(consumerKey, consumerSecret, token, tokenSecret) {
    Events.EventEmitter.call(this);

    this._data = '';
    this._oauth = {
        consumer_key: consumerKey,
        consumer_secret: consumerSecret,
        token: token,
        token_secret: tokenSecret
    };
    this._r = null;
};

Util.inherits(StreamClient, Events.EventEmitter);

// Accessors
StreamClient.prototype.oauth = function() {
    return this._oauth;
}

/**
 * Returns public statuses that match one or more filter predicates.
 *
 * @param keywords Keywords to track
 * @param locations Locations to track
 * @param users Users to track
 * @param count
 * @param delimited
 * @param callback
 */
StreamClient.prototype.start = function(keywords, locations, users, count, delimited)
{
    var parameters = {};

    if (keywords !== undefined && keywords !== null)
    {
        if (keywords instanceof Array)
        {
            parameters['track'] = keywords.join(',');
        }
        else
        {
            throw new Error('Expected Array object.');
        }
    }

    if (locations !== undefined && locations !== null)
    {
        if (locations instanceof Array)
        {
            parameters['locations'] = locations;
        }
        else
        {
            throw new Error('Expected Array object.');
        }
    }

    if (users !== undefined && users !== null)
    {
        if (users instanceof Array)
        {
            parameters['follow'] = users;
        }
        else
        {
            throw new Error('Expected Array object.');
        }
    }

    if (count !== undefined && count !== null)
    {
        if (isNaN(count) === false)
        {
            parameters['count'] = count;
        }
        else
        {
            throw new Error('Expected integer.');
        }
    }

    if (delimited !== undefined && delimited !== null)
    {
        if (delimited instanceof String)
        {
            parameters['delimited'] = delimited;
        }
        else
        {
            throw new Error('Expected String.');
        }
    }

    this._createConnection('statuses/filter', 'json', parameters);
};

StreamClient.prototype.stop = function()
{
    this._r.end();
    this._r = null;
    this._data = '';
};

// Private

StreamClient.prototype._createConnection = function(resource, format, parameters, callback)
{
    var self = this;

    var requestUrlString = Constants.StreamAPIBaseURLString + '/' + Constants.StreamAPIVersion + '/' + resource + '.' + format;

    var postOptions = {uri: requestUrlString, oauth: this.oauth(), form: parameters};
    
    this._r = request.post(postOptions);
    
    this._r.on('close', function() {
        self.emit('close');
    });
    
    this._r.on('data', function(data) {
        self._requestDidReceiveData(data);
    });
    
    this._r.on('end', function(data) {
        self.emit('end', data);
    });

    this._r.on('error', function(error) {
        self.emit('error', error);
    });

    this._r.on('response', function(response) {
        // Error handling for status codes documented at
        // http://code.google.com/p/otterapi/wiki/ErrorHandling
        var errorMessage = null;
        switch(response.statusCode)
        {
            case 400:
                errorMessage = 'Parameter check failed.';
                break;
            case 401:
                errorMessage = 'Unauthorized';
                break;
            case 403:
                errorMessage = 'Forbidden';
                break;
            case 404:
                errorMessage = 'Action not supported.';
                break;
            case 500:
                errorMessage = 'Unexpected internal error.';
                break;
            case 503:
                errorMessage = 'Temporarily unavailable';
                break;
        }

        if (errorMessage !== null)
        {
            var error = new Error(errorMessage);
            error.code = response.statusCode;

            self.emit('error', error);

            return;
        }
    });
};

StreamClient.prototype._requestDidReceiveData = function(data)
{
    this._data += data.toString('utf8');

    var index = -1;
    while ((index = this._data.indexOf(Constants.StreamAPIObjectTerminator)) !== -1)
    {
        var jsonString = this._data.slice(0, index);
        this._data = this._data.slice(index + Constants.StreamAPIObjectTerminator.length);

        var object = null;
        try
        {
            object = JSON.parse(jsonString);
        }
        catch (e)
        {
            // If an error occurs while parsing the JSON string reset object
            // and emit the error.
            object = null;
            this.emit('error', e);
        }

        // If object is undefined or null, return without emitting any events.
        if (object === undefined || object === null)
        {
            return;
        }

        if (object.delete !== undefined)
        {
            this.emit('deleteTweet', object.delete);
        }
        else if (object.scrub_geo !== undefined)
        {
            this.emit('deleteLocation', object.scrub_geo);
        }
        else if (object.limit !== undefined)
        {
            this.emit('limit', object.limit);
        }
        else if (object.retweeted_status !== undefined)
        {
            this.emit('retweet', object.retweeted_status);
        }
        else
        {
            this.emit('tweet', object);
        }
    }
};

module.exports = StreamClient;

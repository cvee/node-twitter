var Events = require('events');
var request = require('request');
var Util = require('util');
var Constants = require('./Constants');
var Client = require('./Client');

var StreamClient = function(consumerKey, consumerSecret, token, tokenSecret)
{
    Client.call(this, consumerKey, consumerSecret, token, tokenSecret);
};

Util.inherits(StreamClient, Client);

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
        //self.emit('data', data);
    });
    
    this._r.on('end', function(data) {
        self.emit('end', data);
    });

    this._r.on('error', function(error) {
        self.emit('error', error);
    });

    this._r.on('response', function(response) {
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

StreamClient.prototype._requestDidReceiveData = function(data)
{
    this._data += data.toString('utf8');

    var index = -1;
    while ((index = this._data.indexOf(Constants.StreamAPIObjectTerminator)) !== -1)
    {
        var jsonString = this._data.slice(0, index);
        this._data = this._data.slice(index + Constants.StreamAPIObjectTerminator.length);
        var object = JSON.parse(jsonString);

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

var Util = require('util');
var Client = require('./Client');
var Constants = require('./Constants');

/**
 * Creates a new instance of StreamClient.
 *
 * @param consumerKey
 * @param consumerSecret
 * @param token
 * @parak tokenSecret
 */
var StreamClient = function(consumerKey, consumerSecret, token, tokenSecret)
{
    Client.call(this, consumerKey, consumerSecret, token, tokenSecret);

    this._apiBaseUrlString = Constants.StreamAPIBaseURLString;
    this._apiVersion = Constants.StreamAPIVersion;
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

    this._createPostRequest('statuses/filter', 'json', parameters);
};

StreamClient.prototype.stop = function()
{
    this._r.end();
};

// Private

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

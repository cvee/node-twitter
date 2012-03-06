var Util = require('util');
var Client = require('./Client');
var Constants = require('./Constants');
var RestParameterValidator = require('./RestParameterValidator');
var UploadClient = require('./UploadClient');

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
    this._validator = new RestParameterValidator();
};

Util.inherits(RestClient, Client);

// Timelines
//
// Timelines are collections of Tweets, ordered with the most recent first.

/**
 * Returns the 20 most recent tweets (including retweets), posted by the authenticated user and the user they follow.
 *
 * For information on acceptable parameters see the official <a href="https://dev.twitter.com/docs/api/1/get/statuses/home_timeline">Twitter documenation</a>.
 *
 * @this {RestClient}
 * @param {Dictionary} parameters
 * @param {Function} callback The callback function.
 */
RestClient.prototype.statusesHomeTimeline = function(parameters, callback)
{
    this._validator.validateContributorDetails(parameters);
    this._validator.validateCount(parameters);
    this._validator.validateExcludeReplies(parameters);
    this._validator.validateIncludeEntities(parameters);
    this._validator.validateIncludeRetweets(parameters);
    this._validator.validateMaxId(parameters);
    this._validator.validatePage(parameters);
    this._validator.validateSinceId(parameters);
    this._validator.validateTrimUser(parameters);

	this._createGetRequest('statuses/home_timeline', 'json', parameters, callback);
};

/**
 *
 *
 * For information on acceptable parameters see the official <a href="https://dev.twitter.com/docs/api/1/get/statuses/mentions">Twitter documentation</a>.
 *
 * @this {RestClient}
 * @param {Dictionary} parameters
 * @param {Function} callback The callback function.
 */
RestClient.prototype.statusesMentions = function(parameters, callback)
{
    this._validator.validateContributorDetails(parameters);
    this._validator.validateCount(parameters);
    this._validator.validateExcludeReplies(parameters);
    this._validator.validateIncludeEntities(parameters);
    this._validator.validateIncludeRetweets(parameters);
    this._validator.validateMaxId(parameters);
    this._validator.validatePage(parameters);
    this._validator.validateSinceId(parameters);
    this._validator.validateTrimUser(parameters);

    this._createGetRequest('statuses/mentions', 'json', parameters, callback);
};

/**
 *
 *
 *
 * For information on acceptable parameters see the official <a href="https://dev.twitter.com/docs/api/1/get/statuses/public_timeline">Twitter documenation</a>.
 *
 * @this {RestClient}
 * @param {Dictionary} parameters
 * @param {Function} callback The callback function.
 */
RestClient.prototype.statusesPublicTimeline = function(parameters, callback)
{
    this._validator.validateCount(parameters);
    this._validator.validateIncludeEntities(parameters);
    this._validator.validateTrimUser(parameters);

    this._createGetRequest('statuses/public_timeline', 'json', parameters, callback);
};

/**
 *
 *
 * For information on acceptable parameters see the official <a href="https://dev.twitter.com/docs/api/1/get/statuses/retweeted_by_me">Twitter documenation</a>.
 *
 * @this {RestClient}
 * @param {Dictionary} parameters
 * @param {Function} callback The callback function.
 */
RestClient.prototype.statusesRetweetedByMe = function(parameters, callback)
{
    this._validator.validateCount(parameters);
    this._validator.validateIncludeEntities(parameters);
    this._validator.validateMaxId(parameters);
    this._validator.validatePage(parameters);
    this._validator.validateSinceId(parameters);
    this._validator.validateTrimUser(parameters);

    this._createGetRequest('statuses/retweeted_by_me', 'json', parameters, callback);
};

/**
 *
 *
 * For information on acceptable parameters see the official <a href="https://dev.twitter.com/docs/api/1/get/statuses/retweeted_by_user">Twitter documenation</a>.
 *
 * @this {RestClient}
 * @param {Dictionary} parameters
 * @param {Function} callback The callback function.
 */
RestClient.prototype.statusesRetweetedByUser = function(parameters, callback)
{
    this._validator.validateCount(parameters);
    this._validator.validateIncludeEntities(parameters);
    this._validator.validateMaxId(parameters);
    this._validator.validatePage(parameters);
    this._validator.validateScreenName(parameters);
    this._validator.validateSinceId(parameters);
    this._validator.validateTrimUser(parameters);
    this._validator.validateUserId(parameters);

    this._createGetRequest('statuses/retweeted_by_user', 'json', parameters, callback);
};

/**
 *
 *
 * For information on acceptable parameters see the official <a href="https://dev.twitter.com/docs/api/1/get/statuses/retweeted_to_me">Twitter documenation</a>.
 *
 * @this {RestClient}
 * @param {Dictionary} parameters
 * @param {Function} callback The callback function.
 */
RestClient.prototype.statusesRetweetedToMe = function(parameters, callback)
{
    this._validator.validateCount(parameters);
    this._validator.validateIncludeEntities(parameters);
    this._validator.validateMaxId(parameters);
    this._validator.validatePage(parameters);
    this._validator.validateSinceId(parameters);
    this._validator.validateTrimUser(parameters);

    this._createGetRequest('statuses/retweeted_to_me', 'json', parameters, callback);
};

/**
 *
 *
 * For information on acceptable parameters see the official <a href="https://dev.twitter.com/docs/api/1/get/statuses/retweeted_to_user">Twitter documenation</a>.
 *
 * @this {RestClient}
 * @param {Dictionary} parameters
 * @param {Function} callback The callback function.
 */
RestClient.prototype.statusesRetweetedToUser = function(parameters, callback)
{
    this._validator.validateCount(parameters);
    this._validator.validateIncludeEntities(parameters);
    this._validator.validateMaxId(parameters);
    this._validator.validatePage(parameters);
    this._validator.validateScreenName(parameters);
    this._validator.validateSinceId(parameters);
    this._validator.validateTrimUser(parameters);
    this._validator.validateUserId(parameters);

    this._createGetRequest('statuses/retweeted_to_user', 'json', parameters, callback);
};

/**
 *
 *
 * For information on acceptable parameters see the official <a href="https://dev.twitter.com/docs/api/1/get/statuses/retweets_of_me">Twitter documenation</a>.
 *
 * @this {RestClient}
 * @param {Dictionary} parameters
 * @param {Function} callback The callback function.
 */
RestClient.prototype.statusesRetweetsOfMe = function(parameters, callback)
{
    this._validator.validateCount(parameters);
    this._validator.validateIncludeEntities(parameters);
    this._validator.validateMaxId(parameters);
    this._validator.validatePage(parameters);
    this._validator.validateSinceId(parameters);
    this._validator.validateTrimUser(parameters);

    this._createGetRequest('statuses/retweets_of_me', 'json', parameters, callback);
};

/**
 *
 *
 * For information on acceptable parameters see the official <a href="https://dev.twitter.com/docs/api/1/get/statuses/user_timeline">Twitter documenation</a>.
 *
 * @this {RestClient}
 * @param {Dictionary} parameters
 * @param {Function} callback The callback function.
 */
RestClient.prototype.statusesUserTimeline = function(parameters, callback)
{
    this._validator.validateContributorDetails(parameters);
    this._validator.validateCount(parameters);
    this._validator.validateExcludeReplies(parameters);
    this._validator.validateIncludeEntities(parameters);
    this._validator.validateIncludeRetweets(parameters);
    this._validator.validateMaxId(parameters);
    this._validator.validatePage(parameters);
    this._validator.validateSinceId(parameters);
    this._validator.validateScreenName(parameters);
    this._validator.validateTrimUser(parameters);
    this._validator.validateUserId(parameters);

    this._createGetRequest('statuses/user_timeline', 'json', parameters, callback);
};

// Tweets

/**
 *
 *
 * For information on acceptable parameters see the official <a href="https://dev.twitter.com/docs/api/1/post/statuses/destroy/%3Aid">Twitter documenation</a>.
 *
 * @this {RestClient}
 * @param {Dictionary} parameters
 * @param {Function} callback The callback function.
 */
RestClient.prototype.statusesDestroy = function(parameters, callback)
{
    var id = parameters['id'];
    if (id === undefined)
    {
        throw new Error('Missing required parameter: id.');
    }

    this._validator.validateId(parameters);
    this._validator.validateIncludeEntities(parameters);
    this._validator.validateTrimUser(parameters);

    var resource = 'statuses/destroy/' + id;

    // Remove the id key from the list of query parameters.
    delete(parameters['id']);

    this._createPostRequest(resource, 'json', parameters, callback);
};

/**
 *
 *
 * For information on acceptable parameters see the official <a href="https://dev.twitter.com/docs/api/1/get/statuses/oembed">Twitter documenation</a>.
 *
 * @this {RestClient}
 * @param {Dictionary} parameters
 * @param {Function} callback The callback function.
 */
RestClient.prototype.statusesOEmbed = function(parameters, callback)
{
    var id = parameters['id'];
    if (id === undefined)
    {
        var url = parameters['url'];
        if (url === undefined)
        {
            throw new Error('Missing required parameter: id or url.');
        }
    }

    this._validator.validateId(parameters);
    this._validator.validateUrl(parameters);

    this._validator.validateAlign(parameters);
    this._validator.validateHideMedia(parameters);
    this._validator.validateHideThread(parameters);
    this._validator.validateLanguage(parameters);
    this._validator.validateMaxWidth(parameters);
    this._validator.validateOmitScript(parameters);
    this._validator.validateRelated(parameters);

    var resource = 'statuses/oembed';

    this._createGetRequest(resource, 'json', parameters, callback);
};

/**
 *
 *
 * For information on acceptable parameters see the official <a href="https://dev.twitter.com/docs/api/1/post/statuses/retweet/%3Aid">Twitter documenation</a>.
 *
 * @this {RestClient}
 * @param {Dictionary} parameters
 * @param {Function} callback The callback function.
 */
RestClient.prototype.statusesRetweet = function(parameters, callback)
{
    var id = parameters['id'];
    if (id === undefined)
    {
        throw new Error('Missing required parameter: id.');
    }

    this._validator.validateId(parameters);
    this._validator.validateIncludeEntities(parameters);
    this._validator.validateCount(parameters);
    this._validator.validatePage(parameters);
    this._validator.validateTrimUser(parameters);

    var resource = 'statuses/retweet/' + id;

    // Remove the id key from the list of query parameters.
    delete(parameters['id']);

    this._createPostRequest(resource, 'json', parameters, callback);
};

/**
 *
 *
 * For information on acceptable parameters see the official <a href="https://dev.twitter.com/docs/api/1/get/statuses/%3Aid/retweeted_by">Twitter documenation</a>.
 *
 * @this {RestClient}
 * @param {Dictionary} parameters
 * @param {Function} callback The callback function.
 */
RestClient.prototype.statusesRetweetedBy = function(parameters, callback)
{
    var id = parameters['id'];
    if (id === undefined)
    {
        throw new Error('Missing required parameter: id.');
    }

    this._validator.validateId(parameters);
    this._validator.validateCount(parameters);
    this._validator.validatePage(parameters);

    var resource = 'statuses/' + id + '/retweeted_by';

    // Remove the id key from the list of query parameters.
    delete(parameters['id']);

    this._createGetRequest(resource, 'json', parameters, callback);
};

/**
 *
 *
 * For information on acceptable parameters see the official <a href="https://dev.twitter.com/docs/api/1/get/statuses/%3Aid/retweeted_by/ids">Twitter documenation</a>.
 *
 * @this {RestClient}
 * @param {Dictionary} parameters
 * @param {Function} callback The callback function.
 */
RestClient.prototype.statusesRetweetedByIds = function(parameters, callback)
{
    var id = parameters['id'];
    if (id === undefined)
    {
        throw new Error('Missing required parameter: id.');
    }

    this._validator.validateId(parameters);
    this._validator.validateCount(parameters);
    this._validator.validatePage(parameters);
    this._validator.validateStringifyIds(parameters);

    var resource = 'statuses/' + id + '/retweeted_by/ids';

    // Remove the id key from the list of query parameters.
    delete(parameters['id']);

    // JavaScript cannot consume tweet ID due to their size. Add the 
    // stringify_ids parameter to ensure tweet IDs are returned as strings.
    parameters['stringify_ids'] = true;

    this._createGetRequest(resource, 'json', parameters, callback);
};

/**
 *
 *
 * For information on acceptable parameters see the official <a href="https://dev.twitter.com/docs/api/1/get/statuses/retweets/%3Aid">Twitter documenation</a>.
 *
 * @this {RestClient}
 * @param {Dictionary} parameters
 * @param {Function} callback The callback function.
 */
RestClient.prototype.statusesRetweets = function(parameters, callback)
{
    var id = parameters['id'];
    if (id === undefined)
    {
        throw new Error('Missing required parameter: id.');
    }

    this._validator.validateId(parameters);
    this._validator.validateIncludeEntities(parameters);
    this._validator.validateCount(parameters);
    this._validator.validatePage(parameters);
    this._validator.validateTrimUser(parameters);

    var resource = 'statuses/retweets/' + id;

    // Remove the id key from the list of query parameters.
    delete(parameters['id']);

    this._createGetRequest(resource, 'json', parameters, callback);
};

/**
 *
 *
 * For information on acceptable parameters see the official <a href="https://dev.twitter.com/docs/api/1/get/statuses/show/%3Aid">Twitter documenation</a>.
 *
 * @this {RestClient}
 * @param {Dictionary} parameters
 * @param {Function} callback The callback function.
 */
RestClient.prototype.statusesShow = function(parameters, callback)
{
    var id = parameters['id'];
    if (id === undefined)
    {
        throw new Error('Missing required parameter: id.');
    }

    this._validator.validateId(parameters);
    this._validator.validateIncludeEntities(parameters);
    this._validator.validateTrimUser(parameters);

    var resource = 'statuses/show';

    this._createGetRequest(resource, 'json', parameters, callback);
};

/**
 *
 *
 * For information on acceptable parameters see the official <a href="https://dev.twitter.com/docs/api/1/post/statuses/update">Twitter documenation</a>.
 *
 * @this {RestClient}
 * @param {Dictionary} parameters
 * @param {Function} callback The callback function.
 */
RestClient.prototype.statusesUpdate = function(parameters, callback)
{
    var status = parameters['status'];
    if (status === undefined)
    {
        throw new Error('Missing required parameter: status.');
    }

    this._validator.validateDisplayCoordinates(parameters);
    this._validator.validateIncludeEntities(parameters);
    this._validator.validateInReplyToStatusId(parameters);
    this._validator.validatePlaceId(parameters);
    this._validator.validateLatitude(parameters);
    this._validator.validateLongitude(parameters);
    this._validator.validateStatus(parameters);
    this._validator.validateTrimUser(parameters);

    var resource = 'statuses/update';

    this._createPostRequest(resource, 'json', parameters, callback);
};

/**
 *
 *
 * For information on acceptable parameters see the official <a href="https://dev.twitter.com/docs/api/1/post/statuses/update_with_media">Twitter documenation</a>.
 *
 * @this {RestClient}
 * @param {Dictionary} parameters
 * @param {Function} callback The callback function.
 */
RestClient.prototype.statusesUpdateWithMedia = function(parameters, callback)
{
    var uploadClient = new UploadClient(
        this._oauth.consumer_key,
        this._oauth.consumer_secret,
        this._oauth.token,
        this._oauth.token_secret
    );

    uploadClient.statusesUpdateWithMedia(parameters, callback);
};

module.exports = RestClient;

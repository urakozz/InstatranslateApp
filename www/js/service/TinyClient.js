/**
 * Created by yury on 22/06/15.
 */
define(["lodash", "reqwest"], function(_, reqwest) {
    var Client = function(options){
        this.clientDefaults = {
            accessToken: null,
            clientId: null,
            count: null,
            url: null,
            host: null,
            method: "GET",
            hash: null,
            userId: null,
            location: null,
            search: null
        };
        this.clientDefaults = _.merge({}, this.clientDefaults, options);
    };
    Client.prototype.composeRequest = function(options) {
        var url = options.host || 'https://api.instagram.com/v1';
        url += options.url;
        var data = {};

        if (options.accessToken == null && options.clientId == null) {
            throw 'You must provide an access token or a client id';
        }

        data = _.merge(data, {
            access_token: options.accessToken || '',
            client_id: options.clientId || '',
            count: options.count || ''
        });

        //if (options.url != null) {
        //    url += options.url;
        //}
        //else if (options.hash != null) {
        //    url += '/tags/' + options.hash + '/media/recent';
        //}
        //else if (options.search != null) {
        //    url += '/media/search';
        //    data = $.extend(data, options.search);
        //}
        //else if (options.userId != null) {
        //    if (options.accessToken == null) {
        //        throw 'You must provide an access token';
        //    }
        //    url += '/users/' + options.userId + '/media/recent';
        //}
        //else if (options.location != null) {
        //    url += '/locations/' + options.location.id + '/media/recent';
        //    delete options.location.id;
        //    data = $.extend(data, options.location);
        //}
        //else {
        //    url += '/media/popular';
        //}
        //
        return {url: url, data: data};
    };


    Client.prototype.call = function(options){
        options = _.merge({}, this.clientDefaults, options);
        var request = this.composeRequest(options);
        return reqwest({
            type: "jsonp",
            contentType: 'application/json',

            url: request.url,
            data: request.data
        });
    };
    return Client;
});
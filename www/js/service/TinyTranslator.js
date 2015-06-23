/**
 * Created by yury on 23/06/15.
 */
define(["lodash", "reqwest"], function(_, reqwest) {
    var Client = function(options){
        this.clientDefaults = {
            'key' : "trnsl.1.1.20150414T114844Z.a033fd4e2f954a35.ae3277873ab19d5355dbced6d668dc71b3011865",
            'options' : '1'
        };
        this.clientDefaults = _.merge({}, this.clientDefaults, options);
    };


    Client.prototype.call = function(text, lang){
        var url = 'https://translate.yandex.net/api/v1.5/tr.json/translate';
        var data = this.clientDefaults;
        data.lang = lang;
        data.text = text;
        return reqwest({
            type: "jsonp",
            method: 'post',
            contentType: 'application/json',

            url: url,
            data: data
        });
    };
    return Client;
});
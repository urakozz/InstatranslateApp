/**
 * Created by yury on 15/06/15.
 */
define(["Framework7"],function(_){

    var $$ = Dom7;

    var appFunc = {

        isPhonegap: function() {
            return (typeof(cordova) !== 'undefined' || typeof(phonegap) !== 'undefined');
        },

        //isEmail: function(str){
        //    var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
        //    return reg.test(str);
        //},

        //getPageNameInUrl: function(url){
        //    url = url || '';
        //    var arr = url.split('.');
        //    return arr[0];
        //},
        //
        //isEmpty: function(obj) {
        //    for(var prop in obj) {
        //        if(obj.hasOwnProperty(prop))
        //            return false;
        //    }
        //
        //    return true;
        //},

        //hideToolbar: function() {
        //    hiApp.hideToolbar('.toolbar');
        //},
        //
        //showToolbar: function() {
        //    hiApp.showToolbar('.toolbar');
        //},

        //getCharLength: function(str){
        //    var iLength = 0;
        //    for(var i = 0;i<str.length;i++)
        //    {
        //        if(str.charCodeAt(i) >255)
        //        {
        //            iLength += 2;
        //        }
        //        else
        //        {
        //            iLength += 1;
        //        }
        //    }
        //    return iLength;
        //},

        //matchUrl: function(string){
        //    var reg = /((http|ftp|https):\/\/)?[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&;:\/~\+#]*[\w\-\@?^=%&;\/~\+#])?/g;
        //
        //    string = string.replace(reg,function(a){
        //        if(a.indexOf('http') !== -1 || a.indexOf('ftp') !== -1){
        //            return '<a href=\"#\" onclick=\"event.stopPropagation();window.open(\'' + a + '\',\'_blank\')\">' + a + '</a>';
        //        }
        //        else
        //        {
        //            return '<a href=\"#\" onclick=\"event.stopPropagation();window.open(\'http://' + a + '\',\'_blank\')\">' + a + '</a>';
        //        }
        //    });
        //    return string;
        //},

        bindEvents: function(bindings) {
            for (var i in bindings) {
                if(bindings[i].selector) {
                    $$(bindings[i].element)
                        .on(bindings[i].event,bindings[i].selector , bindings[i].handler);
                }else{
                    $$(bindings[i].element)
                        .on(bindings[i].event, bindings[i].handler);
                }
            }
        }
    };

    return appFunc;
});
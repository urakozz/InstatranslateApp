/**
 * Created by yury on 15/06/15.
 */
define([], function() {
    var CONFIG = null;

    var globalService = {

        init: function(){
            if (!CONFIG) {
                CONFIG = {};
                CONFIG.currentUser = {};
                if (localStorage.getItem('sid')) {
                    CONFIG.currentUser.sid = localStorage.getItem('sid');
                }
                if(localStorage.getItem('user')){
                    CONFIG.currentUser = JSON.parse(localStorage.getItem('user'));
                }
            }
        },

        getCurrentUser: function(){
            return CONFIG.currentUser;
        },

        getSid: function(){
            var m = $$.parseUrlQuery(window.location.href || '');
            return m.sid || localStorage.getItem('sid');
        },

        getToken: function(){
            return localStorage.getItem('token')
        },

        setToken: function(token){
            return localStorage.setItem('token', token)
        },

        setCurrentUser: function(user){
            CONFIG.currentUser = user;
            localStorage.setItem('user',JSON.stringify(user));
        },

        removeCurrentUser: function(){
            CONFIG.currentUser = {};
            localStorage.removeItem('user');
            localStorage.removeItem('sid');
        },

        isLogin: function(){
            return localStorage.getItem('token');
        }

    };

    globalService.init();

    return globalService;
});
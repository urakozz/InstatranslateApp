(function() {
var lang = localStorage.getItem('lang') || 'en-us';
require.config({
    locale: lang,
        paths: {
            GS:'service/GlobalService',
            Framework7:'assets/framework7'
        },
        shim: {
                'Framework7':{exports: 'Framework7'}
        }
});
define('app', ['router', 'Framework7', 'utils/appFunc', 'GS'], function(Router, Framework7, appFunc, GS) {
        //Router.init();
        //var f7 = new Framework7({
        //        modalTitle: 'Contacts7',
        //        swipePanel: 'left',
        //        animateNavBackIcon: true
        //});
        //var mainView = f7.addView('.view-main', {
        //        dynamicNavbar: true
        //});
        //return {
        //        f7: f7,
        //        mainView: mainView,
        //        router: Router
        //};
    //console.log(Router);
    var app = {
        initialize: function() {
            this.bindEvents();
        },
        bindEvents: function() {
            if(appFunc.isPhonegap()) {
                document.addEventListener('deviceready', this.onDeviceReady, false);
            }else{
                window.onload = this.onDeviceReady();
            }
        },
        onDeviceReady: function() {
            app.receivedEvent('deviceready');
        },
        receivedEvent: function(event) {
            switch (event) {
                case 'deviceready':
                    app.initMainView();
                    break;
            }
        },
        initMainView:function(){
            window.$$ = Dom7;

            window.iApp = new Framework7({
                modalTitle: 'Instatranslate',
                popupCloseByOutside:false,
                animateNavBackIcon: true,
                //modalTitle: i18n.global.modal_title,
                //modalButtonOk: i18n.global.modal_button_ok,
                //modalButtonCancel: i18n.global.cancel,
                preprocess:function(content, url, next){
                    console.log("preprocess", arguments);
                    return next(content);
                },
                preroute:function (view, options) {
                    console.log("preroute", arguments);
                    //if (!GS.isLogin()) {
                    //    view.router.loadPage('form.html'); //load another page with auth form
                    //    return false; //required to prevent default router action
                    //}
                },
                pushState: !appFunc.isPhonegap()
            });

            window.mainView = iApp.addView('#iApplicationMainView', {
                dynamicNavbar: true
            });

            //window.contatcView = iApp.addView('#contatcView', {
            //    dynamicNavbar: true
            //});
            //
            //window.settingView = iApp.addView('#settingView', {
            //    dynamicNavbar: true
            //});

            Router.init();
        }
    };

    app.initialize();
});
})();
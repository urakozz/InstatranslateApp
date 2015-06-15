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
define('app', ['router', 'Framework7', 'utils/appFunc'], function(Router, Framework7, appFunc) {
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
                popupCloseByOutside:false,
                animateNavBackIcon: true,
                //modalTitle: i18n.global.modal_title,
                //modalButtonOk: i18n.global.modal_button_ok,
                //modalButtonCancel: i18n.global.cancel,
                //preprocess:router.preprocess
                pushState: false
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
/**
 * Created by yury on 24/06/15.
 */
(function() {
    var lang = localStorage.getItem('lang') || 'en-us';
    require.config({
        locale: lang,
        paths: {
            GS:'service/GlobalService',
            Framework7:'../build/js/framework7',
            lodash: '../build/js/lodash',
            domReady: '../build/js/domReady',
            reqwest: '../build/js/reqwest',
            moment: "../build/js/moment-with-locales.min",
            OAuth:'../build/js/oauth'
        },
        shim: {
            Framework7:{exports: 'Framework7'}
        }
    });
    define("main", ["app"], function(bootstrap){
        bootstrap.initGlobals();
        bootstrap.initDebugger();
        bootstrap.initWelcomeScreen("welcomeButton");
        bootstrap.initPullToRefresh();
        bootstrap.enviromentalOnload(bootstrap.onDeviceReadyHandler);
        bootstrap.registerTranslator();
        bootstrap.registerTimeOption();
    });
})();
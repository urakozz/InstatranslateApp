/**
 * Created by yury on 24/06/15.
 */
(function() {
    var lang = localStorage.getItem('lang') || 'en-us';
    require.config({
        locale: lang,
        paths: {
            GS:'service/GlobalService',
            Framework7:'vendor/framework7',
            lodash: 'vendor/lodash',
            domReady: 'vendor/domReady',
            reqwest: 'vendor/reqwest',
            moment: "vendor/moment-with-locales.min",
            OAuth:'vendor/oauth'
        },
        shim: {
            Framework7:{exports: 'Framework7'}
        }
    });
    define("main", ["app"], function(bootstrap){
        bootstrap.initGlobals();
        bootstrap.initDebugger();
        dbg.debug("inited");
        bootstrap.initWelcomeScreen("welcomeButton");
        bootstrap.initPullToRefresh();
        bootstrap.enviromentalOnload(bootstrap.onDeviceReadyHandler);
        bootstrap.registerTranslator();
        bootstrap.registerTimeOption();
    });
})();
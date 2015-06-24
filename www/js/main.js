/**
 * Created by yury on 24/06/15.
 */
(function() {
    var lang = localStorage.getItem('lang') || 'en-us';
    require.config({
        locale: lang,
        paths: {
            GS:'service/GlobalService',
            Framework7:'assets/framework7',
            lodash: 'assets/lodash',
            reqwest: 'assets/reqwest',
            moment: "assets/moment-with-locales.min",
            OAuth:'assets/oauth'
        },
        shim: {
            Framework7:{exports: 'Framework7'}
        }
    });
    define("main", ["app"], function(bootstrap){
        bootstrap.initGlobals();
        bootstrap.initWelcomeScreen("welcomeButton");
        bootstrap.initPullToRefresh();
        bootstrap.enviromentalOnload(bootstrap.onDeviceReadyHandler);
        bootstrap.registerTranslator();
        bootstrap.registerTimeOption();
    });
})();
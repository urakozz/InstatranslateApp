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
define('app', ['router', 'Framework7'], function(Router, Framework7) {
        Router.init();
        var f7 = new Framework7({
                modalTitle: 'Contacts7',
                swipePanel: 'left',
                animateNavBackIcon: true
        });
        var mainView = f7.addView('.view-main', {
                dynamicNavbar: true
        });
        return {
                f7: f7,
                mainView: mainView,
                router: Router
        };
});
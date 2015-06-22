(function() {
var lang = localStorage.getItem('lang') || 'en-us';
require.config({
    locale: lang,
        paths: {
            GS:'service/GlobalService',
            Framework7:'assets/framework7',
            OAuth:'assets/oauth'
        },
        shim: {
                'Framework7':{exports: 'Framework7'}
        }
});
define('app', ['Framework7','welcomescreen', 'utils/appFunc', 'GS'], function(Framework7, ws, appFunc, GS) {

    var welcomescreen_slides = [
        {
            id: 'slide0',
            picture: '<i class="icon ion-social-instagram-outline big-icon"></i>'+
            '<div class="content-block">' +
            '<a href="#"class="login-popup-button open-popup button button-big" data-popup=".popup-login">' +
            'Log in to the Instagram' +
            '</a> ' +
            '</div>',
            text:""

        }
    ];

    var bootstrap = {
        initGlobals: function(){
            window.iApp = new Framework7({
                modalTitle: 'Instatranslate',
                popupCloseByOutside:false,
                animateNavBackIcon: true,
                preprocess:function(content, url, next){
                    console.log("preprocess", url);
                    return next(content);
                },
                preroute:function (view, options) {
                    console.log("preroute", options.url, options);
                    //if (!GS.isLogin()) {
                    //    view.router.loadPage('form.html'); //load another page with auth form
                    //    return false; //required to prevent default router action
                    //}
                },
                pushState: !appFunc.isPhonegap()
            });
            window.$$ = Dom7;
            window.mainView = iApp.addView('#iApplicationMainView', {
                dynamicNavbar: true
            });
        },
        initWelcomeScreen: function(){
            var options = {
                'bgcolor': '#74baee',
                'fontcolor': '#fff',
                closeButton: false,
                pagination: false,
                'open': !localStorage.getItem('sid')
            };

            var welcomescreen = iApp.welcomescreen(welcomescreen_slides, options);
            $$('.popup-login').on('opened', function () {
                welcomescreen.close();
            });
        },
        enviromentalOnload: function(func){
            if(appFunc.isPhonegap()) {
                document.addEventListener('deviceready', func, false);
            }else{
                window.onload = func;
                require(["assets/oauth"]);
            }
        }
    };
    bootstrap.initGlobals();
    bootstrap.initWelcomeScreen();
    bootstrap.enviromentalOnload(onDeviceReady);


    function onDeviceReady() {

        $$(".init-overlay-container").addClass("init-overlay-container__invisible");

        $$(".instagram-oauth").on("click", function(e){
            e.preventDefault();

            //$$('#login p').html(authUrl);
            OAuth.initialize('vAGr3JbAXYT3Jni6MoD9OWjjK0M');
            OAuth.popup('instagram').done(function(result) {
                console.log(result);
                $$('#login p').text(result.access_token);
            }).fail(function(res){
                console.log(res);
            })
        });
    }



});
})();
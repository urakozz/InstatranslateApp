(function() {
var lang = localStorage.getItem('lang') || 'en-us';
require.config({
    locale: lang,
        paths: {
            GS:'service/GlobalService',
            Framework7:'assets/framework7',
            lodash: 'assets/lodash',
            reqwest: 'assets/reqwest',
            OAuth:'assets/oauth'
        },
        shim: {
            Framework7:{exports: 'Framework7'}
        }
});
define('app', ['Framework7','welcomescreen', 'utils/appFunc', 'GS', "service/TinyClient", "service/TinyTranslator"],
    function(Framework7, ws, appFunc, GS, iClient, iTranslator) {

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
                'open': !GS.isLogin()
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
        },
        initPullToRefresh: function(){
            var ptrContent = $$('.pull-to-refresh-content');

            ptrContent.on('refresh', function (e) {
                new iClient({accessToken:GS.getToken()}).call({url:"/users/self/feed"}).then(function(result){
                    console.log("instacall", result);
                    var template = $$('#feedTemplate').html();
                    var compiledTemplate = Template7.compile(template);
                    var html = compiledTemplate(result);
                    ptrContent.find('.i-media-container').html(html);
                }).fail(function(error){
                    console.error(error)
                }).always(function(){
                    iApp.pullToRefreshDone();
                });

                // Emulate 2s loading
                //setTimeout(function () {
                //    // List item html
                //    var itemHTML = '<div class="card ks-facebook-card">'+
                //        '<div class="card-header no-border">'+
                //        '<div class="ks-facebook-avatar"><img src="http://lorempixel.com/68/68/people/1/" width="34" height="34"/></div>'+
                //        '<div class="ks-facebook-name">John Doe</div>'+
                //        '<div class="ks-facebook-date">Monday at 3:47 PM</div>'+
                //        '</div>'+
                //        '<div class="card-content"> <img src="http://lorempixel.com/1000/700/nature/8/" width="100%"/></div>'+
                //        '<div class="card-footer no-border"><a href="#" class="link">Like</a><a href="#" class="link">Comment</a><a href="#" class="link">Share</a></div>'+
                //        '</div>';
                //    // Prepend new list element
                //    ptrContent.find('.i-media-container').prepend(itemHTML);
                //    // When loading done, we need to reset it
                //    iApp.pullToRefreshDone();
                //}, 1000);

                console.log(GS.getCurrentUser());
                //var feed = new Instafeed({
                //    target:"i-media-container-id",
                //    get: 'popular',
                //    userId:GS.getCurrentUser().id,
                //    clientId: "aa0529f6b6ce446386d600ff045e14a1",
                //    accessToken: GS.getToken(),
                //    template: '<a class="animation" href="{{link}}"><img src="{{image}}" /></a>'
                //});
                //feed.run();
                //iApp.pullToRefreshDone();
            });
        },
        registerTranslator:function(){
            $$(document).on('click', ".i-translatable-item", function (e) {
                var element = $$(this);
                if(element.hasClass("i-translatable-item__translated")){
                    return;
                }
                element.addClass("i-translatable-item__translating");
                console.log(element.text());
                new iTranslator().call(element.text(), "ru").then(function(request){
                    var text = request.text[0];
                    element.addClass("i-translatable-item__translated");
                    if(text !== element.text()){
                        element.parent().append("<p>"+request.text[0]+"</p>");
                    }
                }).always(function(){
                    element.removeClass("i-translatable-item__translating");
                })
            });

        }
    };
    bootstrap.initGlobals();
    bootstrap.initWelcomeScreen();
    bootstrap.initPullToRefresh();
    bootstrap.enviromentalOnload(onDeviceReady);
    bootstrap.registerTranslator();


    function onDeviceReady() {

        $$(".init-overlay-container").addClass("init-overlay-container__invisible");

        if(GS.isLogin()){
            iApp.pullToRefreshTrigger();
        }

        $$(".instagram-oauth").on("click", function(e){
            e.preventDefault();

            OAuth.initialize('vAGr3JbAXYT3Jni6MoD9OWjjK0M');
            OAuth.popup('instagram').done(function(result) {
                console.log(result);
                $$('#login p').text(result.access_token);
                GS.setToken(result.access_token);
                GS.setCurrentUser(result.user);
                iApp.closeModal('.popup-login');
                iApp.pullToRefreshTrigger();
            }).fail(function(result){
                console.log(result);
                $$('#login p').text(result.message);
            })
        });
    }



});
})();

define('app',
    ['Framework7','welcomescreen', 'utils/appFunc', 'GS', "service/TinyClient", "service/TinyTranslator", "moment"],
    function(Framework7, ws, appFunc, GS, iClient, iTranslator, moment) {

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
            moment.locale('en');
            window.moment = moment;

        },
        initDebugger: function(){

            var debug = function(){
                this.container = $$(".init-overlay-container");
            };
            debug.prototype.debug = function(message){
                this.container.append("<p>"+message+"</p>");
            };
            window.dbg = new debug();
        },
        initWelcomeScreen: function(slideId){
            var options = {
                'bgcolor': '#74baee',
                'fontcolor': '#fff',
                closeButton: false,
                pagination: false,
                'open': !GS.isLogin()
            };
            var slides = [{
                id: 'slide0',
                picture: $$('#'+slideId).html()
            }];

            var welcomescreen = iApp.welcomescreen(slides, options);
            $$('.popup-login').on('opened', function () {
                welcomescreen.close();
            });
        },
        enviromentalOnload: function(func){
            if(appFunc.isPhonegap()) {
                document.addEventListener('deviceready', func, false);
            }else{
                require(["OAuth"]);
                require(['domReady'], function (domReady) {
                    domReady(function () {
                        func();
                    });
                });
            }
        },
        initPullToRefresh: function(){
            var ptrContent = $$('.pull-to-refresh-content');
            var container = ptrContent.find('.i-media-container');

            ptrContent.on('refresh', function (e) {
                new iClient({accessToken:GS.getToken()}).call({url:container.data("url")}).then(function(result){
                    console.log("instacall", result);
                    var template = $$('#feedTemplate').html();
                    var compiledTemplate = Template7.compile(template);
                    var html = compiledTemplate(result);
                    container.html(html);
                }).fail(function(error){
                    console.error(error)
                }).always(function(){
                    iApp.pullToRefreshDone();
                });
            });
        },
        registerTranslator:function(){
            $$(document).on('click', ".i-translatable-item", function (e) {
                var element = $$(this);
                if(element.hasClass("i-translatable-item__translated") || element.hasClass("i-translatable-item__translating")){
                    return;
                }
                element.addClass("i-translatable-item__translating");

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

        },
        registerTimeOption:function(){
            $$(document).on('click', ".i-card-time", function (e) {
                var element = $$(this);
                var current = element.children(".i-card-time_option__active");
                if(!current.length){
                    return;
                }
                var candidates = element.children();
                if(!candidates.length){
                    return;
                }
                var next = current.next();
                if(!next.length){
                    next = $$(candidates[0]);
                }
                //console.log(current, next, candidates);
                next.addClass("i-card-time_option__active");
                current.removeClass("i-card-time_option__active");

            });

        },
        onDeviceReadyHandler: function(){

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
    };
        return bootstrap;

});

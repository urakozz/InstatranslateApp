/**
 * Created by yury on 14/06/15.
 */
define(['GS', 'Framework7'], function(GS, f7) {
    //var $$ = Dom7;

    /**
     * Init router, that handle page events
     */
    function init() {
        $$(document).on('pageBeforeInit', function (e) {
            var page = e.detail.page;
            console.log("pageBeforeInit", arguments);
            load(page.name, page.query);
        });


        $$(document).on('pageAfterAnimation', function (e) {
            console.log("pageAfterAnimation", arguments)
        });

        console.log("user", GS.getCurrentUser());

        //if(!GS.isLogin()){
        //    console.log("not login");
        //    mainView.router.loadPage('cards.html');
        //}else{
        //    console.log("login");
        //    mainView.router.reloadPage('index.html');
        //}

        //remove 'hidden-navbar' class
        //$$('div.navbar').removeClass('navbar-hidden');
    }

    /**
     * Load (or reload) controller from js code (another controller) - call it's init function
     * @param controllerName
     * @param query
     */
    function load(controllerName, query) {
        require([controllerName + '/'+ controllerName + 'Controller'], function(controller) {
            controller.init(query);
        });
    }

    return {
        init: init,
        load: load
    };
});
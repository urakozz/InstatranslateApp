/**
 * Created by yury on 14/06/15.
 */
define(function() {
    var $ = Dom7;

    /**
     * Init router, that handle page events
     */
    function init() {
        $(document).on('pageBeforeInit', function (e) {
            var page = e.detail.page;
            load(page.name, page.query);
        });
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
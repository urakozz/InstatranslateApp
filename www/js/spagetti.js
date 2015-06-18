/**
 * Created by yury on 16/06/15.
 */
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

window.iApp = new Framework7();
window.$$ = Dom7;
window.mainView = iApp.addView('#iApplicationMainView', {
    dynamicNavbar: true
});
$$(".init-overlay-container").addClass("init-overlay-container__invisible");
function isPhonegap() {
    return (typeof(cordova) !== 'undefined' || typeof(phonegap) !== 'undefined');
}
if(isPhonegap()) {
    document.addEventListener('deviceready', onDeviceReady, false);
}else{
    window.onload = onDeviceReady;
}

function onDeviceReady() {

    $$(".instagram-oauth").on("click", function(e){
        e.preventDefault();

        //$$('#login p').html(authUrl);
        OAuth.initialize('vAGr3JbAXYT3Jni6MoD9OWjjK0M');
        OAuth.popup('instagram').done(function(result) {
            console.log(result);
            $('#login p').text(result.access_token);
        })

    });
//    window.open = cordova ? cordova.InAppBrowser.open : window.location;
//
//    var iapi = {
//        authorize: function(options) {
//            var deferred = $.Deferred();
//            var authUrl = 'https://instagram.com/oauth/authorize/?' + $$.param({
//                    client_id: options.client_id,
//                    redirect_uri: options.redirect_uri,
//                    response_type: 'token',
//                    scope: options.scope
//                });
//
//            var authWindow = window.open(authUrl, '_blank', 'location=no,toolbar=no');
//            $(authWindow).on('loadstart', function(e) {
//                var url = e.originalEvent.url;
//
//                //if (code || error) {
//                    authWindow.close();
//                //}
//                deferred.resolve(url);
//
//                //TODO - exchange code for access token...
//            });
//            return deferred.promise();
//        }
//    };
//    var $loginStatus = $('#login p');
//    $$(".instagram-oauth").on("click", function(e){
//        e.preventDefault();
//        iapi.authorize({
//            client_id: 'aa0529f6b6ce446386d600ff045e14a1',
//            redirect_uri: 'http://localhost/code',
//            scope: 'basic'
//        }).done(function(data) {
//            $loginStatus.html('Access Token: ' + data);
//        }).fail(function(data) {
//            $loginStatus.html(data);
//        });
//    });
//}
}

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

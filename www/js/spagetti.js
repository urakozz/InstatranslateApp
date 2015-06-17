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

document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
    window.open = cordova.InAppBrowser.open;
    $$(".instagram-oauth").on("click", function(e){
        e.preventDefault();
        cordova.InAppBrowser.open('https://instagram.com', '_blank', 'location=yes');

    });
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

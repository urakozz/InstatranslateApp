/**
 * Created by yury on 16/06/15.
 */
var welcomescreen_slides = [
    {
        id: 'slide0',
        picture: '<i class="icon ion-social-instagram-outline big-icon"></i>',
        text: 'Welcome to the Instatranslate<br><a href="#" data-popup=".popup-login" class="button open-popup">Popup  </a>'
    }
];
window.iApp = new Framework7();
window.$$ = Dom7;
window.mainView = iApp.addView('#iApplicationMainView', {
    dynamicNavbar: true
});

var options = {
    'bgcolor': '#0da6ec',
    'fontcolor': '#fff',
    closeButton: false,
    pagination: false,
    'open': !localStorage.getItem('sid')
};

var welcomescreen = iApp.welcomescreen(welcomescreen_slides, options);
$$('.popup-login').on('opened', function () {
    welcomescreen.close();
});

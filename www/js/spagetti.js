/**
 * Created by yury on 16/06/15.
 */
var welcomescreen_slides = [
    {
        id: 'slide0',
        picture: '<i class="icon ion-social-instagram-outline big-icon"></i>'+
        '<div class="content-block"><div class="row"><div class="col-100"> ' +
        '<a href="#"class="button button-big open-popup" data-popup=".popup-login">' +
        'Go to the instagram and log in ' +
        '</a> </div> </div></div>',
        text:"Some text"

    }
];
window.iApp = new Framework7();
window.$$ = Dom7;
window.mainView = iApp.addView('#iApplicationMainView', {
    dynamicNavbar: true
});

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

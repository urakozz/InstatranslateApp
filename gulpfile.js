/**
 * Created by yury on 14/06/15.
 */
var exec = require('child_process').exec;
var gulp = require('gulp');
var sass = require('gulp-sass');
var less = require('gulp-less');
var concat = require('gulp-concat');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var connect = require('gulp-connect');
//var build = require('gulp-build');
var minifycss = require('gulp-minify-css');
var size      = require('gulp-size');

var assets= './bower_components/';
var paths = {
    'requirsjs': assets + 'requirejs/',
    'requirsjs_text': assets + 'requirejs-text/',
    'requirsjs_i18n': assets + 'requirejs-i18n/',
    'requirsjs_domready': assets + 'requirejs-domready/',
    'lodash': assets + 'lodash/',
    'zepto': assets + 'zepto/',
    'jquery': assets + 'jquery/dist/',
    'moment': assets + 'moment/min/',
    'reqwest': assets + 'reqwest/',
    'underscore': assets + 'underscore/',
    'oauth': assets + 'oauth-js/dist/',
    'ionic': assets + 'ionic/',
    'ionicons': assets + 'ionicons/',
    'framework7': assets + 'framework7/src/less/',
    'framework7js': assets + 'framework7/dist/js/',
    'fontAwesome': assets + 'font-awesome/'
};
var buildConfig ={
    'dist':"./www"
};

gulp.task('sass', function(done) {
    gulp.src([paths.ionicons+'scss/ionicons.scss', paths.fontAwesome+'scss/font-awesome.scss'])
        .pipe(sass({errLogToConsole: true}))
        //.pipe(sourcemaps.init())
        .pipe(concat('fonts.css'))
        //.pipe(sourcemaps.write())
        .pipe(gulp.dest(buildConfig.dist + '/build/css'))
        .on('end', done);

});
gulp.task('less', function(done) {
    gulp.src([paths.framework7 + "framework7.less"])
        .pipe(less({errLogToConsole: true}))
        .pipe(autoprefixer())
        .pipe(gulp.dest(buildConfig.dist + '/build/css'))
        .on('end', done);

});

gulp.task('fonts', function(done) {
    gulp.src([paths.fontAwesome+'fonts/*', paths.ionicons+'fonts/*'])
        .pipe(gulp.dest(buildConfig.dist+'/build/fonts'))
        .on('end', done);
});

gulp.task('js', function(done) {
    var js = [
        paths.requirsjs + "*.js",
        paths.requirsjs_text + "*.js",
        paths.requirsjs_i18n + "*.js",
        paths.requirsjs_domready + "*.js",
        paths.lodash + "lodash.js",
        paths.oauth + "oauth.js",
        paths.reqwest + "reqwest.js",
        paths.moment + "moment-with-locales.min.js",
        paths.framework7js + "framework7.js"
    ];
    js = js.concat(js.map(function(item){ return item + ".map"}));
    gulp.src(js)
        .pipe(gulp.dest(buildConfig.dist+'/build/js'))
        .on('end', done);

});


gulp.task('optimize:css', function(done){
    gulp.src(["www/css/*.css", "www/build/css/*.css"])
        .pipe(autoprefixer())
        //.pipe(minifycss({keepSpecialComments: 0}))
        .pipe(concat('_app.css'))
        .pipe(gulp.dest("www/build/"))
        .pipe(size())
        .on('end', done);
});

gulp.task('default', ['sass', 'less', 'fonts', 'js']);

gulp.task('server', function () {
    return connect.server({
        root: [ "./www" ],
        livereload: true,
        port:'3000'
    });
});

gulp.task('ios', function(){
    exec("./node_modules/.bin/phonegap run ios")
});
gulp.task('android', function(){
    exec("./node_modules/.bin/phonegap run android")
});
/**
 * Created by yury on 14/06/15.
 */
var exec = require('child_process').exec;
var gulp = require('gulp');
var sass = require('gulp-sass');
var less = require('gulp-less');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var connect = require('gulp-connect');
var gutil = require('gulp-util');
var minifycss = require('gulp-minify-css');
var size = require('gulp-size');
var rev = require('gulp-rev');
var RevAll = require('gulp-rev-all');
var replace = require('gulp-replace');

var assets = './bower_components/';
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
    'framework7': assets + 'framework7/',
    'framework7js': assets + 'framework7/dist/js/',
    'fontAwesome': assets + 'font-awesome/'
};
var target = {
    styles: "./www/styles/vendor",
    fonts: "./www/fonts",
    js: "./www/js/vendor",
    build: "./www/build"
};

gulp.task('fonts:copy', function (done) {
    gulp.src([paths.fontAwesome + 'fonts/*', paths.ionicons + 'fonts/*'])
        .pipe(gulp.dest(target.fonts + '/build/fonts'))
        .on('end', done);
});

gulp.task('styles:copy', function (done) {
    gulp.src([paths.framework7 + "dist/css/framework7.css"])
        .pipe(rename("framework7.scss"))
        .pipe(gulp.dest(target.styles+"/framework7"));
    gulp.src([paths.ionicons + "/scss/*.scss"])
        .pipe(gulp.dest(target.styles+"/ioniconic"));
    gulp.src([paths.fontAwesome + "/scss/*.scss"])
        .pipe(gulp.dest(target.styles+"/fontAwesome"))
        .on('end', done);
});

gulp.task('styles:build', ["styles:copy", "fonts:copy"], function (done) {
    gulp.src('./www/styles/app.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(gutil.env.type === 'production' ? minifycss({keepSpecialComments: 0}) : gutil.noop())
        .pipe(sourcemaps.write(".", {includeContent: false}))
        .pipe(gulp.dest(target.build))
        .on('end', done);
});

gulp.task('js', function (done) {
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
    js = js.concat(js.map(function (item) {
        return item + ".map"
    }));
    gulp.src(js)
        .pipe(gulp.dest(target.js))
        .on('end', done);

});

gulp.task('build:js', ['js'], function (done) {
    //var revAll = new RevAll();
    //return gulp.src(['assets/**'])
    //    .pipe(gulp.dest('build/assets'))
    //    .pipe(revAll.revision())
    //    .pipe(gulp.dest('build/assets'))
    //    .pipe(revAll.versionFile())
    //    .pipe(gulp.dest('build/assets'));
});

gulp.task('build',['styles:build','js'], function (done) {
    //var obj = JSON.parse(require('fs').readFileSync('www/build/', 'utf8'));
    //var link = '<link rel="stylesheet" href="/build/_app.css">';
    //gulp.src("www/index.html")
    //    //.replace(/\<\!\-\-\{CSS\}\-\-\>(.*)\<\!\-\-\{CSS\}\-\-\>/g, link)
    //    .pipe(replace(/(\<\!\-\-\{CSS\}\-\-\>)([\s\S]*)(\<\!\-\-\{CSS\}\-\-\>)/g, "$1"+link+"$3"))
    //    .pipe(gulp.dest("www"))
    //    .on('end', done);

});

gulp.task('default', ['build']);

gulp.task('server', function () {
    return connect.server({
        root: ["./www"],
        port: '3000'
    });
});

gulp.task('ios', function () {
    exec("./node_modules/.bin/phonegap run ios")
});
gulp.task('android', function () {
    exec("./node_modules/.bin/phonegap run android")
});
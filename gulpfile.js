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
var gutil = require('gulp-util');
var minifycss = require('gulp-minify-css');
var rebaseUrls = require('gulp-css-rebase-urls');
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
    'framework7': assets + 'framework7/src/less/',
    'framework7js': assets + 'framework7/dist/js/',
    'fontAwesome': assets + 'font-awesome/'
};
var buildConfig = {
    'dist': "./www"
};

gulp.task('sass', function (done) {
    gulp.src([paths.ionicons + 'scss/ionicons.scss', paths.fontAwesome + 'scss/font-awesome.scss'])
        .pipe(sass({errLogToConsole: true}))
        //.pipe(sourcemaps.init())
        .pipe(concat('fonts.css'))
        //.pipe(sourcemaps.write())
        .pipe(gulp.dest(buildConfig.dist + '/build/css'))
        .on('end', done);

});
gulp.task('less', function (done) {
    gulp.src([paths.framework7 + "framework7.less"])
        .pipe(less({errLogToConsole: true}))
        .pipe(autoprefixer())
        .pipe(gulp.dest(buildConfig.dist + '/build/css'))
        .on('end', done);

});

gulp.task('fonts', function (done) {
    gulp.src([paths.fontAwesome + 'fonts/*', paths.ionicons + 'fonts/*'])
        .pipe(gulp.dest(buildConfig.dist + '/build/fonts'))
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
        .pipe(gulp.dest(buildConfig.dist + '/build/js'))
        .on('end', done);

});


gulp.task('build:css', ['sass', 'less', 'fonts'], function (done) {
    gulp.src(["www/build/css/*.css", "www/css/*.css"])
        .pipe(autoprefixer())
        .pipe(sourcemaps.init())
        //.pipe(rebaseUrls())
        .pipe(concat('_app.css'))
        .pipe(replace(/\.\.\/fonts/g, './fonts'))
        .pipe(gutil.env.type === 'production' ? minifycss({keepSpecialComments: 0}) : gutil.noop())
        .pipe(sourcemaps.write('.',{includeContent: false}))
        .pipe(gulp.dest("www/build"))
        //.pipe(rev())
        ////.pipe(gulp.dest("www/build"))
        //.pipe(rev.manifest({
        //    //base: '/www/build',
        //    //cwd: '../',
        //    merge: true
        //}))
        //.pipe(gulp.dest("www/build"))
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

gulp.task('build',['build:css','js'], function (done) {
    //var obj = JSON.parse(require('fs').readFileSync('www/build/', 'utf8'));
    var link = '<link rel="stylesheet" href="build/_app.css">';
    gulp.src("www/index.html")
        //.replace(/\<\!\-\-\{CSS\}\-\-\>(.*)\<\!\-\-\{CSS\}\-\-\>/g, link)
        .pipe(replace(/\<\!\-\-\{CSS\}\-\-\>([\s\S]*)\<\!\-\-\{CSS\}\-\-\>/g, link))
        .pipe(gulp.dest("www"))
        .on('end', done);
});

gulp.task('default', ['sass', 'less', 'fonts', 'js']);

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
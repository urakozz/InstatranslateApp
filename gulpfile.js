/**
 * Created by yury on 14/06/15.
 */
var gulp = require('gulp');
var sass = require('gulp-sass');
var less = require('gulp-less');
var concat = require('gulp-concat');
var autoprefixer = require('gulp-autoprefixer');
//var sourcemaps = require('gulp-sourcemaps');

var assets= './bower_components/';
var paths = {
    'requirsjs': assets + 'requirejs/',
    'lodash': assets + 'lodash/',
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
        .pipe(gulp.dest(buildConfig.dist + '/css'))
        .on('end', done);

});
gulp.task('less', function(done) {
    gulp.src([paths.framework7 + "material/framework7.material.less", paths.framework7 + "ios/framework7.less"])
        .pipe(less({errLogToConsole: true}))
        .pipe(autoprefixer('last 4 version'))
        .pipe(gulp.dest(buildConfig.dist + '/css'))
        .on('end', done);

});

gulp.task('fonts', function(done) {
    gulp.src([paths.fontAwesome+'fonts/*', paths.ionicons+'fonts/*'])
        .pipe(gulp.dest(buildConfig.dist+'/fonts'))
        .on('end', done);;
});

gulp.task('js', function(done) {
    var js = [
        paths.requirsjs + "*.js",
        paths.lodash + "lodash.js",
        paths.framework7js + "framework7.js"
    ];
    gulp.src(js)
        .pipe(gulp.dest(buildConfig.dist+'/js'))
        .on('end', done);;
});

gulp.task('default', ['sass', 'less', 'fonts', 'js']);
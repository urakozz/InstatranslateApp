/**
 * Created by yury on 14/06/15.
 */
var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var autoprefixer = require('gulp-autoprefixer');
//var sourcemaps = require('gulp-sourcemaps');

var assets= './bower_components/';
var paths = {
    'jquery': assets + 'jquery/',
    'ionic': assets + 'ionic/',
    'ionicons': assets + 'ionicons/',
    'bootstrap': assets + 'vendor/bootstrap-sass/assets/',
    'fontAwesome': assets + 'font-awesome/',
    'appScripts': assets + 'js/'
};
var buildConfig ={
    'dist':"./www"
};

gulp.task('sass', function(done) {
    gulp.src([paths.ionic+'scss/ionic.scss', paths.fontAwesome+'scss/font-awesome.scss'])
        .pipe(sass({errLogToConsole: true}))
        .pipe(autoprefixer('last 4 version'))
        //.pipe(sourcemaps.init())
        .pipe(concat('compiled.css'))
        //.pipe(sourcemaps.write())
        .pipe(gulp.dest(buildConfig.dist + '/css'))
        .on('end', done);

});

gulp.task('fonts', function(done) {
    gulp.src(paths.fontAwesome+'fonts/*')
        .pipe(gulp.dest(buildConfig.dist+'/fonts'));
    gulp.src(paths.ionicons+'fonts/*')
        .pipe(gulp.dest(buildConfig.dist+'/fonts'));
});
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
    'jquery': assets + 'jquery/',
    'ionic': assets + 'ionic/',
    'ionicons': assets + 'ionicons/',
    'framework7': assets + 'framework7/src/less/',
    'fontAwesome': assets + 'font-awesome/'
};
var buildConfig ={
    'dist':"./www"
};

gulp.task('sass', function(done) {
    gulp.src([paths.ionic+'scss/ionic.scss', paths.fontAwesome+'scss/font-awesome.scss'])
        .pipe(sass({errLogToConsole: true}))
        .pipe(autoprefixer('last 4 version'))
        //.pipe(sourcemaps.init())
        //.pipe(concat('compiled.css'))
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
    gulp.src(paths.fontAwesome+'fonts/*')
        .pipe(gulp.dest(buildConfig.dist+'/fonts'));
    gulp.src(paths.ionicons+'fonts/*')
        .pipe(gulp.dest(buildConfig.dist+'/fonts'));
});

gulp.task('default', ['sass', 'less', 'fonts']);
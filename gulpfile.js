var gulp = require('gulp');
var less = require('gulp-less');
var path = require('path');
var htmlmin = require('gulp-htmlmin');
var cssmin = require('gulp-cssmin');
var jsmin = require('gulp-jsmin');
var browserSync = require('browser-sync');
var postcss = require('gulp-postcss');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('autoprefixer');
// var px2rem = require('gulp-px-to-rem');


gulp.task('default',['server']);

gulp.task('server',['htmlmin','cssmin','jsmin','img'],function(){
    browserSync.init({
        server: 'dist'
    });

    gulp.watch("src/**/*.less", ['cssmin']);
    gulp.watch("src/*.html", ['htmlmin']);
    gulp.watch('src/**/*.js', ['jsmin']);
    gulp.watch("src/img/*",['img']);
    gulp.watch("dist/**/*").on('change', browserSync.reload);
});

gulp.task('htmlmin',function(){
    gulp.src('src/*.html')
        .pipe(htmlmin())
        .pipe(gulp.dest('dist'));
});

gulp.task('jsmin',function(){
    gulp.src('src/**/*.js')
        .pipe(jsmin())
        .pipe(gulp.dest('dist'));
});

gulp.task('cssmin',function(){
    gulp.src('src/**/*.less')
        // .pipe(px2rem({accuracy:2}))
        .pipe(less())
        .pipe(sourcemaps.init())
        .pipe(postcss([ autoprefixer() ]))
        .pipe(sourcemaps.write('.'))
        .pipe(cssmin())
        .pipe(gulp.dest('dist'));
});

gulp.task('img',function(){
    gulp.src('src/images/*')
        .pipe(gulp.dest('dist/images'));
});
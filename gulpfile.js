/**
 * Args :
 * --minify (will minify CSS and JS if included)
 */
var gulp = require('gulp');
var fileInclude = require('gulp-file-include');
var del = require('del');
var args = require('yargs').argv;
var nope = require('gulp-nop');
var concat = require('gulp-concat');
var minifyCSS = require('gulp-minify-css');
var minifyJS = require('gulp-minify');
var rename = require('gulp-rename');

gulp.task('clean', function(){
    return del('dist/**', {force:true});
});

gulp.task('css-build', function() {
   return gulp.src('styles/*.css')
        .pipe(args.minify ? minifyCSS() : nope())
        .pipe(concat('style.min.css'))
        .pipe(gulp.dest('dist/css/'))
});

gulp.task('js-build', function() {
    return gulp.src('scripts/*.js')
        .pipe(args.minify ? minifyJS() : nope())
        .pipe(concat('main.min.js'))
        .pipe(gulp.dest('dist/js/'))
});

gulp.task('copy-assets', function () {
    return gulp.src('assets/**/*')
        .pipe(gulp.dest('dist/assets/'));
});

gulp.task('build-html', function () {
    return gulp.src('src/*.html')
        .pipe(fileInclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest('dist/'));
});

gulp.task('build', gulp.series('clean', 'css-build', 'js-build', 'copy-assets', 'build-html'));
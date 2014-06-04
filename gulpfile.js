var gulp = require('gulp');

var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var jshintStylish = require('jshint-stylish');
var using = require('gulp-using');

// gulp-order spectacularly failed to do anything,
// so we list files here explicitly.
var paths = {
  source_scripts: ['src/js/singleton.js',
                   'src/js/init.js',
                   'src/js/*.js']
};

gulp.task('javascript-min', ['lintjs'], function() {
  // Minify and copy all JavaScript (except vendor scripts)
  return gulp.src(paths.source_scripts)
    .pipe(concat('gis3dom.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist'))
    .pipe(gulp.dest('public/javascripts'));
});

gulp.task('javascript', ['lintjs'], function() {
  // Minify and copy all JavaScript (except vendor scripts)
  return gulp.src(paths.source_scripts)
    .pipe(concat('gis3dom.js'))
    .pipe(gulp.dest('dist'))
    .pipe(gulp.dest('public/javascripts'));
});

gulp.task('lintjs', function() {
  // Minify and copy all JavaScript (except vendor scripts)
  return gulp.src(paths.source_scripts)
    .pipe(using())
    .pipe(concat('gis3dom.js'))
    .pipe(jshint({
        "bitwise":true,
        "camelcase":true,
        "curly":true,
        "eqeqeq":true,
        "forin":true,
        "freeze":true,
        "immed":true,
        "latedef":"nofunc",
        "newcap":true,
        "noempty":true,
        "nonbsp":true,
        "nonew":true,
        "undef":true,
        "unused":true,
        // undecided on the below
        // "strict":true,
        "browser":true,
        "jquery":true
    }))
    .pipe(jshint.reporter(jshintStylish))
    .pipe(jshint.reporter('fail'));
});


// The default task (called when you run `gulp` from cli)
gulp.task('default', ['javascript', 'javascript-min']);

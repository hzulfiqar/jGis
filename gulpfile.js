var gulp = require('gulp');

var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var jshintStylish = require('jshint-stylish');

var paths = {
  source_scripts: ['src/js/**/*.js']
};

gulp.task('javascript-min', function() {
  // Minify and copy all JavaScript (except vendor scripts)
  return gulp.src(paths.source_scripts)
    .pipe(uglify())
    .pipe(concat('gis3dom.min.js'))
    .pipe(gulp.dest('dist'))
    .pipe(gulp.dest('public/javascripts'));
});

gulp.task('javascript', function() {
  // Minify and copy all JavaScript (except vendor scripts)
  return gulp.src(paths.source_scripts)
    .pipe(concat('gis3dom.js'))
    .pipe(gulp.dest('dist'))
    .pipe(gulp.dest('public/javascripts'));
});

gulp.task('lintjs', function() {
  // Minify and copy all JavaScript (except vendor scripts)
  return gulp.src(paths.source_scripts)
    .pipe(jshint())
    .pipe(jshint.reporter(jshintStylish));
});


// The default task (called when you run `gulp` from cli)
gulp.task('default', ['javascript', 'javascript-min', 'lintjs']);
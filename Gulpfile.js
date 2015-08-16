var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var concat = require('gulp-concat');
var gulp = require('gulp');
var gls = require('gulp-live-server');
var minifyCss = require('gulp-minify-css');
var nib = require('nib');
var path = require('path');
var source = require('vinyl-source-stream');
var sourcemaps = require('gulp-sourcemaps');
var stylus = require('gulp-stylus');
var uglify = require('gulp-uglify');


var PATHS = {
  BUILD: {
    CSS: path.join(__dirname, 'build', 'css'),
    JS: path.join(__dirname, 'build', 'js'),
  },
  SRC: {
    CSS: path.join(__dirname, 'src', 'public', 'css'),
    IMG: path.join(__dirname, 'src', 'public', 'img'),
    JS: path.join(__dirname, 'src', 'public', 'js'),
  },
  SERVER: path.join(__dirname, 'index.js'),
};


gulp.task('css', function() {
  return gulp
    .src(path.resolve(PATHS.SRC.CSS, '**/*.styl'))
    .pipe(stylus({
      compress: true,
      use: [
        nib()
      ]
    }))
    .pipe(concat('bundle.css'))
    .pipe(minifyCss())
    .pipe(gulp.dest(PATHS.BUILD.CSS));
});

gulp.task('js', function() {
  return browserify({
    entries: path.join(PATHS.SRC.JS, 'app.js'),
    debug: true
  }).bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({
      loadMaps: true
    }))
    .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(PATHS.BUILD.JS));
});

gulp.task('server', function() {
  var server = gls.new(PATHS.SERVER);
  server.start();
  gulp.watch(PATHS.SERVER, server.start.bind(server)); 
});

gulp.task('default', ['server']);

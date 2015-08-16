var babelify = require('babelify');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var concat = require('gulp-concat');
var gulp = require('gulp');
var gls = require('gulp-live-server');
var imagemin = require('gulp-imagemin');
var minifyCss = require('gulp-minify-css');
var nib = require('nib');
var path = require('path');
var pngquant = require('imagemin-pngquant');
var reactify = require('reactify');
var source = require('vinyl-source-stream');
var sourcemaps = require('gulp-sourcemaps');
var stylus = require('gulp-stylus');
var uglify = require('gulp-uglify');
var watch = require('gulp-watch');


var PATHS = {
  BUILD: {
    CSS: path.join(__dirname, 'build', 'static', 'css'),
    HTML: path.join(__dirname, 'build'),
    IMG: path.join(__dirname, 'build', 'static', 'img'),
    JS: path.join(__dirname, 'build', 'static', 'js'),
  },
  SRC: {
    CSS: path.join(__dirname, 'src', 'public', 'css'),
    HTML: path.join(__dirname, 'src', 'public'),
    IMG: path.join(__dirname, 'src', 'public', 'img'),
    JS: path.join(__dirname, 'src', 'public', 'js'),
  },
  SERVER: path.join(__dirname, 'index.js'),
};

var GLOBS = {
  CSS: path.resolve(PATHS.SRC.CSS, '**/*.styl'),
  HTML: path.resolve(PATHS.SRC.HTML, '**/*.html'),
  IMG: path.resolve(PATHS.SRC.IMG, '*'),
  JS: [
    path.resolve(PATHS.SRC.JS, '**/*.js'),
    path.resolve(PATHS.SRC.JS, '**/*.jsx'),
  ]
};


gulp.task('css', function() {
  return gulp
    .src(GLOBS.CSS)
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
    debug: true,
    transform: [babelify, reactify],
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

gulp.task('img', function() {
  return gulp
    .src(GLOBS.IMG)
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{
        removeViewBox: false
      }],
      use: [
        pngquant()
      ]
    }))
    .pipe(gulp.dest(PATHS.BUILD.IMG));
});

gulp.task('html', function() {
  return gulp
    .src(GLOBS.HTML)
    .pipe(gulp.dest(PATHS.BUILD.HTML));
});

gulp.task('watch', function() {
  gulp.watch(GLOBS.CSS, ['css']);
  gulp.watch(GLOBS.HTML, ['html']);
  gulp.watch(GLOBS.IMG, ['img']);
  gulp.watch(GLOBS.JS, ['js']);
});

gulp.task('server', function() {
  var server = gls.new(PATHS.SERVER);
  server.start();
  gulp.watch(PATHS.SERVER, server.start.bind(server)); 
});

gulp.task('build', ['css', 'html', 'img', 'js']);
gulp.task('default', ['build', 'server', 'watch']);

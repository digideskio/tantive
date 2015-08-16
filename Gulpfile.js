var concat = require('gulp-concat');
var gulp = require('gulp');
var gls = require('gulp-live-server');
var minifyCss = require('gulp-minify-css');
var nib = require('nib');
var path = require('path');
var stylus = require('gulp-stylus');


var PATHS = {
  BUILD: {
    CSS: path.join(__dirname, 'build', 'css')
  },
  SRC: {
    CSS: path.join(__dirname, 'src', 'public', 'css'),
    IMG: path.join(__dirname, 'src', 'public', 'img'),
    JS: path.join(__dirname, 'src', 'public', 'js'),
  },
  SERVER: path.join(__dirname, 'index.js'),
};


gulp.task('css', function() {
  gulp
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

gulp.task('server', function() {
  var server = gls.new(PATHS.SERVER);
  server.start();
  gulp.watch(PATHS.SERVER, server.start.bind(server)); 
});

gulp.task('default', ['server']);

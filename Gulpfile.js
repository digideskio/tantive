var gulp = require('gulp');
var gls = require('gulp-live-server');
var path = require('path');


var files = {
  SERVER: path.join(__dirname, 'index.js')
};

gulp.task('server', function() {
  var server = gls.new(files.SERVER);
  server.start();
  gulp.watch(files.SERVER, server.start.bind(server)); 
});

gulp.task('default', ['server']);

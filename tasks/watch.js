var gulp = require('gulp');
var plugins = require('./plugins');
var scripts = require('./scripts');

module.exports = function(opts) {
  return function() {
    var watcher = gulp.watch(opts.scripts, [
      'scripts',
      plugins.browserSync.reload
    ]);
    watcher.on('change', function(event) {
      delete scripts.cache[event.path];
    });
    gulp.watch(opts.styles, ['styles']);
  };
};
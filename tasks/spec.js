var currentTask = require('./current_task');
var gulp = require('gulp');
var plugins = require('./plugins');

module.exports = function(opts) {
  return function(callback) {
    gulp.src(opts.cover)
      .pipe(plugins.istanbul({
        includeUntested: true
      }))
      .on('finish', function() {
        global.document = plugins.jsdom.jsdom();
        global.window = global.document.parentWindow;
        global.navigator = global.window.navigator;
        gulp.src(opts.src)
          .pipe(plugins.mocha({
            reporter: process.env.TRAVIS ? 'spec' : 'nyan'
          }))
          .pipe(plugins.istanbul.writeReports({
            reporters: ['text', 'text-summary']
          }))
          .on('end', function() {
            delete global.document;
            delete global.window;
            delete global.navigator;
            var errOrNull = null;
            if (currentTask.isTest()) {
              var coverage = plugins.istanbul.summarizeCoverage();
              var incomplete = Object.keys(coverage).filter(function(key) {
                return coverage[key].pct !== 100;
              });
              if (incomplete.length > 0) {
                errOrNull = new Error(
                  'Incomplete coverage for ' + incomplete.join(', '));
              }
            }
            callback(errOrNull);
          });
      });
  };
};
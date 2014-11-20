var currentTask = require('./current_task');
var gulp = require('gulp');
var plugins = require('./plugins');

module.exports = function(opts) {
  return function() {
    return gulp.src(opts.src)
      .pipe(plugins.jshint())
      .pipe(plugins.jshint.reporter('jshint-stylish'))
      .pipe(plugins.if(currentTask.isTest(), plugins.jshint.reporter('fail')));
  };
};
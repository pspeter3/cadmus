var currentTask = require('./current_task');
var gulp = require('gulp');
var plugins = require('./plugins');

module.exports = function(opts) {
  return function() {
    return gulp.src(opts.src)
      .pipe(plugins.if(currentTask.isDev(), plugins.sourcemaps.init()))
      .pipe(plugins.sass({
        errLogToConsole: currentTask.isDev(),
        includePaths: opts.include
      }))
      .pipe(plugins.autoprefixer())
      .pipe(plugins.if(currentTask.isDev(), plugins.sourcemaps.write()))
      .pipe(gulp.dest(opts.dest))
      .pipe(plugins.if(currentTask.isDev(), plugins.browserSync.reload({
        stream: true
      })));
  };
};
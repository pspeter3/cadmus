var currentTask = require('./current_task');
var gulp = require('gulp');
var path = require('path');
var plugins = require('./plugins');

var build = module.exports = function(opts) {
  var bundler;
  var browserify = function() {
    if (!bundler) {
      bundler = plugins.browserify({
        cache: build.cache,
        debug: currentTask.isDev(),
        entries: [path.join(process.cwd(), opts.src)],
        packageCache: {}
      });
      bundler.on('dep', function(dependency) {
        build.cache[dependency.id] = dependency;
      });
    }
    return bundler;
  };
  return function() {
    return browserify()
      .bundle()
      .pipe(plugins.vinylSourceStream(opts.name))
      .pipe(gulp.dest(opts.dest));
  };
};

build.cache = {};
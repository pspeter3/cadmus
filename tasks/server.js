var plugins = require('./plugins');

module.exports = function(opts) {
  return function() {
    plugins.browserSync({
      ghostMode: false,
      server: {
        baseDir: opts.src
      }
    });
  };
};
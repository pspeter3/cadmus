var loadPlugins = require('gulp-load-plugins');

module.exports = loadPlugins({
    pattern: '{browserify,browser-sync,gulp-*,jsdom,vinyl-source-stream}',
    scope: ['devDependencies']
});
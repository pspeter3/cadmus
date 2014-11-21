var gulp = require('gulp');
var lint = require('./tasks/lint');
var scripts = require('./tasks/scripts');
var server = require('./tasks/server');
var spec = require('./tasks/spec');
var static = require('./tasks/static');
var styles = require('./tasks/styles');
var watch = require('./tasks/watch');

var config = {
  concise: 'bower_components/concise/scss',
  bundle: 'cadmus.js',
  dist: 'dist',
  gulp: 'gulpfile.js',
  root: 'index.js',
  src: 'src/**/*.js',
  static: 'static/*.html',
  styles: 'styles/**/*.scss',
  tasks: 'tasks/*.js',
  test: 'test/**/*.js'
};

gulp.task('dev', ['server', 'watch']);

gulp.task('lint', lint({
  src: [
    config.gulp,
    config.root,
    config.src,
    config.tasks,
    config.test
  ]
}));

gulp.task('scripts', ['lint'], scripts({
  dest: config.dist,
  name: config.bundle,
  src: config.root
}));

gulp.task('server', ['static'], server({
  src: config.dist
}));

gulp.task('spec', ['lint'], spec({
  cover: config.src,
  src: config.test
}));

gulp.task('static', ['scripts', 'styles'], static({
  dest: config.dist,
  src: config.static
}));

gulp.task('styles', styles({
  dest: config.dist,
  include: [
    config.concise
  ],
  src: config.styles
}));

gulp.task('test', ['spec']);

gulp.task('watch', watch({
  scripts: [config.root, config.src],
  styles: config.styles
}));
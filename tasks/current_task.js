var gulp = require('gulp');

var currentTask = module.exports = function() {
  return gulp.seq[gulp.seq.length - 1];
};

currentTask.isDev = function() {
  return currentTask() === 'dev';
};

currentTask.isTest = function() {
  return currentTask() === 'test';
};
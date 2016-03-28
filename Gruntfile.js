module.exports = function(grunt) {
  function loadConfig(path) {
    var glob = require('glob');
    var object = {};
    var key;

    glob.sync('*', {cwd: path}).forEach(function(option) {
      key = option.replace(/\.js$/, '');
      object[key] = require(path + option);
    });

    return object;
  }

  var _ = require('underscore');
  var config = {
    pkg: grunt.file.readJSON('package.json')
  };

  grunt.loadTasks('tasks');

  _.extend(config, loadConfig('./tasks/options/'));

  grunt.initConfig(config);

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browserify');

  require('load-grunt-tasks')(grunt);
};

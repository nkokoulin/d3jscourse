module.exports = function(grunt) {
  grunt.registerTask('default', ['browserify:dev', 'concat:dev_js', 'concat:dev_css', 'autoprefixer:dev']);
  grunt.registerTask('dev', ['watch']);
};

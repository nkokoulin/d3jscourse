module.exports = {
  options: {
    livereload: true
  },

  html: {
    files: ['./**/*.html', './views/*.jade', './views/**/*.jade', './views/**/**/*.jade'],
    tasks: [],
    options: {
      spawn: false
    }
  },

  css: {
    files: ['assets/css/*.css', 'assets/css/**/*.css'],
    tasks: ['autoprefixer', 'concat:dev_css'],
    options: {
      spawn: false
    }
  },

  scripts: {
    files: ['assets/js/*.js', 'assets/js/**/*.js', 'assets/js/**/**/*.js', 'assets/js/**/**/**/*.js'],
    tasks: ['browserify', 'concat:dev_js'],
    options: {
      spawn: false
    }
  }
};

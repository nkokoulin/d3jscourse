module.exports = {
  dev_js: {
    files: {
      'build/combined.js': [
        'vendors/angular/angular.js',
        'vendors/angular-animate/angular-animate.js',
        'vendors/angular-ui-router/release/angular-ui-router.js',
        'build/combined.js'
      ]
    }
  },

  dev_css: {
    files: {
      'build/combined.css': [
        'vendors/normalize-css/normalize.css',
        'build/combined.css'
      ]
    }
  }

};

module.exports = {
  dev_js: {
    files: {
      'build/combined.js': [
        'vendor/angular/angular.js',
        'build/combined.js'
      ]
    }
  },

  dev_css: {
    files: {
      'build/combined.css': [
        'vendor/normalize-css/normalize.css',
        'build/combined.css'
      ]
    }
  }

};

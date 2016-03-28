module.exports = {
  dev: {
    options: {
      map: true,
      processors: [
        require('autoprefixer')({browsers: ['last 1 version']})
      ]
    },
    src: 'assets/css/combined.css',
    dest: 'build/combined.css'
  }
};

var express = require('express');
var app     = express();
var router  = express.Router();
var path    = require('path');

app.set('view engine', 'jade');

app.use('/build', express.static(path.join(__dirname, '/build')));
app.use('/vendor', express.static(path.join(__dirname, '/vendor')));

app.get('/kit', function(req, res, next) {
  res.render('main', {
    pageTitle: 'Главная страница'
  });
});

app.use('/', router);

app.listen(8080);
console.log('server listening at post 8080');

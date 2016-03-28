var express = require('express');
var app     = express();
var router  = express.Router();
var path    = require('path');

app.set('view engine', 'jade');

app.get('/kit', function(req, res, next) {
  res.render('main', {
    pageTitle: 'Главная страница'
  });
});

app.use('/', router);

app.listen(8880);

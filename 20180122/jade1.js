var express = require('express');

var app = express();

app.set('view engine', 'pug');

app.get('/', function (req, res) {
    res.render('fang');
});

app.listen(3000);
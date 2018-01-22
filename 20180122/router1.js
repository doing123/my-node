var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: false}));

app.route('/')
.all(function (req, res, next) {
    next();
})
.get(function (req, res, next) {
    res.render('form');
})
.post(function (req, res, next) {
    console.log(req.body);
    res.send(req.body);
});

app.listen(3000);
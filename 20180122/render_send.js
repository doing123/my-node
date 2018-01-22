var express = require('express');

var app = express();
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    res.render('yuan', {list:['doing', 'test']});
});

app.get('/check', function (req, res) {
    res.send({
        'username': 'doing123'
    });
});

app.listen(3000);
var express = require('express');

var app = express();

app.set('view engine', 'ejs');

app.use(express.static('./public'));

app.get('/', function (req, res) {
    res.send('welcome to my blog.');
});

app.use('/admin', function (req, res) {

});

app.get('/member', function (req, res) {
    res.send('hello member.');
});

app.listen(3000);
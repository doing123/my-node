var express = require('express');

var app = express();

app.use('/jingtai', express.static('./static'));

app.get('/images', function (req, res) {
    res.send('images page...');
});

app.use(function (req, res) {
    res.status(404).send('找不到这个页面。。。')
});

app.listen(3000);
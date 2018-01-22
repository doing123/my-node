var express = require('express');

var app = express();

app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    console.log('get loading ...');
    res.render('form');
});

app.post('/', function (req, res) {
    console.log('post laoding ...')
    res.send('数据提交成功。')
});

app.listen(3000);

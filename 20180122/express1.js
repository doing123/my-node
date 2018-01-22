var express = require('express');

var app = express();

app.use(express.static('./static'));
// http://localhost:3000/images/animal/1.jpg
// http://localhost:3000 请求index.html

app.get('/', function (req, res) {
    res.send('hello world'); //res.end()
});

var server = app.listen('3000', '127.0.0.1', function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('3000端口启动。。。');
});
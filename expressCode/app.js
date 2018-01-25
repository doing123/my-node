/**
 * 业务模块
 */

var express = require('./index');

var app = new express();

app.use('/', function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('home page...');
});

app.use('/doing', function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('hello, welcome');
});

app.listen(3000);
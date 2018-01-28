/**
 * 业务模块
 */

var express = require('./index');

var app = new express();

// app.use('/', function (req, res) {
app.get('/', function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('home page...');
});

// app.use('/doing', function (req, res) {
app.get('/doing', function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('hello, welcome doing');
});

app.listen(3000);
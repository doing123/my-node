var express = require('express');

var app = express();

/**
 *同一路由下，
 */
// app.use('/apple', function (req, res) {
app.use('/apple', function (req, res, next) {
    console.log('apple loading ...');

    // next方法调用时会查找下一个匹配的路由
    next();
});

// express 的路由只会认第一个匹配的路由/对象
app.get('/YUan', function (req, res) {
    console.log('yuan page ...');
});

app.use('/admin', function (req, res) {
    console.log(req.originalUrl); // /admin/test
    console.log(req.baseUrl); // /admin
    console.log(req.path); // /test
});

app.listen(3000);
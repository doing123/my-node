var express = require('express');

var app = express();

// 将静态资源文件所在的目录作为参数传递给 express.static 中间件就可以提供静态资源文件的访问了。
// app.use(express.static('./static')); // 加载静态资源
// http://localhost:3000/images/animal/1.jpg
// http://localhost:3000 请求index.html

app.get('/', function (req, res) {
    res.send('hello world'); //res.end()
});

app.get('/yuan', function (req, res) {
    res.send('yuan的页面。。。')
});

app.get(/^\/student\/([\d]{10})$/, function (req, res) {
    res.send('查询的该学生学号是：' + req.params[0]); // req.params：获取参数
});

app.get('/teacher/:number', function (req, res) {
    res.send('查询的该老师的工号是：' + req.params.number);
});

var server = app.listen('3000', '127.0.0.1', function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('3000端口启动。。。');
});
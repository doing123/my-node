var koa = require('koa');

var app = new koa();

app.listen(3000, function () {
    console.log('服务器启动在3000端口。。。');
});
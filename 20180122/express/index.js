const http = require('http');

var a = 10;

//这个语句只在每次打开服务器的时候执行一次(和favicon)， 每次用户访问时，不会执行这个语句
http.createServer(function (req, res) {
    if (req.url === '/favicon.ico') {
        return;
    }
    a++;
    console.log('hello world`');
    res.end(a.toString());
}).listen('3000', '127.0.0.1', function () {
    console.log('服务器启动在3000端口。。。')
});
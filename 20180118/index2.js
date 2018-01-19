const http = require('http');
const fs = require('fs');

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html;charset=UTF-8'});
    res.end('请求结束。');
}).listen('3000', '127.0.0.1', function () {
    console.log('服务启动在3000端口...')
});
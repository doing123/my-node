const http = require('http');

var server = http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html;charset=UTF-8'});
    res.write('<h1>这是一个h1标签！</h1>');
    res.end('内容结束！');
}).listen('3000', '127.0.0.1', function () {
    console.log('服务器启动，3000端口。');
});
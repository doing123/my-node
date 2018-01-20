const http = require('http');
var fs = require('fs');

http.createServer(function (req, res) {
    if (req.url === '/favicon.ico') { // 这里误写为=，浏览器挂起一直请求状态
        return;
    }

    fs.readFile('./resource/1.txt', function (err, data) {
        if (err) {
            throw err;
        }
        console.log('开始读取文件。');
        res.write(data + '<br>');
        res.end('数据读取完毕！');
        console.log('文件读取完毕。');
    });

    res.writeHead(200, {'Content-Type': 'text/html;charset=UTF-8'});

}).listen('3000', '127.0.0.1', function () {
    console.log('服务器在3000端口启动了...');
});
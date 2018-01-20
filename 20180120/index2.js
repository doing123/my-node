const http = require('http');
const url = require('url');

var server = http.createServer(function (req, res) {
    if(req.url === '/favicon.ico'){
        return;
    }
    // http://localhost:3000/qinjunshan?query=qjs001
    res.writeHead(200, {'Content-Type': 'text/html;charset=UTF-8'});
    console.log(req.url); // /qinjunshan?query=qjs001
    console.log(url.parse(req.url).query); // 传入的URL转换为不同的模块: query=qjs001
    console.log(url.parse(req.url).query.query); // undefined

    console.log(url.parse(req.url, true).query); // true,返回的是传入的参数名称和参数值：{ query: 'qjs001' }
    console.log(url.parse(req.url, true).query.query); // qjs001
    res.end('内容结束！');
}).listen('3000', '127.0.0.1', function () {
    console.log('服务器启动，3000端口。');
});
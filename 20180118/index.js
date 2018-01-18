const http = require('http');
const url = require('url');

var server = http.createServer(function (req, res) {
    if(req.url === '/favicon.ico'){
        return;
    }
    res.writeHead(200, {'Content-Type':'text/html;charset=UTF-8'});
    // res.write('<h1>这是一个h1标签</h1>');
    console.log(req.url);
    // console.log(url.parse(req.url));
    console.log(url.parse(req.url, true));
    console.log(url.parse(req.url, true).query);
    console.log(url.parse(req.url, true).query.query);
    res.end('exercise-002');
});

server.listen('3000','127.0.0.1', function () {
    console.log('服务器在3000端口启动...')
});
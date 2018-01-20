const http = require('http');
const fs = require('fs');

http.createServer(function (req, res) {
    if(req.url === '/favicon.ico'){
        return;
    }

    fs.mkdir('./images2', function (err) {
        if(err){
            return;
        }
        res.writeHead(200, {'Content-Type': 'text/html;charset=UTF-8'});
        res.end('创建文件夹images完毕！');
    });

}).listen('3000', '127.0.0.1', function () {
    console.log('服务器启动，3000端口。。。')
});
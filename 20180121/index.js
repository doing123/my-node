const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');

http.createServer(function (req, res) {
    if (req.url === '/favicon.ico') {
        return;
    }

    // req.url:获取请求地址
    var pathname = url.parse(req.url).pathname;

    // 判断请求的是文件还是文件夹
    if (req.url.indexOf('.') === -1) {
        pathname += '/index.html'
    }

    /**
     * linux和window的路径请求不一致
     * path.normalize() 方法会规范化给定的 path，并解析 '..' 和 '.' 片段。
     *
     * path.extname() 方法返回 path 的扩展名，即从 path 的最后一部分中的最后一个 .（句号）字符到字符串结束。 如果 path 的最后一部分没有 . 或 path 的文件名（见 path.basename()）的第一个字符是 .，则返回一个空字符串。
     */
    var fileUrl = './' + path.normalize('./static/' + pathname);

    var extname = path.extname(pathname); // 获取文件后缀名

    console.log(extname);
    console.log(pathname);

    fs.readFile(fileUrl, function (err, data) {
        if(err){
            fs.readFile('./static/404.html', function (err, self) {
                res.writeHead(404, {'Content-Type': 'text/html;charset=UTF-8'});
                res.end(self);
            });
        }
        // 写死了类型，所以加载的所有资源都不能认识
        getMime(extname, function (mime) {
            res.writeHead(200, {'Content-Type': mime});
            res.end(data);
        });
    });


}).listen('3000', '127.0.0.1', function () {
    console.log('服务器在3000端口启动了。。。')
});

function getMime(extname, callback) {
    fs.readFile('./mime.json', function (err, data) {
        if(err){
            throw Error('找不到需要的mime.json文件')
        }

        var mimeJSON = JSON.parse(data);
        var mime = mimeJSON[extname];
        callback(mime);
    });
    /*switch (extname){
        case '.html':
            return 'text/html';
            break;
        case '.jpg':
            return 'image/jpg';
            break;
        case '.css':
            return 'text/css';
            break;
    }*/
}
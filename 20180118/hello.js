/*
* 服务模块
* 打开服务
* */

var http = require('http');
var fs = require('fs'); // 文件模块

/**
 * 创建服务器
 * node没有web容器的概念,
 * http://localhost:3000/doing: 不会发生任何报错，也不会有任何区别，都是响应同一个页面
 */
var server = http.createServer(function (request, response) {
    if(request.url === '/home'){
        /**
         * 读取文件函数：文件路径及名称，回调函数
         * 回调函数参数：err:错误信息， data:读取的数据、内容
         */
        fs.readFile('index.html', function (err, data) {
            response.writeHead(200, {'Content-Type': 'text/html;charset=UTF-8'});
            console.log('服务器启动了...');
            console.log('服务器接收到的请求地址为：' + request.url);
            response.end(data);
        });
    } else if(request.url === '/index.css'){
        /**
         * 注意：目录前面加./（从当前目录开始）
         * Linux环境下识别时必须加./
         */
        fs.readFile('./resource/index.css', function (err, data) {
            response.writeHead(200, {'Content-Type': 'text/css;charset=UTF-8'});
            console.log('服务器启动了...');
            console.log('服务器接收到的请求地址为：' + request.url);
            response.end(data);
        });
    } else if(request.url === '/detail'){
        response.writeHead(200, {'Content-Type': 'text/html;charset=UTF-8'});
        console.log('服务器启动了...');
        console.log('服务器接收到的请求地址为：' + request.url);
        response.end('detail');
    } else if(request.url === '/favicon.ico'){
       response.end();
    } else{
        response.writeHead(400, {'Content-Type': 'text/html;charset=UTF-8'});
        console.log('服务器启动了...');
        console.log('服务器接收到的请求地址为：' + request.url);
        response.end('页面不存在。。。');
    }


    /**
     * 浏览器刷新两次
     * 一次是正常启动，一次是小图标（favicon.icon）
     */
});

server.listen(3000, '127.0.0.1', function () {
    console.log('服务器已经在3000端口启动...')
}); // 参数：端口号，地址
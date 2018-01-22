const http = require('http');
const queryString = require('querystring');

http.createServer(function (req, res) {
    if(req.url === '/favicon.ico'){
        return;
    }
    console.log(req.method);
    if(req.url === '/dopost' && req.method.toLowerCase() === 'post'){
        // post请求接收公式，这里只接收了一小段，防止一个过大的请求处理阻塞了进程

        var  allData = '';
        // 传输中
        req.addListener('data', function (chunk) { // 分段数据
            allData += chunk;
        });

        /**
         * addListener：是Node的方法，不是原生的JS和V8的
         *
         * 传输数据是以流的形式传送的，buffer传送的
         * buffer下面的底层传输是以二进制
         */
        // 传输完毕
        req.addListener('end', function () {
            var dataString = allData.toString();
            res.end('success');
            // 将dataString转换为一个对象
            console.log('转换前' + dataString);
            var dataObj = queryString.parse(dataString);
            console.log(dataObj);
            console.log('name:' + dataObj.username);
        });
    }
}).listen('3000', '127.0.0.1', function () {
    console.log('服务器启动在3000端口。。。')
});
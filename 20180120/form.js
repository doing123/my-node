const http = require('http');
const url = require('url');

var server = http.createServer(function (req, res) {
    if(req.url === '/favicon.ico'){
        return;
    }
    /**
     * 由于获取的是请求中的URL，而post请求的参数不会出现在URL中，所以获取的时候为undefined
     * URL模块只是负责获取，依赖的对象还是req.url
     */
    res.writeHead(200, {'Content-Type': 'text/html;charset=UTF-8'});
    var pathname = url.parse(req.url, true).query;
    var userName = pathname.userName;
    var password = pathname.password;
    var sex = pathname.sex;
    res.end('表单提交的数据为：用户名[' + userName + '],密码：[' + password + '],性别：[' + sex + ']');
}).listen('3000', '127.0.0.1', function () {
    console.log('服务器已启动在3000 端口。。。');
});
var express = require('express');
var fs = require('fs');

var app = express();

/**
 * app.use 制作静态资源服务
 */
app.use(yuan);

function yuan(req, res, next) {
    // 加载static下的静态资源
    // 获取请求路径
    var filePath = req.originalUrl;

    /**
     * 所有的文件读取都是异步的，只要return，都需要函数回调
     * 访问的是： images/1.jpg
     * 实际上访问的是： static/images/1.jpg
     */
    fs.readFile('./static' + filePath, function (err, data) {
        if (err) {
            next();
            return;
        } else {
            // res.send(data.toString());
            res.send(data);
        }
    });
}

app.listen(3000);
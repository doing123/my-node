var express = require('express');

var app = express();

app.get('/', function (req, res) {
    // 获取get请求后面的参数，？后的字符
    console.log(req.query);
    res.send(req.query.name);
});

app.listen(3000);
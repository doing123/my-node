/**
 * cookie
 * @type {*|createApplication}
 */
var express = require('express');
var cookieParser = require('cookie-parser');
var app = express();
var util = require('util');

// 使用cookie必须使用cookie-parser
app.use(cookieParser());
app.get('/', function (req, res) {
    res.send('欢迎光临' + req.cookies.username);
});

app.get('/login', function (req, res) {
    var username = req.query.username;
    /**
     * maxAge:设置cookie过期时间
     * httpOnly：防止XSS攻击，只能被web server 访问，Boolean类型
     */
    res.cookie('username', username, {maxAge:99999, httpOnly: true});
    console.log(req.cookies.username);
    res.send('登陆成功。');
});

app.listen(3000);

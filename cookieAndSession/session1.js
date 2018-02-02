var express = require('express');
var app = express();
var session = require('express-session');

app.use(session({
    secret: 'jia mi', // 应用在https
    resave: false, // 每次请求都重新设置session
    saveUninitialized: true // 无论有无session，每次请求都设置一个session
}));

app.get('/', function (req, res) {
    res.send('欢迎光临：' + req.session.username);
});

app.get('/login', function (req, res) {
    req.session.username = 'doing123';
    res.send('登陆成功！');
});

app.listen(3000, function () {
    console.log('服务器启动在3000端口...');
});


var express = require('express');

var app = express();

// 设置模板引擎
app.set('view engine', 'ejs');

// 静态资源文件
app.use(express.static('./public'));

var db = require('./config/db.js');

// 验证环境
/*app.get('/', function (req, res) {
    res.send('welcome to my blog.');
});*/

// 后台管理
app.use('/admin', require('./router/admin'));

// 会员管理
app.get('/member', function (req, res) {
    res.send('hello member.');
});

app.listen(3000);
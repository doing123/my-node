var express = require('express');

var app = express();

var bodyParser = require('body-parser');

// 设置模板引擎
app.set('view engine', 'ejs');

// body-parser会影响formidable的使用
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));

// parse application/json
app.use(bodyParser.json());

// 静态资源文件
app.use(express.static('./public'));

var db = require('./config/db.js');

var session = require('express-session');
app.use(session({
    secret: 'keyboard cat', // 应用在HTTPS
    resave: false, // 每次请求都重新设置session
    saveUninitialized: true, // 无论有无session，每次都请求设置一个session
    cookie: {maxAge: 60 * 30 * 1000} // 过期时间，ms
}));

// 验证环境
/*app.get('/', function (req, res) {
    res.send('welcome to my blog.');
});*/

// 后台管理
app.use('/admin', require('./router/admin'));

app.use(require('./router/users/users.js'));

// 会员管理
app.get('/member', function (req, res) {
    res.send('hello member.');
});

app.use(require('./router/frontend/index.js'));

app.listen(3000);
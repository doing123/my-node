/**
 * app.js: 入口文件
 * controller：控制台
 * views：资源文件（jade、ejs）
 * models：处理业务逻辑
 * uploads：上传目录的文件夹
 * public：公共资源文件
 * node_modules：模块依赖文件夹
 *
 * 职责化：
 * controller：只负责方法的罗列
 * models：负责业务逻辑的实现
 * app.js：入口文件
 * views：html静态资源
 */

/**
 * module.exports 初始值为一个空对象 {}
 * exports 是指向的 module.exports 的引用
 * require() 返回的是 module.exports 而不是 exports
 */

var express = require('express');
var router = require('./controller/route');

var app = express();

app.set('view engine', 'ejs');

// 存放静态文件的目录名不会出现在 URL 中,app.use() 后面有多少都可以获取到
app.use(express.static('./public'));
app.use(express.static('./uploads'));

app.get('/', router.showIndex);

/**
 * 如animal中有index.html文件，会访问index.html
 */
app.get('/:photoName', router.showPhoto);

// 被/:photoName劫持了
app.get('/up', router.showUp);
app.post('/up', router.doPost);

app.use(function (req, res) {
    res.render('error'); // error.ejs
});

app.listen(3000, function () {
    console.log('服务器启动在3000端口...');
});

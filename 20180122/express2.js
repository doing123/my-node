var express = require('express');

var app = express();

/**
 * 原生node：通过require('ejs')获取
 * 设置视图引擎，设置视图类型为：ejs
 */
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    /**
     * 渲染EJS用render方法
     * yuan: 表示文件名，由于设置视图引擎时已经告诉他是ejs类型，所以无需指定后缀，默认为ejs后缀
     * 默认是views文件夹，所以无需设置文件夹路径
     */
    res.render('yuan', {
        'list': ['doing', 'doing123', 'doing456']
    });
});

app.listen(3000);
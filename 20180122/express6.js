var express = require('express');

var app = express();

/**
 * 中间件（Middleware） 是一个函数，它可以访问请求对象（request object (req)）,
 *   响应对象（response object (res)）,
 *   和 web 应用中处于请求-响应循环流程中的中间件，一般被命名为 next 的变量。
 * 一般中间件的参数为3个：req,res, next
 */
app.get('/:username/:id', function (req, res, next) {
    var username = req.params.username;
    /**
     * 允许注册的名字不能包含一些特殊的名字：如admin
     * 用户必须存在，则进入判断，否则next：表示进入下一个路由判断
     */

    var userInfo = {'doing': '123', 'test': '456', 'admin': 'admin001'};

    if(userInfo[username]){
        res.send('用户信息： ' + username);
    } else {
        /**
         * 如果带不带参数调用（如next()）则会传递给下一个普通中间件；
         * 如果带参数调用（如next(err)）则会传递给下一个错误处理中间件。
         */
        next();
    }
});

app.get('/username/:id', function (req, res) {
    res.send('again...');
});

app.get('/admin/login', function (req, res) {
    res.send('管理员登录。。。')
});

app.listen(3000);
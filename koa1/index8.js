var koa = require('koa');
var app = new koa();
var route = require('koa-route');

var login = function (ctx) {
    ctx.response.body = 'hello --';
};

var users = function (ctx) {
    // 重定向
    ctx.response.redirect('/login');
    /**
     * redirect后面的ctx.response不会执行
     */
    console.log('hello login...');
    ctx.response.body = 'users page...';
};

app.use(route.get('/login', login));

app.use(route.get('/users', users));

app.listen(3000);
var koa = require('koa');
var app = new koa();
var route = require('koa-route');

var logger = function (ctx, next) {
    console.log(new Date() + '--' + ctx.request.method + '--' + ctx.request.url);
    next(); // next执行完之后会执行下面的代码，重新渲染页面
    ctx.response.body = 'hello';
    // next();
};

var main = function (ctx, next) {
    ctx.response.body = 'world...';
};

app.use(logger);
app.use(main);

app.listen(3000);

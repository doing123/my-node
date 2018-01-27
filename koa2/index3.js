var koa = require('koa');
var app = new koa();

var main = function (ctx) {
    // ctx.throw(500);
    ctx.response.status = 404;
    ctx.response.body = 'not found...';
};

app.use(main);

app.listen(3000);

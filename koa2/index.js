var koa = require('koa');
var app = new koa();

var main = function (ctx) {
    ctx.response.type = 'html';
    ctx.response.body = 'hhhhhh';
}

app.use(main);

app.listen(3000);
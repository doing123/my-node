var koa = require('koa');
var app = new koa();
var koaBody = require('koa-body');

var main = async function (ctx) {
    var body = ctx.request.body;
    ctx.response.body = '名字：' + body.name + ',年龄：' + body.age;
}

app.use(koaBody());
app.use(main);

app.listen(3000);

var koa = require('koa');
var app = new koa();
var util = require('util');

/**
 * 回调
 * @param ctx：一次会话的上下文，包含req 和 res
 */
var main = function (ctx) {
    console.log(util.inspect(ctx));
    ctx.response.body = 'Hello world...';
};

app.use(main);

app.listen(3000);

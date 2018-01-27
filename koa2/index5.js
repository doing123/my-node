var koa = require('koa');
var app = new koa();

var main = async function (ctx, next) {
    try { // 正确的代码
        await next(); // throw是抛出异常的
    } catch (err){// 出现异常时的代码
        ctx.response.status = err.statusCode || err.status || 500;
        ctx.response.body = {
            message: err.message
        }
    }
};

var errInfo = function (ctx) {
    ctx.throw(500); // 模拟错误，当出现错误的时候
};

app.use(main);
app.use(errInfo);

app.listen(3000);

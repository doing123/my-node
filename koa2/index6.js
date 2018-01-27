var koa = require('koa');
var app = new koa();
var util = require('util');

var main = async function (ctx, next) {
    try{
        await next();
    } catch(err){
        ctx.response.status = err.statusCode || err.status || 500;
        ctx.response.body = {
            message: err.message
        };
        // ctx.app.emit('error', err, ctx); // 触发error事件
    }
};

var errInfo = function (ctx) {
    ctx.throw(500);
}

// 监听当前所有的业务逻辑
app.on('error', function (err, ctx) {
    // console.log(util.inspect(ctx));
    // ctx.response.body = '出错了';
    console.error('server error', err);
});

app.use(main);
app.use(errInfo);

app.listen(3000);

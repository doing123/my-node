var koa = require('koa');
var app = new koa();

var one = function (ctx, next) {
    console.log('one1');
    next(); // 把执行权交给下一个中间件
    console.log('one2');
};

var two = function (ctx, next) {
    console.log('two1');
    next(); // 把执行权交给下一个中间件
    console.log('two2');
};

var three = function (ctx, next) {
    console.log('three1');
    next(); // 把执行权交给下一个中间件
    console.log('three2');
};

/**
 * 出入栈：先进后出
 */

app.use(one);
app.use(two);
app.use(three);

app.listen(3000);
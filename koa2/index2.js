var koa = require('koa');
var fs = require('fs');
var compose = require('koa-compose');

/**
 * 合并对象
 */

var app = new koa();

var logger = function (ctx, next) {
    console.log(Date.now());
    next();
};

var main = function (ctx, next) {
    ctx.response.body = 'hello world...';
};

var middleWares = compose([logger, main]);

app.use(middleWares);

app.listen(3000);

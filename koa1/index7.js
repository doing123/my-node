var koa = require('koa');
var app = new koa();
var path = require('path');
var koaStatic = require('koa-static');

/**
 * 静态资源
 */
var main = koaStatic(path.join(__dirname));

app.use(main);

app.listen(3000);
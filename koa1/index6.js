var koa = require('koa');
var app = new koa();
var route = require('koa-route');

var home = function (ctx) {
    ctx.response.type = 'html';
    ctx.response.body = 'welcome to home...';
};

var otherPage = function (ctx) {
    // 默认是text/plain文本类型
    ctx.response.body = 'hello otherPage';
};

app.use(route.get('/', home));
app.use(route.get('/other', otherPage));

// 默认是localhost（127.0.0.1）
app.listen(3000);

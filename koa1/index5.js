
var koa = require('koa');
var app = new koa();

var main = function (ctx) {
    ctx.response.type = 'html';
    if(ctx.request.path === '/'){
        ctx.response.body = 'welcome to homepage';
    } else {
        ctx.response.body = '<a href="/">to homepage</a>'
    }
};

app.use(main);

app.listen(3000);
var koa = require('koa');
var app = new koa();

var main = function (ctx) {
    /**
     * 设置文本类型
     * @type {string} : html/xml/json
     */
    /*ctx.response.type = 'html';
    ctx.response.body = '<p>hello hhahah</p>';*/

    ctx.response.type = 'json';
    ctx.response.body = {test: 'hello'};
};

app.use(main);

app.listen(3000);
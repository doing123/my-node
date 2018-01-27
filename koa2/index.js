var koa = require('koa');
var fs = require('fs');

var app = new koa();

var main = async function (ctx) {
    ctx.response.type = 'html';
    /**
     * 传统的Ajax有回调地狱的风险
     * async 和 await 是一个异步的解决方案
     * promise、Generator、async和await
     */
    await fs.readFile('./template.html', 'utf8', function (err, data) {
        // data有返回值，赋值没成功
        console.log(data);
        ctx.response.body = data;
    });
};

app.use(main);

app.listen(3000);

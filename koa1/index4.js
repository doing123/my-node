/**
 * 网页模板
 */
var koa = require('koa');
var app = new koa();
var fs = require('fs');

var main = function (ctx) {
    ctx.response.type = 'html';
    /*fs.readFile('./template.html', function (err, data) {
        ctx.response.body = data;
    });*/

    ctx.response.body = fs.createReadStream('./template.html');
};

app.use(main);

app.listen(3000);
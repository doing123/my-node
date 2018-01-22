var ejs = require('ejs');
var http = require('http');
var fs = require('fs');

http.createServer(function (req, res) {
    if (req.url === '/favicon.ico') {
        return;
    }

    fs.readFile('./views/index.ejs', function (err, data) {
        if (err) {
            throw err;
        }
        var template = data.toString();
        var data = {
            num: 1,
            list: [
                {
                    name: 'doing',
                    age: 18
                },
                {
                    name: 'doing2',
                    age: 182
                },
                {
                    name: 'doing3',
                    age: 183
                }
            ]
        };

        var html = ejs.render(template, data);
        res.writeHead(200, {'Content-Type': 'text/html;charset=UTF-8'});
        res.end(html);

    })
}).listen('3000', '127.0.0.1', function () {
    console.log('服务器启动在3000端口。。。')
});
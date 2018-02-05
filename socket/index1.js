var http = require('http');
var fs = require('fs');

var server = http.createServer(function (req, res) {
    if(req.url === '/'){
        fs.readFile('./index.html', function (err, data) {
            res.end(data);
        });
    }
});

var io = require('socket.io')(server);

io.on('connection', function (socket) {
    console.log('有一个客户端连接成功了');
    socket.on('question', function (msg) {
        console.log('客户端问：' + msg);
        io.emit('answer', '服务器回答了：你好');
    });
});

server.listen(3000);

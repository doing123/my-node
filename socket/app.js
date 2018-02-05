var express = require('express');
var app = express();

var server = require('http').Server(app);
var io = require('socket.io')(server);

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index1.html');
});

app.get('/one', function (req, res) {
    res.sendFile(__dirname + '/one.html');
});

io.on('connection', function (socket) {
    console.log('一个连接');
    socket.on('chatroom', function (msg) {
        io.emit('chatroom', msg);
    });

});

server.listen(3000);


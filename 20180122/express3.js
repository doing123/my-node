var express = require('express');

var app = express();

/**
 * 无视大小写
 */
app.get('/YuaN', function (req, res) {
    res.send('yuan page loading ...')
});

app.get('/student/:id', function (req, res) {
    var id = req.params['id'];
    var reg = /^[\d]{6}$/;
    if (reg.test(id)) {
        res.send(req.params['id']);
    } else {
        res.send('访问的地址不存在。。。')
    }
});

app.get('/:username/:oid', function (req, res) {
    var username = req.params['username'];
    var oid = req.params['oid'];
    res.send('username: ' + username + '-- oid:' + oid);
});

app.listen(3000, function () {
    console.log('服务器启动在3000端口。。。');
});
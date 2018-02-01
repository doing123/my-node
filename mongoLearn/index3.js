/**
 * DAO: Data access object
 * 访问数据库的一个对象
 * @type {*|createApplication}
 */
var express = require('express');
var app = express();
var db = require('./modles/db.js');

app.get('/add', function (req, res) {
    var arr = ['小红', '小李', '小春', '小刘'];
    db.insertOne('school', {'name': arr[parseInt(Math.random() * 4)]}, function (err, result) {
        if (err) {
            console.log('插入数据失败');
            return;
        }
        res.send('插入成功');
    });
});

// 删除数据
app.get('/delete', function (req, res) {
    var id = req.query.name; // 参数
    console.log(id);
    db.deleteMany('school', {'name': id}, function (err, result) {
        if (err) {
            console.log(err);
            return;
        }
        res.send(result);
    });
});

// 更新数据
app.get('/update', function (req, res) {
    var userName = req.query.name;
    var updateName = req.query.updateName;
    // 凡是用户输入的数据必须校验
    db.updateMany('school', {'name': userName}, {$set: {'name': updateName}}, function (err, result) {
        if (err) {
            console.log(err);
            return;
        }
        res.send(result);
    });
});

// 获得所有数据
app.get('/getAll', function (req, res) {
    db.getAllCount('school', function (acount) {
        console.log(acount);
        res.send(acount.toString()); // 不能传入数字
    });
});

app.listen(3000, function () {
    console.log('服务器启动在3000端口...');
});


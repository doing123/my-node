var MongoClient = require('mongodb').MongoClient;
var express = require('express');

var app = express();

/**
 * url + 端口号 + 数据库名字
 * 27017是mongodb默认端口
 * 不管是什么数据库都会有一个：连接/启动、查询、关闭的过程
 */
var dbName = 'mongodb://localhost:27017/doing';


app.get('/', function (req, res) {
    MongoClient.connect(dbName, function (err, db) {
        // 此时表示已经连接上数据库
        if(err){
            res.send('数据库连接失败');
            return;
        }
        res.write('数据库连接成功！');

        // 集合不存在则创建
        db.collection('bbs').insertOne({'name':'xiuxingxueyuan'}, function (err, data) {
            if(err){
                res.send('数据库写入失败');
                return;
            }
            res.write('数据库插入成功！');
            res.end();

            res.close(); // 一定关闭连接
        })
    });
});

app.listen(3000);
var MongoClient = require('mongodb').MongoClient;
var express = require('express');

var app = express();

app.set('view engine', 'ejs');

/**
 * url + 端口号 + 数据库名字
 * 27017是mongodb默认端口
 * 不管是什么数据库都会有一个：连接/启动、查询、关闭的过程
 */
var dbName = 'mongodb://localhost:27017/student';

app.get('/add', function (req, res) {
    res.render('add');
});

// 处理表单提交请求
app.get('/manage', function (req, res) {
    // 得到相应参数
    var name = req.query.name;
    var age = req.query.age;
    var sex = req.query.sex;
    MongoClient.connect(dbName, function (err, db) {
        if (err) {
            res.send('数据库连接失败。');
            return;
        }
        res.writeHead(200, {'Content-Type': 'text/html;charset=UTF-8'});
        res.write('恭喜，已经连接数据库。');
        // 集合不存在则创建
        db.collection('userInfo').insertOne({
            'name': name,
            'age': age,
            'sex': sex
        }, function (err, result) {
            if (err) {
                res.send('数据库写入失败');
                return;
            }
            res.write('数据库成功插入。');
            res.end();

            db.close();
        });
    });
});

app.get('/', function (req, res) {
    MongoClient.connect(dbName, function (err, db) {
        // 此时表示已经连接上数据库
        if (err) {
            res.send('数据库连接失败');
            return;
        }
        // 集合不存在则创建
        /**
         * mongodb依赖3.0的不存在db.collection，使用^2.2.33
         */
        var result = [];
        var cursor = db.collection('userInfo').find();
        cursor.each(function (err, doc) {
            if (err) {
                return;
            }
            if (doc !== null) {
                result.push(doc);
            } else {
                db.close();
                res.render('index', {'result': result});
            }
        });
    });
});

app.listen(3000);
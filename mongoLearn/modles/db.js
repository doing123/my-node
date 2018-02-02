/**
 * 该模块封装所有对数据库的常用操作
 */

var MongoClient = require('mongodb').MongoClient;
var setting = require('../setting.js');

function _connectDB(callback) {
    var url = setting.dbUrl;
    MongoClient.connect(url, function (err, db) { // 异步操作
        if(err){
            // 出错时没有db
            callback(err, null);
            return;
        }
        callback(err, db);
    });
}

// 插入数据
exports.insertOne = function (collectionName, json, callback) {
    _connectDB(function (err, db) {
        // 已经连接上数据库，执行插入数据操作
        db.collection(collectionName).insertOne(json, function (err, result) {
            callback(err, result);
            db.close();
        });
    });
};

// 删除数据
exports.deleteMany = function (collectionName, json, callback) {
    _connectDB(function (err, db) {
        db.collection(collectionName).deleteMany(json, function (err, result) {
            callback(err, result);
            db.close();
        });
    });
};

// 修改
exports.updateMany = function (collectionName, updateName, json, callback) {
    _connectDB(function (err, db) {
        db.collection(collectionName).updateMany(updateName, json, function (err, result) {
            callback(err, result);
            db.close();
        });
    });
};

exports.getAllCount = function (collectionName, callback) {
    _connectDB(function (err, db) {
        db.collection(collectionName).count({}).then(function (count) {
            callback(count);
            db.close();
        });
    });
};

exports.find = function (collectionName, args, callback) {
    var page = args.page || 1;
    var pageamount = args.pageamount || 5;
    var skipNum = pageamount * (args.page - 1) || 0; // 需过滤的条数
    var sort = args.sort || {};

    console.log('--' + skipNum + '==' + page + '--' + pageamount);

    _connectDB(function (err, db) {
        var results = [];

        var cursor = db.collection(collectionName).find().skip(skipNum).limit(pageamount).sort(sort);
        cursor.each(function (err, doc) {
            if(err){
                callback(err, null);
                db.close();
                return;
            }
            if(doc !== null){
                results.push(doc);
            } else { // doc为空时就是遍历完成时
                callback(null, results);
                db.close();
            }
        });
    });
};



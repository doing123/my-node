var mongoose = require('mongoose');

var db = mongoose.createConnection('mongodb://localhost:27017/nodedb');

// 监听数据库打开事件
db.once('open', function () {
    console.log('数据库连接成功')
});

module.exports = db;

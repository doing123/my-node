var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/school');

var db = mongoose.connection;

db.once('open', function () {
    console.log('数据库连接成功');
});

exports = module.exports = db;
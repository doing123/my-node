var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/blogMgmt');

var db = mongoose.connection;

db.once('open', function () {
    console.log('数据库打开...');
});

exports = module.exports = db;
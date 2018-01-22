
var file = require('../models/files');

exports.showIndex = function (req, res, next) {
    // 读取所有文件
    var allFolder = file.getAllAlbums();
    res.render('index', {
        allAlbums: allFolder
    });
};

var file = require('../models/files.js');

exports.showIndex = function (req, res, next) {
    // 读取所有文件
    file.getAllAlbums(function (allFolder) {
        res.render('index', {
            allAlbums: allFolder
        });
    });
};

exports.showPhoto = function (req, res, next) {
    // 获取点击的是哪个相册
    var photoName = req.params.photoName;
    console.log(photoName);
    file.getAllImagesByPhotoName(photoName, function (err, imagesArr) {
        if(err){
            next(); // 交给下面的中间件处理
            return;
        }
        res.render('photo', {
            'photoName': photoName,
            'images': imagesArr
        });
    });
};
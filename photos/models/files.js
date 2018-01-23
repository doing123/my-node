var fs = require('fs');

exports.getAllAlbums = function (callback) {
    // 读取文件/文件夹时是异步的
    fs.readdir('./uploads', function (err, files) {
        if (err) {
            throw err;
            return;
        }
        var allAlbums = [];
        (function iterator(i) { // 形参
            if (i === files.length) {
                callback(allAlbums);
                return;
            }
            fs.stat('./uploads/' + files[i], function (err, stats) {
                if (err) {
                    throw err;
                }
                if (stats.isDirectory()) {
                    allAlbums.push(files[i]);
                }
                iterator(i + 1);
            });
        })(0);
    });
};

exports.getAllImagesByPhotoName = function (photoName, callback) {
    fs.readdir('./uploads/' + photoName, function (err, files) {
        if(err){
            callback('没有找到uploads文件', null);
            return;
        }

        var allImagesArr = [];
        (function iterator(i) {
            if(i === files.length){
                // 遍历结束
                callback(null, allImagesArr);
                return; // 除了报错所有的一定加上
            }

            // uploads/ 当前点击的’相册文件夹‘/相册文件
            fs.stat('./uploads/' + photoName + '/' + files[i], function (err, stats) {
                if(err){
                    callback('找不到文件' + files[i], null);
                    return;
                }

                // 判断是文件
                if(stats.isFile()){
                    allImagesArr.push(files[i]);
                }
                iterator(i+1);
            });
        })(0);
    });
};

var file = require('../models/files.js');
var formidable = require('formidable'); // 处理表单数据
var path = require('path');
var fs = require('fs');
var sd = require('silly-datetime'); // 处理事件格式
var util = require('util');

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
            /**
             * 交给下面的中间件处理
             * app.get('/up', router.showUp);
             */
            next();
            return;
        }
        res.render('photo', {
            'photoName': photoName,
            'images': imagesArr
        });
    });
};

exports.showUp = function (req, res) {
    // 读取所有相册文件
    file.getAllAlbums(function (allFolder) {
        res.render('up', {
            allAlbums: allFolder
        });
    });
};

exports.doPost = function (req, res) {
    var form = new formidable.IncomingForm();
    /**
     * 在parse之前设置上传路径，此时可能没有接收到请求
     *
     * 解决方案：
     * 先设置一个默认目录，然后等接收到表单数据后，再转移到表单数据中的指定的目录
     */
    form.uploadDir = path.normalize(__dirname + '/../tempup/');

    // 当到parse的时候，就已经接收到请求了
    form.parse(req, function (err, fields, files, next) {
        /**
         * { fields: { folderName: 'test' },
              files:
               { uploadfile:
                  File {
                    domain: null,
                    _events: {},
                    _eventsCount: 0,
                    _maxListeners: undefined,
                    size: 197307,
                    path: 'F:\\GitHub\\my-node\\photos\\tempup\\upload_e5a1df3484df55c21a92d87fca974da2',
                    name: '10.jpg',
                    type: 'image/jpeg',
                    hash: null,
                    lastModifiedDate: 2018-01-24T13:54:30.225Z,
                    _writeStream: [Object] } } }
         */
        // res.end(util.inspe ct({fields: fields, files: files}));
        // return;
        // 不能在parse里面设置上传路径
        if(err){
            next();
            return;
        }
        var size = parseInt(files.uploadfile.size / 1024); // 上传图片的大小

        if(size > 2000){
            res.send('图片太大，不应该大于1M'); // 此时图片已经上传
            fs.unlink(file.uploadfile.path); // 删除已经上传的文件
            return;
        }

        // 图片重命名
        var newdate = sd.format(new Date(), 'YYYYMMDDHHmmss');
        var ran = parseInt(Math.random()*89999 + 10000);
        var extname = path.extname(files.uploadfile.name); // 获取文件后缀

        // 获取指定上传的文件夹名称
        var folder = fields.folderName;

        var oldpath = files.uploadfile.path;
        var newpath = path.normalize(__dirname + '/../uploads/' + folder + '/' + (newdate + ran + extname));

        console.log('oldpath:' + oldpath);
        console.log('newpath:' + newpath);
        console.log('__dirname:' + __dirname);
        fs.rename(oldpath, newpath, function (err) {
            if(err){
                res.send('改名失败了。');
                return;
            }
            res.send('上传成功！');
        });
    });
};

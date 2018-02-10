var express = require('express');

var router = express.Router();

var util = require('util');

var formidable = require('formidable');

var ArticleType = require('../../schema/admin/ArticleType.js');

// 访问 /admin 之后，全部都会进入这个模块
router.use('/', function (req, res, next) {
    // 此处作权限控制
    next();
});

router.get('/', function (req, res, next) {
    res.render('admin/index', {});
});

router.get('/addArticle', function (req, res, next) {
    // 查询文章分类
    ArticleType.find({}, function (err, result) {
        res.render('admin/addArticle', {type: result});
    });
});

router.post('/addArticle', function (req, res, next) {
    var form = new formidable.IncomingMessage();

    form.parse(req, function (err, fields, files) {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.write('received upload: \n');
        res.end(util.inspect({fields: fields, files: files}));
    });
    res.render('admin/addArticle', {});
});

router.get('/type', function (req, res, next) {
    res.render('admin/addType', {});
});

router.post('/addType', function (req, res, next) {
    ArticleType.create(req.query, function () {
        res.send('插入成功');
    });
});

exports = module.exports = router;
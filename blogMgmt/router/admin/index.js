var express = require('express');

var bodyParser = require('body-parser');

var router = express.Router();

// body-parser会影响formidable的使用
// parse application/x-www-form-urlencoded
// router.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
// router.use(bodyParser.json());

var util = require('util');

var formidable = require('formidable');

var ArticleType = require('../../schema/admin/ArticleType.js');

var Article = require('../../schema/admin/Article.js');

// 访问 /admin 之后，全部都会进入这个模块
router.use('/', function (req, res, next) {
    // 此处作权限控制
    next();
});

router.get('/', function (req, res, next) {
    res.render('admin/index', {});
});

router.get('/articleList', function (req, res, next) {
    Article.find({title: '第一篇文章'}).populate('type').exec(function (err, article) {
        console.log(article);
        res.render('admin/articleList', {article: article});
    });
});

router.get('/addArticle', function (req, res, next) {
    // 查询文章分类
    ArticleType.find({}, function (err, result) {
        res.render('admin/addArticle', {type: result});
    });
});

router.post('/addArticle', function (req, res, next) {
    var form = new formidable.IncomingForm();

    form.parse(req, function (err, fields, files) {
        console.log(util.inspect({fields: fields, files: files}));

        if(fields.title && fields.author && fields.type && fields.read && fields.tag && fields.content){
            Article.create(fields, function () {
                res.send('新增文章成功保存到数据库。');
            });
        } else {
            res.send('请重新填写。')
        }
    });
});

router.get('/type', function (req, res, next) {
    res.render('admin/addType', {});
});

// router.get('/addType', function (req, res, next) {
// 对应表单里的method=“get”,获取参数可以使用req.query
router.post('/addType', function (req, res, next) {
    // post方法使用req.body获取
    /*ArticleType.create(req.body, function () {
        // res.send('插入成功');
        res.redirect('/admin/type'); // 重定向到添加type页面
    });*/

    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        ArticleType.create(fields, function () {
            // res.send('插入成功');
            res.redirect('/admin/type'); // 重定向到添加type页面
        });
    });
});

exports = module.exports = router;
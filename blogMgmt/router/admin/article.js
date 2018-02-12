/**
 * 负责文章模块
 * @type {*|createApplication}
 */
var express = require('express');
var router = express.Router();
var articleModel = require('../../modules/admin/article.js');
var articleTypeModel = require('../../modules/admin/articleType.js');

// 文章列表
router.get('/articleList', function (req, res, next) {
    articleModel.findArticle(req.query, function (err, result) {
        // articleModel去查询数据
        res.render('admin/articleList', {article: result});
    });
});

router.get('/addArticle', function (req, res, next) {
    // 查询分类
    articleTypeModel.findType({}, function (err, result) {
        res.render('admin/addArticle', {type: result});
    });
});

router.post('/addArticle', function (req, res, next) {
    articleModel.addForm(req, function (err) {
        if (err === '-1'){
            res.send('资料填写不完全');
            return;
        } else if(err){
            return;
        }
        res.redirect('/admin/articleList');
    });
});

router.get('/delArticle', function (req, res, next) {
    // 需要删除的文章ID
    var aid = req.query._id;
    articleModel.delArticle({_id: aid}, function (err) {
        if(err){
            return;
        }
        res.send('删除成功');
    });
});

router.get('/editArticle', function (req, res, next) {
    var aid = req.query._id;
    articleModel.updateArticle({'_id': aid}, function (err, article) {
        res.render('admin/updateArticle', article);
    });
});

router.post('/editArticle', function (req, res, next) {
    articleModel.editForm(req, function (err) {
        if(err){
            console.log(err);
            return;
        }
        res.send('修改成功');
    });
});

exports = module.exports = router;


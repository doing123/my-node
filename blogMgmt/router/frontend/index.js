var express = require('express');

var router = express.Router();

var articleModel = require('../../modules/frontend/articleModel.js');

router.get('/', function (req, res, next) {
    articleModel.findList(req.query, function (err, result) {
        res.render('frontend/index', {article: result});
    });
});

router.get('/detail', function (req, res, next) {
    var aid = req.query._id;
    articleModel.articleDetail({_id: aid}, function (err, result) {
        if (err) {
            console.log(err);
            return;
        }
        var currentUser = req.session.userInfos ? req.session.userInfos.name : '未登录';
        res.render('frontend/article', {article: result, username: currentUser});
    });
});

router.post('/addComment', function (req, res, next) {
    articleModel.addComment(req, function () {
        articleModel.findComment({article: req.body._id}, function (err, result) {
            if (err) {
                console.log(err);
                return;
            }
            res.json(result);
        });
    });
});

router.get('/commentList', function (req, res, next) {
    articleModel.findComment({article: req.body._id}, function (err, result) {
        if (err) {
            console.log(err);
            return;
        }
        res.json(result);
    });
});

exports = module.exports = router;

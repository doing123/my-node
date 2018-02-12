var express  = require('express');
var router = express.Router();
var util = require('util');
var formidable = require('formidable');

var articleTypeModel = require('../../modules/admin/articleType.js');
var ArticleType = require('../../schema/admin/ArticleType.js');

router.get('/type', function (req, res, next) {
    articleTypeModel.findType({}, function (err, result) {
        if(err){
            console.log(err);
            return;
        }
        res.render('admin/articleTypeList', {articleType: result});
    });
});

router.post('/addType', function (req, res, next) {

    ArticleType.create(req.query, function () {
        res.send('插入成功');
    });
});

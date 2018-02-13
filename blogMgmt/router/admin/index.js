/**
 * 后台管理路由模块
 * @type {*|createApplication}
 */
var express = require('express');

var router = express.Router();

var util = require('util');

var formidable = require('formidable');

var articleRouter = require('./article.js');

var articleType = require('./articleType.js');

var userModel = require('../../modules/user/users.js');

// 当访问/admin后，全部都会进入这个模块
router.use('/', function (req, res, next) {
    console.log(req.session.userInfos);
    // 权限控制
    if(!req.session.userInfos){
        res.redirect('/login');
        return;
    }

    userModel.isAdmin(req.session.userInfos.name, function (err, result) {
        if (err){
            console.log(err);
            return;
        }
        // 结果只有两种：1.管理员， 2.会员
        if(result){
            next(); // 访问的路由是从admin进来的，往下也会进入admin
        } else {
            res.redirect('/');
        }
    });
});

router.get('/', function (req, res, next) {
    res.render('admin/index', {});
});

// 引入文章模块路由
router.use(articleRouter);

// 引入文章类型模块路由
router.use(articleType);

exports = module.exports = router;

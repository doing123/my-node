var express = require('express');
var router = express.Router();
var util = require('util');
var userModel = require('../../modules/user/user.js');

router.get('/register', function (req, res, next) {
    res.render('users/register');
});

// 注册表单
router.post('/register', function (req, res, next) {
    var request = req;
    userModel.userFind(req, function (err, result, fields) {
        if (err) {
            console.log(err);
            return;
        }

        if (result.length) {
            res.send('用户名已经注册，请重新填写');
        } else {
            userModel.register(fields, function (err) {
                if (err) {
                    console.log(err);
                    return;
                }
                res.send('注册成功');
            });
        }
    });
});

// 登录
router.post('/login', function (req, res, next) {
    userModel.queryUserInfo(req, function (findInfo) {
        if (!findInfo) {
            res.send('用户名和密码必须填写');
        } else if (findInfo == 1) {
            res.send('1');
        } else if (findInfo === 'admin') {
            res.redirect('/admin');
        } else if (findInfo === 'member') {
            res.redirect('/');
        } else if (findInfo == 2) {
            res.send('用户名和密码错误');
        }
    });
});

exports = module.exports = router;

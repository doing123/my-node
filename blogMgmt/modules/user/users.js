var express = require('express');
var router = express.Router();
var util = require('util');

var bodyParser = require('body-parser');
router.use(bodyParser.json());

var formidable = require('formidable');

var crypto = require('crypto');

var Users = require('../../schema/user/User.js');

exports = module.exports = {
    register: function (fields, callback) {
        // 验证用户输入信息
        if (fields.username && fields.password) {
            var md5 = crypto.createHash('md5');

            fields.password = md5.update(fields.password).digest('base64');
            fields.registerTime = fields.updateTime = new Date();
            fields.rank = 1; // 标识用户等级
            Users.create(fields, function (err) {
                callback(err);
            });
        } else {
            callback('-1');
        }
    },

    // 判断用户名是否存在
    userFind: function (req, callback) {
        var form = new formidable.IncomingForm();
        form.parse(req, function (err, fields, files) {
            console.log(fields);
            if (fields.username && fields.password) {
                Users.find({username: fields.username}, function (err, result) {
                    callback(err, result, fields);
                });
            } else {
                callback(err, '-1');
            }
        });
    },

    queryUserInfo: function (req, callback) {
        if (req.body.username === '' || req.body.password === '') {
            callback(0);
            return;
        }

        Users.findOne({username: req.body.username}, function (err, result) {
            if (err) {
                console.log(err);
                return;
            }
            // console.log(result + '----' + util.inspect(req.body));

            var md5 = crypto.createHash('md5');
            req.body.password = md5.update(req.body.password).digest('base64');

            if (result === null) {
                // 没有注册
                callback(1);
            } else if (result.username === req.body.username && result.password === req.body.password) {
                req.session.userInfos = {name: result.username, sign: true};

                if (result.rank > 10) {
                    callback('admin');
                } else {
                    callback('member');
                }
            } else {
                // 用户名和密码错误
                callback(2);
            }
        });
    },

    isAdmin: function (username, callback) {
        Users.findOne({username: username}, function (err, result) {
            if (result.rank > 10) {
                callback(err, true);
            } else {
                callback(err, false);
            }
        });
    }
};

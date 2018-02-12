var express = require('express');
var router = express.Router();
var util = require('util');
var formidable = require('formidable');

var Article = require('../../schema/admin/Article');
var Comment = require('../../schema/admin/Comment.js');

exports = module.exports = {
    findList: function (params, callback) {
        Article.find(params || {}, function (err, result) {
            callback(err, result);
        });
    },

    articleDetail: function (params, callback) {
        Article.findOne(params || {}, function (err, result) {
            callback(err, result);
        });
    },

    addComment: function (req, callback) {
        var obj = req.body;
        obj.createtime = new Date();
        obj.author = req.session.userInfos ? req.session.userInfos : '匿名';
        Comment.create(obj, function (err) {
            callback(err);
        });
    },

    findComment: function (articleId, callback) {
        Comment.find(articleId || {}, function (err, result) {
            callback(err, result);
        });
    }
};

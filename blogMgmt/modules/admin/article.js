var express = require('express');

var router = express.Router();

var util = require('util');

var formidable = require('formidable');

var Article = require('../../schema/admin/Article.js');
var articleTypeModel = require('./articleType.js');

exports = module.exports = {
    // 查询文章列表
    findArticle: function (params, callback) {
        Article.find(params || {}).populate('type').exec(function (err, article) {
            callback(err, article);
        })
    },

    addArticle: function () {

    },

    addForm: function (req, callback) {
        var form = new formidable.IncomingForm();

        form.parse(req, function (err, fields, files) {
            if (fields.title && fields.author && fields.type && fields.read && fields.tag && fields.content) {
                fields.updatetime = fields.createtime = new Date();

                Article.create(fields, function (err) {
                    callback(err);
                });
            } else {
                callback('-1');
            }
        });
    },

    updateArticle: function (params, callback) {
        Article.findOne(params || {}, function (err, article) {
            if (err) {
                console.log(err);
                return;
            }
            articleTypeModel.findType({}, function (err, result) {
                if (err) {
                    console.log(err);
                    return;
                }

                callback(err, {article: article, articleType: result});
            });
        });
    },
    delArticle: function (params, callback) {
        Article.remote(params, function (err) {
            callback(err);
        });
    },

    editForm: function (req, callback) {
        var form = new formidable.IncomingForm();

        form.parse(req, function (err, fields, files) {
            if (fields.title && fields.author && fields.type && fields.read && fields.tag && fields.content) {
                fields.updatetime = new Date();

                Article.update(fields, function (err) {
                    callback(err);
                });
            } else {
                callback('-1');
            }
        });
    }
};

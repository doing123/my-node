var express = require('express');

var router = express.Router();

var util = require('util');
var formidable = require('formidable');

var ArticleType = require('../../schema/admin/ArticleType.js');

exports = module.exports = {
    findType: function (params, callback) {
        ArticleType.find(params || {}, function (err, result) {
            callback(err, result);
        });
    }
};


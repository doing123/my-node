
var Student = require('../modles/Student.js');
var util = require('util');
var Course = require('../modles/Course.js');

exports.showIndex = function (req, res, next) {
    Student.find({}, function (err, result) {
        res.render('index', {
            'students':result
        });
    });
};

exports.showAdd = function (req, res, next) {
    res.render('add');
};

exports.doAdd = function (req, res, next) {
    Student.create(req.query, function () {
        res.send('提交数据成功');
    });
};

exports.edit = function (req, res, next) {
    var sid = parseInt(req.params['sid']);
    Student.findOne({sid: sid}, function (err, result) {
        if(err){
            res.send('查询出错，请重新查询');
            return;
        }
        res.render('edit', {
            student: result
        });
    });
};

exports.doEdit = function (req, res, next) {
    var sid = parseInt(req.query.sid);
    console.log(req.query);


    // 为什么会增加一条新值，而不是直接操作原有值
    Student.update({sid: sid}, req.query, function (err) {
        if(err){
            console.log(err);
            return;
        }
        console.log('数据库更新成功。');
        res.redirect('/');
    });
};

exports.remove = function (req, res, result) {
    var sid = parseInt(req.params['sid']);

    Student.remove({sid: sid}, function (err) {
        if(err){
            console.log(err);
            return;
        }
        res.send('删除成功。');
    });
};


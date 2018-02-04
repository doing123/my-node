
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

/*Course.create({cid:1001, name:'数学课'});
Course.create({cid:1002, name:'体育课'});
Course.create({cid:1003, name:'英语课'});*/

exports.showAdd = function (req, res, next) {
    Course.find({}, function (err, result) {
        res.render('add', {
            allCourse: result
        });
    });
    // res.render('add');
};

exports.doAdd = function (req, res, next) {
    var associationArr = [];
    // 此处要做判断：如果CheckBox选中一个，传过来的association是字符串，两个以上才为数组
    if(typeof req.query.association === 'string'){
        associationArr = [parseInt(req.query.association)];
    } else {
        for(var i = 0; i< req.query.association.length; i++){
            associationArr.push(parseInt(req.query.association[i]));
        }
    }
    req.query.course = associationArr;
    console.log('req.query:' + util.inspect(req.query));
    Student.create(req.query, function () {
        // 添加数据到Student集合的同时，更新Course集合中的数据
        Course.addStudent(req.query.course, parseInt(req.query.sid), function () {
            res.send('提交数据成功');
        });
    });
};

exports.edit = function (req, res, next) {
    var sid = parseInt(req.params['sid']);
    Student.findOne({sid: sid}, function (err, result) {
        if(err){
            res.send('查询出错，请重新查询');
            return;
        }
        Course.find({}, function (err, course) {
            console.log(course);
            res.render('edit', {
                student: result,
                allCourse:course
            });
        });
        /*res.render('edit', {
            student: result
        });*/
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


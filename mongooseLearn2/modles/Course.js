
var mongoose = require('mongoose');

var courseSchema = new mongoose.Schema({
    cid: Number,
    name: String,
    students: [Number]
});

courseSchema.statics.addStudent = function (cidArr, sid, callback) {
    for(var i = 0; i < cidArr.length; i++){
        Course.update({'cid': parseInt(cidArr[i])}, {$push: {students: parseInt(sid)}}, function () {
            console.log('学生报名课程成功');
        });
    }
    callback();
};

var Course = mongoose.model('Course', courseSchema);

exports = module.exports = Course;
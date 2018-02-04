var mongoose = require('mongoose');

var studentSchema = new mongoose.Schema({
    sid: Number,
    name: String,
    age: Number,
    sex: String,
    course: [Number]
});

// 索引
studentSchema.index({'sid': 1});

var Student = mongoose.model('Student', studentSchema);

/*new Student({
    name: 'xiaoqin',
    age: 27,
    sex: 'male',
    sid: 2014001
}).save();*/

exports = module.exports = Student;

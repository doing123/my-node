var mongoose = require('mongoose');
var db = require('./db.js');

// 创建一个schema的结构
var studentSchema = new mongoose.Schema({
    name:{type:String},
    age:{type:Number},
    sex:{type:String}
});

// mongoose.Schema里可以绑定静态方法
studentSchema.statics.findPerson = function (name, callback) {
    this.model('Student').find({name:name}, callback);
};

studentSchema.statics.updateInfo = function (conditions, update, options, callback) {
    this.model('Student').update(conditions, update, options, callback); // 此处只更新了一条数据
};

var studentModel = db.model('Student', studentSchema);

/*var xiaohong = new studentModel({name:'小红',age:'22', sex:'female'});
xiaohong.save(function (err) {
    console.log('小红。。。');
});

var xiaoli = new studentModel({name:'小李', age:'33',sex:'male'});
xiaoli.save(function () {
    console.log('小李。。。');
});*/

module.exports = studentModel;

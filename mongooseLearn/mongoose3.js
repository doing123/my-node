var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/testdb');

var Cat = mongoose.model('Cat', {name:String, age:Number,sex:String});
Cat.find({name:'小白'}, function (err, result) {
    if(err){
        console.log(err);
        return;
    }
    // obj指向Cat的实例
    var obj = result[0];
    obj.sex = 'sir';
    obj.save(function (err) {
        console.log('修改称谓成功。');
    });
});
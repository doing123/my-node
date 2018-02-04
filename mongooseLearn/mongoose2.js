var mongoose = require('mongoose');

// 创建一个数据库的连接
mongoose.connect('mongodb://localhost:27017/testdb');

var Cat = mongoose.model('Cat', {name:String, age:Number, sex:String});

var tom = new Cat({name:'小白', age:2, sex:'lady'});

tom.save(function (err) {
    if(err){
        console.log(err);
        return
    }
    console.log('保存数据库成功');
});
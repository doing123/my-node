/**
 * mongoose的思想就是让开发者用操作对象的方式操作数据库
 */
var mongoose = require('mongoose');

// 连接数据库
mongoose.connect('mongodb://localhost:27017/nodedb');

// 创建一个模型，猫的模型，设计一个名字以及名字的变量类型
var Cat = mongoose.model('Cat', {name: String});

// 实例化这个猫的对象
var kitty = new Cat({name: 'Kitty'});

kitty.save(function (err) {
    console.log('喵喵喵喵喵');
});

var tom = new Cat({name:'Tom'});
// 实例对象得到实例属性方法
tom.save(function (err) {
    console.log('吼吼吼吼吼');
});


var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/testdb');


var db = mongoose.connection;

db.once('open', function () {
    console.log('数据库连接成功。。。');
});

/**
 * Schema:本身不具备操作能力
 * Model：由Schema发布生成的模型，具有抽象属性和行为的数据库操作能力
 * Entity：由Model创建的实例，它的操作会影响到数据库
 * @type {mongoose.Schema}
 */
// 博客集合的对象
var blogSchema = new mongoose.Schema({
    title:String,
    author:String
});

blogSchema.methods.showInfo = function () {
    console.log(this.title);
}

// 拥有了model，相当于给mongoose一把操作数据库的钥匙，可以使用这个model来增删改查数据库
var Blog = mongoose.model('Blog', blogSchema);

var blog = new Blog({
    title: '我的博客',
    author: 'doing123'
});

blog.save(function () {
    console.log('数据保存成功');
});

blog.showInfo();

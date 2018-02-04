var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/testdb');

var catSchema = new mongoose.Schema({
    name: String,
    age: Number,
    sex: String,
    comments:[{body:String, date:Date}]
});

catSchema.methods.comment = function (obj, callback) {
    this.comments.push(obj);
    this.save();
};

var Cat = mongoose.model('Cat', catSchema);

/*var tom = new Cat({
    name:'小黑',
    age:1,
    sex:'dog',
    comments:[]
}).save();*/

Cat.findOne({name: '小蓝'}, function (err, cat) {
    if(err || !cat){
        console.log('操作出错');
        return;
    }
    cat.comment({'body': '第一个评论', 'date': new Date()});
});

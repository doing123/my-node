var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/testdb');

var db = mongoose.connection;

var catSchema = new mongoose.Schema({
    name: String,
    age: Number,
    sex: String
});

catSchema.methods.findType = function (callback) {
    this.model('Cat').find({'sex': this.sex}, callback);
};

var Cat = mongoose.model('Cat', catSchema);

Cat.findOne({name:'小花'}, function (err, result) {
    var fox = result;
    fox.findType(function (err, result) {
        if(err){
            console.log(err);
            return;
        }
        console.log(result);
    });
});


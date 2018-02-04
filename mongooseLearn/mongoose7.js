var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/testdb');

var studentSchema = new mongoose.Schema({
    name: String,
    age: Number,
    sex: String
});

studentSchema.methods.ageIncrease = function () {
    this.age++;
    this.save();
    console.log('Student:'+ this);
};

var Student = mongoose.model('Student', studentSchema);

var xiaoming = new Student({name: '小明', age:12, sex:'male'});
xiaoming.save();

Student.findOne({name: '小明'}, function (err, student) {
    student.ageIncrease();
});


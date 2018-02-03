var Student = require('./modles/Student.js');

Student.findPerson('小李', function (err, result) {
    if(err){
        console.log(err);
        return;
    }
    console.log(result);
});

Student.updateInfo({name:'小李'},{$set:{age:45}},{}, function () {
    console.log('小李改年龄成功');
});


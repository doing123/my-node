var crypto = require('crypto');

function md5(pwd) {
    // MD5一种常用的哈希算法
    var md5 = crypto.createHash('md5');
    var password = md5.update(pwd).digest('base64');
    return password;
}

var mathRan = parseInt(Math.random()*1000);
console.log(md5('12345' + mathRan));
console.log(md5(md5('123456789').substr(1,6)));

var userPwd = '123456';
// 假设用户输入的密码与数据库中的密码进行匹配
console.log(md5(userPwd) === md5('123456'));



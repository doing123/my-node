/**
 * 如果没有'./',会认为引入模块，Node会从'node_modules'文件夹下查找
 * exports是引用的module.exports 的值
 * exports.People = People;
 * 此时的People被认为一个构造函数，就可以通过new来实例化
 */

var people = require('./test/people.js');

var doing = new people('doing', '男', 27);

doing.sayHello();

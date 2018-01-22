/**
 * EJS: 是一个js模板库，是用来从JSON数据中生成HTML字符串的
 * jade： 性能比EJS高，是以文本缩减的形式来展现
 */
var ejs = require('ejs');
var str = '好开心，今天中了<%= num %>等奖。';

var data = {
    num: 1
};

var html = ejs.render(str, data); // 传入要渲染的字符，数据

console.log(html);
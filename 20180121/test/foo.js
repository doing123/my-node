/*
(function(){//匿名函数
    //避免全局污染    有效减少全局对象
    var Hello = function(){
        console.log("Hello method loading....");
    };


    window.Hello = Hello;

})();//小括号：是执行匿名函数（称之为自治行函数）

*/

var bar = require("./bar.js");
var msg = "Hello";
var infos = "Think，吃早餐了吗";

function showInfo(){
    console.log(infos);
}

// 和windows原理一致，需要通过exports暴露出去
exports.msg = msg;
exports.infos = infos;
exports.showInfo = showInfo;









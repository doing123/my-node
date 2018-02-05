var http = require('http');
var cheerio = require('cheerio');

var url = 'http://www.yikedou.com/'; // 目标网站

/**
 * 采用HTTP模块向服务器发起一次get请求
 * 前端有浏览器的同源策略不能发起请求，会显示跨域问题
 * 而后端没有这个限制，这也是一种跨域方式：’服务器代理‘
 */
http.get(url, function (res) {
    var html = '';

    res.on('data', function (chunk) {
        html += chunk;
    });

    res.on('end', function (chunk) {
        console.log(html);
    });
});
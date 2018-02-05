
var http = require('http');
var request = require('request');
var fs = require('fs');

var imgSrc = 'http://www.yikedou.com/d/file/p/201709/1505208605897875.jpg';

/**
 * 通过流的形式，把图片写到本地
 * createWriteStream里的文件夹路径必须存在，否则报错
 */
request(imgSrc).pipe(fs.createWriteStream('./images/3.jpg'));


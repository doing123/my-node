// 爬图片
var http = require('http');
var request = require('request');
var fs = require('fs');

var imgSrc = 'http://www.yikedou.com/d/file/p/201709/1505208104988109.jpg';

var writeStream = fs.createWriteStream('image.jpg');
var readStream = request(imgSrc);

readStream.pipe(writeStream);

readStream.on('end', function () {
    console.log('写入成功');
});

writeStream.on('finish', function () {
    console.log('读取OK');
});

// 通过流的形式，把图片写到本地指定文件夹
request(imgSrc).pipe(fs.createWriteStream('./images/1.jpg'));





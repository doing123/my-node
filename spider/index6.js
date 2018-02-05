// 保存爬取的文字

var http = require('http');
var cheerio = require('cheerio');
var fs = require('fs');

var url = 'http://www.yikedou.com/';

http.get(url, function (res) {
    var html = '';
    res.on('data', function (chunk) {
        html += chunk;
    });

    res.on('end', function () {
        var $ = cheerio.load(html);
        var allTitle = '';

        var item = $('.item.borShadow');
        for(var i =0; i < item.length; i++){
            allTitle += item.eq(i).children('.hidtit').eq(0).children('a').text() + '\n';
        }
        console.log('所有数据：' + allTitle);
        fs.appendFile('./text/1.txt', allTitle, 'utf-8', function (err) {
            if(err){
                console.log(err);
            }
        });
    });
});

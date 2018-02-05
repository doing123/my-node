var http =require('http');
var cheerio = require('cheerio');

var url = 'http://www.yikedou.com/';

http.get(url, function (res) {
    var html = '';
    res.on('data', function (chunk) {
        html += chunk;
    });

    res.on('end', function () {
        var $ = cheerio.load(html);
        var allTitle = [];
        var item = $('.item.borShadow');
        for(var i = 0; i < item.length; i++){
            allTitle.push(item.eq(i).children('.hidtit').eq(0).children('a').text());
        }
        console.log(allTitle); // 获取的指定文本内容
    });
});

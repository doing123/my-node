// 报错爬取的图片和文字
var http =require('http');
var cheerio = require('cheerio');
var fs = require('fs');
var request = require('request');
var baseUrl = 'http://www.yikedou.com/';
var path = require('path');
var url = 'http://www.yikedou.com/';
var $;

function loadPage(url) {
    http.get(url, function (res) {
        var html = '';

        // 监听data事件，每次获取一部分数据
        res.on('data', function (chunk) {
            html += chunk;
        });

        // 监听end事件，加载完成执行处罚回调函数
        res.on('end', function () {
            $ = cheerio.load(html);
            var allTitle = '';
            var allImg = [];

            var item = $('.item.borShadow');
            console.log(item.eq(0).find('.arc_cont .inner img').attr('data-original'));
            for(var i = 0; i < item.length; i++){
                var currTitle = item.eq(i).children('.hidtit').eq(0).children('a').text();
                var currImgSrc = item.eq(i).find('.arc_cont .inner img').attr('data-original');

                allTitle += currTitle + '\n';
                saveImg(currImgSrc, currTitle);
            }
            saveText(allTitle);
        });

        function saveText(data, txtName) {
            fs.appendFile('./text/' + (txtName || '2') + '.txt', data, 'utf-8', function (err) {
                if(err){
                    console.log(err);
                }
            });
        }

        function saveImg(currImgSrc, currTitle) {
            // 图片文件后缀需要动态获取
            var extName = path.extname(currImgSrc) || '.jpg';
            request(baseUrl + currImgSrc).pipe(fs.createWriteStream('./image/' + currTitle + extName));
        }
    });
}

loadPage(url);

setInterval(function () {
    var nextObj = $('.mPgaes .current').next();
    if(nextObj){
        var nextUrl = nextObj.attr('href');
        loadPage(baseUrl + nextUrl);
    }
}, 10000);

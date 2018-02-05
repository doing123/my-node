/**
 * 爬虫
 * @type {"http"}
 */
var http = require('http');
var cheerio = require('cheerio');

var $ = cheerio.load("<div><p>hello go</p></div>");

console.log($("div").text());

const sd = require('silly-datetime');

var newDate = sd.format(new Date(), 'YYYYMMDDHHmm');

console.log('当前时间为：' + newDate);
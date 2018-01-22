const http = require('http');
const formidable = require('formidable'); // 处理表单数据
const util = require('util');
const path = require('path');
const sd = require('silly-datetime');
const fs = require('fs');

http.createServer(function (req, res) {
    if (req.url === '/favicon.ico') {
        return;
    }
    if (req.url === '/upload' && req.method.toLowerCase() === 'post') {
        var form = new formidable.IncomingForm();
        form.uploadDir = './static/images'; // 目录必须存在，否则报错/不能上传成功

        /**
         * 当执行form.parse的时候，表示表单已经全部加载完毕了
         * 回调函数：
         * err: 错误
         * fields: 表单数据的文本数据
         * files: 上传文件的数据
         */
        form.parse(req, function (err, fields, files) {
            res.writeHead(200, {'Content-Type': 'text/plain;charset=UTF-8'});
            res.write('received upload:\n\n');
            // 随机生成四位数
            var random = parseInt((Math.random() * 10000).toFixed(0));
            var newDate = sd.format(new Date(), 'YYYYMMDDHHmmss');

            // 获取文件后缀名
            var extname = path.extname(files.upload.name);
            console.log(extname);
            var oldpath = __dirname + '/' + files.upload.path;
            // 文件名：年月日时分秒 + 4位随机数
            var newpath = __dirname + '/static/images/' + newDate + random + extname;

            // 修改文件名
            fs.rename(oldpath, newpath, function (err) {
                if (err) {
                    throw Error('改名字失败！');
                }
                res.writeHead(200, {'Content-Type': 'text/plain;charset=UTF-8'});
                res.end('修改成功！');
            });

            console.log(fields);
            console.log('name:' + fields.username);
            console.log('age:' + fields.age);
            console.log(files);
            // 直接输出fields会输出‘object object’
            res.end(util.inspect({fields: fields, files: files})); // 把两个对象合并，并以字符串的形式展现
        });

        return; // 必须，否则报错
    }

    res.writeHead(200, {'Content-Type': 'text/html;charset=UTF-8'});
    res.end(
        `<form action="/upload" enctype="multipart/form-data" method="post">
            <input type="text" name="username"><br>
            <input type="text" name="age"><br>
            <input type="file" name="upload" multiple="multiple"><br>
            <input type="submit" value="Upload">
        </form>`
    );

}).listen('3000', '127.0.0.1', function () {
    console.log('服务器在3000端口启动。。。')
});
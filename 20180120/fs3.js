const http = require('http');
const fs = require('fs');

http.createServer(function (req, res) {
    if(req.url === 'favicon.ico'){
        return;
    }

    /**
     * fs.stat和fs.fstat他们的方法功能是一样的，都是获取文件的状态信息
     */
    fs.stat('./fs2.js', function (err, data) {
        console.log(data);
        console.log(data.isDirectory()); //判断是否是文件夹,返回true,表示加载是文件夹
    });

}).listen('3000', '127.0.0.1', function () {
    console.log('服务器已启动，3000...')
});

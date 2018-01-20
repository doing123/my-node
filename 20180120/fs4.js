const http = require('http');
const fs = require('fs');

http.createServer(function (req, res) {
    if(req.url === '/favicon.ico'){
        return;
    }

    var directoryArr = [];
    fs.readdir('./img', function (err, files) {
        for(let i = 0; i < files.length; i ++){
            let currentFilename = files[i];
            fs.stat('./img' + currentFilename, function (err, stats) {
                if(err){
                    return;
                } if(stats.isDirectory()){
                    directoryArr.push(currentFilename);
                }
                console.log(directoryArr);
            })
        }
    });

}).listen('3000', '127.0.0.1', function () {
    console.log('服务器启动在3000端口。。。');
});
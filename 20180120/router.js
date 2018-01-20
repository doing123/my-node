const http = require('http');

var server = http.createServer(function (req, res) {
    if(req.url === '/favicon.ico'){
        return;
    }

    /**
     * /student/1234567899
     * /teacher/123456
     */

    var currentUrl = req.url;
    var tipsInfo = '';
    res.writeHead(200, {'Content-Type': 'text/html;charset=UTF-8'});
    if(currentUrl.substr(0,9) === '/student/'){
        var studentId = currentUrl.substr(9);
        if(/^\d{10}$/.test(studentId)){
            tipsInfo = '您要查询的学生信息ID为：' + studentId;
        } else {
            tipsInfo = '未找到。';
        }
    } else if (currentUrl.substr(0,9) === '/teacher/'){
        var teacherId = currentUrl.substr(9);
        if(/^\d{6}$/.test(teacherId)){
            tipsInfo = '您要查询的教师信息ID为：' + teacherId;
        } else {
            tipsInfo = '未找到。';
        }
    } else{
        console.log('not found loading...');
        tipsInfo = '输入有误，请便。。。';
    }
    res.end(tipsInfo);


}).listen('3000', '127.0.0.1', function () {
    console.log('服务器在3000端口启动了。。。');
});
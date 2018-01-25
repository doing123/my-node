var http =require('http');
var Layer = require('./layer');

var Application = function () {
    // 保存路由
    this.router = [{
        path: '*',
        fn: function (req, res) {
            res.writeHead(404, {'Content-Type': 'text/plain'});

            res.end('Cannot ' + req.method + ' ' + req.url);
        }
    }];
};

Application.prototype = {
    use: function (path, fn) {
        this.router.push({
            path: path,
            fn: fn
        });
        console.log(this.router);
    },

    listen: function (port) {
        var self = this;

        http.createServer(function (req, res) {
            for(var i = 0; i < self.router.length; i++){
                if(req.url === self.router[i].path){
                    console.log(self.router[i]);
                    return self.router[i].fn(req, res);
                }
            }
            return self.router[0].fn(req, res);
        }).listen(Number(port));
    }
};

exports = module.exports = Application;

var http = require('http');
var Layer = require('./layer'); // 实现use方法
var Router = require('./router'); //./router/index.js

var Application = function () {
    // 保存路由，第一次进来没有执行任何方法
    this._router = new Router();

    // 保存路由: 改为layer模块实现
    /*this.router = [new Layer('*', function (req, res) {
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.end('Cannot ' + req.method + ' ' + req.url);
    })];*/
};

Application.prototype = {
    use: function (path, fn) {
        this.router.push(new Layer(path, fn));
    },

    get: function (path, callback) {
        var router = this._router;
        return router.get(path, callback);
    },

    /**
     * 匹配路由，执行回调函数
     * @param req
     * @param res
     * @returns {*}
     */
    handle: function (req, res) {
        var router = this._router;
        router.handle(req, res);

        /*var self = this;
        for (var i = 1; i < self.router.length; i++) {
            if (self.router[i].match(req.url)) {
                return self.router[i].handler_request(req, res);
            }
        }
        return self.router[0].handler_request(req, res);*/
    },

    /**
     * 匹配路由
     * @param path
     * @returns {*}
     */
    route: function (path) {
        var router = this._router;
        return router.route(path);
    },

    /**
     * 监听端口号
     * @param port
     */
    listen: function (port) {
        var self = this;

        http.createServer(function (req, res) {
            self.handle(req, res);
        }).listen(Number(port));
    }
};

exports = module.exports = Application;

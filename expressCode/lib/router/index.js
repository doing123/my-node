var Layer = require('./layer');
var Route = require('./route');

var Router = function () {
    // 保存路由: 改为layer模块实现
    this.stack = [new Layer('*', function (req, res) {
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.end('Cannot ' + req.method + ' ' + req.url);
    })];
    /*this.router = [{
        path: '*',
        fn: function (req, res) {
            res.writeHead(404, {'Content-Type': 'text/plain'});

            res.end('Cannot ' + req.method + ' ' + req.url);
        }
    }];*/
};

Router.prototype = {
    /**
     * 匹配路由，执行回调函数
     * @param req
     * @param res
     * @returns {*}
     */
    handle: function (req, res) {
        var self = this;
        var method = req.method; // 请求类型
        /**
         * 从第二个开始匹配，如果没有匹配成功，返回第一个路由的回调函数的执行结果
         */
        for (var i = 1; i < self.stack.length; i++) {
            // 匹配一个正在调用的路由，并判断是否为get请求
            if (self.stack[i].match(req.url) && self.stack[i].route
                && self.stack[i].route._handles_method(method)) {
                // console.log(self.router[i]);
                return self.stack[i].handle_request(req, res);
            }
        }
        return self.stack[0].handle_request(req, res); // 默认*匹配
    },

    get: function (path, callback) {
        var route = this.route(path);
        route.get(callback); //调用get
        return this;
    },

    route: function (path) {
        var route = new Route();
        var layer = new Layer(path, function (req, res) {
            route.dispatch(req, res);
        });
        layer.route = route;
        this.stack.push(layer);
        return route;
    }
};

exports = module.exports = Router;
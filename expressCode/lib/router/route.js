var Layer = require('./layer');

var Route = function (path) {
    this.path = path;
    this.stack = [];
    this.methods = {}; // 请求方法
};

Route.prototype = {
    _handles_method: function (method) {
        var name = method.toLowerCase();
        return Boolean(this.methods[name]);
    },

    get: function (callback) {
        var layer = new Layer('/', callback);
        layer.method = 'get';
        this.methods['get'] = true;
        this.stack.push(layer);
        return this;
    },

    dispatch: function (req, res) {
        var self = this;
        var method = req.method.toLowerCase();
        for (var i = 0; i < self.stack.length; i++) {
            if (method === self.stack[i].method) {
                return self.stack[i].handle_request(req, res);
            }
        }
    }
};

exports = module.exports = Route;

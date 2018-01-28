function Layer(path, fn) {
    this.path = path;
    this.handle = fn; // 回调函数
}

Layer.prototype = {
    // 注册路由时会有多个回调函数
    handle_request: function (req, res) {
        /**
         * 考虑回调函数不存在的情况
         */
        var fn = this.handle;
        if (fn) {
            fn(req, res);
        }
    },

    match: function (path) {
        return path === this.path;
    }
};

exports = module.exports = Layer;
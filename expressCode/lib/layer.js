
function Layer(path, fn) {
    this.handle = fn;
    this.path = path;
}

Layer.prototype = {
    handler_request: function (req, res) {
        var fn = this.handle;
        if(fn){
            fn(res, res);
        }
    },
    match: function () {
        return path === this.path;
    }
};

exports = module.exports = Layer;
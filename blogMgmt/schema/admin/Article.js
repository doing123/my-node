var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var articleSchema = new mongoose.Schema({
    title: String,
    attribute: [],
    author: String,
    type: {
        type: Schema.Types.ObjectId,
        ref: 'ArcticleType'
    },
    read: Number,
    createtime: Date,
    content: String,
    support: Number,
    Tag: [],
    updatetime: Date
});

var Article = mongoose.model('Article', articleSchema);

exports = module.exports = Article;
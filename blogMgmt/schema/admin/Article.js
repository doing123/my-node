var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var articleSchema = new mongoose.Schema({
    title: String,
    attribute: [],
    author: String,
    type: {
        type: Schema.Types.ObjectId,
        ref: 'ArticleType' // 此处单词拼写错误浪费了半天时间（ MissingSchemaError: Schema hasn't been registered for model "ArcticleType"）
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
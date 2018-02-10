var mongoose = require('mongoose');

var articleSchema = new mongoose.Schema({
    title: String,
    attribute: [],
    author: String,
    type: [],
    read: Number,
    createtime: Date,
    content: String,
    support: Number,
    Tag: [],
    updatetime: Date
});

var Article = mongoose.model('Article', articleSchema);

exports = module.exports = Article;
var mongoose = require('mongoose');

var articleTypeSchema = new mongoose.Schema({
    typename: String
});

var ArticleType = mongoose.model('ArticleType', articleTypeSchema);

exports = module.exports = ArticleType;
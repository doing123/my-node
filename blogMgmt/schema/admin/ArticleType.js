var mongoose = require('mongoose');

var articleTypeSchema = mongoose.Schema({
    typename: String
});

var ArticleType = mongoose.model('ArticleType', articleTypeSchema);

exports = module.exports = ArticleType;
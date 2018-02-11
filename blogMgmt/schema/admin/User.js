var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    username: String,
    password: String,
    rank: Number,
    registerTime: Date,
    updateTime: Date
});

var User = mongoose.model('User', userSchema);

exports = module.exports = User;
var mongoose = require('mongoose');

var CommentSchema = mongoose.Schema({
    commentID: { type: String, required: true, unique: true },
    author:    { type: mongoose.Schema.Types.ObjectId, ref:'Entity', required: true },
    content:   { type: String },
    time:      { type: Date, required: true },
});

module.exports = mongoose.model('Comment', CommentSchema);
var mongoose = require('mongoose');

/**
 * @class Comment
 * @global
 * @param {String} commentID - Unique. EntityID + Date.now().
 * @param {Mongoose.Types.ObjectId} author - Author of the comment.
 * @param {Mongoose.Types.ObjectId} post - Post the comment linked to.
 * @param {String} content - Content of the comment.
 * @param {Date} time - Created time.
 */

var CommentSchema = mongoose.Schema({
    commentID: { type: String, required: true, unique: true },
    author:    { type: mongoose.Schema.Types.ObjectId, ref:'User', required: true },
    post:      { type: mongoose.Schema.Types.ObjectId, ref:'Post', required: true },
    content:   { type: String },
    time:      { type: Date, required: true },
});

module.exports = mongoose.model('Comment', CommentSchema);
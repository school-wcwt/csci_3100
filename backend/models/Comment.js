var mongoose = require('mongoose');

/**
 * @typedef Comment
 * @global
 * @property {String} commentID - Unique. EntityID + Date.now().
 * @property {Mongoose.Types.ObjectId} author - Author of the comment.
 * @property {Mongoose.Types.ObjectId} post - Post the comment linked to.
 * @property {String} content
 * @property {Date} time - Created time.
 */

var CommentSchema = mongoose.Schema({
    commentID: { type: String, required: true, unique: true },
    author:    { type: mongoose.Schema.Types.ObjectId, ref:'User', required: true },
    post:      { type: mongoose.Schema.Types.ObjectId, ref:'Post', required: true },
    content:   { type: String },
    time:      { type: Date, required: true },
});

module.exports = mongoose.model('Comment', CommentSchema);
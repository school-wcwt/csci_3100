var mongoose = require('mongoose');

/**
 * @typedef Post
 * @global
 * @property {String} postID
 * @property {Number} type - 0: Check-in; 1: Review.
 * @property {mongoose.Types.ObjectId} author - User created this Post, an instance of [User.Schema]{@link User}.
 * @property {mongoose.Types.ObjectId} target - Rest this Post targets, an instance of [Rest.Schema]{@link Rest}.
 * @property {String} content
 * @property {Date} createdTime
 * @property {Date[]} [modifiedTime] - List of modified time.
 * @property {String[]} [photo] - Links to attached photos. 
 * @property {Number} [rating] - 0 to 10.
 * @property {mongoose.Types.ObjectId[]} [hashtag] - Instances of [Hashtag.Schema]{@link Hashtag}.
 * @property {mongoose.Types.ObjectId[]} [like] - Users liked this Post, instances of [User.Schema]{@link User}.
 * @property {mongoose.Types.ObjectId[]} [comment] - Instances of [Comment.Schema]{@link Comment}.
 */

var PostSchema = mongoose.Schema({
    postID:       { type: String, required: true, unique: true },
    type:         { type: Number, required: true }, // 0: Check-in, 1: Review
    author:       { type: mongoose.Schema.Types.ObjectId, ref:'User', required: true },
    target:       { type: mongoose.Schema.Types.ObjectId, ref:'Rest', required: true },
    content:      { type: String, required: true },
    photo:        [{ type: String }],
    createdTime:  { type: Date, required: true },
    modifiedTime: [{ type: Date }],
    rating:       { type: Number },
    hashtag:      [{ type: mongoose.Schema.Types.ObjectId, ref:'Hashtag' }],
    like:         [{ type: mongoose.Schema.Types.ObjectId, ref:'User' }],
    comment:      [{ type: mongoose.Schema.Types.ObjectId, ref:'Comment' }],
});

module.exports = mongoose.model('Post', PostSchema);
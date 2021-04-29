var mongoose = require('mongoose');

/**
 * @class Post
 * @global
 * @param {String} postID - EntityID + Date.now().
 * @param {Number} type - 0: Check-in; 1: Review.
 * @param {mongoose.Types.ObjectId} author - User created this Post, an instance of [User.Schema]{@link User}.
 * @param {mongoose.Types.ObjectId} target - Rest this Post targets, an instance of [Rest.Schema]{@link Rest}.
 * @param {String} content - Description.
 * @param {Date} createdTime - Created time.
 * @param {Date[]} [modifiedTime] - List of modified time.
 * @param {String[]} [photo] - Links to attached photos. 
 * @param {Number} [rating] - 0 to 10.
 * @param {mongoose.Types.ObjectId[]} [hashtag] - Instances of [Hashtag.Schema]{@link Hashtag}.
 * @param {mongoose.Types.ObjectId[]} [like] - Users liked this Post, instances of [User.Schema]{@link User}.
 * @param {mongoose.Types.ObjectId[]} [comment] - Instances of [Comment.Schema]{@link Comment}.
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
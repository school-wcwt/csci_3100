var mongoose = require('mongoose');

/**
 * @typedef Hashtag
 * @global
 * @property {String} name
 * @property {mongoose.Types.ObjectId} target - Rest of the Post of this Hashtag belongs, instances of [Rest.Schema]{@link Rest}.
 * @property {Number} frequency - Number of times this Hashtag (with target-name pair) appears.
 */

var HashtagSchema = mongoose.Schema({
    name:      { type: String, required: true },
    target:    { type: mongoose.Schema.Types.ObjectId, ref:'Rest', required: true },
    frequency: { type: Number, default: 0, required: true },
});

module.exports = mongoose.model('Hashtag', HashtagSchema);
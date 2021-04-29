var mongoose = require('mongoose');

/**
 * @class Hashtag
 * @global
 * @param {String} name - Name of the Hashtag.
 * @param {mongoose.Types.ObjectId} target - Rest of the Post of this Hashtag belongs, instances of [Rest.Schema]{@link Rest}.
 * @param {Number} frequency - Number of times this Hashtag (with target-name pair) appears.
 */

var HashtagSchema = mongoose.Schema({
    name:      { type: String, required: true },
    target:    { type: mongoose.Schema.Types.ObjectId, ref:'Rest', required: true },
    frequency: { type: Number, default: 0, required: true },
});

module.exports = mongoose.model('Hashtag', HashtagSchema);
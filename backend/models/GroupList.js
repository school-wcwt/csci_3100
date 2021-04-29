var mongoose = require('mongoose');

/**
 * @class GroupList
 * @global
 * @param {String} name - Name of the list.
 * @param {mongoose.Types.ObjectId} author - User who owns this GroupList, an instance of [User.Schema]{@link User}.
 * @param {mongoose.Types.ObjectId[]} content - Stored Rests in this GroupList, instances of [Rest.Schema]{@link Rest}.
 */

var GroupListSchema = mongoose.Schema({
    name:    { type: String, required: true },
    author:  { type: mongoose.Schema.Types.ObjectId, ref:'User', required: true },
    content: [{ type: mongoose.Schema.Types.ObjectId, ref:'Rest', required: true }],
});

module.exports = mongoose.model('GroupList', GroupListSchema);
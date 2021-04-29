var mongoose = require('mongoose');

/**
 * @typedef GroupList
 * @global
 * @property {String} name 
 * @property {mongoose.Types.ObjectId} author - User who owns this GroupList, an instance of [User.Schema]{@link User}.
 * @property {mongoose.Types.ObjectId[]} content - Stored Rests in this GroupList, instances of [Rest.Schema]{@link Rest}.
 */

var GroupListSchema = mongoose.Schema({
    name:    { type: String, required: true },
    author:  { type: mongoose.Schema.Types.ObjectId, ref:'User', required: true },
    content: [{ type: mongoose.Schema.Types.ObjectId, ref:'Rest', required: true }],
});

module.exports = mongoose.model('GroupList', GroupListSchema);
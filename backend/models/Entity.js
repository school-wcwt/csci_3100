var mongoose = require('mongoose');

/**
 * @typedef Entity
 * @global
 * @property {String} entityID - Username + tag.
 * @property {String} username 
 * @property {String} tag - 4-digit tag.
 * @property {Number} verified - 0: Unverified; 1: Verified.
 * @property {Date} joinTime
 * @property {String} type - '{@link User}' or '{@link Rest}' which extends Entity.
 * @property {String} [name]
 * @property {String} [phone]
 * @property {String} [profPhoto]
 * @property {mongoose.Types.ObjectId[]} [followed] - Users who followed this Entity, instances of [User.Schema]{@link User}.
 * @property {mongoose.Types.ObjectId[]} [post] - Posts that this User created, or; Posts (Reviews) that belongs to this Rest. Instances of [Post.Schema]{@link Post}.
 */

var EntitySchema = mongoose.Schema({
    entityID:  { type: String, required: true, unique: true },
    username:  { type: String, required: true }, // Rest: name without space
    tag:       { type: String, required: true },
    verified:  { type: Number, required: true, default: 0 },
    joinTime:  { type: Date,   required: true },
    name:      { type: String },
    phone:     { type: String },
    profPhoto: [{ type: String }],
    followed:  [{ type: mongoose.Schema.Types.ObjectId, ref:'User' }],
    post:      [{ type: mongoose.Schema.Types.ObjectId, ref:'Post' }],
}, { 
    discriminatorKey: 'type'
});

module.exports = mongoose.model('Entity',  EntitySchema);
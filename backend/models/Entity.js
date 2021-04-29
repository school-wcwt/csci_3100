var mongoose = require('mongoose');

/**
 * @class Entity
 * @global
 * @param {String} entityID - Username + tag.
 * @param {String} username - Username.
 * @param {String} tag - 4-digit tag.
 * @param {Number} verified - 0: Unverified; 1: Verified.
 * @param {Date} joinTime - Join time.
 * @param {String} type - '{@link User}' or '{@link Rest}' which extends Entity.
 * @param {String} [name] - Real name.
 * @param {String} [phone] - Phone number.
 * @param {String} [profPhoto] - Profile photo.
 * @param {mongoose.Types.ObjectId[]} [followed] - Users who followed this Entity, instances of [User.Schema]{@link User}.
 * @param {mongoose.Types.ObjectId[]} [post] - Posts that this User created, or; Posts (Reviews) that belongs to this Rest. Instances of [Post.Schema]{@link Post}.
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
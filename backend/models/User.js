var mongoose = require('mongoose');
var Entity = require('./Entity');

/**
 * @typedef UserType
 * @global
 * @property {String} email
 * @property {String} [gender]
 * @property {mongoose.Types.ObjectId[]} [followingUser] - Users this User follows, instances of [User.Schema]{@link User}.
 * @property {mongoose.Types.ObjectId[]} [followingRest] - Rests this User follows, instances of [Rest.Schema]{@link Rest}.
 * @property {mongoose.Types.ObjectId[]} [groupList] - GroupLists this User owns, instances of [GroupList.Schema]{@link GroupList}.
 *
 * @typedef {Entity | UserType} User
 * @description Extends Entity. Discriminate by Entity.type = 'User'.
 */

var UserSchema = mongoose.Schema({
    email:     { type: String, required: true, unique: true },
    gender:    { type: String },
    followingRest: [{ type: mongoose.Schema.Types.ObjectId, ref:'Rest' }],
    followingUser: [{ type: mongoose.Schema.Types.ObjectId, ref:'User' }],
    groupList:     [{ type: mongoose.Schema.Types.ObjectId, ref:'GroupList' }],
});

module.exports = Entity.discriminator('User', UserSchema);
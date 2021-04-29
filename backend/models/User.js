var mongoose = require('mongoose');
var Entity = require('./Entity');

/**
 * @class User
 * @extends Entity
 * @description User extends Entity. Discriminate by Entity.type = 'User'.
 * @global
 * @param {String} email - Email.
 * @param {String} [gender] - Gender. Either 'Female', 'Male', or 'Non-binary'.
 * @param {mongoose.Types.ObjectId[]} [followingUser] - Users this User follows, instances of [User.Schema]{@link User}.
 * @param {mongoose.Types.ObjectId[]} [followingRest] - Rests this User follows, instances of [Rest.Schema]{@link Rest}.
 * @param {mongoose.Types.ObjectId[]} [groupList] - GroupLists this User owns, instances of [GroupList.Schema]{@link GroupList}. 
 */

var UserSchema = mongoose.Schema({
    email:     { type: String, required: true, unique: true },
    gender:    { type: String },
    followingRest: [{ type: mongoose.Schema.Types.ObjectId, ref:'Rest' }],
    followingUser: [{ type: mongoose.Schema.Types.ObjectId, ref:'User' }],
    groupList:     [{ type: mongoose.Schema.Types.ObjectId, ref:'GroupList' }],
});

module.exports = Entity.discriminator('User', UserSchema);
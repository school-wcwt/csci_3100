var mongoose = require('mongoose');
var Entity = require('./Entity');

var UserSchema = mongoose.Schema({
    email:     { type: String, required: true, unique: true },
    password:  { type: String, required: true },
    gender:    { type: String },
    followingRest: [{ type: mongoose.Schema.Types.ObjectId, ref:'Rest' }],
    followingUser: [{ type: mongoose.Schema.Types.ObjectId, ref:'User' }],
    groupList:     [{ type: mongoose.Schema.Types.ObjectId, ref:'GroupList' }],
});

module.exports = Entity.discriminator('User', UserSchema);
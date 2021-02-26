var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
    entity:        { type: mongoose.Schema.Types.ObjectId, ref:'Entity', required: true, unique: true },
    followingRest: [{ type: mongoose.Schema.Types.ObjectId, ref:'Rest' }],
    followingUser: [{ type: mongoose.Schema.Types.ObjectId, ref:'User' }],
    groupList:     [[{ type: mongoose.Schema.Types.ObjectId, ref:'Rest' }]],
});

module.exports = mongoose.model('User', UserSchema);
var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
    entityID:      { type: String, required: true, unique: true },
    entity:        { type: mongoose.Schema.Types.ObjectId, ref:'Entity', required: true, unique: true },
    followingRest: [{ type: mongoose.Schema.Types.ObjectId, ref:'Entity' }],
    followingUser: [{ type: mongoose.Schema.Types.ObjectId, ref:'Entity' }],
    groupList:     [[{ type: mongoose.Schema.Types.ObjectId, ref:'Entity' }]],
});

module.exports = mongoose.model('User', UserSchema);
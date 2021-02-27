var mongoose = require('mongoose');

var EntitySchema = mongoose.Schema({
    entityID:  { type: String, required: true, unique: true },
    type:      { type: Number, required: true }, // 0: User, 1: Restaurant
    username:  { type: String, required: true }, // Rest: name without space
    tag:       { type: Number, required: true },
    email:     { type: String, required: true, unique: true }, // User: email, Rest: mail/address
    password:  { type: String },
    name:      { type: String },
    phone:     { type: String },
    status:    { type: String }, // User: Gender, Rest: Opening Status
    verified:  { type: String }, // User: Email verified, Rest: Claimed
    profPhoto: [{ type: String }],
    openingHr: [[{ type: String }]],
    joinTime:  { type: Date },
    followed:  [{ type: mongoose.Schema.Types.ObjectId, ref:'Entity' }],
    post:      [{ type: mongoose.Schema.Types.ObjectId, ref:'Post' }],
});

module.exports = mongoose.model('Entity',  EntitySchema);
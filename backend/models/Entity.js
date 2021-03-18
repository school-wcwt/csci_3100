var mongoose = require('mongoose');

var EntitySchema = mongoose.Schema({
    entityID:  { type: String, required: true, unique: true },
    username:  { type: String, required: true }, // Rest: name without space
    tag:       { type: String, required: true },
    verified:  { type: Number, required: true, default: '0', },
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
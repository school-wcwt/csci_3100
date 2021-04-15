var mongoose = require('mongoose');

var AuthSchema = mongoose.Schema({
    entityID:     { type: String, required: true, unique: true },
    entity:       { type: mongoose.Schema.Types.ObjectId, ref:'User', required: true },
    email:        { type: String, required: true, unique: true },
    password:     { type: String, required: true },
    authHash:     { type: String },
    accessToken:  { type: String, default: '' },
    refreshToken: { type: String, default: '' },
});

module.exports = mongoose.model('Auth', AuthSchema);
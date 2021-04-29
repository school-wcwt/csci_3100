var mongoose = require('mongoose');

/**
 * @class Auth
 * @global
 * @param {String} entityID - Username + tag.
 * @param {mongoose.Types.ObjectId} entity - Corresponding {@link Entity} ({@link User}) in Entities DB, an instance of [User.Schema]{@link User}.
 * @param {String} email - Email.
 * @param {String} password - Hashed password.
 * @param {String} [authHash] - Verification hash (link).
 * @param {String} [accessToken=''] - Current valid access token.
 * @param {String} [refreshToken=''] - Last valid refresh token.
 */
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
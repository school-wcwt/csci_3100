var mongoose = require('mongoose');

/**
 * @typedef Resv
 * @global
 * @property {String} resvID - EntityID + Date.now().
 * @property {mongoose.Types.ObjectId} author - User who requests the Resv, an instance of [User.Schema]{@link User}.
 * @property {mongoose.Types.ObjectId} target - Rest this Resv targets, an instance of [Rest.Schema]{@link Rest}.
 * @property {Date} time - Time when this Resv take place.
 * @property {Number} status - 0: Sent, 1: Accepted, 2: In progress, 99: Declined.
 * @property {String} info - More info on the Resv.
 */

var ResvSchema = mongoose.Schema({
    resvID: { type: String, required: true, unique: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref:'User', required: true },
    target: { type: mongoose.Schema.Types.ObjectId, ref:'Rest', required: true },
    time:   { type: Date, required: true },
    status: { type: Number, required: true, default: 0},
    info:   { type: String },
});

module.exports = mongoose.model('Resv', ResvSchema);
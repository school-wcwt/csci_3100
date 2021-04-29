var mongoose = require('mongoose');
var Entity = require('./Entity');

/**
 * @typedef RestType
 * @global
 * @property {String} address
 * @property {Number} rating - Sum of rating.
 * @property {String} [status] - Opening status. 'Open', 'Closed', or 'Terminated'.
 * @property {String[][]} [openingHr] - Monday to Sunday, open to close.
 * @property {mongoose.Types.ObjectId[]} [admin] - Admins that can modify this Rest, instances of [User.Schema]{@link User}.
 * @property {mongoose.Types.ObjectId[]} [resv] - Resvs (Reservations) this Rest has, instaces of [Resv.Schema]{@link Resv}.
 * 
 * @typedef {Entity | RestType} Rest
 * @description Extends Entity. Discriminate by Entity.type = 'Rest'.
 */

var RestSchema = mongoose.Schema({
    address:   { type: String, required: true },
    openingHr: [[{ type: String }]],
    status:    { type: String, default: 'Open'},
    rating:    { type: Number, required: true, default: 0 },
    admin:     [{ type: mongoose.Schema.Types.ObjectId, ref:'User' }],
    resv:      [{ type: mongoose.Schema.Types.ObjectId, ref:'Resv' }],
});

module.exports = Entity.discriminator('Rest', RestSchema);

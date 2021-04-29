var mongoose = require('mongoose');
var Entity = require('./Entity');

/**
 * @class Rest
 * @extends Entity
 * @description Rest extends Entity. Discriminate by Entity.type = 'Rest'.
 * @global
 * @param {String} address - Address.
 * @param {Number} rating - Sum of rating.
 * @param {String} [status] - Opening status. 'Open', 'Closed', or 'Terminated'.
 * @param {String[][]} [openingHr] - Monday to Sunday, open to close.
 * @param {mongoose.Types.ObjectId[]} [admin] - Admins that can modify this Rest, instances of [User.Schema]{@link User}.
 * @param {mongoose.Types.ObjectId[]} [resv] - Resvs (Reservations) this Rest has, instaces of [Resv.Schema]{@link Resv}.
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

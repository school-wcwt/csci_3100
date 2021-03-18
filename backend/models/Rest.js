var mongoose = require('mongoose');
var Entity = require('./Entity');

var RestSchema = mongoose.Schema({
    address:   { type: String, required: true },
    openingHr: [[{ type: String }]],
    rating:    { type: Number, required: true, default: 0 },
    admin:     [{ type: mongoose.Schema.Types.ObjectId, ref:'User' }],
    resv:      [{ type: mongoose.Schema.Types.ObjectId, ref:'Resv' }],
});

module.exports = Entity.discriminator('Rest', RestSchema);

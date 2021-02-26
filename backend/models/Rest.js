var mongoose = require('mongoose');

var RestSchema = mongoose.Schema({
    entity:    { type: mongoose.Schema.Types.ObjectId, ref:'Entity', required: true, unique: true },
    rating:    { type: Number, required: true, default: 0 },
    admin:     [{ type: mongoose.Schema.Types.ObjectId, ref:'User' }],
    resv:      [{ type: mongoose.Schema.Types.ObjectId, ref:'Resv' }],
});

module.exports = mongoose.model('Rest', RestSchema);

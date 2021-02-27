var mongoose = require('mongoose');

var RestSchema = mongoose.Schema({
    entityID:  { type: String, required: true, unique: true },
    entity:    { type: mongoose.Schema.Types.ObjectId, ref:'Entity', required: true, unique: true },
    rating:    { type: Number, required: true, default: 0 },
    admin:     [{ type: mongoose.Schema.Types.ObjectId, ref:'Entity' }],
    resv:      [{ type: mongoose.Schema.Types.ObjectId, ref:'Entity' }],
});

module.exports = mongoose.model('Rest', RestSchema);

var mongoose = require('mongoose');

var ResvSchema = mongoose.Schema({
    resvID: { type: String, required: true, unique: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref:'User', required: true },
    target: { type: mongoose.Schema.Types.ObjectId, ref:'Rest', required: true },
    time:   { type: Date, required: true },
    status: { type: Number, required: true, default: 0},
    info:   { type: String },
});

module.exports = mongoose.model('Resv', ResvSchema);
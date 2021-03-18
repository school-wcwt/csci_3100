var mongoose = require('mongoose');

var HashtagSchema = mongoose.Schema({
    name:      { type: String, required: true },
    target:    { type: mongoose.Schema.Types.ObjectId, ref:'Entity', required: true },
    frequency: { type: Number, default: 0, required: true },
});

module.exports = mongoose.model('Hashtag', HashtagSchema);
var mongoose = require('mongoose');

var HashtagSchema = mongoose.Schema({
    tagID:     { type: String, required: true, unique: true },
    name:      { type: String, required: true },
    frequency: { type: Number, default: 0 },
});

module.exports = mongoose.model('Hashtag', HashtagSchema);
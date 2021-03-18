var mongoose = require('mongoose');

var GroupListSchema = mongoose.Schema({
    name:    { type: String, required: true },
    author:  { type: mongoose.Schema.Types.ObjectId, ref:'User' },
    content: [{ type: mongoose.Schema.Types.ObjectId, ref:'Rest' }],
});

module.exports = mongoose.model('GroupList', GroupListSchema);
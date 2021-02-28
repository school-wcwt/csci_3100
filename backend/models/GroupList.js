var mongoose = require('mongoose');

var GroupListSchema = mongoose.Schema({
    name:    { type: String, required: true },
    author:  { type: mongoose.Schema.Types.ObjectId, ref:'Entity' },
    content: [{ type: mongoose.Schema.Types.ObjectId, ref:'Entity' }],
});

module.exports = mongoose.model('GroupList', GroupListSchema);
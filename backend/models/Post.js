var mongoose = require('mongoose');

var PostSchema = mongoose.Schema({
    postID:       { type: String, required: true, unique: true },
    author:       { type: mongoose.Schema.Types.ObjectId, ref:'Entity', required: true },
    target:       { type: mongoose.Schema.Types.ObjectId, ref:'Entity', required: true },
    content:      { type: String },
    photo:        [{ type: String }],
    createdTime:  { type: Date, required: true },
    modifiedTime: { type: Date },
    hashtag:      [{ type: mongoose.Schema.Types.ObjectId, ref:'Hashtag' }],
    like:         [{ type: mongoose.Schema.Types.ObjectId, ref:'Entity' }],
    comment:      [{ type: mongoose.Schema.Types.ObjectId, ref:'Comment' }],
});

module.exports = mongoose.model('Post', PostSchema);
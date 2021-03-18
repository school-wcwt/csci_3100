var mongoose = require('mongoose');

var PostSchema = mongoose.Schema({
    postID:       { type: String, required: true, unique: true },
    type:         { type: Number, required: true }, // 0: Check-in, 1: Review
    author:       { type: mongoose.Schema.Types.ObjectId, ref:'User', required: true },
    target:       { type: mongoose.Schema.Types.ObjectId, ref:'Rest', required: true },
    content:      { type: String },
    photo:        [{ type: String }],
    createdTime:  { type: Date, required: true },
    modifiedTime: [{ type: Date }],
    rating:       { type: Number },
    hashtag:      [{ type: mongoose.Schema.Types.ObjectId, ref:'Hashtag' }],
    like:         [{ type: mongoose.Schema.Types.ObjectId, ref:'User' }],
    comment:      [{ type: mongoose.Schema.Types.ObjectId, ref:'Comment' }],
});

module.exports = mongoose.model('Post', PostSchema);
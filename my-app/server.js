var express = require('express');
var app = express();

var cors = require('cors');
app.use(cors());

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));

// ======== Mongo =========

var mongoose = require('mongoose');
var username = 'e6';
var password = 'e62021';
mongoose.connect('mongodb://'+username+':'+password+'@localhost/csci3100');

var EntitySchema = mongoose.Schema({
    entityID:  { type: String, required: true, unique: true },
    type:      { type: Number, required: true }, // 0: User, 1: Restaurant
    name:      { type: String, required: true },
    email:     { type: String },
    phone:     { type: String },
    status:    { type: String },
    profPhoto: [{ type: String }],
    followed:  [{ type: mongoose.Schema.Types.ObjectId, ref:'User' }],
    post:      [{ type: mongoose.Schema.Types.ObjectId, ref:'Post' }],
});

var UserSchema = mongoose.Schema({
    entity:        { type: mongoose.Schema.Types.ObjectId, ref:'Entity', required: true, unique: true },
    followingRest: [{ type: mongoose.Schema.Types.ObjectId, ref:'Rest' }],
    followingUser: [{ type: mongoose.Schema.Types.ObjectId, ref:'User' }],
    groupList:     [[{ type: mongoose.Schema.Types.ObjectId, ref:'Rest' }]],
});

var RestSchema = mongoose.Schema({
    entity:    { type: mongoose.Schema.Types.ObjectId, ref:'Entity', required: true, unique: true },
    rating:    { type: Number, required: true, default: 0 },
    openingHr: [[{ type: String }]],
    admin:     [{ type: mongoose.Schema.Types.ObjectId, ref:'User' }],
    resv:      [{ type: mongoose.Schema.Types.ObjectId, ref:'Resv' }],
});

var ResvSchema = mongoose.Schema({
    resvID: { type: String, required: true, unique: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref:'User', required: true },
    target: { type: mongoose.Schema.Types.ObjectId, ref:'Rest', required: true },
    time:   { type: Date, required: true },
    status: { type: Number, required: true, default: 0},
    info:   { type: String },
});

var PostSchema = mongoose.Schema({
    postID:       { type: String, required: true, unique: true },
    author:       { type: mongoose.Schema.Types.ObjectId, ref:'User', required: true },
    target:       { type: mongoose.Schema.Types.ObjectId, ref:'Entity', required: true },
    content:      { type: String },
    photo:        [{ type: String }],
    createdTime:  { type: Date, required: true },
    modifiedTime: { type: Date },
    hashtag:      [{ type: mongoose.Schema.Types.ObjectId, ref:'Hashtag' }],
    like:         [{ type: mongoose.Schema.Types.ObjectId, ref:'User' }],
    comment:      [{ type: mongoose.Schema.Types.ObjectId, ref:'Comment' }],
});

var CommentSchema = mongoose.Schema({
    commentID: { type: String, required: true, unique: true },
    author:    { type: mongoose.Schema.Types.ObjectId, ref:'User', required: true },
    content:   { type: String },
    time:      { type: Date, required: true },
});

var HashtagSchema = mongoose.Schema({
    tagID:     { type: String, required: true, unique: true },
    name:      { type: String, required: true },
    frequency: { type: Number, default: 0 },
});

var Entity  = mongoose.model('Entity',  EntitySchema);
var Rest    = mongoose.model('Rest',    RestSchema);
var User    = mongoose.model('User',    UserSchema);
var Post    = mongoose.model('Post',    PostSchema);
var Resv    = mongoose.model('Resv',    ResvSchema);
var Comment = mongoose.model('Comment', CommentSchema);
var Hashtag = mongoose.model('Hashtag', HashtagSchema);

// ========== Helper Functions ===============

var findEntity = entityID => {
    return new Promise((resolve, reject) => {
        Entity
        .findOne({entityID: entityID})
        .exec((err, entity) => {
            if (err) return reject(err);
            if (entity != null) {
                if (!entity.type) {
                    User
                    .findOne({entity: entity._id})
                    .select({_id: 0, __v: 0})
                    .populate('entity', {_id: 0, __v: 0})
                    .exec((err, user) => {
                        if (err) return reject(err);
                        if (user != null) return resolve(user);
                    })
                }
                else if (!entity.type) {
                    Rest
                    .findOne({entity: entity._id})
                    .select({_id: 0, __v: 0})
                    .populate('entity', {_id: 0, __v: 0})
                    .exec((err, rest) => {
                        if (err) return reject(err); 
                        if (rest != null) return resolve(rest);
                    })
                }
                return resolve(null); // if user/rest not found
            }
            return resolve(null); // if entity not found
        })
    })   
};
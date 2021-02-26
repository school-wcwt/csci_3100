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
    username:  { type: String, required: true }, // Rest: name without space
    tag:       { type: Number, required: true },
    email:     { type: String, required: true }, // User: email, Rest: mail/address
    password:  { type: String },
    name:      { type: String },
    phone:     { type: String },
    status:    { type: String },
    profPhoto: [{ type: String }],
    openingHr: [[{ type: String }]],
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

var findEntity = (filter, entityOnly = 0, populate = 1) => {
    return new Promise((resolve, reject) => {
        Entity
        .findOne(filter)
        .exec((err, entity) => {
            if (err) return reject(err);
            if (entity == null) return resolve(null);
            if (entity != null) {
                if (entityOnly) return resolve(entity);
                if (!entity.type) {
                    let query = User.findOne({entity: entity._id})
                    if (populate) query.populate('entity')
                    query.exec((err, user) => {
                        if (err) return reject(err);
                        if (user == null) return resolve(null);
                        if (user != null) return resolve(user);
                    })
                }
                else if (entity.type) {
                    let query = Rest.findOne({entity: entity._id})
                    if (populate) query.populate('entity')
                    query.exec((err, rest) => {
                        if (err) return reject(err); 
                        if (rest == null) return resolve(null);
                        if (rest != null) return resolve(rest);
                    })
                }
            }
        })
    })   
};

var addEntity = data => {
    var addEntityIntoDB = data => {
        return new Promise((resolve, reject) => {
            var tagGen = () => { return '' + Math.random().toString().substr(2, 4); };
            var tag = tagGen();
            if (data.type) data.username = data.name.replace(/ /g, '');
            var entityID = data.username + tag;
            var newEntity = new Entity({entityID: entityID, tag: tag, ...data});
            newEntity.save((err, savedEntity) => {
                if (err) return reject(err);
                if (!data.type)     var newSubentity = new User({entity: savedEntity._id})
                else if (data.type) var newSubentity = new Rest({entity: savedEntity._id})
                newSubentity.save((err) => {
                    if (err) return reject(err);
                    findEntity({entityID: entityID})
                    .then(savedEntity => { return resolve(savedEntity); })
                    .catch(err => { return reject(err) });
                })
            })
        })
    }
    
    return new Promise((resolve, reject) => {
        findEntity({email: data.email})
        .then(prevEntity => {
            if (prevEntity != null) return reject(new Error('(E)Mail already in DB.'));
            if (prevEntity == null) 
                addEntityIntoDB(data)
                .then(res => { return resolve(res) })
                .catch(err => { return reject(err) });
        })
        .catch(err => { return reject(err) });
    })
}

var updateEntity = (filter, data) => {
    return new Promise((resolve, reject) => {
        if (data.email != null) 
            findEntity({email: data.email})
            .then(entity => {
                if (entity != null) return reject(new Error('New (e)mail already in DB.'));
                if (entity == null)
                    Entity
                    .findOneAndUpdate(filter, data)
                    .exec((err, oldEntity) => {
                        if (err) return reject(err);
                        if (oldEntity == null) return reject(new Error('Entity not found'));
                        findEntity({entityID: oldEntity.entityID}, 1)
                        .then(updatedEntity => { return resolve({oldEntity: oldEntity, updatedEntity: updatedEntity}) })
                        .catch(err => { return reject(err) })
                    })
            })
    })
}


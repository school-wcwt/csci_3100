var express = require('express');
var app = express();

var cors = require('cors');
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended: true}));

// ======== Mongo =========

var mongoose = require('mongoose');
var username = 'e6';
var password = 'e62021';
mongoose.connect('mongodb://'+username+':'+password+'@localhost/csci3100');

// ========== Helper Functions ===============

// http://localhost:3100/entity

app.use('/entity', require('./routes/entity'));
app.use('/user', require('./routes/user'));

var entityFunc = require('./routes/entityFunc');
var userFunc = require('./routes/userFunc');
const postFunc = require('./routes/postFunc');
const tagFunc = require('./routes/hashtagFunc');

app.listen(3100);

/*entityFunc.createEntity({
    username: 'MyRest',
    type: 1,
    email: '15 Shatin',
}).then(res => console.log(res))*/
/*
postFunc.createPost({entityID: 'tom_wong-9190'}, {entityID: 'MyRest-6758'}, {
    type: 1,
    content: 'hello',
    hashtag: ['Good-Rest', 'Japan'],
}).then(res => console.log(res));
*/
/*tagFunc.useTags([], ['Japan', 'Chinese'])
.then(res => console.log(res));*/

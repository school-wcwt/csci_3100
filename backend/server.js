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
const commentFunc = require('./routes/commentFunc');

app.listen(3100);

//jon-0571         60533f9e6019086c692576a9
//jon-rest2-6053   60533f7de94b6f6bc1a40599

/*postFunc.createPost({author: '60533f9e6019086c692576a9', target: '60533f7de94b6f6bc1a40599'}, 'jon-0571', {
    type: 1, content: 'Fuck me', hashtag: ['Japan', 'OK-la']
}).then(res => console.log(res));*/

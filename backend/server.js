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

//tom_wong-9190 60506e3e9d24911e1dcc0fe8
//MyRest        6051acd99dea5f25e689e720



var express = require('express');
var app = express();

var cors = require('cors');
app.use(cors());

require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

// ======== Mongo =========

var mongoose = require('mongoose');
var username = 'e6';
var password = 'e62021';
mongoose.connect('mongodb://'+username+':'+password+'@localhost/csci3100');

// ========== Helper Functions ===============

// http://localhost:3100/entity

const checkAuth = require('./middleware/checkAuth');

app.use('/', require('./routes/auth'));
app.use('/entity', checkAuth, require('./routes/entity'));
app.use('/user',   checkAuth, require('./routes/user'));

app.listen(3100);

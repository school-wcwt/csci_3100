var express = require('express');
var app = express();

var cors = require('cors');
app.use(cors());

/*var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));*/
app.use(express.urlencoded({extended: true}));

// ======== Mongo =========

var mongoose = require('mongoose');
var username = 'e6';
var password = 'e62021';
mongoose.connect('mongodb://'+username+':'+password+'@localhost/csci3100');

// ========== Helper Functions ===============

app.use('/user', require('./routes/user'))
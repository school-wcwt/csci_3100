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

var {findEntity, createEntity, updateEntity, deleteEntity} = require('./routes/user_func');

/*createEntity({
    type: 0,
    username: 'jonathanlph2',
    password: 'jonlam',
    name: 'Jonathan Lam',
    email: 'jonathan.lph2@hotmail.com',
}).then(e => console.log(e))
.catch(err => console.error(err));*/

/*findEntity({
    entityID: 'jonathanlph2#8546'
}, 0, {entitySel: null, subentityPop: {path: 'followingUser', select: 'username tag'}})
.then(e => console.log(e))
.catch(err => console.error(err));*/
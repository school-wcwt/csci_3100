var express = require('express');
var app = express();

var cors = require('cors');
//app.use(cors());

/*var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));*/
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

/*entityFunc.createEntity({
    type: 0,
    username: 'Nick',
    password: 'nick',
    name: 'Nick ',
    email: 'nick@hotmail.com',
})
.then(e => console.log(e))
.catch(err => console.error(err));*/

/*entityFunc.findEntity({
    entityID: 'Nick-7816'
}, 1)
.then(e => console.log(e))
.catch(err => console.error(err));*/

/*findEntityID({
    entityID: 'jonathanlph2#8546'
})
.then(e => console.log(e))
.catch(err => console.error(err));*/

/*userFunc.updateFollow({entityID: 'jonathanlph#4017'}, {entityID: 'jonathanlph2#8546'}, false)
.then(e => console.log(e))
.catch(err => console.error(err))*/

/*userFunc.updateList({entityID: 'jonathanlph2#4956'}, 'favlist6', 0)
.then(e => console.log(e))
.catch(err => console.error(err))*/

app.listen(3100);
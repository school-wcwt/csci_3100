var express = require('express');
var app = express();

var cors = require('cors');
app.use(cors({origin: /http:\/\/localhost:30[0-9]{2}$/, credentials: true}));

const cookieParser = require('cookie-parser')
app.use(cookieParser())

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

const verifyAuth = require('./middleware/verifyAuth');

app.use('/',                             require('./routes/auth'));
app.use('/entity',    verifyAuth.access, require('./routes/entity'));
app.use('/grouplist', verifyAuth.access, require('./routes/groupList'));
app.use('/post',      verifyAuth.access, require('./routes/post'));
app.use('/comment',   verifyAuth.access, require('./routes/comment'));
app.use('/hashtag',   verifyAuth.access, require('./routes/hashtag'));

const PORT = require('./config').backendPort
console.log(`----------Port: ${PORT}-----------`);
app.listen(PORT);

/*require('./routes/entityFunc').createEntity({
    username: 'jon-rest',
    type: 'Rest',
    address: '15 Shatin'
}).then(res => console.log(res));

require('./routes/entityFunc').createEntity({
    username: 'jon',
    type: 'User',
    email: 'jon@test.com',
    password: 'jonlam'
}).then(res => console.log(res));*/
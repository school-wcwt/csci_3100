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

const verifyAuth = require('./middlewares/verifyAuth');

app.use('/',                             require('./routers/auth'));
app.use('/entity',    verifyAuth.access, require('./routers/entity'));
app.use('/grouplist', verifyAuth.access, require('./routers/groupList'));
app.use('/post',      verifyAuth.access, require('./routers/post'));
app.use('/comment',   verifyAuth.access, require('./routers/comment'));
app.use('/hashtag',   verifyAuth.access, require('./routers/hashtag'));

const PORT = require('./config').backendPort
console.log(`----------Port: ${PORT}-----------`);
app.listen(PORT);
const jwt = require('jsonwebtoken');
const config = require('../config.js');

var checkAuth = (req, res, next) => {
    let token = req.headers['x-access-token'] || req.headers['authorization'];
    if (!token) return res.status(403).json({message: 'Auth token not supplied.'})
    if (token.startsWith('Bearer ')) token = token.slice(7, token.length);
    jwt.verify(token, config.jwtSecret, (err, decoded) => {
        if (err || !decoded) return res.status(400).json({message: 'Invalid token.'})            
        res.locals.user = decoded;
        next();
    })
};

module.exports = checkAuth;
const jwt = require('jsonwebtoken');
const config = require('../config.js');

var checkAuth = (req, res, next) => {
    let token = req.headers['x-access-token'] || req.headers['authorization'];
    if (token) {
        if (token.startsWith('Bearer ')) token = token.slice(7, token.length);
        jwt.verify(token, config.jwtSecret, (err, decoded) => {
            if (!decoded) return res.status(403).json({message: 'Auth token not supplied.'})
            if (err) return res.status(403).json({message: 'Invalid token.'})
            else next();
        })
    }
};

module.exports = checkAuth;
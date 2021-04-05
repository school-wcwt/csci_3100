const jwt = require('jsonwebtoken');
const config = require('../config.js');
const Auth = require('../models/Auth');

var access = (req, res, next) => {
    (async() => { try {
        //let token = req.headers['authorization'];
        let token = req.cookies.access_token;
        if (!token) return res.status(403).json('Access token not supplied.')
        //if (token.startsWith('Bearer ')) token = token.slice(7, token.length);
        let decoded = await jwt.verify(token, config.accessSecret)
        let entity = await Auth.findOne({entity: decoded.entity_id}).exec()
        if (entity.accessToken == '') return res.status(403).json('Invalid access token.') 
        await Auth.updateOne({entity: decoded.entity_id}, {refreshToken: decoded.parentRT})
        res.locals.user = decoded;
        next();
    } catch (err) {
        if (err.name == 'JsonWebTokenError') res.status(401).json('Invalid access token.')
        else if (err.name == 'TokenExpiredError') res.status(401).json('Token expired.')
        else res.status(500).json(err.message);
    }})()
};

var refresh = (req, res, next) => {
    (async() => { try {
        let token = req.cookies.refresh_token;
        if (!token) return res.status(403).json('Refresh token not supplied.')
        let decoded = await jwt.verify(token, config.refreshSecret);
        let entity = await Auth.findOne({entity: decoded.entity_id}).exec();
        if (entity.refreshToken != decoded.parentRT) {
            await Auth.updateOne(
                {entity: decoded.entity_id}, 
                {accessToken: '', refreshToken: ''})
            throw new Error('Token compromised.');
        } 
        // Invalidate old token (in DB) and replace as recieved token
        await Auth.updateOne({entity: decoded.entity_id}, {refreshToken: token})
        res.locals.user = decoded;
        res.locals.token = token;
        next();
    } catch (err) {
        if (err.name == 'JsonWebTokenError') res.status(401).json('Invalid refresh token.')
        else if (err.name == 'TokenExpiredError') res.status(401).json('Token expired.')
        else if (err.message == 'Token compromised.') res.status(401).json('Token compromised. Revoked.')
        else res.status(500).json(err.message);
    }})()
};

module.exports = {
    access,
    refresh,
};
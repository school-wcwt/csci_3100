/** 
 * Middlewares for verifying access and refresh tokens.
 * @module middlewares/verifyAuth 
 */

const express = require('express')
const jwt = require('jsonwebtoken');
const config = require('../config.js');
const Auth = require('../models/Auth');

/**
 * Validate access token and fetch corresponding user.
 * @static
 * @param {express.Request} req 
 * @param {express.Response} res 
 * @param {express.NextFunction} next 
 * @throws Access token not supplied.
 * @throws Invalid access token.
 * @throws Token expired.
 */
var access = (req, res, next) => {
    (async() => { try {
        /*  -- OBSOLETE --
            // Fetch token from Header
            let token = req.headers['authorization'];
            if (token.startsWith('Bearer ')) token = token.slice(7, token.length); 
            -------------- */ 
        // Fetch token from cookies
        let token = req.cookies.access_token;
        if (!token) return res.status(403).json('Access token not supplied.')
        // Decode and compare token with Auths DB
        let decoded = await jwt.verify(token, config.accessSecret)
        let entity = await Auth.findOne({entity: decoded.entity_id}).exec()
        if (entity.accessToken == '') return res.status(403).json('Invalid access token.') 
        // Confirm user received new refresh-access token pair; Update in Auths DB
        await Auth.updateOne({entity: decoded.entity_id}, {refreshToken: decoded.parentRT})
        // Pass to next
        res.locals.user = decoded;
        next();
    } catch (err) {
        if (err.name == 'JsonWebTokenError') return res.status(401).json('Invalid access token.')
        if (err.name == 'TokenExpiredError') return res.status(401).json('Token expired.')
        return res.status(500).json(err.message);
    }})()
};

/**
 * Validate refresh token and fetch corresponding user.
 * @static
 * @param {express.Request} req 
 * @param {express.Response} res 
 * @param {express.NextFunction} next 
 * @throws Refresh token not supplied.
 * @throws Token compromised. Revoked.
 * @throws Invalid refresh token.
 * @throws Token expired.
 */
var refresh = (req, res, next) => {
    (async() => { try {
        // Fetch token from cookies
        let token = req.cookies.refresh_token;
        if (!token) return res.status(403).json('Refresh token not supplied.')
        // Decode and compare token with Auths DB
        let decoded = await jwt.verify(token, config.refreshSecret);
        let entity = await Auth.findOne({entity: decoded.entity_id}).exec();
        // If not match, revoke current refresh-access token pair in Auths DB and in request
        if (entity.refreshToken != `RT-${decoded.iat}-${decoded.exp}`) {
            await Auth.updateOne(
                {entity: decoded.entity_id}, 
                {accessToken: '', refreshToken: ''})
            res.cookie('refresh_token', '', {maxAge: 0})
            res.cookie('access_token',  '', {maxAge: 0})
            return res.status(401).json('Token compromised. Revoked.')
        } 
        // If match, invalidate previous token and replace as recieved token in Auths DB
        await Auth.updateOne({entity: decoded.entity_id}, {refreshToken: `RT-${decoded.iat}-${decoded.exp}`})
        // Pass to next
        res.locals.user = decoded;
        next();
    } catch (err) {
        if (err.name == 'JsonWebTokenError') res.status(401).json('Invalid refresh token.')
        else if (err.name == 'TokenExpiredError') res.status(401).json('Token expired.')
        else res.status(500).json(err.message);
    }})()
};


module.exports = {
    access,
    refresh,
};
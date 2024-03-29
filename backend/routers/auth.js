/** 
 * Express router providing {@link User} authentication related routes.
 * @module routers/auth
 * @requires express
 * @requires jsonwebtoken
 * @requires bcrypt
 * @requires cors
 */

var express = require('express');
var router  = express.Router();

const jwt    = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const Mongoose = require('mongoose')
const cors   = require('cors');

const config     = require('../config');
const verifyAuth = require('../middlewares/verifyAuth');
const entityFunc = require('../functions/entityFunc');

const Auth   = require('../models/Auth');
const Entity = require('../models/Entity');
const Rest   = require('../models/Rest');
const User   = require('../models/User');

const MaxRefreshDays = 60;

// ====================
//   Helper Functions
// ====================

/**
 * Create a JWT token.
 * @private
 * @param {String} entityID - User.entityID
 * @param {Mongoose.Types.ObjectId} entity_id - User._id
 * @param {String|Number} duration - Valid duration of the token.
 * @param {String} parentRT - The parent of a refresh token (RT) or the associated RT of the access token, in form of label.
 * @param {String} secret - Signature of the token.
 * @returns {String} Created JWT token.
 */
var createToken = (entityID, entity_id, duration, parentRT, secret) => {
    var payload = { entityID, entity_id, duration, parentRT };
    return jwt.sign(payload, secret, { expiresIn: duration });
}

/**
 * Extend the period of a JWT refresh token.
 * @private
 * @param {Object} payload - Payload of the token.
 * @param {Number} durationInDays - Extending duration in number of days.
 * @param {String} parentRT - The parent of the refresh token.
 * @returns {{token: String, label: String}} Created JWT refresh token and its label (in DB).
 */
var extendToken = (payload, durationInDays, parentRT) => {
    newExp = payload.exp + (durationInDays * 24 * 3600);
    maxExp = payload.iat + (MaxRefreshDays * 24 * 3600);
    payload.exp = newExp <= maxExp ? newExp : maxExp;
    payload.parentRT = parentRT;
    return {
        token: jwt.sign(payload, config.refreshSecret), 
        label: `RT-${payload.iat}-${payload.exp}`
    };
}

// ====================
//        Routes
// ====================

/**
 * This route refreshs a currently existing refresh token. Through {@link module:middlewares/verifyAuth.refresh}, it checks if the user has received RT0-AT0 pair and stores RT0 into database. It then generates a new RT1-AT1 pair, stores AT1 into database, and sends RT1-AT1 pair and the corresponding logined user back as the response. When the access token (AT1) is received in the next request to the server, RT1 is stored into database, confirming its receipt.
 * @summary Refresh a token. 
 * @instance 
 * @function POST/refresh
 * @see module:middlewares/verifyAuth.refresh
 * @requires module:middlewares/verifyAuth.refresh
 * @param {String} path - Express path.
 * @param {Callback} middleware - Express middleware. 
 * @param {RouteCallback} callback - Express callback.
 * @returns {Entity} 200 - Logined User.
 * @throws 500 - Server error.
 */
router.post('/refresh', verifyAuth.refresh, (req, res) => {
    (async () => { try {
        let entityID = res.locals.user.entityID;
        let entity_id = res.locals.user.entity_id;
        let decoded = res.locals.user;
        // Extend current token - 2 weeks
        let refresh_token_raw = extendToken(
            res.locals.user, 14, 
            `RT-${decoded.iat}-${decoded.exp}`);
        let refresh_token = refresh_token_raw.token;
        // Create new access token - 1 hour
        let access_token = createToken(
            entityID, entity_id, '1h',
            refresh_token_raw.label, config.accessSecret);
        // Store access token in Auths DB
        await Auth.updateOne({entity: entity_id}, {accessToken: access_token}).exec();
        // Fetch User info
        let user = await entityFunc.findEntity({_id: entity_id});
        // Set cookies in response
        res.cookie('refresh_token', refresh_token, {
            maxAge: 14 * 60 * 60 * 1000,
            httpOnly: false,
        })
        res.cookie('access_token', access_token, {
            maxAge: 60 * 60 * 1000,
            httpOnly: true,
        })
        res.status(200).json(user)
    } catch (err) { res.status(500).json(err.message) }
    })()
})

/**
 * @typedef {Object} POST/login-ReqBody
 * @property {Object} filter - Searching filter for the User, an instance of [Entity.Schema]{@link Entity} ([User.Schema]{@link User}).
 * @property {String} password - Raw string of password.
 */
/**
 * @callback POST/login-Callback
 * @param {express.Request<{}, {}, module:routers/auth~POST/login-ReqBody>} req - Express request. 
 * @param {express.Response} res - Express response. 
 */
/**
 * This route logins an User. The User is only logged in if they have the correct entity-password pair and are verified. This route generates a new RT-AT pair, stores AT into database, and sends the RT-AT pair and the corresponding logined user back as the response. When the access token (AT) is received in the next request to the server, RT is stored into database, confirming its receipt.
 * @summary Login an User.
 * @instance
 * @function POST/login
 * @param {String} path - Express path.
 * @param {module:routers/auth~POST/login-Callback} callback - Express callback.
 * @returns {Entity} 200 - Logined user.
 * @throws 403 - Incorrect password. / Not verified.
 * @throws 404 - Entity not found.
 * @throws 500 - Server error.
 */
router.post('/login', (req, res) => {

    /**
     * Verify password and verification status.
     * @private
     * @param {Object} filter - Searching filter for the User, an instance of [Entity.Schema]{@link Entity} ([User.Schema]{@link User}).
     * @param {string} password - Raw string of password.
     * @returns {Promise<{auth: Entity, user: Entity}>} Logined Entity in Auths and Entities (Users) DB.
     * @throws Entity not found.
     * @throws Incorrect password.
     * @throws Not verified.
     */
    var auth = (filter, password) => {
        return new Promise((resolve, reject) => {
            (async () => { try {
                // Fetch Entity and compare password
                var entity = await Auth.findOne(filter).exec();
                if (entity == null) throw new Error('Entity not found.');
                var match = await bcrypt.compare(password, entity.password)
                if (!match) throw new Error('Incorrect password.')
                // Only allow login if verified
                var loginedEntity = await entityFunc.findEntity({entityID: entity.entityID})
                if (!loginedEntity.verified) throw new Error('Not verified.')
                return resolve({auth: entity, user: loginedEntity});
            } catch(err) { return reject(err) } })();
        })
    }

    (async () => { try {
        // Verify password and verification status
        var entity = await auth(req.body.filter, req.body.password);
        // Create new refresh (2 weeks) and access token (1 hour)
        let refresh_token = createToken(
            entity.user.entityID, entity.user._id, '14d',
            entity.auth.refreshToken, config.refreshSecret);
        let decoded = await jwt.verify(refresh_token, config.refreshSecret)
        let access_token = createToken(
            entity.user.entityID, entity.user._id, '1h',
            `RT-${decoded.iat}-${decoded.exp}`, config.accessSecret);
        // Store access token in Auths DB
        await Auth.updateOne({entity: entity.user._id}, {accessToken: access_token}).exec();
        // Set cookies in response
        res.cookie('refresh_token', refresh_token, {
            maxAge: 14 * 24 * 60 * 60 * 1000,
            httpOnly: false,
        })
        res.cookie('access_token', access_token, {
            maxAge: 60 * 60 * 1000,
            httpOnly: true,
        })
        res.status(200).json(entity.user)
    } catch (err) {
        if (err.message == 'Entity not found.') res.status(404).json(err.message)
        else if (err.message == 'Incorrect password.' || err.message == 'Not verified.') res.status(403).json(err.message)
        else res.status(500).json(err.message);
    }})()

})

/**
 * @typedef {Object} POST/register-ReqBody
 * @see User
 * @see Entity
 * @property {String} username
 * @property {String} password 
 * @property {String} email
 * @property {String} [name]
 * @property {String} [phone]
 * @property {String[]} [profPhoto]
 * @property {String} gender
 */
/**
 * @callback POST/register-Callback
 * @param {express.Request<{}, {}, module:routers/auth~POST/register-ReqBody>} req - Express request. 
 * @param {express.Response} res - Express response. 
 */

/**
 * Register a new user.
 * @instance
 * @function POST/register
 * @requires module:function/entity.createEntity
 * @param {String} path - Express path.
 * @param {module:routers/auth~POST/register-Callback} callback - Express callback.
 * @returns {Entity} 201 - New User.
 * @throws 409 - Email exists.
 * @throws 500 - Server error.
 */
router.post('/register', (req, res) => {
    entityFunc.createEntity({...req.body, type: 'User'})
    .then(createdEntity => res.status(201).json(createdEntity))
    .catch(err => {
        if (err.message == 'Email exists.') res.status(409).json(err.message);
        else res.status(500).json(err.message);
    })
})

/**
 * @typedef {Object} POST/verify-ReqBody
 * @property {String} entityID - EntityID of the verifying User.
 * @property {String} authHash - Verification hash.
 */

/**
 * @callback POST/verify-Callback
 * @param {express.Request<{}, {}, module:routers/auth~POST/verify-ReqBody>} req - Express request. 
 * @param {express.Response} res - Express response. 
 */

/**
 * Verify an existing user.
 * @instance 
 * @function POST/verify
 * @param {String} path - Express path.
 * @param {module:routers/auth~POST/verify-Callback} callback - Express callback.
 * @returns {Entity} 200 - OK.
 * @throws 403 - Wrong link.
 * @throws 404 - Entity not found.
 * @throws 500 - Server error.
 */
router.post('/verify', (req, res) => {
    (async () => { try {
        var entity = await Auth.findOne({entityID: req.body.entityID})
        if (entity == null) throw new Error('Entity not found.')
        if (req.body.authHash != entity.authHash) throw new Error('Wrong link.')
        else {
            await Entity.updateOne({entityID: req.body.entityID, type: 'User'}, {verified: 1})
            return res.status(200).json('OK.')
        }
    } catch (err) {
        if (err.message == 'Entity not found.') res.status(404).json(err.message)
        else if (err.message == 'Wrong link.') res.status(403).json(err.message)
        else res.status(500).json(err.message);
    }})()    
})

/**
 * Logout an User.
 * @instance
 * @function POST/logout
 * @requires module:middlewares/verifyAuth.access
 * @param {String} path - Express path.
 * @param {RouteCallback} callback - Express callback.
 * @returns {Entity} 200 - OK.
 * @throws 500 - Server error.
 */
router.post('/logout', verifyAuth.access, (req, res) => {
    const filter = {entityID: res.locals.user.entityID};
    Auth.updateOne(filter, {accessToken: '', refreshToken: ''}).exec()
    .then(resp => {
        res.clearCookie('refresh_token');
        res.clearCookie('access_token');
        res.status(200).json('OK.')
    })
    .catch(err => res.status(500).json(err.message));
})

module.exports = router;
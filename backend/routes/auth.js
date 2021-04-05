var express = require('express');
var router = express.Router();

const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const cors = require('cors');

const entityFunc = require('../functions/entityFunc');
const config = require('../config');
const verifyAuth = require('../middleware/verifyAuth');
const Auth = require('../models/Auth');

const MaxRefreshDays = 60;

var createToken = (entityID, entity_id, duration, parentRT, secret) => {
    var payload = { entityID, entity_id, duration, parentRT };
    return jwt.sign(payload, secret, { expiresIn: duration });
}

var extendToken = (payload, durationInDays, parentRT) => {
    newExp = payload.exp + (durationInDays * 24 * 3600);
    maxExp = payload.iat + (MaxRefreshDays * 24 * 3600);
    payload.exp = newExp <= maxExp ? newExp : maxExp;
    payload.parentRT = parentRT;
    return jwt.sign(payload, config.refreshSecret);
}

// ----- Routes -----

router.post('/refresh', verifyAuth.refresh, (req, res) => {
    (async () => { try {
        let entityID = res.locals.user.entityID;
        let entity_id = res.locals.user.entity_id;
        let refresh_token = extendToken(
            res.locals.user, 14, res.locals.token);
        let access_token = createToken(
            entityID, entity_id, '1h',
            refresh_token, config.accessSecret);
        await Auth.updateOne({entity: entity_id}, {accessToken: access_token}).exec();
        let user = await entityFunc.findEntity({_id: entity_id});
        res.cookie('refresh_token', refresh_token, {
            maxAge: 14 * 60 * 60 * 1000,
            httpOnly: true,
        })
        res.cookie('access_token', access_token, {
            maxAge: 60 * 60 * 1000,
            httpOnly: true,
        })
        res.status(200).json({
            //access_token: access_token,
            //refresh_token: refresh_token,
            message: user
        })
    } catch (err) { res.status(500).json(err.message) }
    })()
})

router.post('/login', (req, res) => {

    var auth = (filter, password) => {
        return new Promise((resolve, reject) => {
            (async () => { try {
                var entity = await Auth.findOne(filter).exec();
                if (entity == null) throw new Error('Entity not found.');
                var match = await bcrypt.compare(password, entity.password)
                if (!match) throw new Error('Incorrect password.')
                var loginedEntity = await entityFunc.findEntity({entityID: entity.entityID})
                return resolve({auth: entity, user: loginedEntity});
            } catch(err) { return reject(err) } })();
        })
    }

    (async () => { try {
        var entity = await auth(req.body.filter, req.body.password);
        let refresh_token = createToken(
            entity.user.entityID, entity.user._id, '14d',
            entity.auth.refreshToken, config.refreshSecret);
        let access_token = createToken(
            entity.user.entityID, entity.user._id, '1h',
            refresh_token, config.accessSecret);
        await Auth.updateOne({entity: entity.user._id}, {accessToken: access_token}).exec();
        res.cookie('refresh_token', refresh_token, {
            maxAge: 14 * 24 * 60 * 60 * 1000,
            httpOnly: true,
        })
        res.cookie('access_token', access_token, {
            maxAge: 60 * 60 * 1000,
            httpOnly: true,
        })
        res.status(200).json({
            //access_token: access_token,
            //refresh_token: refresh_token,
            message: entity.user
        })
    } catch (err) {
        if (err.message == 'Entity not found.') res.status(404).json(err.message)
        else if (err.message == 'Incorrect password.') res.status(403).json(err.message)
        else res.status(500).json(err.message);
    }})()

})

router.post('/register', (req, res) => {
    entityFunc.createEntity({...req.body, type: 'User'})
    .then(createdEntity => res.status(201).json(createdEntity))
    .catch(err => {
        if (err.message == 'Email exists.') res.status(409).json(err.message);
        else res.status(500).json(err.message);
    })
})

router.post('/logout', (req, res) => {
    Auth.updateOne(req.body.filter, {accessToken: '', refreshToken: ''}).exec()
    .then(resp => {
        res.clearCookie('refresh_token');
        res.status(200).json('OK')
    })
    .catch(err => res.status(500).json(err.message));
})

module.exports = router;
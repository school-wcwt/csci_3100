var express = require('express');
var router = express.Router();

const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');

const entityFunc = require('../functions/entityFunc');
const config = require('../config');

var createJWT = (entityID, entity_id, duration) => {
    const payload = { entityID, entity_id, duration };
    return jwt.sign(payload, config.jwtSecret, {
        expiresIn: duration
    });
}

var auth = (filter, password) => {
    return new Promise((resolve, reject) => {
        (async () => { try {
            var entity = await entityFunc.findEntity(filter, {select: ''});
            if (entity == null || entity.type == 'Rest') throw new Error('Entity not found.');
            var match = await bcrypt.compare(password, entity.password)
            if (!match) throw new Error('Incorrect password.')
            var loginedEntity = await entityFunc.findEntity({entityID: entity.entityID})
            return resolve(loginedEntity);
        } catch(err) { return reject(err) } })();
    })
}

router.post('/login', (req, res) => {
    (async () => { try {
        var loginedEntity = await auth(req.body.filter, req.body.password);
        let access_token = createJWT(
            loginedEntity.entityID, 
            loginedEntity._id, 
            3600);
        let decoded = await jwt.verify(access_token, config.jwtSecret)
        if (decoded) {res.status(200).json({
            token: access_token,
            message: loginedEntity
        })}
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

module.exports = router;
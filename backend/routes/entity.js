var express = require('express');
var router = express.Router();

const entityFunc = require('../functions/entityFunc');
const userFunc = require('../functions/userFunc');
// Unauthorized Queries

router.get('/:entityID', (req, res) => { 
    entityFunc.findEntity({entityID: req.params.entityID})
    .then(entity => {
        if (entity == null) return res.status(204).json(null);
        return res.status(200).json(entity);
    })
    .catch(err => res.status(500).json(err))
})

router.post('/', (req, res) => {
    entityFunc.findEntities(req.body.filter)
    .then(entities => {
        if (entities == null) return res.status(204).json(null);
        return res.status(200).json(entities);     
    })
    .catch(err => res.status(500).json(err))
})

// Authorized Queries

router.post('/new', (req, res) => {
    entityFunc.createEntity({...req.body, type: 'Rest'})
    .then(createdEntity => res.status(201).json(createdEntity))
    .catch(err => res.status(500).json(err.message));
})

router.put('/', (req, res) => {
    var filter = {entityID: res.locals.user.entityID};
    entityFunc.updateEntity(filter, req.body.data)
    .then(updatedEntity => res.status(200).json(updatedEntity))
    .catch(err => {
        if (err.message == 'Email exists.') res.status(409).json(err);
        else if (err.message == 'Entity not found.') res.status(404).json(err);
        else res.status(500).json(err);
    })
})

router.delete('/', (req, res) => {
    var filter = {entityID: res.locals.user.entityID};
    entityFunc.deleteEntity(filter)
    .then(deletedEntity => res.status(200).json(deletedEntity))
    .catch(err => {
        if (err.message == 'Entity not found.') res.status(404).json(err);
        else res.status(500).json(err);
    })
})

router.patch('/follow/:entityID', (req, res) => {
    var authorFilter = {entityID: res.locals.user.entityID};
    var targetFilter = {entityID: req.params.entityID};
    userFunc.updateFollow(authorFilter, targetFilter, req.body.addFlag)
    .then(updatedEntity => res.status(200).json(updatedEntity))
    .catch(err => {
        if (err.message == 'Entity not found.') res.status(404).json(err.message)
        else res.status(500).json(err.message)
    })
})

module.exports = router;
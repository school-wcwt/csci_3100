var express = require('express');
var router = express.Router();

const entityFunc = require('../functions/entityFunc');

router.get('/:entityID', (req, res) => { 
    entityFunc.findEntity({entityID: req.params.entityID})
    .then(entity => {
        if (entity == null) res.status(204).json(null);
        res.status(200).json(entity)
    })
    .catch(err => { res.status(400).json(err); })
})

router.put('/:entityID', (req, res) => {
    var filter = req.body.filter == null ? {entityID: req.params.entityID} : req.body.filter;
    entityFunc.updateEntity(filter, req.body.data)
    .then(updatedEntity => res.status(200).json(updatedEntity))
    .catch(err => {
        if (err.message == 'Email exists.') res.status(409).json(err);
        else if (err.message == 'Entity not found.') res.status(404).json(err);
        else res.status(400).json(err);
    })
})

router.delete('/:entityID', (req, res) => {
    var filter = req.body.filter == null ? {entityID: req.params.entityID} : req.body.filter;
    entityFunc.deleteEntity(filter)
    .then(deletedEntity => res.status(200).json(deletedEntity))
    .catch(err => {
        if (err.message == 'Entity not found.') res.status(404).json(err);
        else res.status(400).json(err);
    })
})

router.post('/', (req, res) => {
    entityFunc.findEntities(req.body.filter)
    .then(entities => {
        if (entities == null) res.status(204).json(null);
        res.status(200).json(entities)        
    })
    .catch(err => { res.status(400).json(err); })
})

module.exports = router;
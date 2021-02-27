var express = require('express');
var entityFunc = require('./entityFunc');
var router = express.Router();

router.get('/:entityID', (req, res) => {
    entityFunc.findEntity({entityID: req.params.entityID})
    .then(entity => res.status(200).send(entity))
    .catch(err => { 
        if (err.message == 'Entity not found.') res.status(404).send(err);
        else res.status(400).send(err);
    })
})

router.post('/new', (req, res) => {
    entityFunc.createEntity(req.body.data)
    .then(createdEntity => res.status(201).send(createdEntity) )
    .catch(err => {
        if (err.message == '(E)Mail already in DB.') res.status(403).send(err);
        else res.status(400).send(err);
    })
})

router.put('/:entityID', (req, res) => {
    var filter = req.body.filter == null ? {entityID: req.params.entityID} : req.body.filter;
    entityFunc.updateEntity(filter, req.body.data)
    .then(updatedEntity => res.status(200).send(updatedEntity))
    .catch(err => {
        if (err.message == '(E)Mail already in DB.') res.status(409).send(err);
        else if (err.message == 'Entity not found.') res.status(404).send(err);
        else res.status(400).send(err);
    })
})

router.delete('/:entityID', (req, res) => {
    var filter = req.body.filter == null ? {entityID: req.params.entityID} : req.body.filter;
    entityFunc.deleteEntity(filter)
    .then(deletedEntity => res.status(200).send(deletedEntity))
    .catch(err => {
        if (err.message == 'Entity not found.') res.status(404).send(err);
        else res.status(400).send(err);
    })
})

module.exports = router;
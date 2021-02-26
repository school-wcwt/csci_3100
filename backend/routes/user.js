var express = require('express');
var {findEntity, createEntity, updateEntity, deleteEntity} = require('./user_func');
var router = express.Router();

router.get('/:userID', (req, res) => {
    findEntity({entityID: req.params.userID})
    .then(entity => {
        if (entity == null) res.status(202).send(null);
        if (entity != null) res.status(200).send(entity);
    })
    .catch(err => { res.status(400).send(err); })
})

router.post('/', (req, res) => {
    createEntity(req.body)
    .then(createdEntity => res.status(201).send(createdEntity) )
    .catch(err => {
        if (err.message == '(E)Mail already in DB.') res.status(403).send(err);
        else res.status(400).send(err);
    })
})

router.put('/:userID', (req, res) => {
    updateEntity({entityID: req.params.userID}, req.body)
    .then(updatedEntity => res.status(200).send(updatedEntity))
    .catch(err => {
        if (err.message == '(E)Mail already in DB.') res.status(403).send(err);
        else if (err.message == 'Entity not found') res.status(404).send(err);
        else res.status(400).send(err);
    })
})

router.delete('/:userID', (req, res) => {
    deleteEntity({entityID: req.params.userID})
    .then(deletedEntity => res.status(200).send(deletedEntity))
    .catch(err => {
        if (err.message == 'Entity not found') res.status(404).send(err);
        else res.status(400).send(err);
    })
})

module.exports = router;
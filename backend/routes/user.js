var express = require('express');
var userFunc = require('./userFunc');
var entityFunc = require('./entityFunc');
var router = express.Router();

router.post('/auth', (req, res) => {
    userFunc.auth(req.body.filter, req.body.password)
    .then(loginedEntity => res.status(200).send(loginedEntity))
    .catch(err => {
        if (err.message == 'Entity not found.') res.status(404).send(err)
        else if (err.message == 'Incorrect password.') res.status(403).send(err)
        else res.status(400).send(err);
    })
})

// ======= groupList =========

router.post('/:userID/groupList', (req, res) => {
    userFunc.updateList({entityID: req.params.userID}, req.body.listName, true)
    .then(updatedEntity => res.status(201).send(updatedEntity))
    .catch(err => {
        if (err.message == 'Entity not found.') res.status(404).send(err)
        else res.status(400).send(err)
    })
})

router.delete('/:userID/groupList', (req, res) => {
    userFunc.updateList({entityID: req.params.userID}, req.body.listName, false)
    .then(updatedEntity => res.status(200).send(updatedEntity))
    .catch(err => {
        if (err.message == 'Entity not found.') res.status(404).send(err)
        else res.status(400).send(err)
    })
})

router.get('/:userID/groupList/:listName', (req, res) => {
    entityFunc.findEntity({entityID: req.params.userID}, 2, {
        subentityPop: {
            path: 'groupList', // TODO
            select: 'entityID name profPhoto',
            perDocumentLimit: 30,
        }
    }).then(entity => res.status(200).send(entity))
    .catch(err => {
        if (err.message == 'Entity not found.') res.status(404).send(err)
        else res.status(400).send(err)
    })
})

router.post('/:userID/groupList/:listName', (req, res) => {
    userFunc.updateListContent(
        {entityID: req.params.userID}, 
        req.body.targetFilter,
        req.params.listName,
        true
    ).then(updatedEntity => res.status(200).send(updatedEntity))
    .catch(err => {
        if (err.message == 'Entity not found.') res.status(404).send(err)
        else res.status(400).send(err)
    })
})

router.delete('/:userID/groupList/:listName', (req, res) => {
    userFunc.updateListContent(
        {entityID: req.params.userID}, 
        req.body.targetFilter,
        req.params.listName,
        false
    ).then(updatedEntity => res.status(200).send(updatedEntity))
    .catch(err => {
        if (err.message == 'Entity not found.') res.status(404).send(err)
        else res.status(400).send(err)
    })
})

/*

GET /user/:userID/groupList - get all grouplist
POST /user/:userID/groupList - add list
DELETE /user/:userID/groupList - remove list

GET /user/:userID/groupList/:list - get all content in groupList
POST /user/:userID/groupList/:list - add/del content in list
DELETE /user/:userID/groupList/:list - delete content in list

*/

module.exports = router;
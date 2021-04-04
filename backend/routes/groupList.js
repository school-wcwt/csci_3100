var express = require('express');
var router = express.Router();

const userFunc = require('../functions/userFunc');
const groupListFunc = require('../functions/groupListFunc');

// Unauthorized Queries

router.get('/:entityID/:listName', (req, res) => {
    groupListFunc.findGroupList({
        name:   req.params.listName,
        author: req.params.userID
    })
    .then(groupList => {
        if (groupList == null) res.status(204).json(groupList)
        else res.status(200).json(groupList)
    })
    .catch(err => { res.status(400).json(err.message) })
})

router.post('/', (req, res) => {
    groupListFunc.findGroupLists(filter)
    .then(groupLists => {
        if (groupLists == null) res.status(204).json(groupLists)
        else res.status(200).json(groupLists)
    })
    .catch(err => { res.status(400).json(err.message) })
})

router.post('/new', (req, res) => {
    //var filter = req.body.filter == null ? {entityID: req.params.userID} : req.body.filter;
    var filter = {entityID: res.locals.entityID};
    var listName = req.body.listName;
    userFunc.createList(filter, listName)
    .then(updatedEntity => res.status(201).json(updatedEntity))
    .catch(err => {
        if (err.message == 'Entity not found.') res.status(404).json(err.message)
        else if (err.message == 'List exists.') res.status(409).json(err.message)
        else res.status(400).json(err.message)
    })
})

router.delete('/:listName', (req, res) => {
    //var filter = req.body.filter == null ? {entityID: req.params.userID} : req.body.filter;
    var filter = {entityID: res.locals.entityID};
    var listName = req.params.listName;
    userFunc.deleteList(filter, listName)
    .then(updatedEntity => res.status(200).json(updatedEntity))
    .catch(err => {
        if (err.message == 'Entity not found.') res.status(404).json(err.message)
        else if (err.message == 'List not found.') res.status(404).json(err.message)
        else res.status(400).json(err.message)
    })
})

router.put('/:listName', (req, res) => {
    //var filter = req.body.filter == null ? {entityID: req.params.userID} : req.body.filter;
    var filter = {entityID: res.locals.entityID};
    var listName = req.params.listName;
    userFunc.updateList(filter, listName, req.body.data)
    .then(updatedGroupList => res.status(200).json(updatedGroupList))
    .catch(err => {
        if (err.message == 'Entity not found.') res.status(404).json(err.message)
        else if (err.message == 'List not found.') res.status(404).json(err.message)
        else res.status(400).json(err.message)
    })
})

router.patch('/content/:listName', (req, res) => {
    //var authorFilter = req.body.authorFilter == null ? {entityID: req.params.userID} : req.body.authorFilter;
    var authorFilter = {entityID: res.locals.entityID};
    var listName = req.params.listName;
    userFunc.updateListContent(authorFilter, req.body.targetFilter, listName, req.body.addFlag)
    .then(updatedGroupList => res.status(200).json(updatedGroupList))
    .catch(err => {
        if (err.message == 'Entity not found.') res.status(404).json(err.message)
        else if (err.message == 'List not found.') res.status(404).json(err.message)
        else res.status(400).json(err.message)
    })
})

module.exports = router;
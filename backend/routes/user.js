var express = require('express');
var userFunc = require('./userFunc');
var groupListFunc = require('./groupListFunc');
var router = express.Router();


// ======= GroupList =========

router.get('/:userID/groupList/:listName', (req, res) => {
    groupListFunc.findGroupList({
        name:   req.params.listName,
        author: req.params.userID
    })
    .then(groupList => {
        if (groupList == null) res.status(204).json(groupList)
        else res.status(200).json(groupList)
    })
    .catch(err => { res.status(400).json(err) })
})

router.post('/:userID/groupList/:listName', (req, res) => {
    var filter = req.body.filter == null ? {entityID: req.params.userID} : req.body.filter;
    var listName = req.body.listName == null ? req.params.listName : req.body.listName;
    userFunc.createList(filter, listName)
    .then(updatedEntity => res.status(201).json(updatedEntity))
    .catch(err => {
        if (err.message == 'Entity not found.') res.status(404).json(err)
        else if (err.message == 'List exists.') res.status(409).json(err)
        else res.status(400).json(err)
    })
})

router.delete('/:userID/groupList/:listName', (req, res) => {
    var filter = req.body.filter == null ? {entityID: req.params.userID} : req.body.filter;
    var listName = req.body.listName == null ? req.params.listName : req.body.listName;
    userFunc.deleteList(filter, listName)
    .then(updatedEntity => res.status(200).json(updatedEntity))
    .catch(err => {
        if (err.message == 'Entity not found.') res.status(404).json(err)
        else if (err.message == 'List not found.') res.status(404).json(err)
        else res.status(400).json(err)
    })
})

router.put('/:userID/groupList/:listName', (req, res) => {
    var filter = req.body.filter == null ? {entityID: req.params.userID} : req.body.filter;
    var listName = req.body.listName == null ? req.params.listName : req.body.listName;
    userFunc.updateList(filter, listName, req.body.data)
    .then(updatedGroupList => res.status(200).json(updatedGroupList))
    .catch(err => {
        if (err.message == 'Entity not found.') res.status(404).json(err)
        else if (err.message == 'List not found.') res.status(404).json(err)
        else res.status(400).json(err)
    })
})

router.patch('/:userID/groupList/:listName', (req, res) => {
    var authorFilter = req.body.authorFilter == null ? {entityID: req.params.userID} : req.body.authorFilter;
    var listName = req.body.listName == null ? req.params.listName : req.body.listName;
    userFunc.updateListContent(authorFilter, req.body.targetFilter, listName, req.body.addFlag)
    .then(updatedGroupList => res.status(200).json(updatedGroupList))
    .catch(err => {
        if (err.message == 'Entity not found.') res.status(404).json(err)
        else if (err.message == 'List not found.') res.status(404).json(err)
        else res.status(400).json(err)
    })
})

// ======= Post =========

router.post('/:userID/post/new', (req, res) => {
    var authorFilter = req.body.authorFilter == null ? {entityID: req.params.userID} : req.body.authorFilter;
    userFunc.createPost(authorFilter, req.body.targetFilter, req.body.data)
    .then(newPost => res.status(201).json(newPost))
    .catch(err => {
        if (err.message == 'Entity not found.') res.status(404).json(err)
        else res.status(400).json(err)
    })
})

router.delete('/post/:postID', (req, res) => {
    var filter = req.body.filter == null ? {postID: req.params.postID} : req.body.filter;
    userFunc.deletePost(filter)
    .then(deletedPost => res.status(200).json(deletedPost))
    .catch(err => {
        if (err.message == 'Post not found.' || err.message == 'Comment not found.' || err.message == 'Tag not found.') 
            res.status(404).json(err)
        else res.status(400).json(err)
    })
})

router.put('/post/:postID', (req, res) => {
    var filter = req.body.filter == null ? {postID: req.params.postID} : req.body.filter;
    userFunc.updatePost(filter, req.body.data)
    .then(updatedPost => res.status(200).json(updatedPost))
    .catch(err => {
        if (err.message == 'Post not found.') res.status(404).json(err)
        else res.status(400).json(err)
    })
})

// ------ Like / Comment ------

router.patch('/:userID/post/:postID/like', (req, res) => {
    var postFilter = req.body.postFilter == null ? {postID: req.params.postID} : req.body.postFilter;
    var authorFilter = req.body.authorFilter == null ? {entityID: req.params.userID} : req.body.authorFilter;
    userFunc.likePost(postFilter, authorFilter, req.body.addFlag)
    .then(updatedPost => res.status(200).json(updatedPost))
    .catch(err => {
        if (err.message == 'Post not found.' || err.message == 'Entity not found.') 
            res.status(404).json(err)
        else res.status(400).json(err)
    })
})

router.post('/:userID/post/:postID/comment/new', (req, res) => {
    var postFilter = req.body.postFilter == null ? {postID: req.params.postID} : req.body.postFilter;
    var authorFilter = req.body.authorFilter == null ? {entityID: req.params.userID} : req.body.authorFilter;
    userFunc.likePost(postFilter, authorFilter, req.body.data)
    .then(updatedPost => res.status(201).json(updatedPost))
    .catch(err => {
        if (err.message == 'Post not found.' || err.message == 'Entity not found.') 
            res.status(404).json(err)
        else res.status(400).json(err)
    })
})

router.delete('/:userID/post/:postID/comment/:commentID', (req, res) => {
    var filter = req.body.filter == null ? {commentID: req.params.commentID} : req.body.filter;
    userFunc.deleteComment(filter)
    .then(updatedPost => res.status(200).json(updatedPost))
    .catch(err => {
        if (err.message == 'Post not found.' || err.message == 'Comment not found.') 
            res.status(404).json(err)
        else res.status(400).json(err)
    })
})

router.put('/:userID/post/:postID/comment/:commentID', (req, res) => {
    var filter = req.body.filter == null ? {commentID: req.params.commentID} : req.body.filter;
    userFunc.updateComment(filter, req.body.data)
    .then(updatedComment => res.status(200).json(updatedComment))
    .catch(err => {
        if (err.message == 'Post not found.' || err.message == 'Comment not found.') 
            res.status(404).json(err)
        else res.status(400).json(err)
    })
})

router.patch('/:userID/follow/:entityID', (req, res) => {
    var authorFilter = req.body.authorFilter == null ? {entityID: req.params.userID} : req.body.authorFilter;
    var targetFilter = req.body.targetFilter == null ? {entityID: req.params.entityID} : req.body.targetFilter;
    userFunc.updateFollow(authorFilter, targetFilter, req.body.addFlag)
    .then(updatedEntity => res.status(200).json(updatedEntity))
    .catch(err => {
        if (err.message == 'Entity not found.') res.status(404).json(err)
        else res.status(400).json(err)
    })
})

module.exports = router;
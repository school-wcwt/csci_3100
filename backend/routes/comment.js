var express = require('express');
var router = express.Router();

const userFunc = require('../functions/userFunc');
const commentFunc = require('../functions/commentFunc');

// Un-authorized Queries

router.get('/:commentID', (req, res) => {
    commentFunc.findComment({commentID: req.params.commentID})
    .then(comment => {
        if (comment == null) res.status(204).json(comment);
        res.status(200).json(comment);
    })
    .catch(err => res.status(500).json(err.message))
})

router.post('/', (req, res) => {
    commentFunc.findComments(req.body.filter)
    .then(comments => {
        if (comments == null) res.status(204).json(comments);
        res.status(200).json(comments);
    })
    .catch(err => res.status(500).json(err.message))   
})

// Authorized Queries

router.post('/new', (req, res) => {
    var authorFilter = {entityID: res.locals.entityID};
    userFunc.createComment(req.body.postFilter, authorFilter, req.body.data)
    .then(updatedPost => res.status(201).json(updatedPost))
    .catch(err => {
        if (err.message == 'Post not found.' || err.message == 'Entity not found.') 
            res.status(404).json(err.message)
        else res.status(500).json(err.message)
    })
})

router.delete('/:commentID', (req, res) => {
    var filter = {
        commentID: req.params.commentID,
        author: res.locals.entity_id
    };
    userFunc.deleteComment(filter)
    .then(updatedPost => res.status(200).json(updatedPost))
    .catch(err => {
        if (err.message == 'Post not found.' || err.message == 'Comment not found.') 
            res.status(404).json(err.message)
        else res.status(500).json(err.message)
    })
})

router.put('/:commentID', (req, res) => {
    var filter = {
        commentID: req.params.commentID,
        author: res.locals.entity_id
    };
    userFunc.updateComment(filter, req.body.data)
    .then(updatedComment => res.status(200).json(updatedComment))
    .catch(err => {
        if (err.message == 'Post not found.' || err.message == 'Comment not found.') 
            res.status(404).json(err.message)
        else res.status(500).json(err.message)
    })
})

module.exports = router;
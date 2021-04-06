var express = require('express');
var router = express.Router();

const userFunc = require('../functions/userFunc');
const postFunc = require('../functions/postFunc');

// Unauthorized Queries
router.get('/:postID', (req, res) => {
    postFunc.findPost({postID: req.params.postID})
    .then(post => {
        if (post == null) res.status(204).json(post)
        res.status(200).json(post)
    })
    .catch(err => res.status(500).json(err.message))
})

router.post('/', (req, res) => {
    postFunc.findPosts(req.body.filter)
    .then(posts => {
        if (posts == null) res.status(204).json(posts)
        res.status(200).json(posts)
    })
    .catch(err => res.status(500).json(err.message))    
})

// Authorized Queries

router.post('/new', (req, res) => {
    //var authorFilter = req.body.authorFilter == null ? {entityID: req.params.userID} : req.body.authorFilter;
    var authorFilter = {entityID: res.locals.user.entityID};
    console.log(res.locals.user.entityID)
    userFunc.createPost(authorFilter, req.body.targetFilter, req.body.data)
    .then(newPost => res.status(201).json(newPost))
    .catch(err => {
        if (err.message == 'Entity not found.') {console.log(err.message); res.status(404).json(err.message)}
        else res.status(500).json(err.message)
    })
})

router.delete('/:postID', (req, res) => {
    //var filter = req.body.filter == null ? {postID: req.params.postID} : req.body.filter;
    console.log(res.locals)
    var filter = {
        author: res.locals.user.entityID,     
        postID: req.params.postID, 
    }
    userFunc.deletePost(filter)
    .then(deletedPost => res.status(200).json(deletedPost))
    .catch(err => {
        if (err.message == 'Post not found.' || err.message == 'Comment not found.' || err.message == 'Tag not found.') 
            res.status(404).json(err.message)
        else res.status(500).json(err.message)
    })
})

router.put('/:postID', (req, res) => {
    //var filter = req.body.filter == null ? {postID: req.params.postID} : req.body.filter;
    var filter = {
        author: res.locals.user.entity_id,
        postID: req.params.postID, 
    }
    userFunc.updatePost(filter, req.body.data)
    .then(updatedPost => res.status(200).json(updatedPost))
    .catch(err => {
        if (err.message == 'Post not found.') res.status(404).json(err.message)
        else res.status(500).json(err.message)
    })
})

router.patch('/like/:postID', (req, res) => {
    //var authorFilter = req.body.authorFilter == null ? {entityID: req.params.userID} : req.body.authorFilter;
    var authorFilter = {entityID: res.locals.user.entityID};
    var postFilter = {postID: req.params.postID};
    userFunc.likePost(postFilter, authorFilter, req.body.addFlag)
    .then(updatedPost => res.status(200).json(updatedPost))
    .catch(err => {
        if (err.message == 'Post not found.' || err.message == 'Entity not found.') 
            res.status(404).json(err)
        else res.status(500).json(err)
    })
})

module.exports = router;
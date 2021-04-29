/** 
 * Express router providing {@link Comment} related routes.
 * @module routers/comment
 * @requires express
 */

var express = require('express');
var router = express.Router();

const userFunc = require('../functions/userFunc');
const commentFunc = require('../functions/commentFunc');

// ==========================
//    Unauthorized Queries
// ==========================

/**
 * Read a single Comment.
 * @instance
 * @function GET/comment/:commentID
 * @see module:functions/comment.findComment
 * @param {String} path - Express path.
 * @param {RouteCallback} callback - Express callback.
 * @returns {Comment|null} 200/204 - A Comment after query, an instance of [Comment.Schema]{@link Comment}.
 * @throws 500 - Server error.
 */
router.get('/:commentID', (req, res) => {
    commentFunc.findComment({commentID: req.params.commentID})
    .then(comment => {
        if (comment == null) return res.status(204).json(comment);
        return res.status(200).json(comment);
    })
    .catch(err => res.status(500).json(err.message))
})

/**
 * @typedef {Object} POST/comment-ReqBody
 * @property {Object} filter - Searching filter for the Comments, instances of [Comment.Schema]{@link Comment}.
 */
/**
 * @callback POST/comment-Callback
 * @param {express.Request<{}, {}, module:routers/comment~POST/comment-ReqBody>} req - Express request.
 * @param {express.Response} res - Express response.
 */
/**
 * Read multiple Entities.
 * @instance
 * @function POST/comment
 * @see module:functions/comment.findComments
 * @param {String} path - Express path.
 * @param {module:routers/comment~POST/comment-Callback} callback - Express callback.
 * @returns {Comment[]|null} 200/204 - Comments after query, instances of [Comment.Schema]{@link Comment}.
 * @throws 500 - Server error.
 */
router.post('/', (req, res) => {
    commentFunc.findComments(req.body.filter)
    .then(comments => {
        if (comments == null) return res.status(204).json(comments);
        return res.status(200).json(comments);
    })
    .catch(err => res.status(500).json(err.message))   
})

// ==========================
//     Authorized Queries
// ==========================


/**
 * @typedef {Object} POST/comment/new-ReqBody 
 * @property {Object} postFilter - Searching filter for the Post, an instance of [Post.Schema]{@link Post}.
 * @property {String} content - Content of the Comment.
 */
 /**
 * @callback POST/comment/new-Callback
 * @param {express.Request<{}, {}, module:routers/comment~POST/comment/new-ReqBody>} req - Express request.
 * @param {express.Response} res - Express response.
 */
/**
 * Create a comment under a Post.
 * @instance
 * @function POST/comment/new
 * @see module:functions/user.createComment
 * @param {String} path - Express path.
 * @param {module:routers/comment~POST/comment/new-Callback} callback - Express callback.
 * @returns {Post} 201 - Updated Post, an instance of [Post.Schema]{@link Post}.
 * @throws 404 - Post not found. / Entity not found.
 * @throws 500 - Server error.
 */
router.post('/new', (req, res) => {
    var authorFilter = {entityID: res.locals.user.entityID};
    userFunc.createComment(req.body.postFilter, authorFilter, req.body.content)
    .then(updatedPost => res.status(201).json(updatedPost))
    .catch(err => {
        if (err.message == 'Post not found.' || err.message == 'Entity not found.') 
            res.status(404).json(err.message)
        else res.status(500).json(err.message)
    })
})

/**
 * Delete a comment from a Post.
 * @instance
 * @function DELETE/comment/:commentID
 * @see module:functions/user.deleteComment
 * @param {String} path - Express path.
 * @param {RouteCallback} callback - Express callback.
 * @returns {Post} 200 - Updated Post, an instance of [Post.Schema]{@link Post}.
 * @throws 404 - Post not found. / Comment not found.
 * @throws 500 - Server error.
 */
router.delete('/:commentID', (req, res) => {
    var filter = {
        commentID: req.params.commentID,
        author: res.locals.user.entity_id
    };
    userFunc.deleteComment(filter)
    .then(updatedPost => res.status(200).json(updatedPost))
    .catch(err => {
        if (err.message == 'Post not found.' || err.message == 'Comment not found.') 
            res.status(404).json(err.message)
        else res.status(500).json(err.message)
    })
})

/**
 * Update a comment.
 * @instance
 * @function DELETE/comment/:commentID
 * @see module:functions/user.updateComment
 * @param {String} path - Express path.
 * @param {RouteCallback} callback - Express callback.
 * @returns {Comment} 200 - Updated Comment, an instance of [Comment.Schema]{@link Comment}.
 * @throws 404 - Post not found. / Comment not found.
 * @throws 500 - Server error.
 */
router.put('/:commentID', (req, res) => {
    var filter = {
        commentID: req.params.commentID,
        author: res.locals.user.entity_id
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
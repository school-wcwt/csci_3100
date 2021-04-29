/** 
 * Express router providing {@link Post} related routes.
 * @module routers/post
 * @requires express
 */

var express = require('express');
var router = express.Router();

const userFunc = require('../functions/userFunc');
const postFunc = require('../functions/postFunc');

// ==========================
//    Unauthorized Queries
// ==========================


/**
 * @typedef {Object} POST/post/random-ReqBody
 * @property {Object} filter - Searching filter for the random Posts, an instance of [Post.Schema]{@link Post}.
 * @property {String} size - Number of returning documents.
 */
/**
 * @callback POST/post/random-Callback
 * @param {express.Request<{}, {}, module:routers/post~POST/post/random-ReqBody>} req - Express request.
 * @param {express.Response} res - Express response.
 */
/**
 * Read random Entities.
 * @instance
 * @function POST/post/random
 * @see module:functions/post.randomPosts
 * @param {String} path - Express path.
 * @param {module:routers/post~POST/post/random-Callback} callback - Express callback.
 * @returns {Post[]} 200 - Random Posts.
 * @throws 500 - Server error.
 */
router.post('/random', (req, res) => {
    postFunc.randomPosts(req.body.filter, req.body.size)
    .then(posts => res.status(200).json(posts))
    .catch(err => res.status(500).json(err.message))
})

/**
 * Read a single Post.
 * @instance
 * @function GET/post/:postID
 * @see module:functions/post.findPost
 * @param {String} path - Express path.
 * @param {RouteCallback} callback - Express callback.
 * @returns {Post|null} 200/204 - Post after query, an instance of [Post.Schema]{@link Post}.
 * @throws 500 - Server error.
 */
router.get('/:postID', (req, res) => {
    postFunc.findPost({postID: req.params.postID})
    .then(post => {
        if (post == null) res.status(204).json(post)
        else res.status(200).json(post)
    })
    .catch(err => res.status(500).json(err.message))
})

/**
 * @typedef {Object} POST/post-ReqBody
 * @property {Object} filter - Searching filter for the Posts, instances of [Post.Schema]{@link Post}.
 */
/**
 * @callback POST/post-Callback
 * @param {express.Request<{}, {}, module:routers/post~POST/post-ReqBody>} req - Express request.
 * @param {express.Response} res - Express response.
 */
/**
 * Read multiple Posts.
 * @instance
 * @function POST/post
 * @see module:functions/post.findPosts
 * @param {String} path - Express path.
 * @param {module:routers/post~POST/post-Callback} callback - Express callback.
 * @returns {Post[]|null} 200/204 - Posts after query, instances of [Post.Schema]{@link Post}.
 * @throws 500 - Server error.
 */
router.post('/', (req, res) => {
    postFunc.findPosts(req.body.filter)
    .then(posts => {
        if (posts == null) res.status(204).json(posts)
        else res.status(200).json(posts)
    })
    .catch(err => res.status(500).json(err.message))    
})

// ==========================
//     Authorized Queries
// ==========================


/**
 * @typedef {Object} POST/post/new-ReqBody 
 * @property {Object} targetFilter - Searching filter for the target of the Post, an instance of [Entity.Schema]{@link Entity} ([Rest.Schema]{@link Rest}).
 * @property {Object} data - Data of the Post.
 */
 /**
 * @callback POST/post/new-Callback
 * @param {express.Request<{}, {}, module:routers/post~POST/post/new-ReqBody>} req - Express request.
 * @param {express.Response} res - Express response.
 */
/**
 * Create a new Rest.
 * @instance
 * @function POST/post/new
 * @see module:functions/user.createPost
 * @param {String} path - Express path.
 * @param {module:routers/post~POST/post/new-Callback} callback - Express callback.
 * @returns {Post} 201 - Created Post, an instance of [Post.Schema]{@link Post}.
 * @throws 404 - Entity not found.
 * @throws 500 - Server error.
 */
router.post('/new', (req, res) => {
    var authorFilter = {entityID: res.locals.user.entityID};
    userFunc.createPost(authorFilter, req.body.targetFilter, req.body.data)
    .then(newPost => res.status(201).json(newPost))
    .catch(err => {
        if (err.message == 'Entity not found.') res.status(404).json(err.message)
        else res.status(500).json(err.message)
    })
})

/**
 * Delete a Post.
 * @instance
 * @function DELETE/:postID
 * @see module:functions/user.deletePost
 * @param {String} path - Express path.
 * @param {RouteCallback} callback - Express callback.
 * @returns {Post} 200 - Deleted Post, an instance of [Post.Schema]{@link Post}.
 * @throws 404 - Post not found. / Comment not found. / Tag not found.
 * @throws 500 - Server error.
 */
router.delete('/:postID', (req, res) => {
    var filter = {
        author: res.locals.user.entity_id,
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

/**
 * @typedef {Object} PUT/post/:postID-ReqBody
 * @property {Object} data - Data to update the Post.
 */
/**
 * @callback PUT/post/:postID-Callback
 * @param {express.Request<{}, {}, module:routers/post~PUT/post/postID-ReqBody>} req - Express request.
 * @param {express.Response} res - Express response.
 */
/**
 * Update an Post.
 * @instance
 * @function PUT/post/:postID
 * @see module:functions/user.updatePost
 * @param {String} path - Express path.
 * @param {module:routers/post~PUT/post/postID-Callback} callback - Express callback.
 * @returns {Post} 200 - Updated Post, an instance of [Post.Schema]{@link Post}.
 * @throws 404 - Post not found.
 * @throws 500 - Server error.
 */
router.put('/:postID', (req, res) => {
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

/**
 * @typedef {Object} PATCH/post/like/postID-ReqBody
 * @property {Object} addFlag - Whether to add (push) or delete (pull) the requesting author (Entity/User).
 */
/**
 * @callback PATCH/post/like/postID-Callback
 * @param {express.Request<{}, {}, module:routers/post~PATCH/post/like/postID-ReqBody>} req - Express request.
 * @param {express.Response} res - Express response.
 */
/**
 * Like or unlike an Post.
 * @instance
 * @function PATCH/post/like/:postID
 * @see module:functions/user.likePost
 * @param {String} path - Express path.
 * @param {module:routers/post~PATCH/post/like/postID-Callback} callback - Express callback.
 * @returns {Post} 200 - Updated Post, an instance of [Post.Schema]{@link Post}.
 * @throws 404 - Post not found. / Entity not found.
 * @throws 500 - Server error.
 */
router.patch('/like/:postID', (req, res) => {
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
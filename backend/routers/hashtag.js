/** 
 * Express router providing {@link Hashtag} related routes.
 * @module routers/hashtag
 * @requires express
 */

var express = require('express');
var router = express.Router();

const userFunc = require('../functions/userFunc');
const hashtagFunc = require('../functions/hashtagFunc');

/**
 * Read a single Hashtag.
 * @instance
 * @function GET/hashtag/:entityID/:name
 * @see module:functions/user.findTag
 * @param {String} path - Express path.
 * @param {RouteCallback} callback - Express callback.
 * @returns {Hashtag|null} 200/204 - A Hashtag after query, an instance of [Hashtag.Schema]{@link Hashtag}.
 * @throws 404 - Entity not found.
 * @throws 500 - Server error.
 */
router.get('/:entityID/:name', (req, res) => {
    userFunc.findTag({entityID: req.params.entityID}, req.params.name)
    .then(tag => {
        if (tag == null) res.status(204).json(tag)
        else res.status(200).json(tag)
    })
    .catch(err => { 
        if (err.message == 'Entity not found.') return res.status(404).json(err.message)
        res.status(500).json(err.message) 
    })
})

/**
 * @typedef {Object} POST/hashtag-ReqBody
 * @property {Object} restFilter - Searching filter for the Rest (Hashtag.target) of the Hashtag, an instance of [Entity.Schema]{@link Entity} ([Rest.Schema]{@link Rest}).
 * @property {String} name - Name of the Hashtag.
 */
/**
 * @callback POST/hashtag-Callback
 * @param {express.Request<{}, {}, module:routers/hashtag~POST/hashtag-ReqBody>} req - Express request.
 * @param {express.Response} res - Express response.
 */
/**
 * Read multiple Hashtags.
 * @instance
 * @function POST/hashtag
 * @see module:functions/user.findTags
 * @param {String} path - Express path.
 * @param {module:routers/hashtag~POST/hashtag-Callback} callback - Express callback.
 * @returns {Hashtag[]|null} 200/204 - Hashtags after query, instances of [Hashtag.Schema]{@link Hashtag}.
 * @throws 404 - Entity not found.
 * @throws 500 - Server error. / Invalid req.body.
 */
router.post('/', (req, res) => {
    var query = hashtagFunc.findTags({})
    if (req.body.restFilter !== undefined) { query = userFunc.findTags(req.body.restFilter) }
    else if (req.body.filter !== undefined) { query = hashtagFunc.findTags(req.body.filter) };
    
    query
    .then(tags => {
        if (tags == null) res.status(204).json(tags)
        else res.status(200).json(tags)
    })
    .catch(err => { 
        if (err.message == 'Entity not found.') return res.status(404).json(err.message)
        res.status(500).json(err.message) 
    })
})

module.exports = router
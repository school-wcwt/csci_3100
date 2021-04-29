/** 
 * Express router providing {@link Entity} related routes.
 * @module routers/entity
 * @requires express
 */

var express = require('express');
var router = express.Router();

const entityFunc = require('../functions/entityFunc');
const userFunc = require('../functions/userFunc');

// ==========================
//    Unauthorized Queries
// ==========================

/**
 * @typedef {Object} POST/entity/random-ReqBody
 * @property {Object} filter - Searching filter for the random Entities, an instance of [Entity.Schema]{@link Entity}.
 * @property {String} size - Number of returning documents.
 */
/**
 * @callback POST/entity/random-Callback
 * @param {express.Request<{}, {}, module:routers/entity~POST/entity/random-ReqBody>} req - Express request.
 * @param {express.Response} res - Express response.
 */
/**
 * Read random Entities.
 * @instance
 * @function POST/entity/random
 * @see module:functions/entity.randomRests
 * @param {String} path - Express path.
 * @param {module:routers/entity~POST/entity/random-Callback} callback - Express callback.
 * @returns {Entity[]} 200 - Random Entities.
 * @throws 500 - Server error.
 */
router.post('/random', (req, res) => {
    entityFunc.randomRests(req.body.filter, req.body.size)
    .then(rests => res.status(200).json(rests))
    .catch(err => res.status(500).json(err.message))
})

/**
 * Read a single Entity.
 * @instance
 * @function GET/entity/:entityID
 * @see module:functions/entity.findEntity
 * @param {String} path - Express path.
 * @param {RouteCallback} callback - Express callback.
 * @returns {Entity|null} 200/204 - Entity after query, an instance of [Entity.Schema]{@link Entity}.
 * @throws 500 - Server error.
 */
router.get('/:entityID', (req, res) => { 
    entityFunc.findEntity({entityID: req.params.entityID})
    .then(entity => {
        if (entity == null) return res.status(204).json(null);
        return res.status(200).json(entity);
    })
    .catch(err => res.status(500).json(err.message))
})

/**
 * @typedef {Object} POST/entity-ReqBody
 * @property {Object} filter - Searching filter for the Entities, instances of [Entity.Schema]{@link Entity}.
 */
/**
 * @callback POST/entity-Callback
 * @param {express.Request<{}, {}, module:routers/entity~POST/entity-ReqBody>} req - Express request.
 * @param {express.Response} res - Express response.
 */
/**
 * Read multiple Entities.
 * @instance
 * @function POST/entity
 * @see module:functions/entity.findEntities
 * @param {String} path - Express path.
 * @param {module:routers/entity~POST/entity-Callback} callback - Express callback.
 * @returns {Entity[]|null} 200/204 - Entities after query, instances of [Entity.Schema]{@link Entity}.
 * @throws 500 - Server error.
 */
router.post('/', (req, res) => {
    entityFunc.findEntities(req.body.filter)
    .then(entities => {
        if (entities == null) return res.status(204).json(null);
        return res.status(200).json(entities);     
    })
    .catch(err => res.status(500).json(err.message))
})

// ==========================
//     Authorized Queries
// ==========================

/**
 * @typedef {Object} POST/entity/new-ReqBody 
 * @description Data of the new Entity, an instance of [Entity.Schema]{@link Entity}.
 */
 /**
 * @callback POST/entity/new-Callback
 * @param {express.Request<{}, {}, module:routers/entity~POST/entity/new-ReqBody>} req - Express request.
 * @param {express.Response} res - Express response.
 */
/**
 * Create a new Rest.
 * @instance
 * @function POST/entity/new
 * @see module:functions/entity.createEntity
 * @param {String} path - Express path.
 * @param {module:routers/entity~POST/entity/new-Callback} callback - Express callback.
 * @returns {Rest} 201 - Created Entity, an instance of [Entity.Schema]{@link Entity}.
 * @throws 500 - Server error.
 */
router.post('/new', (req, res) => {
    entityFunc.createEntity({...req.body, type: 'Rest'})
    .then(createdEntity => res.status(201).json(createdEntity))
    .catch(err => res.status(500).json(err.message));
})

/**
 * @typedef {Object} PUT/entity-ReqBody
 * @property {Object} data - Data to update the Entity.
 */
/**
 * @callback PUT/entity-Callback
 * @param {express.Request<{}, {}, module:routers/entity~PUT/entity-ReqBody>} req - Express request.
 * @param {express.Response} res - Express response.
 */
/**
 * Update an Entity.
 * @instance
 * @function PUT/entity
 * @see module:functions/entity.updateEntity
 * @param {String} path - Express path.
 * @param {module:routers/entity~PUT/entity-Callback} callback - Express callback.
 * @returns {Entity} 200 - Updated Entity, an instance of [Entity.Schema]{@link Entity}.
 * @throws 404 - Entity not found.
 * @throws 409 - Email exists.
 * @throws 500 - Server error.
 */
router.put('/', (req, res) => {
    var filter = {entityID: res.locals.user.entityID};
    entityFunc.updateEntity(filter, req.body.data)
    .then(updatedEntity => res.status(200).json(updatedEntity))
    .catch(err => {
        if (err.message == 'Email exists.') res.status(409).json(err.message);
        else if (err.message == 'Entity not found.') res.status(404).json(err.message);
        else res.status(500).json(err.message);
    })
})

/**
 * Delete an Entity.
 * @instance
 * @function DELETE/entity
 * @see module:functions/entity.deleteEntity
 * @param {String} path - Express path.
 * @param {RouteCallback} callback - Express callback.
 * @returns {Entity} 200 - Deleted Entity, an instance of [Entity.Schema]{@link Entity}.
 * @throws 404 - Entity not found.
 * @throws 500 - Server error.
 */
router.delete('/', (req, res) => {
    var filter = {entityID: res.locals.user.entityID};
    entityFunc.deleteEntity(filter)
    .then(deletedEntity => res.status(200).json(deletedEntity))
    .catch(err => {
        if (err.message == 'Entity not found.') res.status(404).json(err.message);
        else res.status(500).json(err.message);
    })
})

/**
 * @typedef {Object} PATCH/entity/follow/entityID-ReqBody
 * @property {Object} addFlag - Whether to add (push) or delete (pull) the requesting author (Entity/User).
 */
/**
 * @callback PATCH/entity/follow/entityID-Callback
 * @param {express.Request<{}, {}, module:routers/entity~PATCH/entity/follow/entityID-ReqBody>} req - Express request.
 * @param {express.Response} res - Express response.
 */
/**
 * Follow or unfollow an Entity.
 * @instance
 * @function PATCH/entity/follow/:entityID
 * @see module:functions/user.updateFollow
 * @param {String} path - Express path.
 * @param {module:routers/entity~PATCH/entity/follow/entityID-Callback} callback - Express callback.
 * @returns {Entity} 200 - Deleted Entity, an instance of [Entity.Schema]{@link Entity}.
 * @throws 404 - Entity not found.
 * @throws 500 - Server error.
 */
router.patch('/follow/:entityID', (req, res) => {
    var authorFilter = {entityID: res.locals.user.entityID};
    var targetFilter = {entityID: req.params.entityID};
    userFunc.updateFollow(authorFilter, targetFilter, req.body.addFlag)
    .then(updatedEntity => res.status(200).json(updatedEntity))
    .catch(err => {
        if (err.message == 'Entity not found.') res.status(404).json(err.message)
        else res.status(500).json(err.message)
    })
})


module.exports = router;
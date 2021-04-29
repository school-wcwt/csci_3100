/** 
 * CRUD functions of Entities.
 * @module functions/entity
 */

const bcrypt = require('bcrypt');

const Entity = require('../models/Entity');
const User = require('../models/User');
const Rest = require('../models/Rest');
const Auth = require('../models/Auth');

const email = require('../middlewares/email')

const BASE_URL = 'localhost:3000'

/**
 * Generate an unique 4-number tag for an Entity.
 * @private
 * @param {string} username - Username of the Entity.
 * @returns {Promise<string>} A generated unique tag.
 */
var tagGen = (username) => { 
    return new Promise((resolve, reject) => {
        let tag = '' + Math.random().toString().slice(2, 6); 
        Entity.findOne({username: username, tag: tag}).exec()
        .then(entity => {
            if (entity == null) return resolve(tag);
            else tagGen();
        })
        .catch(err => { return reject(err) })
    })
};

/**
 * Read a single Entity.
 * @static
 * @param {Object} filter - Searching filter for the Entity, an instance of Entity.Schema.
 * @param {Object} [opt] - Searching options.
 * @param {Object|string} [opt.select = {}]  - Add selection in query.
 * @param {Object|string} [opt.populate = {path: 'groupList, select:'name content}] - Add population in query.
 * @returns {Promise<Entity|null>} An Entity after query, an instance of Entity.Schema.
 */
var findEntity = (filter, opt = null) => {
    return new Promise((resolve, reject) => {
        (async () => { try {
            var option = {
                select:   {},
                populate: {path: 'groupList', select: 'name content'},
                ...opt, 
            }
            var entity = await Entity.findOne(filter)
            .select(option.select)
            .populate(option.populate)
            .exec();
            return resolve(entity);
        } catch(err) { return reject(err) }})();
    })
}

/**
 * Read multiple entities.
 * @static
 * @param {Object} filter - Searching filter for the entities, instances of Entity.Schema.
 * @param {Object} [opt] - Searching options.
 * @param {Object|string} [opt.select = {}]  - Add selection in query.
 * @param {Object|string} [opt.populate = {path: 'groupList, select:'name content}] - Add population in query.
 * @returns {Promise<Entity[]|null>} Entities after query, an instance of Entity.Schema.
 */
var findEntities = (filter, opt = null) => {
    return new Promise((resolve, reject) => {
        (async () => { try {
            var option = {
                select:   {},
                populate: {path: 'groupList', select: 'name content'},
                ...opt, 
            }
            var entities = await Entity.find(filter)
            .select(option.select)
            .populate(option.populate)
            .exec()
            return resolve(entities);
        } catch(err) { return reject(err) }})();
    })
}

/**
 * Create a new Entity.
 * @static
 * @param {Object} data - Data of the new Entity, an instance of Entity.Schema.
 * @returns {Promise<Entity>} Created Entity, an instance of Entity.Schema.
 * @throws Email exists.
 */
var createEntity = (data) => {
    return new Promise((resolve, reject) => {
        (async () => { try {
            var newEntity = {
                ...data,
                joinTime: Date.now(),
            };
            // Check duplicate and hash password
            if (data.type == 'User') {
                var entity = await findEntity({email: data.email})
                if (entity != null) throw new Error('Email exists.');
                newEntity.password = await bcrypt.hash(data.password, 10);
            }
            // Generate new tag and entityID
            newEntity.tag = await tagGen(data.username);
            newEntity.entityID = `${data.username}-${newEntity.tag}`;
            // Save into Entities DB
            var addedEntity = await Entity.create(newEntity);
            if (data.type == 'User') {
                // Generate authHash for verification
                newEntity.authHash = await bcrypt.hash(newEntity.entityID, 10);
                // Save into Auth DB
                await Auth.create({...newEntity, entity: addedEntity._id});
                // Send verification email
                await email.sendAuthEmail(newEntity.username, newEntity.tag, newEntity.entityID,
                    newEntity.email, `http://${BASE_URL}/auth/${newEntity.entityID}/${newEntity.authHash}`);
            }
            // Fetch saved entity
            var savedEntity = await findEntity({_id: addedEntity._id})
            return resolve(savedEntity);
        } catch(err) { return reject(err) }})();
    })
}

/**
 * Update an Entity.
 * @static
 * @param {Object} filter - Searching filter for the Entity, an instance of Entity.Schema.
 * @param {Object} data - Data to update the Entity.
 * @returns {Promise<Entity>} Updated Entity, an instance of Entity.Schema.
 * @throws Email exists.
 * @throws Entity not found.
 */
var updateEntity = (filter, data) => {
    return new Promise((resolve, reject) => {
        (async () => { try {
            var newEntity = data;
            // Validate email changes
            if (data.email != null) {
                var entity = await findEntity({email: data.email})
                if (entity != null) throw new Error('Email exists.');
            }
            // Hash new password
            if (data.password != null) 
                newEntity.password = await bcrypt.hash(data.password, 10);
            // Validate username changes
            if (data.username != null) {
                newEntity.tag = await tagGen(data.username);
                newEntity.entityID = `${data.username}-${newEntity.tag}`;
            }
            // Update entity in Entities and Auths DB
            var updatedEntity = await Entity.findOneAndUpdate(filter, newEntity).exec();
            if (updatedEntity == null) throw new Error('Entity not found.');
            if (updatedEntity.type == 'User') await Auth.updateOne(filter, newEntity).exec();
            var savedEntity = await findEntity({_id: updatedEntity._id});
            return resolve(savedEntity);
        } catch (err) { return reject(err) }})();
    })
}

/**
 * Delete an Entity.
 * @static
 * @param {Object} filter - Searching filter for the Entity, an instance of Entity.Schema.
 * @returns {Promise<Entity>} Deleted Entity, an instance of Entity.Schema.
 * @throws Entity not found.
 */
var deleteEntity = (filter) => {
    return new Promise((resolve, reject) => {
        (async() => { try { 
            var deletedEntity = await Entity.findOneAndDelete(filter);
            if (deletedEntity == null) throw new Error('Entity not found.');
            return resolve(deletedEntity);
        } catch (err) { return reject(err) }})();
    })
}

/**
 * Read random Entities.
 * @static
 * @param {Object} [filter = {type: 'Rest'}] - Searching filter for the random entities, an instance of Entity.Schema. Default as restaurants.
 * @param {number} [size = 1] - Number of returning documents.
 * @returns {Promise<Entity[]|null>} Filtered random Entities of defined size, instances of Entity.Schema.
 */
var randomRests = (filter = {type: 'Rest'}, size = 1) => {
    return new Promise((resolve, reject) => {
        (async () => { try {
            var rests = await Entity.aggregate([
                {$match: filter},
                {$sample: {size: size}},
            ]).exec()
            return resolve(rests);
        } catch(err) { return reject(err) }})(); 
    })
}

module.exports = {
    findEntity,
    findEntities,
    createEntity,
    updateEntity,
    deleteEntity,
    randomRests,
}

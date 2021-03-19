const Entity = require('../models/Entity');
const User   = require('../models/User');
const Rest   = require('../models/Rest');
const bcrypt = require('bcrypt');

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

var findEntity = (filter, opt = null) => {
    return new Promise((resolve, reject) => {
        (async () => { try {
            var option = {
                select:   {password: 0},
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

var findEntities = (filter, opt = null) => {
    return new Promise((resolve, reject) => {
        (async () => { try {
            var option = {
                select:   {password: 0},
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

var createEntity = (data) => {
    return new Promise((resolve, reject) => {
        (async () => { try {
            var newEntity = {
                ...data,
                joinTime: Date.now(),
            };
            if (data.type == 'User') {
                var entity = await findEntity({email: data.email})
                if (entity != null) throw new Error('Email exists.');
                newEntity.password = await bcrypt.hash(data.password, 10);
            }
            newEntity.tag = await tagGen(data.username);
            newEntity.entityID = `${data.username}-${newEntity.tag}`;
            var addedEntity = await Entity.create(newEntity);
            var savedEntity = await findEntity({_id: addedEntity._id})
            return resolve(savedEntity);
        } catch(err) { return reject(err) }})();
    })
}

var updateEntity = (filter, data) => {
    return new Promise((resolve, reject) => {
        (async () => { try {
            var newEntity = data;
            if (data.email != null) {
                var entity = await findEntity({email: data.email})
                if (entity != null) throw new Error('Email exists.');
            }
            if (data.password != null) 
                newEntity.password = await bcrypt.hash(data.password, 10);
            if (data.username != null) {
                newEntity.tag = await tagGen(data.username);
                newEntity.entityID = `${data.username}-${newEntity.tag}`;
            }
            var updatedEntity = await Entity.findOneAndUpdate(filter, newEntity).exec();
            if (updatedEntity == null) throw new Error('Entity not found.');
            var savedEntity = await findEntity({_id: updatedEntity._id});
            return resolve(savedEntity);
        } catch (err) { return reject(err) }})();
    })
}

var deleteEntity = (filter) => {
    return new Promise((resolve, reject) => {
        (async() => { try { 
            var deletedEntity = await Entity.findOneAndDelete(filter);
            if (deletedEntity == null) throw new Error('Entity not found.');
            return resolve(deletedEntity);
        } catch (err) { return reject(err) }})();
    })
}

// ---------- Functional -----------



module.exports = {
    findEntity,
    findEntities,
    createEntity,
    updateEntity,
    deleteEntity
}

var Entity = require('../models/Entity');
var User = require('../models/User');
var Rest = require('../models/Rest');

module.exports = {

    findEntity: (filter, entityOnly = 0, populate = 1, entitySelect = {__v: 0}, subentitySelect = {__v: 0}) => {
        return new Promise((resolve, reject) => {
            Entity
            .findOne(filter, entitySelect)
            .exec((err, entity) => {
                if (err) return reject(err);
                if (entity == null) return resolve(null);
                if (entity != null) {
                    if (entityOnly) return resolve(entity);
                    if (!entity.type)     var subquery = User.findOne({entity: entity._id}, subentitySelect)
                    else if (entity.type) var subquery = Rest.findOne({entity: entity._id}, subentitySelect);
                    if (populate) subquery.populate('entity', entitySelect);
                    subquery.exec((err, subentity) => {
                        if (err) return reject(err);
                        if (subentity == null) return resolve(null);
                        if (subentity != null) return resolve(subentity);
                    })
                }
            })
        })   
    },

    createEntity: data => {
        var addEntity = data => {
            return new Promise((resolve, reject) => {
                var tagGen = () => { return '' + Math.random().toString().substr(2, 4); };
                if (data.type) data.username = data.name.replace(/ /g, '');
                var tag = tagGen();
                var entityID = data.username + '#' + tag;
                var newEntity = new Entity({
                    entityID: entityID, 
                    tag: tag, 
                    joinTime: Date.now(),
                    ...data
                });
                newEntity.save((err, savedEntity) => {
                    if (err) return reject(err);
                    if (!data.type)     var newSubentity = new User({entity: savedEntity._id})
                    else if (data.type) var newSubentity = new Rest({entity: savedEntity._id})
                    newSubentity.save((err) => {
                        if (err) return reject(err);
                        findEntity({entityID: entityID})
                        .then(savedEntity => { return resolve(savedEntity); })
                        .catch(err => { return reject(err) });
                    })
                })
            })
        }
        
        return new Promise((resolve, reject) => {
            findEntity({email: data.email})
            .then(prevEntity => {
                if (prevEntity != null) return reject(new Error('(E)Mail already in DB.'));
                if (prevEntity == null) 
                    addEntity(data)
                    .then(res => { return resolve(res) })
                    .catch(err => { return reject(err) });
            })
            .catch(err => { return reject(err) });
        })
    },

    updateEntity: (filter, data) => {
        return new Promise((resolve, reject) => {
            if (data.email != null) 
                findEntity({email: data.email})
                .then(entity => {
                    if (entity != null) return reject(new Error('(E)Mail already in DB.'));
                    if (entity == null)
                        Entity
                        .findOneAndUpdate(filter, data)
                        .exec((err, oldEntity) => {
                            if (err) return reject(err);
                            if (oldEntity == null) return reject(new Error('Entity not found.'));
                            findEntity({entityID: oldEntity.entityID}, 1)
                            .then(updatedEntity => { return resolve({oldEntity: oldEntity, updatedEntity: updatedEntity}) })
                            .catch(err => { return reject(err) })
                        })
                })
        })
    },

    deleteEntity: (filter) => {
        return new Promise((resolve, reject) => {
            Entity
            .findOneAndDelete(filter)
            .exec((err, deletedEntity) => {
                if (err) return reject(err);
                if (deletedEntity == null) return reject(new Error('Entity not found.'));
                if (deletedEntity.type)       var query = User.findOneAndDelete({entity: deletedEntity._id})
                else if (!deletedEntity.type) var query = User.findOneAndDelete({entity: deletedEntity._id})
                query.exec((err, deletedSubentity) => {
                    if (err) return reject(err);
                    return resolve({deletedEntity: deletedEntity, deletedSubentity: deletedSubentity});
                })
            })
        })
    }

}
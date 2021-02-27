var Entity = require('../models/Entity');
var User = require('../models/User');
var Rest = require('../models/Rest');

var findEntity = (filter, type = 0, option) => {
    var init = () => {
        var optionDef = {
            entitySel: {password: 0, __v: 0}, 
            subentitySel: {__v: 0},
            entityPop: null, 
            subentityPop: null,
        }
        var opt = {...optionDef, ...option};
        return opt;
    }

    return new Promise((resolve, reject) => {
        var opt = init();
        var query = Entity.findOne(filter).select(opt.entitySel)
        if (type == 1) query.populate(opt.entityPop)
        query.exec((err, entity) => {
            if (err) return reject(err);
            if (entity == null) return resolve(null);
            if (entity != null) {
                if (type == 1) return resolve(entity);
                var subquery = entity.type 
                    ? Rest.findOne({entity: entity._id}).select(opt.subentitySel)
                    : User.findOne({entity: entity._id}).select(opt.subentitySel)
                if (type == 0) subquery.populate({path: 'entity', select: opt.entitySel, populate: opt.entityPop})
                subquery.populate(opt.subentityPop);
                subquery.exec((err, subentity) => {
                    if (err) return reject(err);
                    if (subentity == null) return resolve(null);
                    if (subentity != null) return resolve(subentity);
                })
            }
        })
    })   
}

var createEntity = data => {
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
                var newSubentity = data.type 
                    ? new Rest({entityID: entityID, entity: savedEntity._id})
                    : new User({entityID: entityID, entity: savedEntity._id});
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
}

var updateEntity = (filter, data) => {
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
}

var deleteEntity = (filter) => {
    return new Promise((resolve, reject) => {
        Entity
        .findOneAndDelete(filter)
        .exec((err, deletedEntity) => {
            if (err) return reject(err);
            if (deletedEntity == null) return reject(new Error('Entity not found.'));
            var query = deletedEntity.type 
                ? Rest.findOneAndDelete({entity: deletedEntity._id})
                : User.findOneAndDelete({entity: deletedEntity._id})
            query.exec((err, deletedSubentity) => {
                if (err) return reject(err);
                return resolve({deletedEntity: deletedEntity, deletedSubentity: deletedSubentity});
            })
        })
    })
}

module.exports = {findEntity, createEntity, updateEntity, deleteEntity}

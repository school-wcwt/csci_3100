const Entity = require('../models/Entity');
const User   = require('../models/User');
const Rest   = require('../models/Rest');
const bcrypt = require('bcrypt');

var allUserPop = [
    {
        path: 'followingRest', 
        select: 'entityID name profPhoto',
        perDocumentLimit: 10
    },
    {
        path: 'followingUser', 
        select: 'entityID name profPhoto', 
        perDocumentLimit: 10
    },
    {
        path: 'groupList',
        select: 'name content',
        populate: {
            path: 'content',
            select: 'entityID name profPhoto',
            perDocumentLimit:10
        },
        perDocumentLimit:10
    },
]

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
            .exec()
            return resolve(entity);
        } catch(err) { return reject(err) }})();
    })
}

/*var findEntity = (filter, type = 0, option) => {
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
        (async () => { try { 
            var opt = init();
            // Entity
            var query = Entity.findOne(filter).select(opt.entitySel);
            if (type == 1) query.populate(opt.entityPop);
            var entity = await query.exec()
            if (entity == null) return resolve(null);
            if (type == 1) return resolve(entity);
            // User / Rest
            var subquery = entity.type 
                ? Rest.findOne({entity: entity._id}).select(opt.subentitySel)
                : User.findOne({entity: entity._id}).select(opt.subentitySel)
            if (type == 0) {
                subquery
                .populate({path: 'entity', select: opt.entitySel, populate: opt.entityPop})
                .populate({path: 'groupList', select: 'name content'})
            }            subquery.populate(opt.subentityPop);
            var subentity = await subquery.exec() 
            if (subentity == null) return resolve(null);
            return resolve(subentity);
        } catch(err) { return reject(err) }})();
    })   
}

var findEntityID = (filter) => {
    return new Promise((resolve, reject) => {
        (async () => { try { 
            var entity = await Entity.findOne(filter).exec()
            if (entity == null) return resolve(null);
            var subentity = entity.type 
                ? await Rest.findOne({entity: entity._id}).exec()
                : await User.findOne({entity: entity._id}).exec()
            if (subentity == null) return resolve(null);
            return resolve({
                entityID: entity.entityID,
                type: entity.type,
                entity_id: entity._id,
                subentity_id: subentity._id,
            })
        } catch(err) { return reject(err) }})(); 
    })
}*/

var createEntity = (data) => {
    return new Promise((resolve, reject) => {
        (async () => { try {
            var newEntity = {
                ...data,
                joinTime: Date.now(),
            };
            if (data.type == 'User') {
                var entity = await findEntity({email: data.email})
                if (entity != null) throw new Error('(E)Mail exists.');
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
                if (entity != null) throw new Error('(E)Mail exists.');
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
    allUserPop,
    findEntity,
    createEntity,
    updateEntity,
    deleteEntity
}

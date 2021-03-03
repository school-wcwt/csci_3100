var Entity = require('../models/Entity');
var User   = require('../models/User');
var Rest   = require('../models/Rest');

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

var findEntity = (filter, type = 0, option) => {
    /* type:
        - 0 : All
        - 1 : Entity
        - 2 : Subentity
    */
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
            var entity = Entity.findOne(filter).exec()
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
}

var createEntity = data => {
    var addEntity = data => {
        return new Promise((resolve, reject) => {
            (async() => { try { 
                var tagGen = () => { return '' + Math.random().toString().substr(2, 4); };
                if (data.type) data.username == null 
                    ? data.name.replace(/ /g, '') 
                    : data.username.replace(/ /g, '');
                var tag = tagGen();
                var entityID = data.username + '-' + tag;
                var newEntity = new Entity({
                    entityID: entityID, 
                    tag: tag, 
                    joinTime: Date.now(),
                    ...data
                });
                var savedEntity = await newEntity.save()
                var newSubentity = data.type 
                    ? new Rest({entityID: entityID, entity: savedEntity._id})
                    : new User({entityID: entityID, entity: savedEntity._id});
                await newSubentity.save()
                var entity = await findEntity({entityID: entityID})
                return resolve(entity);
            } catch(err) { return reject(err) }})();
        })
    }
        
    return new Promise((resolve, reject) => {
        (async () => { try {
            var prevEntity = await findEntity({email: data.email})
            if (prevEntity != null) throw new Error('(E)Mail exists.'); 
            var addedEntity = await addEntity(data);
            return resolve(addedEntity);
        } catch(err) { return reject(err) }})();
    })
}

var updateEntity = (filter, data) => {
    return new Promise((resolve, reject) => {
        (async () => { try {
            if (data.email != null) {
                var entity = await findEntity({email: data.email})
                if (entity != null) throw new Error('(E)Mail exists.');
            }
            var oldEntity = await Entity.findOneAndUpdate(filter, data).exec();
            if (oldEntity == null) throw new Error('Entity not found.');
            var updatedEntity = await findEntity({entityID: oldEntity.entityID}, 1);
            return resolve({oldEntity: oldEntity, updatedEntity: updatedEntity});
        } catch (err) { return reject(err) }})();
    })
}

var deleteEntity = (filter) => {
    return new Promise((resolve, reject) => {
        (async() => { try { 
            var deletedEntity = await Entity.findOneAndDelete(filter);
            if (deletedEntity == null) throw new Error('Entity not found.');
            var deletedSubentity = deletedEntity.type 
                ? await Rest.findOneAndDelete({entity: deletedEntity._id}).exec()
                : await User.findOneAndDelete({entity: deletedEntity._id}).exec();
            return resolve({deletedEntity: deletedEntity, deletedSubentity: deletedSubentity});
        } catch (err) { return reject(err) }})();
    })
}

module.exports = {
    allUserPop,
    findEntity,
    findEntityID,
    createEntity,
    updateEntity,
    deleteEntity
}

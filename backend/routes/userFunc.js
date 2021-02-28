var Entity = require('../models/Entity');
var User   = require('../models/User');
var Rest   = require('../models/Rest');
var GroupList = require('../models/GroupList');
var {findEntity, findEntityID} = require('./entityFunc');

var bcrypt = require('bcrypt');

var auth = (filter, data) => {
    return new Promise((resolve, reject) => {
        (async () => { try {
            var entity = await Entity.findOne(filter).exec()
            if (entity.type || entity == null) throw new Error('Entity not found.');
            var match = await bcrypt.compare(entity.password, data.password) 
            if (!match) throw new Error('Incorrect password.')
            var loginedEntity = await findEntity({entityID: entityID})
            return resolve(loginedEntity);
        } catch(err) { return reject(err) } })();
    })
}

var updateFollow = (authorFilter, targetFilter, addFlag = 1) => {
    return new Promise((resolve, reject) => {
        (async () => { try { 
            var [author, target] = await Promise.all([
                findEntityID(authorFilter), 
                findEntityID(targetFilter)
            ]);
            if (author == null || target == null) throw new Error('Entity not found.');
            var followType  = target.type ? 'followingRest' : 'followingUser';
            var operation   = addFlag ? '$push' : '$pull';
            var targetQuery = { [operation]: {"followed":   author.entity_id} };
            var authorQuery = { [operation]: {[followType]: target.entity_id} };
            var [oldEntity, oldUser] = await Promise.all([
                Entity.findOneAndUpdate({entityID: target.entityID}, targetQuery).exec(),
                User.findOneAndUpdate({entityID: author.entityID}, authorQuery).exec()
            ])
            var updatedEntity = await findEntity(
                {entityID: oldUser.entityID}, 0, 
                {subentityPop: {path: followType, select: 'entityID'}}
            )
            return resolve(updatedEntity);
        } catch(err) { return reject(err) } })();
    })
}

var updateList = (authorFilter, listName, addFlag = 1) => {
    var addGroupList = (authorFilter, listName, addFlag) => {
        return new Promise((resolve, reject) => {
            (async () => { try {
                var author = await findEntityID(authorFilter)
                if (author == null) throw new Error('Entity not found.');
                var groupList = await GroupList.findOne({author: author.entity_id, name: listName}).exec()
                if (addFlag) {
                    if (groupList != null) throw new Error('List exists.');
                    let newList = new GroupList({
                        name: listName,
                        author: author.entity_id,
                        content: [],
                    })
                    var savedList = await newList.save();
                    return resolve({author: author, groupListID: savedList._id});
                } else { 
                    if (groupList == null) throw new Error('List does not exist.');
                    var deletedList = await groupList.remove();
                    return resolve({author: author, groupListID: deletedList._id}); 
                }
            } catch(err) { return reject(err) } })();
        })
    }
    
    return new Promise((resolve, reject) => {
        (async () => { try {
            var data = await addGroupList(authorFilter, listName, addFlag)
            var operation = addFlag ? '$push' : '$pull';
            var oldUser = await User.findOneAndUpdate(
                {entityID: data.author.entityID},
                {[operation]: {'groupList': data.groupListID}}
            ).exec()
            var updatedEntity = await findEntity({entityID: oldUser.entityID}, 0)
            return resolve(updatedEntity)
        } catch(err) { return reject(err) }})()
    })
}

var updateListContent = (authorFilter, targetFilter, listName, addFlag = 1) => {
    return new Promise((resolve, reject) => {
        (async () => { try { 
            var [author, target] = await Promise.all([
                findEntityID(authorFilter), 
                findEntityID(targetFilter),
            ]);
            if (author == null || target == null) throw new Error('Entity not found.');
            var operation = addFlag ? '$push' : '$pull';
            var oldGroupList = await GroupList.findOneAndUpdate(
                {author: author.entity_id, name: listName},
                {[operation]: {'content': target.entity_id}}
            ).exec();
            var updatedEntity = await findEntity(
                {entityID: author.entityID}, 0,
                {subentityPop: {path: 'groupList', select: 'name content', 
                    populate:  {path: 'content', select: 'entityID name profPhoto'}}}
            )
            return resolve(updatedEntity)
        } catch(err) { return reject(err) } })();
    })
}

module.exports = {
    auth,
    updateFollow,
    updateList,
    updateListContent,
}
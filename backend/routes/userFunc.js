var Entity = require('../models/Entity');
var User   = require('../models/User');
var {findEntity, findEntityID} = require('./entityFunc');
var groupListFunc = require('./groupListFunc');

var bcrypt = require('bcrypt');

var auth = (filter, password) => {
    return new Promise((resolve, reject) => {
        (async () => { try {
            var entity = await Entity.findOne(filter).exec()
            if (entity.type || entity == null) throw new Error('Entity not found.');
            var match = await bcrypt.compare(password,entity.password)
            if (!match) throw new Error('Incorrect password.')
            var loginedEntity = await findEntity({entityID: entity.entityID})
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
    return new Promise((resolve, reject) => {
        (async () => { try {
            var updatedGroupList = addFlag
                ? await groupListFunc.createGroupList(authorFilter, listName)
                : await groupListFunc.deleteGroupList(authorFilter, listName)
            var operation = addFlag ? '$push' : '$pull';
            await User.findOneAndUpdate(
                {_id: updatedGroupList.author},
                {[operation]: {'groupList': updatedGroupList._id}},
            ).exec()
            var updatedEntity = await findEntity(authorFilter)
            return resolve(updatedEntity)
        } catch(err) { return reject(err) }})()
    })
}

var updateListName = (authorFilter, listName, newListName) => {
    return new Promise((resolve, reject) => {
        (async () => { try { 
            await groupListFunc.updateGroupList(authorFilter, listName, newListName)
            var updatedEntity = await findEntity(authorFilter)
            return resolve(updatedEntity);
        } catch(err) { return reject(err) } })();
    })   
}

var updateListContent = (authorFilter, targetFilter, listName, addFlag = 1) => {
    return new Promise((resolve, reject) => {
        (async () => { try { 
            var updatedGroupList = await groupListFunc.updateContent(authorFilter, targetFilter, listName, addFlag)
            return resolve(updatedGroupList)
        } catch(err) { return reject(err) } })();
    })
}



module.exports = {
    auth,
    updateFollow,
    updateList,
    updateListName,
    updateListContent,
}
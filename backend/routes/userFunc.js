var Entity = require('../models/Entity');
var User   = require('../models/User');
var Rest   = require('../models/Rest');
var GroupList = require('../models/GroupList');
var {findEntity, findEntityID} = require('./entityFunc');

var bcrypt = require('bcrypt');

var auth = (filter, data) => {
    return new Promise((resolve, reject) => {
        Entity
        .findOne(filter)
        .exec((err, entity) => {
            if (err) return reject(err);
            if (entity.type || entity == null) return reject('Entity not found.');
            bcrypt.compare(entity.password, data.password, (err, res) => {
                if (err) return reject(err);
                if (!res) return reject('Incorrect password.')
                findEntity({entityID: entityID})
                .then(loginedEntity => {
                    return resolve(loginedEntity)
                })
            })
        })
    })
}

var updateFollow = (authorFilter, targetFilter, addFlag = 1) => {
    return new Promise((resolve, reject) => {
        findEntityID(authorFilter)
        .then(author => {
            if (author == null) throw new Error('Entity not found.');
            findEntityID(targetFilter)
            .then(target => {
                if (target == null) throw new Error('Entity not found.');
                var followType = target.type ? 'followingRest' : 'followingUser';
                var operation = addFlag ? '$push' : '$pull';
                var targetQuery = { [operation]: {"followed":   author.entity_id} };
                var authorQuery = { [operation]: {[followType]: target.entity_id} };
                Entity.findOneAndUpdate({entityID: target.entityID}, targetQuery)
                .exec(err => { if (err) throw err; })
                User.findOneAndUpdate({entityID: author.entityID}, authorQuery)
                .exec((err, oldUser) => {
                    if (err) throw err;
                    findEntity(
                        {entityID: oldUser.entityID}, 0, 
                        {subentityPop: {path: followType, select: 'entityID'}}
                    )
                    .then(updatedEntity => { return resolve(updatedEntity) })
                    .catch(err => { throw err });
                })
            })
            .catch(err => { throw err })
        })
        .catch(err => { return reject(err) });
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
        findEntityID(authorFilter)
        .then(author => {
            if (author == null) throw new Error('Entity not found.');
            findEntityID(targetFilter)
            .then(target => {
                if (target == null) throw new Error('Entity not found.');
                var operation = addFlag ? '$push' : '$pull';
                User.findOneAndUpdate(
                    {entityID: author.entityID},
                    {[operation]: {'groupList.$[elem].content': target.entity_id}},
                    {arrayFilters: [{'elem.name': listName}]},
                ).exec((err, oldUser) => {
                    if (err) throw err;
                    findEntity(
                        {entityID: oldUser.entityID}, 0,
                        {subentityPop: {path: groupList, select: 'entityID'}}
                    )
                    .then(updatedEntity => { return resolve(updatedEntity) })
                    .catch(err => { throw err });
                })
            })
            .catch(err => { throw err })
        })
        .catch(err => { return reject(err) });
    })
}


/*
                    {subentityPop: {path: 'groupList', select: 'name content', 
                        populate: {path: 'content', select: 'entityID name profPhoto'}}
                        */
module.exports = {
    auth,
    updateFollow,
    updateList,
    updateListContent,
}
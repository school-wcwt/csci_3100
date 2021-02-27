var Entity = require('../models/Entity');
var User   = require('../models/User');
var Rest   = require('../models/Rest');
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
    return new Promise((resolve, reject) => {
        findEntityID(authorFilter)
        .then(author => {
            if (author == null) throw new Error('Entity not found.');
            var operation = addFlag ? '$push' : '$pull';
            User.findOneAndUpdate(
                {entityID: author.entityID},
                {[operation]: {'groupList': {'name': listName, 'content': []}}},
            ).exec((err, oldUser) => {
                if (err) throw err;
                findEntity(
                    {entityID: oldUser.entityID}, 0,
                    {subentityPop: {path: 'groupList.content', select: 'entityID'}}
                )
                .then(updatedEntity => { return resolve(updatedEntity) })
                .catch(err => { throw err });
            })
        })
        .catch(err => { return reject(err) });
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

module.exports = {
    auth,
    updateFollow,
    updateList,
    updateListContent,
}
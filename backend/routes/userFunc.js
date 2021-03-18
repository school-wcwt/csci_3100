var {findEntity} = require('./entityFunc');
const postFunc = require('./postFunc');
const commentFunc = require('./commentFunc');
var groupListFunc = require('./groupListFunc');

var bcrypt = require('bcrypt');

var auth = (filter, password) => {
    return new Promise((resolve, reject) => {
        (async () => { try {
            var entity = await findEntity(filter, {select: ''}).exec()
            if (entity.type || entity == null) throw new Error('Entity not found.');
            var match = await bcrypt.compare(password, entity.password)
            if (!match) throw new Error('Incorrect password.')
            var loginedEntity = await findEntity({entityID: entity.entityID})
            return resolve(loginedEntity);
        } catch(err) { return reject(err) } })();
    })
}

// ------ User Post Function ------

var createPost = (authorFilter, targetFilter, data) => {
    return new Promise((resolve, reject) => {
        (async () => { try { 
            var [author, target] = await Promise.all([
                findEntity(authorFilter), 
                findEntity(targetFilter)
            ]);
            if (author == null || target == null) throw new Error('Entity not found.');
            const newPost = await postFunc.createPost({
                author: author._id, 
                target: target._id
            }, author.entityID, data)
            return resolve(newPost);
        } catch(err) { return reject(err) } })();
    })
}

var updatePost = (filter, data) => {
    return new Promise((resolve, reject) => {
        (async () => { try { 
            var updatedPost = await postFunc.updatePost(filter, null, data);
            return resolve(updatedPost);
        } catch(err) { return reject(err) } })();
    })
}

var deletePost = (filter) => {
    return new Promise((resolve, reject) => {
        (async () => { try { 
            var deletedPost = await postFunc.deletePost(filter);
            return resolve(deletedPost);
        } catch(err) { return reject(err) } })();
    })
}

// ------ Inter-user interactions ------

var likePost = (postFilter, authorFilter, addFlag = true) => {
    return new Promise((resolve, reject) => {
        (async () => { try { 
            var author = await findEntity(authorFilter);
            if (author == null) throw new Error('Entity not found.');
            var updatedPost = await postFunc.updatePost(
                postFilter, {like: author._id, addFlag: addFlag});
            return resolve(updatedPost);
        } catch(err) { return reject(err) } })();
    })
}

var commentPost = (postFilter, authorFilter, data) => {
    return new Promise((resolve, reject) => {
        (async () => { try { 
            var [author, post] = await Promise.all([
                findEntity(authorFilter),
                postFunc.findPost(postFilter),
            ]);
            if (author == null || post == null) throw new Error('Entity not found.');
            var comment = await commentFunc.createComment(
                {author: author._id, post: post._id}, 
                author.entityID, data);
            var updatedPost = await postFunc.updatePost(
                postFilter, {comment: comment._id, addFlag: true}, null);
            return resolve(updatedPost);
        } catch(err) { return reject(err) } })();
    })
}

var deleteComment = (commentFilter, data) => {
    return new Promise((resolve, reject) => {
        (async () => { try { 
            var comment = await commentFunc.deleteComment(commentFilter);
            if (comment == null) throw new Error('Comment not found.');
            var updatedPost = await postFunc.updatePost(
                postFilter, {comment: comment._id, addFlag: false}, null);
            return resolve(updatedPost);
        } catch(err) { return reject(err) } })();
    })
}

/*

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
            var [_, oldUser] = await Promise.all([
                Entity.updateOne({entityID: target.entityID}, targetQuery).exec(),
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

*/

module.exports = {
    auth,
    /*updateFollow,
    updateList,
    updateListName,
    updateListContent,*/
}
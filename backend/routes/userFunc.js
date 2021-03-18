const entityFunc = require('./entityFunc');
const postFunc = require('./postFunc');
const commentFunc = require('./commentFunc');
var groupListFunc = require('./groupListFunc');

var bcrypt = require('bcrypt');

var auth = (filter, password) => {
    return new Promise((resolve, reject) => {
        (async () => { try {
            var entity = await entityFunc.findEntity(filter, {select: ''}).exec()
            if (entity.type || entity == null) throw new Error('Entity not found.');
            var match = await bcrypt.compare(password, entity.password)
            if (!match) throw new Error('Incorrect password.')
            var loginedEntity = await entityFunc.findEntity({entityID: entity.entityID})
            return resolve(loginedEntity);
        } catch(err) { return reject(err) } })();
    })
}

// ------ User Post Function ------

var createPost = (authorFilter, targetFilter, data) => {
    return new Promise((resolve, reject) => {
        (async () => { try { 
            var [author, target] = await Promise.all([
                entityFunc.findEntity(authorFilter), 
                entityFunc.findEntity(targetFilter)
            ]);
            if (author == null || target == null) throw new Error('Entity not found.');
            const newPost = await postFunc.createPost({
                author: author._id, 
                target: target._id
            }, author.entityID, data)
            await entityFunc.updateEntity(
                {_id: author._id}, 
                {$push: {post: {$each: [newPost._id], $position: 0}}})
            if (data.type == 1) // Review
                await entityFunc.updateEntity(
                    {_id: target._id}, 
                    { $inc:  {rating: data.rating},
                      $push: {post: {$each: [newPost._id], $position: 0}} })
            return resolve(newPost);
        } catch(err) { return reject(err) } })();
    })
}

var deletePost = (filter) => {
    return new Promise((resolve, reject) => {
        (async () => { try { 
            var deletedPost = await postFunc.deletePost(filter);
            await entityFunc.updateEntity(
                {_id: deletedPost.author},
                {$pull: {post: deletedPost._id}})
            if (deletedPost.type == 1)
                await entityFunc.updateEntity(
                    {_id: deletedPost.target},
                    { $inc:  {rating: -data.rating},
                      $pull: {post: deletedPost._id} })
            return resolve(deletedPost);
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

// ------ User GroupList Functions ------

var createList = (authorFilter, listName) => {   
    return new Promise((resolve, reject) => {
        (async () => { try {
            const author = await entityFunc.findEntity(authorFilter);
            if (author == null) throw new Error('Entity not found.')
            var addedGroupList = await groupListFunc.createGroupList({author: author._id}, listName)
            var updatedEntity = await entityFunc.updateEntity(
                {_id: author._id},
                {$push: {groupList: addedGroupList._id}});
            return resolve(updatedEntity)
        } catch(err) { return reject(err) }})()
    })
}

var deleteList = (authorFilter, listName) => {   
    return new Promise((resolve, reject) => {
        (async () => { try {
            const author = await entityFunc.findEntity(authorFilter);
            if (author == null) throw new Error('Entity not found.')
            var deletedGroupList = await groupListFunc.deleteGroupList({author: author._id, name: listName})
            var updatedEntity = await entityFunc.updateEntity(
                {_id: author._id},
                {$pull: {groupList: deletedGroupList._id}})
            return resolve(updatedEntity)
        } catch(err) { return reject(err) }})()
    })
}

var updateList = (authorFilter, listName, data) => {
    return new Promise((resolve, reject) => {
        (async () => { try { 
            const author = await entityFunc.findEntity(authorFilter);
            if (author == null) throw new Error('Entity not found.');
            var updatedGroupList = await groupListFunc.updateGroupList(
                {author: author._id, name: listName},
                null, data)
            return resolve(updatedGroupList);
        } catch(err) { return reject(err) } })();
    })   
}

var updateListContent = (authorFilter, targetFilter, listName, addFlag = true) => {
    return new Promise((resolve, reject) => {
        (async () => { try { 
            var [author, target] = await Promise.all([
                entityFunc.findEntity(authorFilter), 
                entityFunc.findEntity(targetFilter)
            ]);
            if (author == null || target == null) throw new Error('Entity not found.');
            var updatedGroupList = await groupListFunc.updateGroupList(
                {author: author._id, name: listName},
                {target: target._id, addFlag: addFlag})
            return resolve(updatedGroupList)
        } catch(err) { return reject(err) } })();
    })
}

// ------ Inter-user interactions ------

var likePost = (postFilter, authorFilter, addFlag = true) => {
    return new Promise((resolve, reject) => {
        (async () => { try { 
            var author = await entityFunc.findEntity(authorFilter);
            if (author == null) throw new Error('Entity not found.');
            var updatedPost = await postFunc.updatePost(
                postFilter, {like: author._id, addFlag: addFlag});
            return resolve(updatedPost);
        } catch(err) { return reject(err) } })();
    })
}

var createComment = (postFilter, authorFilter, data) => {
    return new Promise((resolve, reject) => {
        (async () => { try { 
            var [author, post] = await Promise.all([
                entityFunc.findEntity(authorFilter),
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

var deleteComment = (commentFilter) => {
    return new Promise((resolve, reject) => {
        (async () => { try { 
            var comment = await commentFunc.deleteComment(commentFilter);
            if (comment == null) throw new Error('Comment not found.');
            var updatedPost = await postFunc.updatePost(
                {_id: comment.post}, {comment: comment._id, addFlag: false}, null);
            return resolve(updatedPost);
        } catch(err) { return reject(err) } })();
    })
}

var updateComment = (commentFilter, data) => {
    return new Promise((resolve, reject) => {
        (async () => { try { 
            var updatedComment = await commentFunc.updateComment(commentFilter, data);
            if (updatedComment == null) throw new Error('Comment not found.');
            return resolve(updatedComment);
        } catch(err) { return reject(err) } })();
    })
}

var updateFollow = (authorFilter, targetFilter, addFlag = true) => {
    return new Promise((resolve, reject) => {
        (async () => { try { 
            var [author, target] = await Promise.all([
                entityFunc.findEntity(authorFilter), 
                entityFunc.findEntity(targetFilter)
            ]);
            if (author == null || target == null) throw new Error('Entity not found.');
            var followType  = target.type == 'User' ? 'followingUser': 'followingRest';
            var operation   = addFlag ? '$push' : '$pull';
            await Promise.all([
                Entity.updateOne(
                    {_id: author._id}, 
                    { [operation]: {[followType]: target.entity_id} }
                ).exec(),
                Entity.updateOne(
                    {_id: target._id}, 
                    { [operation]: {'followed':   author.entity_id} }
                ).exec(),
            ])
            var updatedEntity = await entityFunc.findEntity({_id: author._id});
            return resolve(updatedEntity);
        } catch(err) { return reject(err) } })();
    })
}

module.exports = {
    auth,
    createPost,
    deletePost,
    updatePost,
    createList,
    deleteList,
    updateList,
    updateListContent,
    likePost,
    createComment,
    deleteComment,
    updateComment,
    updateFollow,
}
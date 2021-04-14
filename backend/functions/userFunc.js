const entityFunc = require('./entityFunc');
const postFunc = require('./postFunc');
const commentFunc = require('./commentFunc');
const groupListFunc = require('./groupListFunc');
const hashtagFunc = require('./hashtagFunc');

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
                    {_id: target._id, type: 'Rest'}, 
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
                    {_id: deletedPost.target, type: 'Rest'},
                    { $inc:  {rating: deletedPost.rating},
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
                {_id: author._id, type: 'User'},
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
                {_id: author._id, type: 'User'},
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

// ------ User Hashtag Functions ------

var findTag = (restFilter, name) => {
    return new Promise((resolve, reject) => {
        (async () => { try { 
            var rest = await entityFunc.findEntity(restFilter);
            if (rest == null) throw new Error('Entity not found.');
            var tag = await hashtagFunc.findTag({entity: rest._id, name: name})
            return resolve(tag);
        } catch(err) { return reject(err) } })();
    })
}

var findTags = (restFilter, name) => {
    return new Promise((resolve, reject) => {
        (async () => { try { 
            var rest = await entityFunc.findEntity(restFilter);
            if (rest == null) throw new Error('Entity not found.');
            var tags = await hashtagFunc.findTags({entity: rest._id, name: name})
            return resolve(tags);
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
            var followType  = target.type == 'User' ? 'followingUser' : 'followingRest';
            var operation   = addFlag ? '$push' : '$pull';
            var [updatedAuthor, _] = await Promise.all([
                entityFunc.updateEntity(
                    {_id: author._id, type: 'User'}, 
                    { [operation]: {[followType]: target._id} }
                ),
                entityFunc.updateEntity(
                    {_id: target._id}, 
                    { [operation]: {followed: author._id} }
                )
            ])
            return resolve(updatedAuthor);
        } catch(err) { return reject(err) } })();
    })
}

// --

module.exports = {
    //auth,
    createPost,
    deletePost,
    updatePost,

    createList,
    deleteList,
    updateList,
    updateListContent,

    findTag,
    findTags,

    likePost,
    createComment,
    deleteComment,
    updateComment,
    updateFollow,


}
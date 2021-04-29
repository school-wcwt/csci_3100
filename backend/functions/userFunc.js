/** 
 * CRUD functions of Users.
 * @module functions/user
 */

const entityFunc = require('./entityFunc');
const postFunc = require('./postFunc');
const commentFunc = require('./commentFunc');
const groupListFunc = require('./groupListFunc');
const hashtagFunc = require('./hashtagFunc');

// =============================
//      User Post Function
// =============================

/**
 * Create a Post and push it under the author (and the target if applicable).
 * @static
 * @see module:functions/post.createPost
 * @param {Object} authorFilter - Searching filter for the author of the Post, an instance of [Entity.Schema]{@link Entity} ([User.Schema]{@link User}).
 * @param {Object} targetFilter - Searching filter for the target of the Post, an instance of [Entity.Schema]{@link Entity} ([Rest.Schema]{@link Rest}).
 * @param {Object} data - Data of the Post.
 * @returns {Promise<Post>} Created Post, an instance of [Post.Schema]{@link Post}.
 * @throws Entity not found.
 */
var createPost = (authorFilter, targetFilter, data) => {
    return new Promise((resolve, reject) => {
        (async () => { try { 
            // Fetch author and target
            var [author, target] = await Promise.all([
                entityFunc.findEntity(authorFilter), 
                entityFunc.findEntity(targetFilter)
            ]);
            if (author == null || target == null) throw new Error('Entity not found.');
            // Create a Post
            const newPost = await postFunc.createPost({
                author: author._id, 
                target: target._id
            }, author.entityID, data)
            // Push the Post under author 
            await entityFunc.updateEntity(
                {_id: author._id}, 
                {$push: {post: {$each: [newPost._id], $position: 0}}})
            // Push the Post under target if it is a review
            if (data.type == 1)
                await entityFunc.updateEntity(
                    {_id: target._id, type: 'Rest'}, 
                    { $inc:  {rating: data.rating},
                      $push: {post: {$each: [newPost._id], $position: 0}} })
            return resolve(newPost);
        } catch(err) { return reject(err) } })();
    })
}

/**
 * Delete a Post and pull it from the author (and the target if applicable).
 * @static
 * @see module:functions/post.deletePost
 * @param {Object} filter - Searching filter for the Post, an instance of [Post.Schema]{@link Post}.
 * @returns {Promise<Post>} Deleted Post, an instance of [Post.Schema]{@link Post}.
 */
var deletePost = (filter) => {
    return new Promise((resolve, reject) => {
        (async () => { try { 
            // Delete a Post
            var deletedPost = await postFunc.deletePost(filter);
            // Pull the Post from author
            await entityFunc.updateEntity(
                {_id: deletedPost.author},
                {$pull: {post: deletedPost._id}})
            // Pull the Post from target if it is a review
            if (deletedPost.type == 1)
                await entityFunc.updateEntity(
                    {_id: deletedPost.target, type: 'Rest'},
                    { $inc:  {rating: -deletedPost.rating},
                      $pull: {post: deletedPost._id} })
            return resolve(deletedPost);
        } catch(err) { return reject(err) } })();
    })
}

/**
 * Update a Post.
 * @static
 * @see module:functions/post.updatePost
 * @param {Object} filter - Searching filter for the Post, an instance of [Post.Schema]{@link Post}.
 * @returns {Promise<Post>} Updated Post, an instance of [Post.Schema]{@link Post}.
 */
var updatePost = (filter, data) => {
    return new Promise((resolve, reject) => {
        (async () => { try { 
            var updatedPost = await postFunc.updatePost(filter, null, data);
            return resolve(updatedPost);
        } catch(err) { return reject(err) } })();
    })
}

// =============================
//    User GroupList Function
// =============================

/**
 * Create a GroupList and push it under the author.
 * @static
 * @see module:functions/groupList.createGroupList
 * @param {Object} authorFilter - Searching filter for the author of the GroupList, an instance of [Entity.Schema]{@link Entity} ([User.Schema]{@link User}).
 * @param {string} listName - Name of the GroupList.
 * @returns {Promise<Entity>} Updated Entity (User), an instance of [Entity.Schema]{@link Entity} ([User.Schema]{@link User}).
 * @throws Entity not found.
 */
var createList = (authorFilter, listName) => {   
    return new Promise((resolve, reject) => {
        (async () => { try {
            // Fetch author
            const author = await entityFunc.findEntity(authorFilter);
            if (author == null) throw new Error('Entity not found.')
            // Create a GroupList
            var addedGroupList = await groupListFunc.createGroupList({author: author._id}, listName)
            // Push the GroupList under author
            var updatedEntity = await entityFunc.updateEntity(
                {_id: author._id, type: 'User'},
                {$push: {groupList: addedGroupList._id}});
            return resolve(updatedEntity)
        } catch(err) { return reject(err) }})()
    })
}

/**
 * Delete a GroupList and pull it from the author.
 * @static
 * @see module:functions/groupList.deleteGroupList
 * @param {Object} authorFilter - Searching filter for the author of the GroupList, an instance of [Entity.Schema]{@link Entity} ([User.Schema]{@link User}).
 * @param {string} listName - Name of the GroupList.
 * @returns {Promise<Entity>} Deleted Entity (User), an instance of [Entity.Schema]{@link Entity} ([User.Schema]{@link User}).
 * @throws Entity not found.
 */
var deleteList = (authorFilter, listName) => {   
    return new Promise((resolve, reject) => {
        (async () => { try {
            // Fetch author
            const author = await entityFunc.findEntity(authorFilter);
            if (author == null) throw new Error('Entity not found.')
            // Delete a GroupList
            var deletedGroupList = await groupListFunc.deleteGroupList({author: author._id, name: listName})
            // Pull the GroupList under author
            var updatedEntity = await entityFunc.updateEntity(
                {_id: author._id, type: 'User'},
                {$pull: {groupList: deletedGroupList._id}})
            return resolve(updatedEntity)
        } catch(err) { return reject(err) }})()
    })
}

/**
 * Update a GroupList.
 * @static
 * @see module:functions/groupList.updateGroupList
 * @param {Object} authorFilter - Searching filter for the author of the GroupList, an instance of [Entity.Schema]{@link Entity} ([User.Schema]{@link User}).
 * @param {string} listName - Name of the GroupList.
 * @param {Object} data - Data to update the GroupList, an instance of [GroupList.Schema]{@link GroupList}.
 * @returns {Promise<Entity>} Updated GroupList, an instance of [GroupList.Schema]{@link GroupList}.
 * @throws Entity not found.
 */
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

/**
 * Update content in a GroupList.
 * @static
 * @see module:functions/groupList.updateGroupList
 * @param {Object} authorFilter - Searching filter for the author of the GroupList, an instance of [Entity.Schema]{@link Entity} ([User.Schema]{@link User}).
 * @param {Object} targetFilter - Searching filter for the target to be modified in the content of GroupList, an instance of [Entity.Schema]{@link Entity} ([Rest.Schema]{@link Rest}).
 * @param {string} listName - Name of the GroupList.
 * @param {boolean} addFlag - Whether to add (push) or delete (pull) said target.
 * @returns {Promise<Post>} Created Post, an instance of [Post.Schema]{@link Post}.
 * @throws Entity not found.
 */
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

// =============================
//     User Hashtag Function
// =============================

/**
 * Read a single Hashtag.
 * @static
 * @see module:functions/hashtag.findTag
 * @param {Object} restFilter - Searching filter for the Rest (Hashtag.target) of the Hashtag, an instance of [Entity.Schema]{@link Entity} ([Rest.Schema]{@link Rest}).
 * @param {string} name - Name of the Hashtag.
 * @returns {Promise<Hashtag|null>} A Hashtag after query, an instance of [Hashtag.Schema]{@link Hashtag}. 
 */
var findTag = (restFilter, name) => {
    return new Promise((resolve, reject) => {
        (async () => { try { 
            var filter = name != undefined ? {name} : {};
            if (restFilter != null) {
                var rest = await entityFunc.findEntity(restFilter);
                if (rest == null) throw new Error('Entity not found.');
                filter.target = rest._id;
            }
            var tag = await hashtagFunc.findTag(filter);
            return resolve(tag);
        } catch(err) { return reject(err) } })();
    })
}

/**
 * Read multiple Hashtags.
 * @static
 * @see module:functions/hashtag.findTag
 * @param {Object} restFilter - Searching filter for the Rest (Hashtag.target) of the Hashtag, an instance of [Entity.Schema]{@link Entity} ([Rest.Schema]{@link Rest}).
 * @returns {Promise<Hashtag|null>} Hashtags after query, instances of [Hashtag.Schema]{@link Hashtag}. 
 */
var findTags = (restFilter) => {
    return new Promise((resolve, reject) => {
        (async () => { try { 
            var rest = await entityFunc.findEntity(restFilter);
            if (rest == null) throw new Error('Entity not found.');
            var tags = await hashtagFunc.findTags({target: rest._id})
            return resolve(tags);
        } catch(err) { return reject(err) } })();
    })
}

// =============================
//    Inter-user interactions
// =============================

/**
 * Like or unlike a Post, i.e., push/pull author into/from Post.like.
 * @static
 * @see module:functions/post.updatePost
 * @param {Object} postFilter - Searching filter for the Post, an instance of [Post.Schema]{@link Post}.
 * @param {Object} authorFilter - Searching filter for the author who liked the Post, an instance of [Entity.Schema]{@link Entity} ([User.Schema]{@link User}).
 * @param {boolean} addFlag - Whether to add (push) or delete (pull) said author.
 * @throws Entity not found.
 */
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

/**
 * Create a comment under a Post.
 * @static
 * @see module:functions/comment.createComment
 * @param {Object} postFilter - Searching filter for the Post, an instance of [Post.Schema]{@link Post}.
 * @param {Object} authorFilter - Searching filter for the author who commented the Post, an instance of [Entity.Schema]{@link Entity} ([User.Schema]{@link User}).
 * @param {String}} data - Content of the Comment.
 * @returns {Promise<Post>} Updated Post, an instance of [Post.Schema]{@link Post}.
 * @throws Entity not found.
 * @throws Post not found.
 */
var createComment = (postFilter, authorFilter, data) => {
    return new Promise((resolve, reject) => {
        (async () => { try { 
            var [author, post] = await Promise.all([
                entityFunc.findEntity(authorFilter),
                postFunc.findPost(postFilter),
            ]);
            if (author == null) throw new Error('Entity not found.');
            if (post == null) throw new Error('Post not found.');
            var comment = await commentFunc.createComment(
                {author: author._id, post: post._id}, 
                author.entityID, data);
            var updatedPost = await postFunc.updatePost(
                postFilter, {comment: comment._id, addFlag: true}, null);
            return resolve(updatedPost);
        } catch(err) { return reject(err) } })();
    })
}

/**
 * Delete a comment from a Post.
 * @static
 * @see module:functions/comment.deleteComment
 * @param {Object} commentFilter - Searching filter for the Comment, an instance of [Comment.Schema]{@link Comment}.
 * @returns {Promise<Post>} Updated Post, an instance of [Post.Schema]{@link Post}.
 * @throws Comment not found.
 */
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

/**
 * Update a comment.
 * @static
 * @see module:functions/comment.updateComment
 * @param {Object} commentFilter - Searching filter for the Comment, an instance of [Comment.Schema]{@link Comment}.
 * @returns {Promise<Comment>} Updated Comment, an instance of [Comment.Schema]{@link Comment}.
 * @throws Comment not found.
 */
var updateComment = (commentFilter, data) => {
    return new Promise((resolve, reject) => {
        (async () => { try { 
            var updatedComment = await commentFunc.updateComment(commentFilter, data);
            if (updatedComment == null) throw new Error('Comment not found.');
            return resolve(updatedComment);
        } catch(err) { return reject(err) } })();
    })
}

/**
 * Follow or unfollow an Entity, i.e., modify author and target in Entity.following{User/Rest} and Entity.followed respectively.
 * @static
 * @param {Object} authorFilter - Searching filter for the author of the following action, an instance of [Entity.Schema]{@link Entity} ([User.Schema]{@link User}).
 * @param {Object} targetFilter - Searching filter for the target of the following action, an instance of [Entity.Schema]{@link Entity}.
 * @param {boolean} addFlag - Whether to add (push) or delete (pull) said target.
 * @returns {Promise<Entity>} Updated author, an instance of [Entity.Schema]{@link Entity} ([User.Schema]{@link User}).
 * @throws Entity not found.
 */
var updateFollow = (authorFilter, targetFilter, addFlag = true) => {
    return new Promise((resolve, reject) => {
        (async () => { try { 
            // Fetch author and target Entity
            var [author, target] = await Promise.all([
                entityFunc.findEntity(authorFilter), 
                entityFunc.findEntity(targetFilter)
            ]);
            if (author == null || target == null) throw new Error('Entity not found.');
            var followType  = target.type == 'User' ? 'followingUser' : 'followingRest';
            var operation   = addFlag ? '$push' : '$pull';
            var [updatedAuthor, _] = await Promise.all([
                // Push/Pull author into Entity.followingUser or Entity.followingRest
                entityFunc.updateEntity(
                    {_id: author._id, type: 'User'}, 
                    { [operation]: {[followType]: target._id} }
                ),
                // Push/Pull target into Entity.followed
                entityFunc.updateEntity(
                    {_id: target._id}, 
                    { [operation]: {followed: author._id} }
                )
            ])
            return resolve(updatedAuthor);
        } catch(err) { return reject(err) } })();
    })
}

module.exports = {
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
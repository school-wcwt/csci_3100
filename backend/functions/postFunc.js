const Post = require("../models/Post")
const { useTags } = require("./hashtagFunc")
const { deleteComments } = require('./commentFunc');

/**
 * Find multiple posts. Comments and Likes are NOT populated.
 * @param {Object} filter 
 * @returns 
 */
var findPost = (filter) => {
    return new Promise((resolve, reject) => {
        (async () => { try { 
            const post = await Post.findOne(filter)
            .populate('author', 'entityID username tag name profPhoto')
            .populate('target', 'entityID username tag name profPhoto')
            .populate('hashtag', 'name')
            .populate({
                path:'comment',
                perDocumentLimit: 3,
                populate: {
                    path: 'author',
                    select: 'entityID username tag name profPhoto'
                }
            })
            .exec();
            return resolve(post);
        } catch(err) { return reject(err) }})(); 
    })
}

/**
 * Find multiple posts. Comments and Likes are NOT populated.
 * @param {Object} filter 
 * @returns 
 */
 var findPosts = (filter) => {
    return new Promise((resolve, reject) => {
        (async () => { try { 
            const post = await Post.find(filter)
            .populate('author', 'entityID username tag name profPhoto')
            .populate('target', 'entityID username tag name profPhoto')
            .populate('hashtag', 'name')
            .populate({
                path:'comment',
                perDocumentLimit: 3,
                populate: {
                    path: 'author',
                    select: 'entityID username tag name profPhoto'
                }
            })
            .exec();
            return resolve(post);
        } catch(err) { return reject(err) }})(); 
    })
}

/**
 * Create a new post.
 * @param {Object} props 
 * @param {ObjectId} props.author
 * @param {ObjectId} props.target
 * @param {string} authorEntityID
 * @param {Object} data 
 * @returns 
 */
var createPost = (props, authorEntityID, data) => {
    return new Promise((resolve, reject) => {
        (async() => { try {
            var newPost = new Post({
                postID: `${authorEntityID}-${Date.now()}`,
                ...props,
                ...data,
                createdTime: Date.now(),
            })
            // Fetch tags _id
            if (data.hashtag != null) {
                var hashtag = await useTags(
                    {target: props.target},
                    [], data.hashtag, 
                )
                newPost.hashtag = hashtag;
            }
            // Save post
            await newPost.save();
            const savedPost = findPost({_id: newPost._id});
            return resolve(savedPost);
        } catch (err) { return reject(err) }})()
    })
}

/**
 * Deletes a post and its respective comments. Modify relative tags.
 * @param {Object} filter
 * @returns {Promise<Object>} A promise with a deleted Post.
 */
 var deletePost = (filter) => {
    return new Promise((resolve, reject) => {
        (async () => { try { 
            const deletedPost = await Post.findOneAndDelete(filter).exec();
            if (deletedPost == null) throw new Error('Post not found.');
            await Promise.all([
                deleteComments({post: deletedPost._id}),
                useTags({ target: deletedPost.target }, deletedPost.hashtag, [])
            ])
            return resolve(deletedPost);
        } catch(err) { return reject(err) }})(); 
    })
}

/**
 * Updates a post.
 * @param {Object} filter 
 * @param {Object} [props]
 * @param {ObjectId} [props.like] Entity _id of the initiate user.
 * @param {ObjectId} [props.comment] Entity _id of the initiate user.
 * @param {ObjectId} [props.addFlag]
 * @param {Object} [data] Rest of update data (NOT including like or comment).
 * @returns 
 */
var updatePost = (filter, props = null, data = null) => {
    return new Promise((resolve, reject) => {
        (async () => { try { 
            // Search existing entity
            const post = await Post.findOne(filter).exec();
            if (post == null) throw new Error('Post not found.');
            // Query 
            var updateQuery = {$push: {modifiedTime: Date.now()}}
            if (data != null) {
                updateQuery.$set = {...data};
                if (data.hashtag != null) {
                    var hashtag = await useTags({target: post.target}, post.hashtag, data.hashtag)
                    updateQuery.$set.hashtag = hashtag
                }
            }
            if (props != null && props.like != null) 
                props.addFlag 
                    ? updateQuery.$push.like = {$each: [props.like], $position: 0}
                    : updateQuery.$pull.like = props.like;
            if (props != null && props.comment != null)
                props.addFlag 
                    ? updateQuery.$push.comment = {$each: [props.comment], $position: 0}
                    : updateQuery.$pull.comment = props.comment;
            console.log(updateQuery);
            // Update post
            await Post.updateOne(filter, updateQuery).exec();
            const updatedPost = await findPost({_id: post._id});
            return resolve(updatedPost);
        } catch(err) { return reject(err) }})(); 
    })
}



module.exports = {
    findPost,
    findPosts,
    createPost,
    updatePost,
    deletePost,
}
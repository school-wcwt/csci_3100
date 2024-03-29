/** 
 * CRUD functions of Posts.
 * @module functions/post
 */

const Post = require("../models/Post")
const { useTags } = require("./hashtagFunc")
const { deleteComments } = require('./commentFunc');

const Mongoose = require('mongoose')

/**
 * Read a single Post.
 * @static
 * @param {Object} filter - Searching filter for the Post, an instance of [Post.Schema]{@link Post}.
 * @returns {Promise<Post|null>} A Post after query, an instance of [Post.Schema]{@link Post}, with author, target, hashtag, comment, and comment.author partially populated.
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
                perDocumentLimit: 10,
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
 * Read multiple Posts, sorted by descending order of Post.createdTime.
 * @static
 * @param {Object} filter - Searching filter for the Posts, instances of [Post.Schema]{@link Post}.
 * @returns {Promise<Post[]|null>} Posts after query, instances of [Post.Schema]{@link Post}, with author, target, hashtag, comment, and comment.author partially populated.
 */
 var findPosts = (filter) => {
    return new Promise((resolve, reject) => {
        (async () => { try { 
            const post = await Post.find(filter).sort({createdTime: -1})
            .populate('author', 'entityID username tag name profPhoto')
            .populate('target', 'entityID username tag name profPhoto')
            .populate('hashtag', 'name')
            .populate({
                path:'comment',
                perDocumentLimit: 10,
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
 * Create a new Post.
 * @static
 * @param {Object} props - Properties passed from driver function.
 * @param {Mongoose.Types.ObjectId} props.author - Author (Entity._id (User._id)) of the Post.
 * @param {Mongoose.Types.ObjectId} props.target - Target (Entity._id (Rest._id)) of the Post.
 * @param {string} authorEntityID - Author's entityID of the Post.
 * @param {Object} data - Data of the Post, an instance of [Post.Schema]{@link Post}.
 * @returns {Promise<Post>} - Created Post, an instance of [Post.Schema]{@link Post}.
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
            // Fetch Hashtags._id
            if (data.hashtag != null) {
                var hashtag = await useTags(
                    {target: props.target},
                    [], data.hashtag, 
                )
                newPost.hashtag = hashtag;
            }
            // Save into Posts DB
            await newPost.save();
            const savedPost = findPost({_id: newPost._id});
            return resolve(savedPost);
        } catch (err) { return reject(err) }})()
    })
}

/**
 * Delete a post. Delete or modify related Comments and Hashtags.
 * @static
 * @param {Object} filter - Searching filter for the Post, an instance of [Post.Schema]{@link Post}.
 * @returns {Promise<Object>} Deleted Post, an instance of [Post.Schema]{@link Post}.
 * @throws Post not found.
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
 * Update a post.
 * @static
 * @param {Object} filter - Searching filter for the Post, an instance of [Post.Schema]{@link Post}.
 * @param {Object} [props] - Properties passed from driver function.
 * @param {Mongoose.Types.ObjectId} [props.like] - User (Entity._id (User._id)) of the liking action.
 * @param {Mongoose.Types.ObjectId} [props.comment] - User (Entity._id (User._id)) of the commenting action.
 * @param {boolean} [props.addFlag] - Whether to add (push) or delete (pull) said user.
 * @param {Object} [data] Data to update the Post. Optional if it is a case of liking or commenting.
 * @returns {Promise<Post>} Updated Post, an instance of [Post.Schema]{@link Post}.
 * @throws Post not found.
 */
var updatePost = (filter, props = null, data = null) => {
    return new Promise((resolve, reject) => {
        (async () => { try { 
            // Search existing entity
            const post = await Post.findOne(filter).exec();
            if (post == null) throw new Error('Post not found.');
            // Query
            var updateQuery = {$push: {modifiedTime: Date.now()}}
            // Handle general update cases (NOT of liking or commenting)
            if (data != null) {
                updateQuery.$set = {...data};
                if (data.hashtag != null) {
                    var hashtag = await useTags({target: post.target}, post.hashtag, data.hashtag)
                    updateQuery.$set.hashtag = hashtag
                }
            }
            // Handle liking
            if (props != null && props.like != null) 
                props.addFlag 
                    ? updateQuery.$push.like = {$each: [props.like], $position: 0}
                    : updateQuery.$pull = {like: props.like};
            // Handle commenting
            if (props != null && props.comment != null)
                props.addFlag 
                    ? updateQuery.$push.comment = {$each: [props.comment], $position: 0}
                    : updateQuery.$pull = {comment: props.comment};
            // Update in Posts DB
            await Post.updateOne(filter, updateQuery).exec();
            const updatedPost = await findPost({_id: post._id});
            return resolve(updatedPost);
        } catch(err) { return reject(err) }})(); 
    })
}

/**
 * Read random Posts.
 * @static
 * @param {Object} [filter = {_id: {$exists: true}}] - Searching filter for the random Posts, an instance of [Post.Schema]{@link Post}. Default as any Post.
 * @param {number} [size = 1] - Number of returning documents.
 * @returns {Promise<Post[]|null>} Filtered random Posts of defined size, instances of [Post.Schema]{@link Post}. 
 */
var randomPosts = (filter = {_id: {$exists: true}}, size = 1) => {
    return new Promise((resolve, reject) => {
        (async () => { try {
            var posts = await Post.aggregate([
                {$match: filter},
                {$sample: {size: size}},
                {$lookup: {
                    from: 'entities',
                    localField: 'author',
                    foreignField: '_id',
                    as: 'author',
                }},
                {$unwind: '$author'},
                {$lookup: {
                    from: 'entities',
                    localField: 'target',
                    foreignField: '_id',
                    as: 'target',
                }},
                {$unwind: '$target'},
                {$lookup: {
                    from: 'hashtags',
                    localField: 'hashtag',
                    foreignField: '_id',
                    as: 'hashtags'
                }},
                {$lookup: {
                    from: 'comments',
                    let: { 'comment': "$comment" },
                    pipeline: [
                        {$match: {$expr: {$in: ['$_id', '$$comment']}}},
                        {$lookup: {
                            from: 'entities',
                            localField: 'author',
                            foreignField: '_id',
                            as: 'author'
                        }},
                        {$unwind: '$author'}
                    ],
                    as: 'comment',
                }},
                {$project: {
                    _id: 1,
                    postID: 1,
                    type: 1,
                    'author._id': 1,
                    'author.entityID': 1,
                    'author.username': 1,
                    'author.tag': 1,
                    'author.name': 1,
                    'author.profPhoto': 1,
                    'target._id': 1,
                    'target.entityID': 1,
                    'target.username': 1,
                    'target.tag': 1,
                    'target.name': 1,
                    'target.profPhoto': 1,
                    content: 1,
                    photo: 1,
                    createdTime: 1,
                    modifiedTime: 1,
                    rating: 1,
                    'hashtag._id': 1,
                    'hashtag.name': 1,
                    like: 1,
                    'comment._id': 1,
                    'comment.commentID': 1,
                    'comment.content' : 1,
                    'comment.post': 1,
                    'comment.time': 1,
                    'comment.author.entityID': 1,
                    'comment.author.username': 1,
                    'comment.author.tag': 1,
                    'comment.author.name': 1,
                    'comment.author.profPhoto': 1,
                }},
            ]).exec()
            return resolve(posts);
        } catch(err) { return reject(err) }})(); 
    })
}

module.exports = {
    findPost,
    findPosts,
    createPost,
    updatePost,
    deletePost,
    randomPosts,
}
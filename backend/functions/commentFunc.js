/** 
 * CRUD functions of Comments.
 * @module functions/comment
 */

const Comment = require("../models/Comment")
const Mongoose = require('mongoose');

/**
 * Read a single Comment.
 * @static
 * @param {Object} filter - Searching filter for the Comment, an instance of Comment.Schema.
 * @returns {Promise<Comment|null>} A Comment after query, an instance of Comment.Schema.
 */
var findComment = (filter) => {
    return new Promise((resolve, reject) => {
        (async () => { try { 
            var comment = await Comment.findOne(filter)
                .populate('author', 'entityID username tag name profPhoto').exec()
            return resolve(comment)
        } catch(err) { return reject(err) }})(); 
    })
}


/**
 * Read multiple Comments.
 * @static
 * @param {Object} filter - Searching filter for the Comment, an instance of Comment.Schema.
 * @returns {Promise<Comment[]|null>} Comments after query, instances of Comment.Schema.
 */
var findComments = (filter) => {
    return new Promise((resolve, reject) => {
        (async () => { try { 
            var comment = await Comment.find(filter)
                .populate('author', 'entityID username tag name profPhoto').exec()
            return resolve(comment)
        } catch(err) { return reject(err) }})(); 
    })
}

/**
 * Create a new Comment.
 * @static
 * @param {Object} props - Properties passed from driver function.
 * @param {Mongoose.Types.ObjectId} props.author - Author (Entity._id) of the Comment.
 * @param {Mongoose.Types.ObjectId} props.post - Post (Post._id) of the Comment.
 * @param {string} authorEntityID - EntityID of the author.
 * @param {string} content - Content of the Comment.
 * @return {Promise<Comment>} Saved Comment, an instance of Comment.Schema.
 */
var createComment = (props, authorEntityID, content) => {
    return new Promise((resolve, reject) => {
        (async() => { try {
            var newComment = await new Comment({
                commentID: `${authorEntityID}-${Date.now()}`,
                ...props,
                content: content,
                time:    Date.now(),
            }).save()
            var savedComment = await findComment({_id: newComment._id})
            return resolve(savedComment);
        } catch (err) { return reject(err) }})()
    })
}

/**
 * Update a Comment.
 * @static
 * @param {Object} filter - Searching filter for the Comment, an instance of Comment.Schema.
 * @param {Object} data - Data to update the Comment.
 * @returns {Promise<Comment>} Updated Comment, instances of Comment.Schema.
 * @throws {Error} Comment not found.
 */
var updateComment = (filter, data) => {
    return new Promise((resolve, reject) => {
        (async() => { try {
            const comment = await Comment.findOneAndUpdate(filter, data, {new: true}).exec();
            if (comment == null) throw new Error('Comment not found.');
            return resolve(comment);
        } catch (err) { return reject(err) }})()
    })
}

/**
 * Delete a Comment.
 * @static
 * @param {Object} filter - Searching filter for the Comment, an instance of Comment.Schema.
 * @returns {Promise<Comment>} Deleted Comment, instances of Comment.Schema.
 * @throws {Error} Comment not found.
 */
var deleteComment = (filter) => {
    return new Promise((resolve, reject) => {
        (async() => { try {
            const comment = await Comment.findOneAndDelete(filter).exec();
            if (comment == null) throw new Error('Comment not found.');
            return resolve(comment);
        } catch (err) { return reject(err) }})()
    })
}

/**
 * Delete a Comment.
 * @static
 * @param {Object} filter - Searching filter for the Comments, instances of Comment.Schema.
 * @returns {Promise<Number>} Count of deleted Comments.
 */
var deleteComments = (filter) => {
    return new Promise((resolve, reject) => {
        (async() => { try {
            const delCount = await Comment.deleteMany(filter).exec();
            return resolve(delCount);
        } catch (err) { return reject(err) }})()
    })
}

module.exports = {
    findComment,
    findComments,
    createComment,
    updateComment,
    deleteComment,
    deleteComments,
}
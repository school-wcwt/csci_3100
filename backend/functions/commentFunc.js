const Comment = require("../models/Comment")

var findComment = (filter) => {
    return new Promise((resolve, reject) => {
        (async () => { try { 
            var comment = await Comment.findOne(filter)
                .populate('author', 'entityID username tag name profPhoto').exec()
            return resolve(comment)
        } catch(err) { return reject(err) }})(); 
    })
}

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
 * Create a comment.
 * @param {Object} props 
 * @param {ObjectId} props.author
 * @param {ObjectId} props.post
 * @param {string} authorEntityID
 * @param {string} content
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

var updateComment = (filter, data) => {
    return new Promise((resolve, reject) => {
        (async() => { try {
            const comment = await Comment.findOneAndUpdate(filter, data, {new: true}).exec();
            if (comment == null) throw new Error('Comment not found.');
            return resolve(comment);
        } catch (err) { return reject(err) }})()
    })
}

var deleteComment = (filter) => {
    return new Promise((resolve, reject) => {
        (async() => { try {
            const comment = await Comment.findOneAndDelete(filter).exec();
            if (comment == null) throw new Error('Comment not found.');
            return resolve(comment);
        } catch (err) { return reject(err) }})()
    })
}

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
const Comment = require("../models/Comment")
const { findEntityID } = require("./entityFunc")

var findComment = (filter) => {
    return new Promise((resolve, reject) => {
        (async () => { try { 
            var comment = await Comment.find(filter)
                .populate('author', 'entityID username tag name profPhoto').exec()
            return resolve(comment)
        } catch(err) { return reject(err) }})(); 
    })
}

var createComment = (authorFilter, postFilter, content) => {
    return new Promise((resolve, reject) => {
        (async() => { try {
            var [author, post] = await Promise.all([
                findEntityID(authorFilter), 
                findPost(postFilter),
            ]);
            if (author == null) throw new Error('Entity not found.');
            if (post == null) throw new Error('Post not found.');
            var newComment = await new Comment({
                commentID: `${author.entityID}-${Date.now()}`,
                author:    author.entity_id,
                target:    post._id,
                content:   content,
                time:      Date.now(),
            }).save()
            var savedComment = await findComment({_id: newComment._id})
            return resolve(savedComment);
        } catch (err) { return reject(err) }})()
    })
}

// OBSOLETE
var updateComment = (filter, data) => {
    return new Promise((resolve, reject) => {
        (async() => { try {
            const comment = await Comment.findOneAndUpate(filter, data, {new: true}).exec();
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

module.exports = {
    findComment,
    createComment,
    //updateComment,
    deleteComment,
}
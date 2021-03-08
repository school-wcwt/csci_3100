const Comment = require("../models/Comment")
const { findEntityID } = require("./entityFunc")

var findComment = (filter) => {
    return new Promise((resolve, reject) => {
        (async () => { try { 
            var comment = await Comment.find(filter).populate({path: 'author', select: 'name'}).exec()
            if (comment == null) return resolve(null);
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
            var comment = await new Comment({
                author:    author.entity_id,
                content:   content,
                time:      Date.now(),
                target:    post._id
            }).save()

            var commentCheck = await findComment(comment)

            return resolve(commentCheck);
        } catch (err) { return reject(err) }})()
    })
}

module.exports = {
    findComment,
    updateComment,
    deleteComment,
    createComment
}
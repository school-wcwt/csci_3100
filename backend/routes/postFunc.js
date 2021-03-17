const Post = require("../models/Post")
const Comment = require("../models/Comment")
const { findEntityID } = require("./entityFunc")
const { useTags } = require("./hashtagFunc")

var findPost = (filter) => {
    return new Promise((resolve, reject) => {
        (async () => { try { 
            const post = await Post.find(filter)
            .populate('author', 'entityID username tag name profPhoto')
            .populate('target', 'entityID username tag name profPhoto')
            .populate('hashtag', 'name')
            .exec();
            return resolve(post);
        } catch(err) { return reject(err) }})(); 
    })
}

var createPost = (authorFilter, targetFilter, data) => {
    return new Promise((resolve, reject) => {
        (async() => { try {
            // Fetch author, target _id
            const [author, target] = await Promise.all([
                findEntityID(authorFilter), 
                findEntityID(targetFilter)
            ]);
            if (author == null) throw new Error('Entity not found.');
            if (target == null) throw new Error('Post not found.');
            // Fetch tags _id
            var hashtag = data.hashtag != null
                ? await useTags([], data.hashtag) : [];
            // Save post
            const savedPost = await new Post({
                postID: `${author.entityID}-${Date.now()}`,
                author: author.entity_id,
                target: target.entity_id,
                createdTime: Date.now(),
                ...data,
                hashtag: hashtag,
            }).save()
            return resolve(savedPost);
        } catch (err) { return reject(err) }})()
    })
}

var updatePost = (filter, data) => {
    return new Promise((resolve, reject) => {
        (async () => { try { 
            // Search existing entity
            const post = await Post.findOne(filter).exec();
            if (post == null) throw new Error('Entity not found.');
            // Fetch hashtag
            if (data.hashtag != null) {
                const hashtag = await useTags(post.hashtag, data.hashtag)
                data.hashtag = hashtag;
            }
            // Change modifiedTime
            data.modifiedTime = post.modifiedTime;
            data.modifiedTime.push(Date.now());
            // Update post
            const updatedPost = await Post.findOneAndUpdate(filter, data).exec();
            return resolve(updatedPost);
        } catch(err) { return reject(err) }})(); 
    })
}

var deletePost = (filter) => {
    return new Promise((resolve, reject) => {
        (async () => { try { 
            const deletedPost = await Post.findOneAndDelete(filter).exec();
            if (deletedPost == null) throw new Error('Post not found.');
            return resolve(deletedPost);
        } catch(err) { return reject(err) }})(); 
    })
}

var likePost = () => {
    return new Promise((resolve, reject) => {
        (async () => { try { 
            // TODO 
        } catch(err) { return reject(err) }})(); 
    })
}

var commentPost = () => {
    return new Promise((resolve, reject) => {
        (async () => { try { 
            // TODO 
        } catch(err) { return reject(err) }})(); 
    })
}


module.exports = {
    findPost,
    createPost,
    updatePost,
    deletePost,
    likePost,
    commentPost
}
/** 
 * CRUD functions of Hashtags.
 * @module functions/hashtag
 */

const Hashtag = require("../models/Hashtag")
const Mongoose = require("mongoose")

/**
 * Read a single Hashtag.
 * @static
 * @param {Object} filter - Searching filter for the Hashtag, an instance of [Hashtag.Schema]{@link Hashtag}.
 * @returns {Promise<Hashtag|null>} A Hashtag after query, an instance of [Hashtag.Schema]{@link Hashtag}.
 */
var findTag = (filter) => {
    return new Promise((resolve, reject) => {
        (async () => { try { 
            const tag = await Hashtag.findOne(filter).exec()
            return resolve(tag);
        } catch(err) { return reject(err) }})(); 
    })
}

/**
 * Read multiple Hashtags, sorted by descending order of Hashtag.frequency.
 * @static
 * @param {Object} filter - Searching filter for the Hashtags, instances of [Hashtag.Schema]{@link Hashtag}.
 * @returns {Promise<Hashtag[]|null>} Hashtags after query, instances of [Hashtag.Schema]{@link Hashtag}.
 */
var findTags = (filter) => {
    return new Promise((resolve, reject) => {
        (async () => { try { 
            const tags = await Hashtag.find(filter).sort({frequency: -1}).exec()
            return resolve(tags);
        } catch(err) { return reject(err) }})(); 
    })
}

/**
 * Find or otherwise create a Hashtag.
 * @private
 * @param {Object} data - Data of the tag, an instance of [Hashtag.Schema]{@link Hashtag}.
 * @returns {Promise<Hashtag>} Fetched or created Hashtag, an instance of [Hashtag.Schema]{@link Hashtag}.
 */
var findOrCreateTag = (data) => {
    return new Promise((resolve, reject) => {
        (async() => { try {
            const tag = await findTag(data);
            if (tag != null) return resolve(tag);
            const newTag = await new Hashtag(data).save()
            return resolve(newTag);
        } catch (err) { return reject(err) }})()
    })
}

/**
 * Delete a Hashtag.
 * @private
 * @param {Object} filter - Searching filter for the Hashtag, an instance of [Hashtag.Schema]{@link Hashtag}.
 * @returns {Promise<Hashtag>} Deleted Hashtag, an instance of [Hashtag.Schema]{@link Hashtag}.
 */
var deleteTag = (filter) => {
    return new Promise((resolve, reject) => {
        (async () => { try { 
            const deletedTag = await Hashtag.findOneAndDelete(filter).exec();
            if (deletedTag == null) throw new Error('Tag not found.');
            return resolve(deletedTag);
        } catch(err) { return reject(err) }})(); 
    })
}

/**
 * Use a Hashtag. Compare two array of tags and update accordingly.
 * @static
 * @param {Object} props - Properties passed from driver function.
 * @param {ObjectId} props.target - Target (Entity._id) of the Hashtag.
 * @param {Mongoose.Types.ObjectId[]} oldTagsID - Stored Hashtags (_id).
 * @param {string[]} newTagsName - Names of the new Hashtags.
 * @returns {Promise<Mongoose.Types.ObjectId[]>} List of _id of the new Hashtags. 
 */
var useTags = (props, oldTagsID = [], newTagsName = []) => {
    /**
     * Convert name to _id of Hashtags.
     * @param {Object} props - Properties passed from driver function.
     * @param {string[]} names - Names of the Hashtags.
     * @returns {Promise<Mongoose.Types.ObjectId[]>} List of Hashtag _id.
     */
    var fetchTagsID = (props, names) => {
        return new Promise((resolve, reject) => {
            (async() => { try {
                var tagsID = [];
                for (tagName of names) {
                    let tag = await findOrCreateTag({name: tagName, ...props})
                    tagsID.push(tag._id);
                }
                return resolve(tagsID)
            } catch (err) { return reject(err) }})()
        })
    }

    return new Promise((resolve, reject) => {
        (async() => { try {
            var newTagsID = await fetchTagsID(props, newTagsName);
            var newTags = newTagsID.map(id => id.toString());
            var oldTags = oldTagsID.map(id => id.toString());
            var addTags = newTags.filter(newTag => !oldTags.includes(newTag));
            var delTags = oldTags.filter(oldTag => !newTags.includes(oldTag));
            for (addTag of addTags) 
                await Hashtag.updateOne({_id: addTag}, {$inc: {frequency: 1}}).exec();
            for (delTag of delTags) {
                let tag = await Hashtag.findOneAndUpdate({_id: delTag}, {$inc: {frequency: -1}}, {new: true}).exec();
                if (tag.frequency == 0) await deleteTag({_id: delTag});
            }
            return resolve(newTags);
        } catch (err) { return reject(err) }})()
    })
}

module.exports = {
    findTag,
    findTags,
    useTags,
}

// ------ OBSOLETE functions ------

/**
 * Create a tag.
 * @static
 * @deprecated Replaced by {@link module:functions/hashtag.findOrCreateTag}.
 * @param {Object} data - Data to create the Hashtag.
 * @returns {Promise<Hashtag>} Created Hashtag, an instance of [Hashtag.Schema]{@link Hashtag}.
 */
var createTag = (data) => {
    return new Promise((resolve, reject) => {
        (async() => { try {
            const tag = await findTag(data);
            if (tag != null) return resolve(tag);
            const newTag = await new Hashtag(data).save()
            return resolve(newTag);
        } catch (err) { return reject(err) }})()
    })
}

/**
 * Create a tag. 
 * @static
 * @deprecated Unused.
 * @param {Object} filter - Searching filter for the Hashtag, an instance of [Hashtag.Schema]{@link Hashtag}.
 * @param {Object} data - Data to update the Hashtag.
 * @returns {Promise<Hashtag>} Updated Hashtag, an instance of [Hashtag.Schema]{@link Hashtag}.
 * @throws Tag exists.
 */
var updateTag = (filter, data) => {
    return new Promise((resolve, reject) => {
        (async() => { try {
            const updatedTag = await Hashtag.findOneAndUpdate(filter, data).exec();
            if (updatedTag != null) return reject("Tag exists.");
            return resolve(updatedTag);
        } catch (err) { return reject(err) }})()
    })
}
const Tag = require("../models/Hashtag")

var findTag = (filter) => {
    return new Promise((resolve, reject) => {
        (async () => { try { 
            const tag = await Tag.findOne(filter).exec()
            return resolve(tag);
        } catch(err) { return reject(err) }})(); 
    })
}

var findTags = (filter) => {
    return new Promise((resolve, reject) => {
        (async () => { try { 
            const tags = await Tag.find(filter).sort({frequency: -1}).exec()
            return resolve(tags);
        } catch(err) { return reject(err) }})(); 
    })
}

var findOrCreateTag = (data) => {
    return new Promise((resolve, reject) => {
        (async() => { try {
            const tag = await findTag(data);
            if (tag != null) return resolve(tag);
            const newTag = await new Tag(data).save()
            return resolve(newTag);
        } catch (err) { return reject(err) }})()
    })
}

var deleteTag = (filter) => {
    return new Promise((resolve, reject) => {
        (async () => { try { 
            const deletedTag = await Tag.findOneAndDelete(filter).exec();
            if (deletedTag == null) throw new Error('Tag not found.');
            return resolve(deletedTag);
        } catch(err) { return reject(err) }})(); 
    })
}

// -------- Use tags ---------

/**
 * 
 * @param {Object} props 
 * @param {ObjectId} props.target Target (Rest) Entity _id.
 * @param {ObjectId[]} oldTags Previously stored hashtags _id.
 * @param {ObjectId[]} newTags New replacing hashtags _id.
 * @returns {Promise<ObjectId[]>} List of hashtag _id. 
 */
var useTags = (props, oldTagsID = [], newTagsName = []) => {
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
                await Tag.updateOne({_id: addTag}, {$inc: {frequency: 1}}).exec();
            for (delTag of delTags) {
                let tag = await Tag.findOneAndUpdate({_id: delTag}, {$inc: {frequency: -1}}, {new: true}).exec();
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
var createTag = (data) => {
    return new Promise((resolve, reject) => {
        (async() => { try {
            const tag = await findTag(data);
            if (tag != null) return resolve(tag);
            const newTag = await new Tag(data).save()
            return resolve(newTag);
        } catch (err) { return reject(err) }})()
    })
}

var updateTag = (filter, data) => {
    return new Promise((resolve, reject) => {
        (async() => { try {
            const updatedTag = await Tag.findOneAndUpdate(filter, data).exec();
            if (updatedTag != null) return reject("Tag exists.");
            return resolve(updatedTag);
        } catch (err) { return reject(err) }})()
    })
}
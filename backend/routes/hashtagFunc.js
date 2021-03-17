const Tag = require("../models/Hashtag")

var findTag = (filter) => {
    return new Promise((resolve, reject) => {
        (async () => { try { 
            const tag = await Tag.findOne(filter).exec()
            return resolve(tag);
        } catch(err) { return reject(err) }})(); 
    })
}

// OBSOLETE
var createTag = (data) => {
    return new Promise((resolve, reject) => {
        (async() => { try {
            const tag = await findTag(data);
            if (tag != null) return reject("Tag exists.");
            const newTag = await new Tag({name: data.name}).save()
            return resolve(tag);
        } catch (err) { return reject(err) }})()
    })
}

// OBSOLETE
var updateTag = (filter, data) => {
    return new Promise((resolve, reject) => {
        (async() => { try {
            const updatedTag = await Tag.findOneAndUpdate(filter, data).exec();
            if (tag != null) return reject("Tag exists.");
            return resolve(updatedTag);
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

var fetchTagID = (filter) => {
    return new Promise((resolve, reject) => {
        (async() => { try {
            var tag = await findTag(filter);
            if (tag == null) {
                const addedTag = await new Tag(filter).save();
                return resolve(addedTag._id)
            } else return resolve(tag._id);
        } catch (err) { return reject(err) }})()
    })
}

var fetchTagsID = (names) => {
    return new Promise((resolve, reject) => {
        (async() => { try {
            var tagsID = [];
            for (tagName of names) {
                let tag = await fetchTagID({name: tagName})
                tagsID.push(tag._id);
            }
            return resolve(tagsID)
        } catch (err) { return reject(err) }})()
    })
}

var useTags = (oldTags = [], newTags = []) => {
    return new Promise((resolve, reject) => {
        (async() => { try {
            var newTagsID = await fetchTagsID(newTags);
            for (newTag of newTagsID) {
                if (!oldTags.includes(newTag)) // if old ones does not include (i.e. Used)
                    await Tag.findOneAndUpdate({_id: newTag}, {'$inc': {frequency: 1}})
            }
            for (oldTag of oldTags) {
                if (!newTags.includes(oldTag)) { // if new ones does not include (i.e. Removed)
                    await Tag.findOneAndUpdate({_id: oldTag}, {'$inc': {frequency: -1}});
                    /* 
                    // Delete if frequency == 0
                    let tag = await Tag.findOne({_id: oldTag});
                    tag.frequency--;
                    if (tag.frequency == 0) await deleteTag({_id: oldTag});
                    else await tag.save();
                    */ 
                }
            }
            return resolve(newTagsID);
        } catch (err) { return reject(err) }})()
    })
}

module.exports = {
    findTag,
    //createTag,
    //updateTag,
    deleteTag,
    fetchTagsID,
    useTags,
}
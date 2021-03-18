const GroupList = require("../models/GroupList")
const { findEntityID } = require("./entityFunc")

var findGroupList = (filter) => {
    return new Promise((resolve, reject) => {
        (async () => { try {
            var groupList = await GroupList.find(filter)
                .populate('content', 'entityID username tag name profPhoto')
            return resolve(groupList)
        } catch (err) { return reject(err) }})()
    })
}

/**
 * Create a GroupList.
 * @param {Object} props 
 * @param {ObjectId} props.author Author ID of the request.
 * @param {string} name Name of the GroupList.
 * @returns 
 */
var createGroupList = (props, name) => {
    return new Promise((resolve, reject) => {
        (async() => { try {
            var existList = await GroupList.findOne({author: props.author, name: name})
            if (existList != null) throw new Error('List exists.')
            var savedList = await new GroupList({
                ...props,
                name: listName,
                content: [],
            }).save()
            return resolve(savedList);
        } catch (err) { return reject(err) }})()
    })
}

/**
 * Update name or author of GroupList.
 * @param {Object} filter
 * @param {ObjectId} filter.author
 * @param {string} filter.name
 * @param {Object} data
 * @param {boolean} addFlag
 * @returns 
 */
var updateGroupList = (filter, data) => {
    return new Promise((resolve, reject) => {
        (async() => { try {
            var updatedGroupList = await GroupList.findOneAndUpdate(
                filter, data, {new: true}
            ).populate('content', 'entityID username tag name profPhoto').exec()
            if (updatedGroupList == null) throw new Error('List not found.');
            return resolve(updatedGroupList)
        } catch (err) { return reject(err) }})()
    })
}

/**
 * Delete a GroupList.
 * @param {Object} filter
 * @param {ObjectId} filter.author
 * @param {string} filter.name
 */
 var deleteGroupList = (filter) => {
    return new Promise((resolve, reject) => {
        (async() => { try {
            var deletedList = await GroupList.findOneAndDelete(filter).exec();
            if (deletedList == null) throw new Error('List not found.')
            return resolve(deletedList);
        } catch (err) { return reject(err) }})()
    })
}


/**
 * Add or remove content of GroupList.
 * @param {Object} filter
 * @param {ObjectId} filter.author
 * @param {string} filter.name
 * @param {Object} props 
 * @param {ObjectId} props.target
 * @param {boolean} addFlag
 * @returns 
 */
var updateContent = (filter, props, addFlag = true) => {
    return new Promise((resolve, reject) => {
        (async() => { try {
            var operation = addFlag ? '$push' : '$pull';
            var updatedGroupList = await GroupList.findOneAndUpdate(
                filter,
                {[operation]: {'content': props.target}},
                {new: true}
            ).populate('content', 'entityID name profPhoto').exec();
            if (updatedGroupList == null) throw new Error('List not found.');
            return resolve(updatedGroupList);
        } catch (err) { return reject(err) }})()
    })
}

module.exports = {
    findGroupList,
    createGroupList,
    updateGroupList,
    updateContent,
    deleteGroupList
}
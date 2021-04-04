const GroupList = require("../models/GroupList")

var findGroupList = (filter) => {
    return new Promise((resolve, reject) => {
        (async () => { try {
            var groupList = await GroupList.findOne(filter)
                .populate('content', 'entityID username tag name profPhoto')
            return resolve(groupList)
        } catch (err) { return reject(err) }})()
    })
}

var findGroupLists = (filter) => {
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
            var list = await GroupList.findOne({...props, name: name})
            if (list != null) throw new Error('List exists.')
            var savedList = await new GroupList({
                ...props,
                name: name,
                content: [],
            }).save()
            return resolve(savedList);
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
 * Update a GroupList.
 * @param {Object} filter
 * @param {ObjectId} filter.author
 * @param {string} filter.name
 * @param {Object} [props] 
 * @param {ObjectId} [props.target]
 * @param {boolean} [props.addFlag]
 * @param {Object} [data]
 * @returns 
 */
var updateGroupList = (filter, props = null, data = null) => {
    return new Promise((resolve, reject) => {
        (async() => { try {
            var updateQuery = {};
            if (data != null) updateQuery.$set = data;
            if (props != null) 
                props.addFlag 
                    ? updateQuery.$push.content = props.target
                    : updateQuery.$pull.content = props.target;
            var updatedGroupList = await GroupList.findOneAndUpdate(
                filter, updateQuery, {new: true}
            ).populate('content', 'entityID username tag name profPhoto').exec()
            if (updatedGroupList == null) throw new Error('List not found.');
            return resolve(updatedGroupList)
        } catch (err) { return reject(err) }})()
    })
}

module.exports = {
    findGroupList,
    findGroupLists,
    createGroupList,
    updateGroupList,
    deleteGroupList
}
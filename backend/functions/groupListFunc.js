/** 
 * CRUD functions of GroupLists.
 * @module functions/groupList
 */

const GroupList = require("../models/GroupList")
const Mongoose = require('mongoose');

/**
 * Read a GroupList.
 * @static
 * @param {Object} filter - Searching filter for the GroupList, an instance of [GroupList.Schema]{@link GroupList}.
 * @return {Promise<GroupList|null>} A GroupList after query, an instance of [GroupList.Schema]{@link GroupList}.
 */
var findGroupList = (filter) => {
    return new Promise((resolve, reject) => {
        (async () => { try {
            var groupList = await GroupList.findOne(filter)
                .populate('content', 'entityID username tag name profPhoto')
            return resolve(groupList)
        } catch (err) { return reject(err) }})()
    })
}

/**
 * Read multiple GroupLists.
 * @static
 * @param {Object} filter - Searching filter for the GroupLists, instances of [GroupList.Schema]{@link GroupList}.
 * @returns {Promise<GroupList[]|null>} GroupLists after query, instances of [GroupList.Schema]{@link GroupList}.
 */
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
 * @static
 * @param {Object} props - Properties passed from driver function.
 * @param {Mongoose.Types.ObjectId} props.author - Author (Entity._id) of the GroupList.
 * @param {string} name - Name of the GroupList.
 * @returns {Promise<GroupList>} Created GroupList, an instance of [GroupList.Schema]{@link GroupList}.
 * @throws List exists.
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
 * @static
 * @param {Object} filter - Searching filter for the GroupList, an instance of [GroupList.Schema]{@link GroupList}. Either by _id or author-name pair.
 * @param {Mongoose.Types.ObjectId} filter.author - Author (Entity._id) of the GroupList.
 * @param {string} filter.name - Name of the GroupList.
 * @returns {Promise<GroupList>} Deleted GroupList, an instance of [GroupList.Schema]{@link GroupList}.
 * @throws List not found.
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
 * @static
 * @param {Object} filter - Searching filter for the GroupList, an instance of [GroupList.Schema]{@link GroupList}. Either by _id or author-name pair.
 * @param {Mongoose.Types.ObjectId} filter.author - Author (Entity._id) of the GroupList.
 * @param {string} filter.name - Name of the GroupList.
 * @param {Object} [props] - Properties passed from driver function.
 * @param {ObjectId} [props.target] - Target (Entity._id) to be modified in the content of GroupList.
 * @param {boolean} [props.addFlag] - Whether to add (push) or delete (pull) said target.
 * @param {Object} [data] - Data to update the GroupList.
 * @returns {Promsie<GroupList>} Updated GroupList, an instance of [GroupList.Schema]{@link GroupList}, with content partially populated.
 * @throws List not found.
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
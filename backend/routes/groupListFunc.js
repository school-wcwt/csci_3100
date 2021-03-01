const GroupList = require("../models/GroupList")
const { findEntityID } = require("./entityFunc")

var findGroupList = (filter) => {
    return new Promise((resolve, reject) => {
        (async () => { try {
            var groupList = await GroupList.find(filter)
                .populate('content', 'entityID name profPhoto')
            return resolve(groupList)
        } catch (err) { return reject(err) }})()
    })
}

var createGroupList = (authorFilter, listName) => {
    return new Promise((resolve, reject) => {
        (async() => { try {
            var user = await findEntityID(authorFilter);
            if (user == null) throw new Error('Entity not found.');
            var existList = await findGroupList({author: user.entity_id, name: listName})
            if (existList != null) throw new Error('List exists.')
            var savedList = await new GroupList({
                name: listName,
                author: user.entity_id,
                content: [],
            }).save()
            return resolve(savedList);
        } catch (err) { return reject(err) }})()
    })
}

// Update Name/Author
var updateName = (authorFilter, listName, newListName) => {
    return new Promise((resolve, reject) => {
        (async() => { try {
            var user = await findEntityID(authorFilter);
            if (user == null) throw new Error('Entity not found.');
            var updatedGroupList = await GroupList.findOneAndUpdate(
                {author: user.entity_id, name:listName}, {name: newListName},
                {new: true}
            ).exec()
            if (updatedGroupList == null) throw new Error('List not found.');
            return resolve(updatedGroupList)
        } catch (err) { return reject(err) }})()
    })
}

// Add/Delete Content 
var updateContent = (authorFilter, targetFilter, listName, addFlag = 1) => {
    return new Promise((resolve, reject) => {
        (async() => { try {
            var [author, target] = await Promise.all([
                findEntityID(authorFilter), 
                findEntityID(targetFilter),
            ]);
            if (author == null || target == null) throw new Error('Entity not found.');
            var operation = addFlag ? '$push' : '$pull';
            var updatedGroupList = await GroupList.findOneAndUpdate(
                {author: author.entity_id, name: listName},
                {[operation]: {'content': target.entity_id}},
                {new: true}
            ).populate('content', 'entityID name profPhoto').exec();
            if (updatedGroupList == null) throw new Error('List not found.');
            return resolve(updatedGroupList);
        } catch (err) { return reject(err) }})()
    })
}

var deleteGroupList = (authorFilter, listName) => {
    return new Promise((resolve, reject) => {
        (async() => { try {
            var user = await findEntityID(authorFilter);
            if (user == null) throw new Error('Entity not found.');
            var deletedList = await GroupList.findOneAndDelete({author: user.entity_id, name: listName}).exec();
            if (deletedList == null) throw new Error('List not found.')
            return resolve(deletedList);
        } catch (err) { return reject(err) }})()
    })
}

module.exports = {
    findGroupList,
    createGroupList,
    updateName,
    updateContent,
    deleteGroupList
}
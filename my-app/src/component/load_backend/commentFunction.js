import axios from '../../axiosConfig';
import { trigChange } from "../socket-client";

//GET comment/:commentID
/**
 * return comment with commentID in JSON format
 * @param   {string} commentID  ID of comment
 * @return {Promise<JSON>} comment in JSON format
 */
const comment_get = (commentID) =>{
    return new Promise((resolve,reject)=>{
        axios({
            method: 'GET',
            url: `comment/${commentID}`,
        })
        .then ( res =>{
            return resolve(res.data)
        })
        .catch(err => {
            console.log('error');
            return reject(err)
        })
    })
}

//POST comment/
/**
 * return comments that satisfy the filter
 * @param   {JSON} fil  filter for backend
 * @return {Promise<JSON>[]} array of JSON
 */
const comment_post = (fil) =>{
    return new Promise((resolve,reject)=>{
        axios({
            method: 'POST',
            url: 'comment/',
            data:{
                filter	: fil
            }
        })
        .then ( res =>{
            return resolve(res.data)
        })
        .catch(err => {
            console.log('error');
            return reject(err)
        })
    })
}


//POST comment/new
/**
 * create comment and return the created comment
 * @param   {JSON} fil  filter for backend
 * @param   {string} add_data  comment content
 * @return {Promise<JSON>} comment in JSON format
 */
const comment_create = (fil,add_data) =>{
    return new Promise((resolve,reject)=>{
        axios({
            method: 'POST',
            url: 'comment/new',
            data:{
                postFilter	: fil,
                content    :   add_data
            }
        })
        .then ( res =>{
            trigChange();
            return resolve(res.data)
        })
        .catch(err => {
            console.log('error');
            return reject(err)
        })
    })
}


//DELETE comment/:commentID
/**
 * delete post and return the deleted post
 * @param   {string} commentID  ID of comment
 * @return {Promise<JSON>} comment in JSON format
 */
const comment_delete = (commentID) =>{
    return new Promise((resolve,reject)=>{
        axios({
            method: 'DELETE',
            url: `comment/${commentID}`
        })
        .then (res =>{
            trigChange();
            return resolve(res.data)
        })
        .catch(err => {
            console.log('error');
            return reject(err)
        })
    })
}


//PUT user/:entityID/post/:postID/comment/:commentID
/**
 * edit post and return the edited post
 * @param   {string} commentID  ID of comment
 * @param   {string} edit_data  data to be edited
 * @return {Promise<JSON>} comment in JSON format
 */
const comment_edit = (commentID,edit_data) =>{
    return new Promise((resolve,reject)=>{
        axios({
            method: 'PUT',
            url: `comment/${commentID}`,
            data:{
                data:edit_data
            }
        })
        .then ( res =>{
            trigChange();
            return resolve(res.data)
        })
        .catch(err => {
            console.log('error');
            return reject(err)
        })
    })
}



export {
    comment_get,
    comment_post,
    comment_create,
    comment_delete,
    comment_edit
}
  
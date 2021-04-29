import axios from '../../axiosConfig';
import { trigChange } from "../socket-client";

//GET post/:postID
/**
 * return post that has a certain postID
 * @param   {string} postID  ID of entity
 * @return {Promise<JSON>} post in JSON format
 */
const post_get= (postID)=>{
    return new Promise((resolve,reject)=>{
      axios({
        method: 'GET',
        url: '/post/'+postID,
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
  






//POST post/
/**
 * return posts that satisfy the filter
 * @param   {JSON} fil  filter for backend
 * @return {Promise<JSON>[]} array of posts in JSON format
 */
const post_post = (fil) =>{
    return new Promise((resolve,reject)=>{
        axios({
            method: 'POST',
            url: '/post/',
            data:{
                filter: fil
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


//POST /post/new
/**
 * create post and return the created post
 * @param   {JSON} targetFilter  filter of target for backend
 * @param   {JSON} add_data  data to be created
 * @return {Promise<JSON>} post in JSON format
 */
const post_create = (targetFilter,edit_data) =>{
    return new Promise((resolve,reject)=>{
        axios({
            method: 'POST',
            url: '/post/new',
            data:{
                targetFilter: targetFilter,
                data: edit_data
            }
        })
        .then ( res =>{
            trigChange();
            return resolve(res.data)
        })
        .catch(err => {
            console.log('error!!!!!!!!!!!!');
            return reject(err)
        })
    })
}


//DELETE /post/:postID
/**
 * delete post and return the deleted post
 * @param {string} postID ID of post
 * @return {Promise<JSON>} post in JSON format
 */
const post_delete = (postID) =>{
    return new Promise((resolve,reject)=>{
        axios({
            method: 'DELETE',
            url: '/post/'+postID
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


//PUT post/:postID
/**
 * edit post and return the edited post
 * @param {string} postID ID of post
 * @param   {JSON} edit_data  data to be edited
 * @return {Promise<JSON>} post in JSON format
 */
const post_edit = (postID,edit_data) =>{
    return new Promise((resolve,reject)=>{
        axios({
            method: 'PUT',
            url: '/post/'+postID,
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

//PATCH post/like/:postID
/**
 * like post and return the liked post
 * @param {string} postID ID of post
 * @param   {string} flag 0: unlike, 1:like
 * @return {Promise<JSON>} post in JSON format
 */
const post_like = (postID, flag) =>{
    return new Promise((resolve,reject)=>{
        axios({
            method: 'PATCH',
            url: "/post/like/"+postID,
            data:{
                addFlag : flag,
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
    post_get,
    post_post,
    post_create,
    post_delete,
    post_edit,
    post_like,
}
  
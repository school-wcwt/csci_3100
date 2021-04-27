import React, { useState, useEffect } from "react";
import ReactDOM, { render } from "react-dom";
import axios from '../../axiosConfig';
import { trigChange } from "../socket-client";

/*
*                           *
*                           *
*   Posts 
*                           *
*                           *
*                           *
*/

//GET entity/:entityID
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
  






//POST user/:entityID/post/new
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


//DELETE user/post/:postID
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
  
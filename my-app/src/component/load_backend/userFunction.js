import React, { useState, useEffect } from "react";
import ReactDOM, { render } from "react-dom";
import axios from '../../axiosConfig';


//PATCH user/:entityID/follow/:entityID
const follow = (userID, followID)=>{
  return new Promise((resolve,reject)=>{
    axios({
      method: 'PATCH',
      url: 'user/'+userID+'/follow/'+followID
    })
    .then ( res =>{
      console.log('sucess');
      console.log(res);
      return resolve(res.data)
    })
    .catch(err => {
        console.log(err.message);
        console.log('error');
        return reject(err)
    })
  })
}

//GET user/:entityID/groupList/:listName







/*
*                           *
*                           *
*   Posts / Comment / Like  *
*                           *
*                           *
*                           *
*/
//POST user/:entityID/post/new
const post_create = (authorID,targetFilter,edit_data) =>{
    return new Promise((resolve,reject)=>{
        axios({
            method: 'POST',
            url: '/user/'+authorID+'/post/new',
            data:{
                targetFilter: targetFilter,
                data:edit_data
            }
        })
        .then ( res =>{
            console.log('sucess');
            console.log(res);
            return resolve(res.data)
        })
        .catch(err => {
            console.log(err.message);
            console.log('error');
            return reject(err)
        })
    })
}


//DELETE user/post/:postID
const post_delete = (postID) =>{
    return new Promise((resolve,reject)=>{
        axios({
            method: 'DELETE',
            url: 'user/post/'+postID
        })
        .then ( res =>{
            console.log('sucess');
            console.log(res);
            return resolve(res.data)
        })
        .catch(err => {
            console.log(err.message);
            console.log('error');
            return reject(err)
        })
    })
}


//PUT user/post/:postID
const post_edit = (filter,edit_data) =>{
    var postID= "pls_enter"
    return new Promise((resolve,reject)=>{
        axios({
            method: 'PUT',
            url: 'user/post/'+postID,
            data:{
                filter: filter,
                data:edit_data
            }
        })
        .then ( res =>{
            console.log('sucess');
            return resolve(res.data)
        })
        .catch(err => {
            console.log(err.message);
            console.log('error');
            return reject(err)
        })
    })
}

//PATCH user/:entityID/post/:postID/like
const post_like = (addFlag,authorFilter,postFilter) =>{
    var entityID='??'
    var postID ='??'
    return new Promise((resolve,reject)=>{
        axios({
            method: 'PATCH',
            url: "user/"+entityID+"/post/"+postID+"/like",
            data:{
                addFlag : addFlag,
                authorFilter : authorFilter,
                postFilter : postFilter
            }
        })
        .then ( res =>{
            console.log('sucess');
            return resolve(res.data)
        })
        .catch(err => {
            console.log(err.message);
            console.log('error');
            return reject(err)
        })
    })
}

//POST user/:entityID/post/:postID/comment/new
const comment_create = (entityID,postID,add_data) =>{
    return new Promise((resolve,reject)=>{
        axios({
            method: 'POST',
            url: 'user/'+entityID+'/post/'+postID+'/comment/new',
            data:{
                data	: add_data
            }
        })
        .then ( res =>{
            console.log('sucess');
            console.log(res);
            return resolve(res.data)
        })
        .catch(err => {
            console.log(err.message);
            console.log('error');
            return reject(err)
        })
    })
}


//DELETE user/:entityID/post/:postID/comment/:commentID
const comment_delete = (entityID, postID, commentID) =>{
    console.log('create');
    return new Promise((resolve,reject)=>{
        axios({
            method: 'DELETE',
            url: 'user/'+entityID+'/post/'+postID+'/comment/'+commentID
        })
        .then (res =>{
            console.log('sucess');
            console.log(res);
            return resolve(res.data)
        })
        .catch(err => {
            console.log(err.message);
            console.log('error');
            return reject(err)
        })
    })
}


//PUT user/:entityID/post/:postID/comment/:commentID
const comment_edit = (entityID, postID, filter,edit_data) =>{
    var commentID ='??'
    return new Promise((resolve,reject)=>{
        axios({
            method: 'PUT',
            url: 'user/'+entityID+'/post/'+postID+'/comment/'+commentID,
            data:{
                filter: filter,
                data:edit_data
            }
        })
        .then ( res =>{
            console.log('sucess');
            return resolve(res.data)
        })
        .catch(err => {
            console.log(err.message);
            console.log('error');
            return reject(err)
        })
    })
}



export {
    follow,
    post_create,
    post_delete,
    post_edit,
    post_like,


    comment_create,
    comment_delete,
    comment_edit
}
  
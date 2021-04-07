import React, { useState, useEffect } from "react";
import ReactDOM, { render } from "react-dom";
import axios from '../../axiosConfig';

/*
*                           *
*                           *
*   Posts / Comment / Like  *
*                           *
*                           *
*                           *
*/
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
            console.log('sucess');
            console.log(res.data);
            return resolve(res.data)
        })
        .catch(err => {
            console.log(err.message);
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
            url: '/post/'+postID
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
            url: '/post/'+postID,
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
            url: "/post/like/"+postID,
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


export {
    post_post,
    post_create,
    post_delete,
    post_edit,
    post_like,
}
  
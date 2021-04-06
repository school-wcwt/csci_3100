import React, { useState, useEffect } from "react";
import ReactDOM, { render } from "react-dom";
import axios from '../../axiosConfig';


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
    comment_create,
    comment_delete,
    comment_edit
}
  
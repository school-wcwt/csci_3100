import React, { useState, useEffect } from "react";
import ReactDOM, { render } from "react-dom";
import axios from '../../axiosConfig';
import { trigChange } from "../socket-client/socket-client";

//GET comment/:commentID
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
  
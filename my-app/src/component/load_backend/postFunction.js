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

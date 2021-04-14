import React, { useState, useEffect } from "react";
import ReactDOM, { render } from "react-dom";
import axios from '../../axiosConfig';
import { trigChange } from "../socket-client/socket-client";

//Last update 7/4/2021

//GET entity/:entityID
const entity_get= (entityID)=>{
  console.log(entityID)
  return new Promise((resolve,reject)=>{
    axios({
      method: 'GET',
      url: '/entity/'+entityID,
    })
    .then ( res =>{
        console.log('sucess');
        console.log(res.data)
        return resolve(res.data)
    })
    .catch(err => {
        console.log('error');
        return reject(err)
    })
  })
}

//POST entity/
const entity_post = (fil)=>{
  return new Promise((resolve,reject)=>{
    axios({
      method: 'POST',
      url: '/entity/',
      data:{
        filter:fil
      }
    })
   .then ( res =>{
      console.log('sucess');
      // console.log(res.data)
      return resolve(res.data)
    })
   .catch(err => {
      console.log(err.message);
      console.log('error');
      return reject(err)
    })
  })
}

//PUT entity/
const entity_edit = (edit_data)=>{
  return new Promise((resolve,reject)=>{
    axios({
      method: 'PUT',
      url: '/entity/',
      data:{
        data:edit_data
      }
    })
    .then ( res =>{
      trigChange();
      return resolve(res)
        
    })
    .catch(err => {
        console.log(err.message);
        return reject(err)
    })
  })
}

//DELETE entity/
const entity_delete= ()=>{
  return new Promise((resolve,reject)=>{
    axios({
      method: 'DELETE',
      url: '/entity/',
    })
    .then ( res =>{
        console.log('sucess');
        trigChange();
        return resolve(res.data)
    })
    .catch(err => {
        console.log('error');
        return reject(err)
    })
  })
}

//PATCH user/follow/:entityID
const entity_follow = (followID,flag)=>{
  return new Promise((resolve,reject)=>{
    axios({
      method: 'PATCH',
      url: 'entity/follow/'+followID,
      data:{
        addFlag: flag
      }
    })
    .then ( res =>{
      trigChange();
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
  entity_get,
  entity_post,
  entity_edit,
  entity_delete,
  entity_follow
}

import React, { useState, useEffect } from "react";
import ReactDOM, { render } from "react-dom";
import axios from '../../axiosConfig';
//GET entity/:entityID
const getEntity= (entityID)=>{
  return new Promise((resolve,reject)=>{
    axios({
      method: 'GET',
      url: '/entity/'+entityID,
    })
    .then ( res =>{
        console.log('sucess');
        return resolve(res.data)
    })
    .catch(err => {
        console.log('error');
        return reject(err)
    })
  })
}

//POST entity/
const post_entity = (fil)=>{
 // fil=JSON.parse(fil);
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


//PUT entity/:entityID
const edit_entity = (entityID,edit_data)=>{
  return new Promise((resolve,reject)=>{
    axios({
      method: 'PUT',
      url: '/entity/'+entityID,
      data:{
        data:edit_data
      }
    })
    .then ( res =>{
      console.log('sucess');
        console.log(res);
    })
    .catch(err => {
        console.log(err.message);
        console.log('error');
    })
  })
}


const delete_entity= (entityID)=>{
  return new Promise((resolve,reject)=>{
    axios({
      method: 'DELETE',
      url: '/entity/'+entityID,
    })
    .then ( res =>{
        console.log('sucess');
        return resolve(res.data)
    })
    .catch(err => {
        console.log('error');
        return reject(err)
    })
  })
}




export {
  getEntity,
  post_entity,
  edit_entity,
  delete_entity,
}

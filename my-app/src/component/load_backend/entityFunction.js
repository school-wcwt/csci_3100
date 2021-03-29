import React, { useState, useEffect } from "react";
import ReactDOM, { render } from "react-dom";
import axios from '../../axiosConfig';
//GET entity/:entityID
const getEntity= (entityID)=>{
  return new Promise((resolve,reject)=>{
    axios({
      method: 'GET',
      url: '/entity/'+entityID,
      //url: 'https://jsonplaceholder.typicode.com/users', 
      withCredentials: false,
    })
    .then ( res =>{
        console.log('sucess');
        return resolve(res)
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
 fil={};
  return new Promise((resolve,reject)=>{
    axios({
      method: 'POST',
      url: '/entity/',
      //url: 'https://jsonplaceholder.typicode.com/users', 
      data:{
        filter:fil
      },
      withCredentials: false,
    })
   .then ( res =>{
      console.log('sucess');
      console.log(res);
      return resolve(res)
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

  console.log('entityID:'+entityID);
  console.log('edit_data:'+edit_data);
  //edit_data=JSON.parse(edit_data);
  //fil={"entityID": "jon-1428"};
//fil={};
  return new Promise((resolve,reject)=>{
    axios({
      method: 'PUT',
      url: '/entity/'+entityID,
      data:{
        data:edit_data
      },
      withCredentials: false,
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
      withCredentials: false,
    })
    .then ( res =>{
        console.log('sucess');
        return resolve(res)
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

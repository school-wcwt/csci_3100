import React, { useState, useEffect } from "react";
import ReactDOM, { render } from "react-dom";
import axios from '../../axiosConfig';

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


//PATCH user/:entityID/follow/:entityID
const follow = (userID, followID)=>{
    userID= "jon-rest-1296";
    followID= "jon-rest-1296";
    console.log('patch');
    console.log('UserID:'+userID);
    console.log('followID:'+followID);
  return new Promise((resolve,reject)=>{
    axios({
      method: 'PATCH',
      url: 'user/'+userID+'/follow/'+followID,
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
        this.setState({entity: res.data});
    })
    .catch(err => {
        console.log(err.message);
        console.log('error');
    })
  })
}
export {getEntity,
  post_entity,
  edit_entity,
  follow
}

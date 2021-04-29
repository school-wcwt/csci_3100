import axios from '../../axiosConfig';
import { trigChange } from "../socket-client";

//GET entity/:entityID
/**
 * return entity that has a certain entityID
 * @param   {string} entityID  ID of entity
 * @return {Promise<JSON>} entity in JSON format
 */
const entity_get= (entityID)=>{
  return new Promise((resolve,reject)=>{
    axios({
      method: 'GET',
      url: '/entity/'+entityID,
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

//POST entity/
/**
 * return entities that satisfy the filter
 * @param   {JSON} fil  filter for backend
 * @return {Promise<JSON>[]} array of entity in JSON format
 */
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
      return resolve(res.data)
    })
   .catch(err => {
      console.log('error');
      return reject(err)
    })
  })
}

//PUT entity/
/**
 * edit entity and return the edited entity
 * @param   {JSON} edit_data  data to be edited
 * @return {Promise<JSON>} entity in JSON format
 */
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
        console.log('error');
        return reject(err)
    })
  })
}

//DELETE entity/
/**
 * delete entity and return the deleted entity
 * @return {Promise<JSON>} entity in JSON format
 */
const entity_delete= ()=>{
  return new Promise((resolve,reject)=>{
    axios({
      method: 'DELETE',
      url: '/entity/',
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

//PATCH user/follow/:entityID
/**
 * follow entity and return the followed entity
 * @param   {string} followID  ID of target entity
 * @param   {string} flag 0: unfollow, 1:follow
 * @return {Promise<JSON>} entity in JSON format
 */

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

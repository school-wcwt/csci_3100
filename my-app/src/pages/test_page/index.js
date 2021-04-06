import React,{ useState, useEffect } from 'react';
import axios from '../../axiosConfig';
//import {getEntity} from '../../component/load_backend/entityFunction';
import {makeStyles,Grid,Paper} from '@material-ui/core';
const entityFn = require("../../component/load_backend/entityFunction");
const useStyles = makeStyles((theme) => ({
}));


/*
html, body {
  width: 100%;
  height:100%;
}

body {
    background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
    background-size: 400% 400%;
    animation: gradient 15s ease infinite;
}

@keyframes gradient {
    0% {
        background-position: 0% 50%;
    }
    50% {
        background-position: 100% 50%;
    }
    100% {
        background-position: 0% 50%;
    }
}
*/
/*const GetData = (EntitiesID) =>{
  return JSON.stringify(getEntity(EntitiesID));
}
const Testpage = () =>{
  return (
    <div>
      <h1>{GetData("Tom_Wong-0506")}</h1>
    </div> 
  )
}*/

const Testpage = () => {

  function handleRefresh(e) {
    e.preventDefault();
    axios({
      method: 'POST',
      url: 'http://localhost:3104/refresh',
      withCredentials: true,
      //data: {filter: {entityID: 'jon-9073'}}
    })
    .then(res => console.log(res))
    .catch(err => console.log(err))
  }

  function handleLogout(e) {
    e.preventDefault();
    axios({
      method: 'POST',
      url: 'http://localhost:3104/logout',
      withCredentials: true,
      data: {filter: {entityID: 'jon-9073'}}
    })
    .then(res => console.log(res))
    .catch(err => console.log(err))
  }

  function handleLogin(e) {
    e.preventDefault();
    axios({
      method: 'POST',
      url: 'http://localhost:3104/login',
      withCredentials: true,
      data: {filter: {entityID: 'jon-9073'}, password: 'jonlam'}
    })
    .then(res => console.log(res))
    .catch(err => console.log(err))
  }

  function callTest(e) {
    e.preventDefault();
    axios({
      method: 'GET',
      url: 'http://localhost:3104/entity/jon-9073',
      withCredentials: true,
      //data: {filter: {entityID: 'jon-9073'}, password: 'jonlam'}
    })
    .then(res => console.log(res))
    .catch(err => console.log(err))
  }

  return (
    <>
    <button onClick={handleLogin}>Login</button>
    <button onClick={handleRefresh}>Refresh</button>
    <button onClick={handleLogout}>Logout</button>
    <button onClick={callTest}>Test</button>
    </>
  )
}
export default Testpage;
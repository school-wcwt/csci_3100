import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from '../../axiosConfig';
import { get_entity } from "./load_backend";


function Example() {
  // Store the users in a state variable.
  // We are passing an empty array as the default value.
  let [users, setUsers] = useState([]);
  let [people, setPeople] = useState([]);
  console.log('exma');
  // The useEffect() hook fires any time that the component is rendered.
  // An empty array is passed as the second argument so that the effect only fires once.
  useEffect(()=>{
    function get_entity(){
        var b='byedd';
        var entityID='jon-1428'; 
        axios({
          method: 'GET',
          url: '/entity/'+entityID,
          withCredentials: false,
      })
      .then ( res =>{
          var send=   res.data;
          console.log(res)
          setPeople(res.data.username);
          return send;
      })
      .catch(err => {
          console.log(err.message);
          console.log('error');
      }
      )
    }
    get_entity();

  },[]);

  return (
    <div className="App">
      <h2>The JSON below is loaded from an external API!</h2>
      <h1>{people}</h1>
    </div>
  );
}

const HIHI= ()=>{

  return(
    <div>ihi</div>
  )
}
export {Example}

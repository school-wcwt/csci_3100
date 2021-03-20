import React from "react";
import axios from '../../axiosConfig';
import { BrowserRouter as Router, Switch, Redirect,Route, Link } from 'react-router-dom';


//Assume I get authorID already
 function get_entity(entityID){
    console.log('hey');
    return axios({
        method: 'GET',
        url: '/entity/'+entityID,
        withCredentials: false,
    })
    .then ( res =>{
        var send=   res.data;
       // console.log(res)
        return send;
    })
    .catch(err => {
        console.log(err.message);
        console.log('error');
    }
    )
}

/* to call the above function, add the following:
    var authorID='joe-9363';
    var author=  get_entity(authorID);
    get_entity(authorID).then(data=>{
        console.log('1 inside');
        console.log(data);
        console.log('2 inside')
        return data;
    });
*/
export {get_entity};
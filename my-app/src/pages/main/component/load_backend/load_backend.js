import React from "react";
import axios from '../../../../axiosConfig';
import { BrowserRouter as Router, Switch, Redirect,Route, Link } from 'react-router-dom';

const get_entity =(entityID) => {
    axios({
        method: 'GET',
        url: '/entity/'+entityID,
        withCredentials: false,
    })
    .then(res => {
        console.log("sent");
        console.log(res);
        <Redirect to="/" />
        return res;
    })
    .catch(err => {
        console.log(err.message);
        return ('error');
    })
};

export {get_entity};
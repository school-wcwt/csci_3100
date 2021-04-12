import React, { useState, useEffect } from "react";
import ReactDOM, { render } from "react-dom";
import axios from '../../axiosConfig';

//Last update 7/4/2021

//POST hashtag/
const hashtag_post = (restFilter, name) => {
    var restFilter = {"entityID": 'jon-rest-1296'}
    var restFilter = {}

    var name = 'hash1'
    return new Promise((resolve, reject) => {
        axios({
            method: 'POST',
            url: '/hashtag/',
            data: {
                restFilter: restFilter,
                name: name
            }
        })
            .then(res => {
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


export {
    hashtag_post,

}

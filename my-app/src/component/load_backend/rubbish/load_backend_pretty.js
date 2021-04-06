import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from '../../axiosConfig';

class LoadBackend extends React.Component {
    constructor(props) {
        super(props);
    }

    // GET entity/:entityID
    get_entity (entityID) {
        console.log('GET entity.');
        return axios.get(`/entity/${entityID}`)
        .then(res => {
            console.log('Success.');
            this.setState({entity: res.data})
        })
        .catch(err => {
            console.log('Error.');
            console.log(err.message); 
        })
    }

    // POST entity/
    post_entity (filter) {
        console.log('POST entities.');
        console.log(filter);
        filter = {};
        return axios.post('/entity', {filter: filter})
        .then(res =>{
            console.log('Success.');
            this.setState({entity: res.data});
        })
        .catch(err => {
            console.log('Error.');
            console.log(err.message); 
        })
    }

    // PUT entity/:entityID
    edit_entity (entityID, edit_data) {
        console.log('entityID:'+entityID);
        console.log('edit_data:'+edit_data);
        edit_data = JSON.parse(edit_data);
        return axios.put(`/entity/${entityID}`, {data: edit_data})
        .then ( res =>{
            console.log('Success.');
            this.setState({entity: res.data});
        })
        .catch(err => {
            console.log('Error.');
            console.log(err.message); 
        })
    }

    // PATCH user/:entityID/follow/:entityID
    follow (userID, followID) {
        console.log('Patch - follow.');
        console.log('UserID:'+userID);
        console.log('followID:'+followID);
        return axios.patch(`/user/${userID}/follow/${followID}`)
        .then(res => {
            console.log('Success.');
            console.log(res);
            // this.setState({entity: res.data});
        })
        .catch(err => {
            console.log('Error.');
            console.log(err.message); 
        })
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleChange2(event) {
        this.setState({[event.target.id]: event.target.value});
    }

    handleSubmit(filter) {
        alert('A name was submitted: ' + this.state.value);
        this.post_entity(filter);
    }

    printAll (restaurant_list) {
        var div_list=[];
        console.log('List is');
        console.log(restaurant_list);
        var feed_components=[];
        var i=0;
        for (i = 0; i < restaurant_list.length; i++) {
            var rest = restaurant_list[i];
            feed_components.push(<h1>{rest.username}</h1>)
            for (var key in rest) {
                if (rest.hasOwnProperty(key)) {
                    //console.log(key + " -> " + rest[key]);
                    feed_components.push(<div>{key}: {rest[key]}</div>)
                }
            }
        }
        return(feed_components);
    }
}

export default LoadBackend
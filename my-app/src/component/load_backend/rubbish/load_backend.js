import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from '../../axiosConfig';

class LoadBackend extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: '',
    //entity: ''
  };

    this.handleChange = this.handleChange.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.get_entity = this.get_entity.bind(this);
    this.post_entity= this.post_entity.bind(this);
    this.edit_entity= this.edit_entity.bind(this);
    this.printAll =this.printAll.bind(this);
    this.follow = this.follow.bind(this);
   // this.post_entity=this.post_entity.bind(this);
  }

//GET entity/:entityID
  get_entity(entityID){
    console.log('load');
    alert('hihi');
    return axios({
      method: 'GET',
      url: '/entity/'+entityID,
      //url: 'https://jsonplaceholder.typicode.com/users', 
      withCredentials: false,
    })
    .then ( res =>{
        console.log('sucess');
        this.setState({entity: res.data})
    })
    .catch(err => {
        console.log(err.message);
        console.log('error');
    })
  }


//POST entity/
  post_entity(fil){
   console.log('post');
   console.log(fil);
   //fil=JSON.parse(fil);
   fil={};
   //fil={"entityID": "jon-1428"};
  //fil={};
    return axios({
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
       this.setState({entity: res.data});
    })
    .catch(err => {
        console.log(err.message);
        console.log('error');
    })
  }

//PUT entity/:entityID
  edit_entity(entityID,edit_data){

    console.log('entityID:'+entityID);
    console.log('edit_data:'+edit_data);
    edit_data=JSON.parse(edit_data);
    //fil={"entityID": "jon-1428"};
  //fil={};
    return axios({
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
  }

//PATCH user/:entityID/follow/:entityID
  follow(userID, followID){
  //  userID= "mkmk-1921";
  // followID= "jon-rest-3413";
    console.log('patch');
    console.log('UserID:'+userID);
    console.log('followID:'+followID);
  // fil=JSON.parse(edit_data);
    //fil={"entityID": "jon-1428"};
  //fil={};
    return axios({
      method: 'PATCH',
      url: 'user/'+userID+'/follow/'+followID,
      withCredentials: false,
    })
    .then ( res =>{
      console.log('sucess');
        console.log(res);
      //  this.setState({entity: res.data});
    })
    .catch(err => {
        console.log(err.message);
        console.log('error');
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
   // event.preventDefault();
  }

  
  printAll(restaurant_list){
    var div_list=[];
    console.log('list is');
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
    /*
    for (var key in entity) {
    if (entity.hasOwnProperty(key)) {
        console.log(key + " -> " + entity[key]);
        div_list.push(<div>{key}: {entity[key]}</div>)
      }
    }

    */
 
  render() {
    return (0);
  }
}
export {LoadBackend}
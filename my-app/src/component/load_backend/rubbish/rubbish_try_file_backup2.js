import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from '../../axiosConfig';
//import { get_entity } from "./load_backend";

function get_entity(entityID){
  return axios({
    method: 'GET',
    url: '/entity/'+entityID,
    withCredentials: false,
  })
  .then ( res =>{
      var send= res.data;
      console.log('sucess');
      return send;
  })
  .catch(err => {
      console.log(err.message);
      console.log('error');
  })
}

function handleChange(f){
  //setPeople(f.target.value);
  console.log('hi');
  f.target.value=3;
}


function Example(props) {
  // Store the users in a state variable.
  // We are passing an empty array as the default value.
  let [users, setUsers] = useState([]);
  let [people, setPeople] = useState([]);
  var entityID =props.entityID;
  console.log('exma');
  console.log(entityID);
  // The useEffect() hook fires any time that the component is rendered.
  // An empty array is passed as the second argument so that the effect only fires once.
  useEffect(()=>{
    get_entity(entityID).then(entity=>{
      setPeople(JSON.stringify(entity));
    })
    .catch(err=>{
      console.log(err);
    })
    ;
  },[entityID]);

  return (
    <div className="App">
      <h2>My user info:</h2>
      <div>{people}</div>
      <form>
        <label>
          Name:
          <input type="text" value={people} onChange={(f)=>handleChange(f)}/>
        </label>
        <input type="submit" value="Submit" />
      </form>
      <button onClick={() => setPeople(people + 1)}>
      Click me
      </button>
    </div>
  );
}

//--------
/*
class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: 'gg'};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <div>
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
      <p>{this.state.value}</p>
      </div>
    );
  }
}
*/
export {Example}
import React from 'react';
import axios from '../../../../axiosConfig';

//https://stackoverflow.com/questions/41194866/how-to-set-state-of-response-from-axios-in-react
function get_entity(entityID){
  console.log('hey');
  axios({
      method: 'GET',
      url: '/entity/'+entityID,
      withCredentials: false,
  })
  .then ( async res =>{
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


class PersonList extends React.Component {
  state = {
    persons: [],
    people:[]
  }
  componentDidMount() {
//get entity
{
      var entityID='jon-0571';
    //  alert(a);
      axios(
        {
        method: 'GET', 
       url: '/entity/'+entityID,
      // url: 'https://jsonplaceholder.typicode.com/users', 
       withCredentials: false
      })

      .then ( res => {
        const persons = res.data;
        this.setState({ persons });
      })
      .catch(err => {
        console.log(err.message);
        console.log('error');
      })
}

//
      var entityID='jon-0571';
     // alert(a);
      axios(
        {
        method: 'GET', 
       // url: '/entity/'+entityID,
       url: 'https://jsonplaceholder.typicode.com/users', 
       withCredentials: false
      })

      .then ( res => {
        const people = res.data;
        this.setState({ people });
      })
      .catch(err => {
        console.log(err.message);
        console.log('error');
      })

    }
//--------------
  render() {
    return (
      <div>
      <ul>
        <li>{this.state.persons.entityID}</li>
      </ul>

  
        { this.state.people.map(person => <h1>{person.username}</h1>)}

      </div>
      )
    }
  }



export {PersonList}
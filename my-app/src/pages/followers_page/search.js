import React, { useState, useEffect } from "react";
//import {LoadBackend}  from "../../component/load_backend/load_backend.js";
import { Navbar, Form, Button, FormControl, Nav, Container,Col } from 'react-bootstrap';

const entityFn = require("../../component/load_backend/entityFunction");
 const Search = ()=>{
    const handleNameChange = (event)=>{
      console.log('hihi')
      console.log(event.target.value);
      console.log(event.target.id)
      var new_value=event.target.value;
      set_input(new_value);
      var filter= {$or: [
          {"entityID":{$regex: '^'+new_value}},
          {"username":{ $regex: '^'+new_value }}    
      ]};
      console.log('filter:')
      console.log(filter)
      change_post(filter)
    }

    
    const change_post= async (filter)=>{
      try{
        var entity2 = await entityFn.post_entity(filter);
        set_entity(entity2)
      }
      catch(err){
        console.log(err)
        console.log('---------------')
      }
    }

    const handleClick =(event)=>{
      event.preventDefault();
      console.log('this is button')
      console.log(event);
    }

    const [input, set_input] = useState('');
    const [entity, set_entity]= useState(null);
    useEffect(()=>{
      change_post({})
    },[])
    return(
      <div>
    <Container className="mt-5 pb-5 col-lg-6 bg-light rounded">
        <h1>Search</h1>
      <div className="py-3">
        <Form className="justify-content-center">
          <Form.Group controlId="Name">
            <Form.Label>Entity Name</Form.Label>
            <Form.Control controlId=" myID" type="text" placeholder="Name" onChange={(event)=>{handleNameChange(event)}} />
          </Form.Group>
          <Button variant="dark" type="submit" className="float-right" onClick ={(event)=>{handleClick(event)}}>
            Add Post
         </Button>
        </Form>
        <div>{entity!=null ? entity.map(sinEnt=>{return (
        
        <div>
          <p>username:{sinEnt.username}</p>
          <p>entityID: {sinEnt.entityID}</p>
          <p>----------------------</p>
        </div>
          )}
          
          ) : ''}</div>

      </div>
    </Container>
      </div>

    )
  }


export default Search;
import React, { useState, useEffect } from "react";
import { Navbar, Form, Button, FormControl, Nav, Container, Col } from 'react-bootstrap';

import { GetMyEntities } from '../services/authService';

const entityFn = require("../../component/load_backend/entityFunction");

const Entity = () => {
  var entitiesID = GetMyEntities();

  const Get_entity = () => {
    const [entity1, setEntity1] = useState(null);


    console.log('---')
    console.log(entitiesID)
    console.log('---')
    const change_get = async () => {
      try {
        var entity1 = await entityFn.entity_get(entitiesID);
        setEntity1(entity1);
      }
      catch (err) {
        console.log(err)
        console.log('---------------')
      }
    }
    const remove_get = () => {
      setEntity1(null)
    }
    return (
      <div>
        <h1>Get entity</h1>
        <button onClick={() => { change_get() }}>get_entity
      </button>
        <p>current user ={entity1 != null ? entity1.entityID : ''}</p>

        <button onClick={() => { remove_get() }}>remove_get
      </button>
        <p>count ={entity1 != null ? entity1.entityID : ''}</p>
      </div>
    )
  }

  const Post_entity = () => {
    const [entity2, setEntity2] = useState(null);
    const [field, set_field] = useState(JSON.stringify({"entityID":entitiesID}));

    const handleChange = (event)=>{
      set_field(event.target.value)
      change_post()
    }
    const change_post = async () => {
      try {
        var entity2 = await entityFn.entity_post(JSON.parse(field));
        setEntity2(entity2)
      }
      catch (err) {
        console.log(err)
        console.log('---------------')
      }
    }
    return (
      <div>
        <h1>Post entity</h1>
        <form>
          <label>
            Name:
            <input type="text" name="name" value={field} onChange={(event)=>{handleChange(event)}}/>
          </label>
        </form>
        <button onClick={() => { change_post() }}>entity_post
        </button>
        <p>count ={entity2 != null ? entity2.map(sinEnt => { return (<p>{sinEnt.entityID}</p>) }) : ''}</p>
      </div>

    )
  }

  const Edit_entity = () => {
    const [entity3, setEntity3] = useState(null);
    const change_post = async () => {
      try {
        var entity3 = await entityFn.entity_edit({ "entityID": "the333re" });
      }
      catch (err) {
        console.log(err)
        console.log('---------------')
      }
    }
    return (
      <div>
        <h1>Edit entity</h1>
        <button onClick={() => { change_post() }}>entity_post
        </button>
        <p>count ={entity3 ? entity3[0].entityID : ''}</p>
      </div>
    )
  }


  const Delete_entity = () => {
    const [entity3, setEntity3] = useState(null);
    const change_post = async () => {
      try {
        var entity3 = await entityFn.entity_delete();
      }
      catch (err) {
        console.log(err)
        console.log('---------------')
      }
    }
    return (
      <div>
        <h1>Delete entity</h1>
        <button onClick={() => { change_post() }}>entity_post
        </button>
      </div>
    )
  }


  const Follow_entity = () => {
    const [entity4, setEntity4] = useState(null);
    const change_post = async () => {
      try {
        var followerID = 'user2-4935';
        var entity4 = await entityFn.entity_follow(followerID);
      }
      catch (err) {
        console.log(err)
        console.log('---------------')
      }
    }
    return (
      <div>
        <h1>Follow entity</h1>
        <button onClick={() => { change_post() }}>entity_post
        </button>
        <p>count ={entity4 != null ? entity4[0].entityID : ''}</p>
      </div>
    )
  }


  return (
    <div>
      <Get_entity></Get_entity>
      <Post_entity></Post_entity>
      <Edit_entity></Edit_entity>
      <Delete_entity></Delete_entity>
      <Follow_entity></Follow_entity>
    </div>
  )
}
export default Entity;
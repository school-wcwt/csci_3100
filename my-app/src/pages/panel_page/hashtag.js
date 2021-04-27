import React, { useState, useEffect } from "react";
import { Navbar, Form, Button, FormControl, Nav, Container, Col } from 'react-bootstrap';
import PanelBar from "./panel.js"

import { GetMyEntities } from 'component';

const hashtagFn = require("../../component/load_backend/hashtagFunction");

const Entity = () => {
  var entitiesID = GetMyEntities();


  const Hashtag_post = () => {
    const [entity2, setEntity2] = useState(null);
    const [field, set_field] = useState(JSON.stringify({"entityID":entitiesID}));

    const handleChange = (event)=>{
      set_field(event.target.value)
      change_post()
    }
    const change_post = async () => {
      try {
        var entity2 = await hashtagFn.hashtag_post();
        setEntity2(entity2)
      }
      catch (err) {
        console.log(err)
        console.log('---------------')
      }
    }
    return (
      <div>
        <h1>Post hashtag</h1>
        <form>
          <label>
            Name:
            <input type="text" name="name" value={field} onChange={(event)=>{handleChange(event)}}/>
          </label>
        </form>
        <button onClick={() => { change_post() }}>hashtag_post
        </button>
        <p>count ={entity2 != null ? entity2.map(sinEnt => { return (<p>{sinEnt.entityID}</p>) }) : ''}</p>
      </div>

    )
  }



  return (
    <div>
      <PanelBar></PanelBar>
      <Hashtag_post></Hashtag_post>
    </div>
  )
}
export default Entity;
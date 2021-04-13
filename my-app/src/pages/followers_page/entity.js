import React, { useState, useEffect } from "react";
import { Navbar, Form, Button, FormControl, Nav, Container, Col } from 'react-bootstrap';
import PanelBar from "./panel.js"
import global from '../../component/global'

import { GetMyEntities } from '../services/authService';

const entityFn = require("../../component/load_backend/entityFunction");








const Entity = () => {
  var entitiesID = GetMyEntities();


  const Filter_testing = () => {
    const [entity2, setEntity2] = useState(null);
    const grab_followers = () => {

      entityFn.entity_get(global.loginedUser.user.entityID).then(data => {
        console.log('------------===')
        console.log(data)
        //===========User type=============
        //fil for ALL users
        var fil = {
          'type': 'User'
        }

        //fil for following, User
        var fil = {
          '_id': { $in: data.followingUser },
          'type': 'User'
        }


        //fil for followed, by User
        var fil = {
          '_id': { $in: data.followed },
          'type': 'User'
        }


        //fil for not followed, exclude myself, by user
        var fil1 = {
          '_id': {
            $nin:
              data.followed.concat(global.loginedUser.user._id)
          },
          'type': 'User'
        }

        //fil for non-following, exclude myself, User
        var fil = {
          '_id': {
            $nin:
              data.followingUser.concat(global.loginedUser.user._id)
          },
          'type': 'User'
        }

        //===========Rest type=============
        //fil for ALL Rest
        var fil = {
          'type': 'Rest'
        }


        //fil for following rest
        var fil = {
          '_id': { $in: data.followingRest },
          'type': 'Rest'
        }

        //fil for non-following rest
        var fil = {
          '_id': { $nin: data.followingRest },
          'type': 'Rest'
        }


        //then will return the json array
        entityFn.entity_post(fil1).then(data => {
          console.log(data)
          console.log('hihi')
          setEntity2(data)
        })
      })
    }
    return (
      <div>
        <h1>Filter testing</h1>
        <button onClick={() => { grab_followers() }}>get_entity
      </button>

        {entity2 == null ? '' :
          entity2.map(singEntity => {
            return (
              <>
                <h1>entityID ={singEntity != null ? singEntity.entityID : ''}</h1>
                <p>username ={singEntity != null ? singEntity.username : ''}</p>
                <p>profPhoto ={singEntity != null ? singEntity.profPhoto : ''}</p>
              </>
            )
          })
        }
      </div>
    )
  }
  const Get_entity = () => {
    const [entity1, setEntity1] = useState(null);


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
    const [field, set_field] = useState(JSON.stringify({ "entityID": entitiesID }));

    const handleChange = (event) => {
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
            <input type="text" name="name" value={field} onChange={(event) => { handleChange(event) }} />
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
        var followerID = 'username3-8409'

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
      <PanelBar></PanelBar>
      <Filter_testing></Filter_testing>
      <Get_entity></Get_entity>
      <Post_entity></Post_entity>
      <Edit_entity></Edit_entity>
      <Delete_entity></Delete_entity>
      <Follow_entity></Follow_entity>
    </div>
  )
}
export default (Entity)
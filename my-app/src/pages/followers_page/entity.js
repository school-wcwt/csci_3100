import React, { useState, useEffect } from "react";
const entityFn = require("../../component/load_backend/entityFunction");

const Entity= ()=>{
  const Get_entity =()=>{
      const [entity1, setEntity1] = useState(null);
      const change_get= async ()=>{
        try{
          var entity1= await entityFn.getEntity("here");
          setEntity1(entity1);
        }
        catch(err){
          console.log(err)
          console.log('---------------')
        }
    }
      const remove_get= ()=>{
        setEntity1(null)
      }
    return(
      <div>
        <h1>Get entity</h1>
      <button onClick= {()=>{change_get()}}>get_entity
      </button>
      <p>count ={entity1!= null ? entity1.entityID : ''}</p>

      <button onClick= {()=>{remove_get()}}>remove_get
      </button>
      <p>count ={entity1!= null ? entity1.entityID : ''}</p>
  </div>
    )
  }

  const Post_entity =()=>{
    const [entity2, setEntity2] = useState(null);
    const change_post= async ()=>{
      try{
        var entity2 = await entityFn.post_entity({});
        setEntity2(entity2)
      }
      catch(err){
        console.log(err)
        console.log('---------------')
      }
    }
    return (
      <div>
        <h1>Post All entity</h1>
        <button onClick= {()=>{change_post()}}>post_entity
        </button>
        <p>count ={entity2!=null ? entity2.map(sinEnt=>{return (<p>{sinEnt.entityID}</p>)}) : ''}</p>
      </div>

    )
  }

  const Edit_entity =()=>{
    const [entity3, setEntity3] = useState(null);
    const change_post= async ()=>{
      try{
        var entity3 = await entityFn.edit_entity("there", {"entityID": "the333re"});
      }
      catch(err){
        console.log(err)
        console.log('---------------')
      }
    }
    return (
      <div>
        <h1>Edit entity</h1>
        <button onClick= {()=>{change_post()}}>post_entity
        </button>
        <p>count ={entity3 ? entity3[0].entityID : ''}</p>
      </div>
    )
  }


  const Delete_entity =()=>{
    const [entity3, setEntity3] = useState(null);
    const change_post= async ()=>{
      try{
        var entity3 = await entityFn.delete_entity("username1-8759");
      }
      catch(err){
        console.log(err)
        console.log('---------------')
      }
    }
    return (
      <div>
        <h1>Delete entity</h1>
        <button onClick= {()=>{change_post()}}>post_entity
        </button>
      </div>
    )
  }


  const Follow_entity =()=>{
    const [entity4, setEntity4] = useState(null);
    const change_post= async ()=>{
      try{
        var entity4 = await entityFn.follow("??", "??");
      }
      catch(err){
        console.log(err)
        console.log('---------------')
      }
    }
    return (
      <div>
        <h1>Follow entity</h1>
        <button onClick= {()=>{change_post()}}>post_entity
        </button>
        <p>count ={entity4!= null ? entity4[0].entityID : ''}</p>
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
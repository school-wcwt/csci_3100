import React, { useState, useEffect } from "react";
//import {LoadBackend}  from "../../component/load_backend/load_backend.js";

const entityFn = require("../../component/load_backend/entityFunction");


/*
 class Followers1 extends LoadBackend{
    constructor(props) {
        super(props);
        this.state = {
          value: '{"entityID": "jon-rest-3413"}',
          entity: '',
          userID:'hihi',
          followID:'byebye',
          input_data:'{"username": "here"}',
      };
    }
    render() {
      let textInput = React.createRef();
      var a= new LoadBackend;
     // a.createPost();
     //Comp1.shout(1);
     console.log();

        return (

        <div>
          <h1>a Fetch all entities</h1>
          <button type="button" onClick={() => this.handleSubmit('{}')}> Submit </button>

          <h1>Create Post</h1>
          <button type="button" onClick={() => a.createPost()}> Submit </button>


          <h1>Follow entity</h1>
            <label> 
              UserID:
              <input id="userID" type="text" value={this.state.userID} onChange={(event)=>this.handleChange2(event)} />
            </label>

            <label> 
              FollowID:
              <input id="followID" type="text" value={this.state.followID} onChange={(event)=>this.handleChange2(event)} />
            </label>
            <button type="button" onClick={()=>this.follow(this.state.userID, this.state.followID)}> Submit </button>



            <h1>Change entity</h1>
            <label> 
              entityID:
              <input id="userID" type="text" value={this.state.userID} onChange={(event)=>this.handleChange2(event)} />
            </label>

            <label> 
              data to change(~JSON format):
              <input id="input_data" type="text" value={this.state.input_data} onChange={(event)=>this.handleChange2(event)} />
            </label>
            <button type="button" onClick={()=>this.edit_entity(this.state.userID, this.state.input_data)}> Submit </button>



          <h1> Input query filter</h1>
            <label> 
              Query (~Json format):
              <input ref={textInput} type="text" value={this.state.value} onChange={this.handleChange} />
            </label>
            <button type="button" onClick={()=>this.handleSubmit(this.state.value)}> Submit </button>
            <h1>Clear</h1>
            <button type="button" onClick={()=>this.setState({entity:''})}> Clear </button>
          <div>{this.printAll(this.state.entity)}</div>


          </div>
        );
      }
    }

*/




const Followers= ()=>{
  console.log();


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
      <p>count ={entity1!= null ? entity1.data.entityID : ''}</p>

      <button onClick= {()=>{remove_get()}}>remove_get
      </button>
      <p>count ={entity1!= null ? entity1.data.entityID : ''}</p>
  </div>
    )
  }

  const Post_entity =()=>{
    const [entity2, setEntity2] = useState(null);
    const change_post= async ()=>{
      try{
        var entity2 = await entityFn.post_entity({"entityID": "the22re"});
        setEntity2(entity2)
      }
      catch(err){
        console.log(err)
        console.log('---------------')
      }
    }
    return (
      <div>
        <h1>Post entity</h1>
        <button onClick= {()=>{change_post()}}>post_entity
        </button>
        <p>count ={entity2!= null ? entity2.data[0].entityID : ''}</p>
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
        <p>count ={entity3!= null ? entity3.data[0].entityID : ''}</p>
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
        <p>count ={entity4!= null ? entity4.data[0].entityID : ''}</p>
      </div>
    )
  }



//condition ? true : false
  return (
<div>
  <Get_entity></Get_entity>
  <Post_entity></Post_entity>
  <Edit_entity></Edit_entity>
  <Follow_entity></Follow_entity>
</div>
      )
}
 export default Followers;
 //  <button type="button" onClick={this.handleSubmit}> Submit </button>

 /*
     render(){
        return(
        <div> 
            <NameForm />    
        </div>);
    }
 }
 */
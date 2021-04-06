import React, { useState, useEffect } from "react";
//import {LoadBackend}  from "../../component/load_backend/load_backend.js";
const userFn = require("../../component/load_backend/userFunction.js");

const Users= ()=>{
    const Follow_entity =()=>{
        const [entity4, setEntity4] = useState(null);
        const change_post= async ()=>{
        try{
            var entity4 = await userFn.follow("??", "??");
            setEntity4(entity4)
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
            <p>count ={entity4!= null ? entity4.entityID : ''}</p>
        </div>
        )
    }

    const PostPost =()=>{
        const [entity4, setEntity4] = useState(null);
        const change_post= async ()=>{
        try{
            var targetFilter = {}
            var entity4 = await userFn.post_post(targetFilter);
            setEntity4(entity4)
        }
        catch(err){
            console.log(err)
            console.log('---------------')
        }
        }
        return (
        <div>
            <h1>post_post</h1>
            <button onClick= {()=>{change_post()}}>post_entity
            </button>
            <p>count ={entity4!=null ? entity4.map(sinEnt=>{return (<p>{sinEnt.postID}</p>)}) : ''}</p>
        </div>
        )
    }



    const PostCreate =()=>{
        const [entity4, setEntity4] = useState(null);
        const change_post= async ()=>{
        try{
            var authorID='usern-1424';
            var targetFilter = {"entityID": "jon-rest-1296"}
            console.log('create');

                //alert('creating');
                //fil=JSON.parse(fil);
                //fil={"entityID": "jon-1428"};
            //fil={};
            var edit_data={
                "type":         0,
                "content":      "content44",
                "photo":        "picture4",
                "hashtag":      "zzzzz",
                "rating":       1
            };

            var entity4 = await userFn.post_create(targetFilter,edit_data);
            setEntity4(entity4)
        }
        catch(err){
            console.log(err)
            console.log('---------------')
        }
        }
        return (
        <div>
            <h1>post_create</h1>
            <button onClick= {()=>{change_post()}}>post_entity
            </button>
        </div>
        )
    }

    const PostDelete =()=>{
        const [entity4, setEntity4] = useState(null);
        const change_post= async ()=>{
        try{
            var postID= "user2-4935-1617032582492"
            var entity4 = await userFn.post_delete(postID)
            setEntity4(entity4)
        }
        catch(err){
            console.log(err)
            console.log('---------------')
        }
        }
        return (
        <div>
            <h1>post_delete</h1>
            <button onClick= {()=>{change_post()}}>post_entity
            </button>
        </div>
        )
    }


    const PostEdit =()=>{
        const [entity4, setEntity4] = useState(null);
        const change_post= async ()=>{
        try{
            var filter= {"postID":"user2-4935-1617031432521"}
            var edit_data={
                "content":      "final_edit",
                "rating":       1
            };
            var entity4 = await userFn.post_edit(filter,edit_data);
            setEntity4(entity4)
        }
        catch(err){
            console.log(err)
            console.log('---------------')
        }
        }
        return (
        <div>
            <h1>post_edit</h1>
            <button onClick= {()=>{change_post()}}>post_entity
            </button>
        </div>
        )
    }



    const PostLike =()=>{
        const [entity4, setEntity4] = useState(null);
        const change_post= async ()=>{
        try{
            var addFlag= 1 //1 if like, 0 if pull like
            var authorFilter={
                "entityID": "user2-4935"
            };
            var postFilter={
                "postID":"user2-4935-1617031432521"
            }
            var entity4 = await userFn.post_like(addFlag,authorFilter,postFilter);
            setEntity4(entity4)
        }
        catch(err){
            console.log(err)
            console.log('---------------')
        }
        }

        return (
        <div>
            <h1>post_like</h1>
            <button onClick= {()=>{change_post()}}>post_entity
            </button>
        </div>
        )
    }

    const CommentCreate =()=>{
        const [entity4, setEntity4] = useState(null);
        const change_post= async ()=>{
        try{
            var addFlag= 1 //1 if like, 0 if pull like
            var entityID= "user2-4935"
            var postID= "user2-4935-1617031432521"
            var add_data = {"content" : "some text"};
            var entity4 = await userFn.comment_create(entityID,postID,add_data);
            setEntity4(entity4)
        }
        catch(err){
            console.log(err)
            console.log('---------------')
        }
        }

        return (
        <div>
            <h1>comment_create</h1>
            <button onClick= {()=>{change_post()}}>post_entity
            </button>
        </div>
        )
    }

    const CommentDelete =()=>{
        const [entity4, setEntity4] = useState(null);
        const change_post= async ()=>{
            alert(' triggered')
            try{
                var entityID= "user2-4935"
                var postID= "user2-4935-1617031432521"
                var commentID = "user2-4935-1617037667361"
                var entity4 = await userFn.comment_delete(entityID, postID, commentID);
                setEntity4(entity4)
            }
            catch(err){
                console.log(err)
                console.log('---------------')
            }
        }

        return (
        <div>
            <h1>comment_delete</h1>
            <button onClick= {()=>{change_post()}}>post_entity
            </button>
        </div>
        )
    }

    const CommentEdit =()=>{
        const [entity4, setEntity4] = useState(null);
        const change_post= async ()=>{
            alert(' triggered')
            try{
                //? need to chnage
                var entityID = "user2-4935";
                var postID = "user2-4935-1617031432521"                
                var filter= {"commentID":"user2-4935-1617037667520"}
                var edit_data={
                    "content":      "edit-comment",
                };
                var entity4 = await userFn.comment_edit(entityID, postID, filter,edit_data);
                setEntity4(entity4)
            }
            catch(err){
                console.log(err)
                console.log('---------------')
            }
        }

        return (
        <div>
            <h1>comment_edit</h1>
            <button onClick= {()=>{change_post()}}>post_entity
            </button>
        </div>
        )
    }
//condition ? true : false
  return (
<div>
    <PostPost></PostPost>
  <Follow_entity></Follow_entity>
  <PostCreate></PostCreate>
  <PostDelete></PostDelete>
  <PostEdit></PostEdit>
  <PostLike></PostLike>

  <CommentCreate></CommentCreate>
  <CommentDelete></CommentDelete>
  <CommentEdit></CommentEdit>
</div>
      )
}
 export default Users;
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
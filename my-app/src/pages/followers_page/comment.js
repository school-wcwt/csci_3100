import React, { useState, useEffect } from "react";
const commentFn = require("../../component/load_backend/commentFunction.js");

const Comment= ()=>{
    const CommentGet =()=>{
        const [entity, setEntity] = useState(null);
        const change_get= async ()=>{
          try{
            var entity= await commentFn.comment_get("");
            setEntity(entity);
          }
          catch(err){
            console.log(err)
            console.log('---------------')
          }
      }
        const remove_get= ()=>{
          setEntity(null)
        }
      return(
        <div>
          <h1>Get entity</h1>
        <button onClick= {()=>{change_get()}}>get_entity
        </button>
        <p>count ={entity!= null ? entity.entityID : ''}</p>
  
        <button onClick= {()=>{remove_get()}}>remove_get
        </button>
        <p>count ={entity!= null ? entity.entityID : ''}</p>
    </div>
      )
    }


    const CommentCreate =()=>{
        const [entity4, setEntity4] = useState(null);
        const change_post= async ()=>{
        try{
            var fil={
                "postID": "user2-4935-1617032582492"
            };
            var add_data = {"content" : "some text"};
            var entity4 = await commentFn.comment_create(fil,add_data);
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
                var entity4 = await commentFn.comment_delete(entityID, postID, commentID);
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
                var entity4 = await commentFn.comment_edit(entityID, postID, filter,edit_data);
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

  return (
<div>
    <CommentGet></CommentGet>
    <CommentCreate></CommentCreate>
    <CommentDelete></CommentDelete>
    <CommentEdit></CommentEdit>
</div>
      )
}
 export default Comment;
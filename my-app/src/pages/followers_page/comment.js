import React, { useState, useEffect } from "react";
const postFn = require("../../component/load_backend/commentFunction.js");

const Comment= ()=>{
    const CommentCreate =()=>{
        const [entity4, setEntity4] = useState(null);
        const change_post= async ()=>{
        try{
            var addFlag= 1 //1 if like, 0 if pull like
            var entityID= "user2-4935"
            var postID= "user2-4935-1617031432521"
            var add_data = {"content" : "some text"};
            var entity4 = await postFn.comment_create(entityID,postID,add_data);
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
                var entity4 = await postFn.comment_delete(entityID, postID, commentID);
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
                var entity4 = await postFn.comment_edit(entityID, postID, filter,edit_data);
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
    <CommentCreate></CommentCreate>
    <CommentDelete></CommentDelete>
    <CommentEdit></CommentEdit>
</div>
      )
}
 export default Comment;
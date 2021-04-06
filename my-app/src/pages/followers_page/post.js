import React, { useState, useEffect } from "react";
const postFn = require("../../component/load_backend/postFunction.js");

const Post= ()=>{
    const PostPost =()=>{
        const [entity4, setEntity4] = useState(null);
        const change_post= async ()=>{
        try{
            var targetFilter = {}
            var entity4 = await postFn.post_post(targetFilter);
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

            var entity4 = await postFn.post_create(targetFilter,edit_data);
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
            var entity4 = await postFn.post_delete(postID)
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
            var entity4 = await postFn.post_edit(filter,edit_data);
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
            var entity4 = await postFn.post_like(addFlag,authorFilter,postFilter);
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
  return (
<div>
    <PostPost></PostPost>
    <PostCreate></PostCreate>
    <PostDelete></PostDelete>
    <PostEdit></PostEdit>
    <PostLike></PostLike>
</div>
      )
}
 export default Post;
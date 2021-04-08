import React, { useState, useEffect, useCallback } from "react";
import { socket, detectChange, trigChange } from "../../component/socket-client/socket-client.js";
const postFn = require("../../component/load_backend/postFunction.js");

const Post = () => {
    const [entity4, setEntity4] = useState(null);
    useEffect(() => {
        detectChange(change_post)
    }, [])


    const change_post = async () => {
        try {
            var targetFilter = {}
            var entity4 = await postFn.post_post(targetFilter);
            setEntity4(entity4)
        }
        catch (err) {
            console.log(err)
            console.log('---------------')
        }
    }


    const post_create = async () => {
        try {
            var authorID = 'usern-1424';
            var targetFilter = { "entityID": "jon-rest-1296" }
            var edit_data = {
                "type": 1,
                "content": "new_content",
                "photo": "pic",
                "hashtag": ["h1213ash1", "ha12311sh2", "ha23123sh3"],
                "rating": 9
            };
            await postFn.post_create(targetFilter, edit_data);
            trigChange()
        }
        catch (err) {
            console.log(err)
            console.log('---------------')
        }
    }

    const PostPost = () => {
        return (
            <div>
                <h1>post_post</h1>
                <button onClick={() => { change_post() }}>post_entity
            </button>
                <p>count ={entity4 != null ? entity4.map(sinEnt => {
                    return (
                        <div>
                            <p>{sinEnt.postID}</p>
                            {/* <p>{JSON.stringify(sinEnt.comment)}</p> */}
                            {sinEnt.comment.commentID}
                            {/* {JSON.stringify(sinEnt)} */}
                        </div>
                    )
                }) : ''}</p>
            </div>
        )
    }

    const PostCreate = () => {
        return (
            <div>
                <h1>post_create</h1>
                <button onClick={event => { post_create(event) }}>CLick me</button>
            </div>
        )
    }

    const PostDelete = () => {
        const change_post = async () => {
            try {
                var postID = "usern-1424-1617874563729"
                await postFn.post_delete(postID)
                trigChange()
            }
            catch (err) {
                console.log(err)
                console.log('---------------')
            }
        }
        return (
            <div>
                <h1>post_delete</h1>
                <button onClick={() => { change_post() }}>post_entity
            </button>
            </div>
        )
    }




    const PostDeleteAll = () => {
        const delete_all_post = async () => {
            try {
                var posts = await postFn.post_post({})
                posts.map(async (post,idx)=>{
                    console.log(post.postID)
                    await postFn.post_delete(post.postID)
                    trigChange()
                })
            }
            catch (err) {
                console.log(err)
                console.log('---------------')
            }
        }
        return (
            <div>
                <h1>post_delete ALL</h1>
                <button onClick={() => { delete_all_post() }}>post_entity
            </button>
            </div>
        )
    }

    const PostEdit = () => {
        const change_post = async () => {
            try {
                var postID = "usern-1424-1617874401609"
                var edit_data = {
                    "content": "final_edit",
                    "rating": 1
                };
                await postFn.post_edit(postID, edit_data);
                trigChange()
            }
            catch (err) {
                console.log(err)
                console.log('---------------')
            }
        }
        return (
            <div>
                <h1>post_edit</h1>
                <button onClick={() => { change_post() }}>post_entity
            </button>
            </div>
        )
    }

    const PostLike = () => {
        const change_post = async () => {
            try {
                var addFlag = 1 //1 if like, 0 if pull like
                var postID = "usern-1424-1617874401609"
                await postFn.post_like(postID, addFlag);
                trigChange()
            }
            catch (err) {
                console.log(err)
                console.log('---------------')
            }
        }

        return (
            <div>
                <h1>post_like</h1>
                <button onClick={() => { change_post() }}>post_entity
            </button>
            </div>
        )
    }
    return (
        <div>
            <PostPost></PostPost>
            <PostCreate></PostCreate>
            <PostDelete></PostDelete>
            <PostDeleteAll></PostDeleteAll>
            <PostEdit></PostEdit>
            <PostLike></PostLike>
        </div>
    )
}
export default Post;
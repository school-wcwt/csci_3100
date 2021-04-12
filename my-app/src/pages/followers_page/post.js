import React, { useState, useEffect, useCallback } from "react";
import { socket, detectChange, trigChange } from "../../component/socket-client/socket-client.js";
import PanelBar from "./panel.js"

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

    const Post_get = () => {
        const [post_get, set_post_get] = useState(null);
        const postID = "usern-7164-1618224928582"
        console.log('---')
        console.log(postID)
        console.log('---')
        const change_get = async () => {
            try {
                var post_get = await postFn.post_get(postID);
                set_post_get(post_get);
            }
            catch (err) {
                console.log(err)
                console.log('---------------')
            }
        }
        const remove_get = () => {
            set_post_get(null)
        }
        return (
            <div>
                <h1>Get post</h1>
                <button onClick={() => { change_get() }}>post_get
          </button>
                <p>searching postID: {postID}</p>
                <p>post ={post_get != null ? post_get.postID : ''}</p>

                <button onClick={() => { remove_get() }}>remove_get
          </button>
                <p>count ={post_get != null ? post_get.postID : ''}</p>
            </div>
        )
    }




    const post_create = async () => {
        try {
            var authorID = 'usern-1424';
            var targetFilter = { "entityID": "jon-rest-1296" }
            var edit_data = {
                "type": 0,
                "username": "",
                "content": "zdc",
                "photo": [
                    "https://firebasestorage.googleapis.com/v0/b/csci3100-2bab5.appspot.com/o/0.744031560873416%2F0.7440315608734161.jpg?alt=media&token=a37486e7-f786-46f6-a70d-defe82fe6506",
                    "https://firebasestorage.googleapis.com/v0/b/csci3100-2bab5.appspot.com/o/0.20557764609980622%2F0.205577646099806222.jpg?alt=media&token=24ff4f43-31cc-48d7-8d46-e9f91611373e",
                    "https://firebasestorage.googleapis.com/v0/b/csci3100-2bab5.appspot.com/o/0.5778665660021995%2F0.57786656600219953.jpg?alt=media&token=99547f5a-9995-4266-874a-65eab9a3e0cd"
                ],
                "hashtag": [
                    "szdc",
                    "zsdc",
                    "zsd",
                    "asd",
                    "qwe",
                    "szdc",
                    "zsdc",
                    "zsd",
                    "asd",
                    "qwe"
                ]
            }
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
                posts.map(async (post, idx) => {
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
            <PanelBar></PanelBar>
            <Post_get></Post_get>
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
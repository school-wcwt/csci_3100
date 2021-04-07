import React, { useState, useEffect, useCallback } from "react";
const postFn = require("../../component/load_backend/postFunction.js");

const Post = () => {
    const [entity4, setEntity4] = useState(null);
    const [state, set_state] = useState(0)
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
                "content": "c2",
                "photo": "pic",
                "hashtag": ["h1213ash1", "ha12311sh2", "ha23123sh3"],
                "rating": 9
            };
            await postFn.post_create(targetFilter, edit_data);
            set_state(Date())
        }
        catch (err) {
            console.log(err)
            console.log('---------------')
        }
    }


    useEffect(() => {
        change_post()
        console.log('run!!')
    },[state])



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
                <button onClick={() => {post_create() }}>post_entity
            </button>
            </div>
        )
    }

    const PostDelete = () => {
        const change_post = async () => {
            try {
                var postID = "user2-4935-1617032582492"
                await postFn.post_delete(postID)
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

    const PostEdit = () => {
        const change_post = async () => {
            try {
                var filter = { "postID": "user2-4935-1617031432521" }
                var edit_data = {
                    "content": "final_edit",
                    "rating": 1
                };
                await postFn.post_edit(filter, edit_data);
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
                var authorFilter = {
                    "entityID": "user2-4935"
                };
                var postFilter = {
                    "postID": "user2-4935-1617031432521"
                }
                await postFn.post_like(addFlag, authorFilter, postFilter);
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
            <PostEdit></PostEdit>
            <PostLike></PostLike>
        </div>
    )
}
export default Post;
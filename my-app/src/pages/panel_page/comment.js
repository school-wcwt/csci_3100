import React, { useState, useEffect } from "react";
import { socket, trigChange, detectChange } from "../../component/socket-client.js"
import PanelBar from "./panel.js"
const commentFn = require("../../component/load_backend/commentFunction.js");

const Comment = () => {
    const CommentGet = () => {
        const [entity, setEntity] = useState(null);
        const change_get = async () => {
            try {
                var entity = await commentFn.comment_get("usern-1424-1617727654805");
                setEntity(entity);
            }
            catch (err) {
                console.log(err)
                console.log('---------------')
            }
        }
        const remove_get = () => {
            setEntity(null)
        }
        return (
            <div>
                <h1>comment_get</h1>
                <button onClick={() => { change_get() }}>get_entity
        </button>
                <p>count ={entity != null ? entity.commentID : ''}</p>

                <button onClick={() => { remove_get() }}>remove_get
        </button>
                <p>count ={entity != null ? entity.commentID : ''}</p>
            </div>
        )
    }

    const CommentPost = () => {
        const [entity4, setEntity4] = useState(null);
        const change_post = async () => {
            try {
                var fil = {};
                var entity4 = await commentFn.comment_post(fil);
                setEntity4(entity4)
            }
            catch (err) {
                console.log(err)
                console.log('---------------')
            }
        }

        return (
            <div>
                <h1>comment_post</h1>
                <button onClick={() => { change_post() }}>post_entity
            </button>
                <p>count ={entity4 != null ? entity4.map(sinEnt => {
                    return (
                        <div>
                            <h5>{sinEnt.commentID}</h5>
                            <p>{sinEnt.content}</p>
                        </div>

                    )
                })

                    : ''}</p>
            </div>
        )
    }

    const CommentCreate = () => {
        const [entity4, setEntity4] = useState(null);
        const change_post = async () => {
            try {
                var fil = {
                    "postID": "usern-1424-1617815158871"
                };
                var add_data = { "content": "some text2" };
                var entity4 = await commentFn.comment_create(fil, add_data);
                setEntity4(entity4)
                trigChange()
            }
            catch (err) {
                console.log(err)
                console.log('---------------')
            }
        }

        return (
            <div>
                <h1>comment_create</h1>
                <button onClick={() => { change_post() }}>post_entity
            </button>
            </div>
        )
    }

    const CommentDelete = () => {
        const [entity4, setEntity4] = useState(null);
        const change_post = async () => {
            alert(' triggered')
            try {
                var commentID = "usern-1424-1617788913646"



                var entity4 = await commentFn.comment_delete(commentID);
                setEntity4(entity4)
            }
            catch (err) {
                console.log(err)
                console.log('---------------')
            }
        }

        return (
            <div>
                <h1>comment_delete</h1>
                <button onClick={() => { change_post() }}>post_entity
            </button>
            </div>
        )
    }

    const CommentEdit = () => {
        const [entity4, setEntity4] = useState(null);
        const change_post = async () => {
            alert(' triggered')
            try {
                //? need to chnage
                var commentID = "usern-1424-1617788913763"
                var edit_data = {
                    "content": "editffff-comment",
                };
                var entity4 = await commentFn.comment_edit(commentID, edit_data);
                setEntity4(entity4)
            }
            catch (err) {
                console.log(err)
                console.log('---------------')
            }
        }

        return (
            <div>
                <h1>comment_edit</h1>
                <button onClick={() => { change_post() }}>post_entity
            </button>
            </div>
        )
    }

    return (
        <div>
            <PanelBar></PanelBar>
            <CommentGet></CommentGet>
            <CommentPost></CommentPost>
            <CommentCreate></CommentCreate>
            <CommentDelete></CommentDelete>
            <CommentEdit></CommentEdit>
        </div>
    )
}
export default Comment;
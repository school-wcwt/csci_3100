import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import NAVbar from "../main/component/nav.js";
import AddPost from "./addPost.js";
const createPost = () => {
    return (

            <div className="pt-5">
                <NAVbar />
                <AddPost />
            </div>

    )
}
export default createPost;
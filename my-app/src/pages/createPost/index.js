import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import NAVbar from "../main/component/nav.js";
import AddPost from "./addPost.js";
import {Auth} from '../services/authService';
import { useParams } from 'react-router';
const CreatePost = () => {
    Auth();
    const pageID  = useParams();
    const entitiesID = pageID.EntitiesID;
    console.log("Create post in "+ entitiesID);
    return (

            <div className="pt-5">
                <NAVbar />
                <AddPost entityID = {entitiesID}/>
            </div>

    )
}
export default CreatePost;
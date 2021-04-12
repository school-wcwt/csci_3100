import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import NAVbar from "../main/component/nav.js";
import AddPost from "./addPost.js";
import {Auth} from '../services/authService';
import { useParams } from 'react-router';
import { CssBaseline } from '@material-ui/core';

const CreatePost = () => {
    Auth();
    const pageID  = useParams();
    const entitiesID = pageID.EntityID;
    console.log("Create post in "+ entitiesID);
    return (

            <>
                <CssBaseline />
                <NAVbar />
                <AddPost entityID = {entitiesID}/>
            </>

    )
}
export default CreatePost;
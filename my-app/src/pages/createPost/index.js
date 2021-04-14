import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import NAVbar from "../main/component/nav.js";
import AddPost from "./addPost.js";
import {Auth} from '../services/authService';
import { useParams } from 'react-router';
import { CssBaseline } from '@material-ui/core';
import global from '../../component/global'
import Loading from '../../component/loading'

const CreatePost = () => {
    Auth();
    const pageID  = useParams();
    const entitiesID = pageID.EntityID;
    if (global.loginedUser.user == null) return <Loading/>
    return (
        <>
            <CssBaseline />
            <NAVbar />
            <AddPost/>
        </>
    )
}
export default CreatePost;
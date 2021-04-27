import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddPost from "./addPost.js";
import { Auth } from 'component/authService'
import { useParams } from 'react-router';
import { CssBaseline } from '@material-ui/core';
import { Loading, NavBar, global } from 'component'

const CreatePost = () => {
    Auth();
    const pageID  = useParams();
    const entitiesID = pageID.EntityID;
    if (global.loginedUser.user == null) return <Loading/>
    return (
        <>
            <CssBaseline />
            <NavBar />
            <AddPost/>
        </>
    )
}
export default CreatePost;
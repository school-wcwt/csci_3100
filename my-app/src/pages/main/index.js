import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from "./component/nav";
import Posts from "../../component/post/posts.js";
import { Auth } from '../services/authService';
import { CssBaseline, Typography } from '@material-ui/core';
import global from '../../component/global'
import Loading from '../../component/loading'

const Main = (props) => {
    var postFilter= {}
    if (global.loginedUser.user == null) return <Loading />
    else return (
        <>
            <CssBaseline />
            <NavBar />
            <Posts filter={postFilter}/> 
        </>
    )
}
export default Main;
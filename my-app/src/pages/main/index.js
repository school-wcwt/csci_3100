import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from "./component/nav";
import Posts from "../../component/post/posts.js";
import { Auth } from '../services/authService';
import { CssBaseline, Typography } from '@material-ui/core';
import global from '../../component/global'

const Main = (props) => {
    var postFilter= {}
    return (
        // Please don't delete <div/> before replacing the <Navbar/>. HONG 09Apr23:12 - Duly noted.
        <>
            <CssBaseline />
            <NavBar />
            <Posts filter={postFilter}/> 
        </>
        
    )
}
export default Main;
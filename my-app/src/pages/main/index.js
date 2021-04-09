import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from "./component/nav";
import { Post } from "../../component/post/post.js";
import { Auth } from '../services/authService';
import { CssBaseline } from '@material-ui/core';

const Main = () => {
    Auth();
    var fil= {} 
    return (
        // Please don't delete <div/> before replacing the <Navbar/>. HONG 09Apr23:12 - Duly noted.
        <>
            <CssBaseline />
            <NavBar />
            <Post filter={fil}/>
        </>
        
    )
}
export default Main;
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
<<<<<<< HEAD
import NAVbar from "./component/nav.js";
import state from "../userState";
import  {Auth} from '../services/authService';
import { Typography, Box, CssBaseline } from '@material-ui/core';

=======
import NavBar from "./component/nav";
import { Post } from "../../component/post/post.js";
import { Auth } from '../services/authService';
import { CssBaseline } from '@material-ui/core';
>>>>>>> 7c3144f4dd611147b144c9289a294adb2b696550

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
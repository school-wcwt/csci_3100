import React from 'react';
import {Post} from "../../component/post/post.js";
import 'bootstrap/dist/css/bootstrap.min.css';
import NAVbar from "./component/nav.js";
import state from "../userState";
import  {Auth} from '../services/authService';
import { CssBaseline } from '@material-ui/core';

const Main = () => {
    Auth();
    var fil= {} 
    return (
        // Please don't delete <div/> before replacing the <Navbar/>
        <>
        <div className="pt-5">
            <NAVbar />
            <Post filter={fil}/>
        </div>
        </>
        
    )
}
export default Main;
import React from 'react';
import {Post} from "../../component/post/post.js";
import 'bootstrap/dist/css/bootstrap.min.css';
import NAVbar from "./component/nav.js";
import state from "../userState";
import  {Auth} from '../services/authService';
import { Typography, Box, CssBaseline } from '@material-ui/core';


const Main = () => {
    Auth();
    var fil= {}
    return (
        <div>
            <div className="pt-5">
                <NAVbar />
                <Post filter={fil}/>
            </div>
        </div>
    )
}
export default Main;
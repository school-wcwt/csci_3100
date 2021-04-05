import React from 'react';
import {Feed} from "../../component/feed/feed.js";
import 'bootstrap/dist/css/bootstrap.min.css';
import NAVbar from "./component/nav.js";
import state from "../userState";
import  {Auth} from '../services/authService';

const Main = () => {
    Auth();
    return (
        <div>
            <div className="pt-5">
                <NAVbar />
                <Feed />
            </div>
        </div>
    )
}
export default Main;
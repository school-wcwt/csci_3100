import React from 'react';
import Feed from "./component/feed/feed.js";
import {Auth} from '../services/authService';
//import PrimarySearchAppBar from './component/appBar/appBar.js';
//import TopHead from './component/topHead/topHead.js';
//import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Button ,Form, FormControl, Container, Row, Col} from 'react-bootstrap';
//import { makeStyles, StepLabel,CardMedia,Card,Grid  } from "@material-ui/core";
//import styles from './mystyle.module.css'; 
//import  {ReactComponent as Logo } from '../../image/logo.png';
//import logo from '../../image/icon2.PNG'; // Tell webpack this JS file uses this image
//import SingleShowList from './component/gridList/gridList';
//import MediaCard from './component/cardMedia/cardMedia';
import 'bootstrap/dist/css/bootstrap.min.css';
import NAVbar from "./component/nav.js";
import state from "../userState";

const Main = () => {
    Auth(); // if not login, redirect it to login page
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
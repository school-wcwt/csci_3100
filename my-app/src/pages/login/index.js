import React from "react";
import piazzaImg from "./image/pizza_bg.jpg";
import imacImg from "./image/imac.png";
import { makeStyles } from "@material-ui/core";
import { Paper } from '@material-ui/core';
import LoginForm from './component/loginForm/loginForm.js';
import RegisterForm from './component/loginForm/registerForm.js';
import LogoImg from './image/logo.png';
import {IsLogin} from '../services/authService';
import {Redirect} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({ 
    bgImg:{
        //backgroundImage: `linear-gradient(rgba(0, 0, 0,0.7),rgba(0, 0, 0,0.7)),url(${piazzaImg})`,
        backgroundImage:　`linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.3)), url(${piazzaImg})`,
        opacity: "1",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        width: "100%",
        height: "100vh",
    },

    paper_style: {
        backgroundColor : "rgb(255, 255, 255,0.85)",
        flex: 1,
        top: "-6%",
        left: "49%",
        width: "49%",
        height: "70vh",
        position: "relative",
        [theme.breakpoints.up("lg")]: {
            top: "-32%",
            left: "62%",
            width: "30%",
            height: "80vh",
        }},

    paper_logo:{
        position: "relative",
        flex: 1,
        width: "27%",
        top: "1%",
        left: "36%",
        opacity: "1",
    },

    imac_style:{
        flex: 1,
        width: "25%",
        position: "relative",
        top: "35%",
        left: "11%",
    },


}));

const Login = ()=>{
    var [panel, setPanel] = React.useState(0);
    const classes = useStyles();
    return (
        <div className = {classes.bgImg}>
            {IsLogin()? <Redirect to={{ pathname: '/' }}/> : null }
            <img src = {imacImg} className = {classes.imac_style}/>
            <Paper className = {classes.paper_style} elevation={3} variant="outlined">
                <img src = {LogoImg} className = {classes.paper_logo} style={{class:"center"}}/>
                {panel == 0 ? <LoginForm setPanel={() => {setPanel(!panel)}} /> : null }
                {panel == 1 ? <RegisterForm setPanel={() => {setPanel(!panel)}} /> : null}
                
            </Paper>
        </div>

    )
}

export default Login;

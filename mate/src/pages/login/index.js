import React from "react";
import piazzaImg from "./image/pizza_bg.jpg";
import imacImg from "./image/imac.png";
import { makeStyles } from "@material-ui/core";
import { Paper } from '@material-ui/core';
import LoginPaper from './component/loginForm/loginPaper.js';


const useStyles = makeStyles((theme) => ({ 
    bgImg:{
        //backgroundImage: `linear-gradient(rgba(0, 0, 0,0.7),rgba(0, 0, 0,0.7)),url(${piazzaImg})`,
        backgroundImage:　`url(${piazzaImg})`,
        opacity: "0.95",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        width: "100%",
        height: "100vh",
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
    const classes = useStyles();
    return (
        <div className = {classes.bgImg}>
            <img src = {imacImg} className = {classes.imac_style}/>
            <LoginPaper/>
        </div>

    )
}

export default Login;

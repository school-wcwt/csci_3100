import React from "react";
import piazzaImg from "./image/pizza_bg.jpg";
import imacImg from "./image/imac.png";
import { makeStyles } from "@material-ui/core";
import { Paper } from '@material-ui/core';
import LoginForm from './component/loginForm/loginForm.js';
import LogoImg from './image/logo.png';


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

    paper_style: {
        backgroundColor : "rgb(255, 255, 255,0.85)",
        flex: 1,
        top: "-8%",
        left: "49%",
        width: "49%",
        height: "64vh",
        position: "relative",
        [theme.breakpoints.up("lg")]: {
            top: "-32%",
            left: "62%",
            width: "30%",
            height: "79vh",
        }},

    paper_logo:{
        flex: 1,
        width: "27%",
        position: "relative",
        top: "5%",
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
    const [panel] = React.useState(0);
    const classes = useStyles();
    const setPanel = () => {
        panel === !panel
    }
    return (
        <div className = {classes.bgImg}>
            <img src = {imacImg} className = {classes.imac_style}/>
            <Paper className = {classes.paper_style} elevation={3} variant="outlined">
                <img src = {LogoImg} className = {classes.paper_logo}/>
                {panel == 0 ? <LoginForm
                setPanel={setPanel} /> : null }
                {panel == 1 ? <RegisterForm /> : null}
            </Paper>
        </div>

    )
}

export default Login;

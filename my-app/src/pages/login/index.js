import React from "react";
import piazzaImg from "./image/pizza_bg.jpg";
import imacImg from "./image/imac.png";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Typography, CssBaseline } from '@material-ui/core';
import {LoginForm,RegisterForm} from './component/loginForm/loginForm.js';
import LogoImg from './image/logo.png';
import {Auth} from '../services/authService';
import {Redirect} from 'react-router-dom';

import logo from '../../image/logo.png'


const useStyles = makeStyles((theme) => ({ 
    background: {
        background: theme.palette.background.default,
    },
    logo: {
        display: 'block',
        margin: '3rem auto auto auto',
        width: '12rem'
    },
    header: {
        ...theme.typography.h3,
        color: theme.palette.primary.main,
        textAlign: 'center',
        padding: '1rem 6rem'
    },
}));

const Login = ()=>{
    var [panel, setPanel] = React.useState(0);
    const styles = useStyles();
    return (
        <div className={styles.background}>
            <CssBaseline/>
            <img src={logo} className = {styles.logo}/>
            <Typography className={styles.header}> 
                Spilling tea with friends has never been easier. 
            </Typography>
            {panel == 0 ? <LoginForm setPanel={() => {setPanel(!panel)}} /> : null }
            {panel == 1 ? <RegisterForm setPanel={() => {setPanel(!panel)}} /> : null}
        </div>
    )
}


export default Login;

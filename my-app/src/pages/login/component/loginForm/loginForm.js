import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { makeStyles, TextField,CircularProgress, Box, Paper  } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import axios from '../../../../axiosConfig';
import {send_validation_email} from '../../../../component/email/email';
import {Nav} from 'react-bootstrap';
import history from "../../../history";

const useStyles = makeStyles((theme) => ({

    flexContainer:{
        width: '20rem',
        margin: 'auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
        padding: theme.spacing(2),
    },
    primaryButton: {
        margin: `1rem auto`,
        background: theme.palette.primary.main,
        fontFamily: 'Poppins',
        fontSize: '1rem',
        letterSpacing: '2px',
        color: theme.palette.grey[200],
    },
    secondaryButton: {
        background: theme.palette.grey[400],
        fontFamily: 'Poppins',
        fontSize: '1rem',
        letterSpacing: '2px',
        color: theme.palette.grey[200],
    },
    buttonProgress: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        margin: '-12px'
    },
    buttonWrapper: {
        width: '100%',
        position: 'relative',
    }
    
}));

const Login_DataBase = (data)=>{
    console.log("Process on Login in");
    axios(
        {
        method: 'POST',
        url: '/login',
        data: {
            filter: {email: data.Email},
            password: data.Password 
        }
    })
    .then(res => {
        document.cookie = "state=" + res.data.entityID;
        console.log("my token in login is " + document.cookie);
        alert("Login sucess");
        history.push('/main');
    })
    .catch(err => {
        console.log(err);
    })
};

const InvalidData = (data)=>{
    var valid_letter_name = /^[0-9a-zA-Z_-]+$/;
    var valid_letter_pw = /^[0-9a-zA-Z]+$/;
    var pw_min_length = 5;
    if (data.Password !== data.PasswordCheck) { 
        alert("Password not match, please check again"); return true;}
    else if (data.Password.length < pw_min_length){
        alert(`Please make sure password length at least ${pw_min_length} letters`); 
        return true;}
    else if (!valid_letter_pw.test(data.Password)){
        alert(`Please make sure password letter contains 0-9,a-z,A-Z only`); return true;}
    else if (!valid_letter_name.test(data.UserName)){
        alert(`Please make sure User Name letter contains 0-9,a-z,A-Z only`); return true;}
    return false;
        
};

const LoginForm = (props) => {
    document.cookie = "state=empty"
    const { register, handleSubmit } = useForm();
    const [loading, setLoading] = React.useState(false);
    const classes = useStyles();
    const timer = React.useRef();
    React.useEffect(() => {
        return () => {
          clearTimeout(timer.current);
        };
      }, []);

    const onSubmit = data => {
        setLoading(true);
        if (Login_DataBase(data)==false)    setLoading(false);;
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={classes.flexContainer}>
            <TextField fullWidth margin='dense' inputRef={register}
                required id="Email" label = "Email" name = "Email" type="email" />
            <TextField fullWidth margin='dense' inputRef={register}
                required id="Password" label = "Password" name = "Password" type="password" />
            <div className={classes.buttonWrapper}>
                <Button fullWidth variant="contained" className={classes.primaryButton} disabled={loading} type="submit" >Login</Button>
                {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
            </div>
            <Button fullWidth variant="contained" className={classes.secondaryButton} onClick={props.setPanel}>
                Register
            </Button>
        </form>
    );
};



const RegisterForm = (props) => {
    const { register, handleSubmit } = useForm();
    const [loading, setLoading] = React.useState(false);
    const classes = useStyles();
    
    
    const onSubmit = data => {
        if (InvalidData(data)) return 0;
        setLoading(true);
        const emaildata = {
            to_name: data.UserName,
            user_email: data.Email,
            message: "Still in Testing"
        };
        axios(
            {method: 'POST',
            url: '/register',
            data: {
                type: "User",
                username: data.UserName,
                email: data.Email,
                password: data.Password
            }}
        )
        .then(res => {
            alert("Register sucess");
            send_validation_email(emaildata);
            alert("Email sent to " + data.Email);
            Login_DataBase(data);
            

        })
        .catch(err => {
            console.log(err.message);
        })
    };
    // data return name of [UserName,Email,Password,PasswordCheck]
    return (
        <form onSubmit={handleSubmit(onSubmit)} className={classes.flexContainer}>
            <TextField fullWidth margin='dense' inputRef={register} required id="UserName" label = "User name" name = "UserName" type="username" />
            <TextField fullWidth margin='dense' inputRef={register} required id="Email" label = "Email" name = "Email" type="email" />
            <TextField fullWidth margin='dense' inputRef={register} required id="Password" label = "Password" name = "Password" type="password" />
            <TextField fullWidth margin='dense' inputRef={register} required id="PasswordCheck" label = "Confirm password" name = "PasswordCheck" type="password" /> 
            <div className={classes.buttonWrapper}>
                <Button fullWidth variant="contained" className={classes.primaryButton} type="submit" onClick={handleSubmit(onSubmit)}>Let me in!</Button>
                {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
            </div>
            <Button fullWidth variant="contained" className={classes.secondaryButton} onClick={props.setPanel}>Cancel</Button>
        </form>
    );
};



export {LoginForm,RegisterForm};
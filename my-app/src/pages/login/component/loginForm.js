import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { TextField, CircularProgress, Box, Paper  } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import axios from '../../../axiosConfig';
import {send_validation_email} from '../../../component/email/email';
import {Nav} from 'react-bootstrap';
import history from "../../history";

import useStyles from '../styles/formStyle'

const Login_DataBase = (data)=>{
    console.log("Process on Login in");
    var body = {
        filter: {email: data.email},
        password: data.password 
    }
    axios.post('/login', body)
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



const LoginForm = (props) => {
    const [loading, setLoading] = React.useState(false);
    const { register, handleSubmit } = useForm();
    const styles = useStyles();
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
        <form onSubmit={handleSubmit(onSubmit)} className={styles.flexContainer}>
            <TextField fullWidth margin='dense' inputRef={register}
                required id="email" label = "Email" name = "email" type="email" />
            <TextField fullWidth margin='dense' inputRef={register}
                required id="password" label = "Password" name = "password" type="password" />
            <div className={styles.buttonWrapper}>
                <Button fullWidth variant="contained" className={styles.primaryButton} disabled={loading} type="submit" >Login</Button>
                {loading && <CircularProgress size={24} className={styles.buttonProgress} />}
            </div>
            <Button fullWidth variant="contained" className={styles.secondaryButton} onClick={props.setPanel}>
                Register
            </Button>
        </form>
    );
};

const InvalidData = (data)=>{
    var valid_letter_name = /^[0-9a-zA-Z_-]+$/;
    //var valid_letter_pw = /^[0-9a-zA-Z]+$/;
    var pw_min_length = 6;
    if (data.password !== data.passwordCheck) { 
        alert("Password not match, please check again"); 
        return true;
    } else if (data.password.length < pw_min_length){
        alert(`Please make sure password length at least ${pw_min_length} letters`); 
        return true;
    } else if (!valid_letter_name.test(data.username)){
        alert(`Please make sure User Name letter contains 0-9,a-z,A-Z only`); 
        return true;
    } else { return false };
};

const RegisterForm = (props) => {
    const { register, handleSubmit } = useForm();
    const [loading, setLoading] = React.useState(false);
    const styles = useStyles();
    
    
    const onSubmit = data => {
        if (InvalidData(data)) return 0;
        setLoading(true);
        const body = {
            type: "User",
            username: data.username,
            email: data.email,
            password: data.password
        };
        const emaildata = {
            to_name: data.username,
            user_email: data.email,
            message: "Still in Testing"
        };
        axios.post('/register', body)
        .then(res => {
            alert("Register sucess");
            send_validation_email(emaildata);
            alert("Email sent to " + data.email);
            Login_DataBase(data);
            

        })
        .catch(err => {
            console.log(err.message);
        })
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.flexContainer}>
            <TextField fullWidth margin='dense' inputRef={register} required 
                id="username" label="Username" name="username" type="username"
                helperText="Letters, numbers, '-', and '_' only." />
            <TextField fullWidth margin='dense' inputRef={register} required 
                id="email" label="Email" name="email" type="email" 
                helperText="Email will be used for verification."/>
            <TextField fullWidth margin='dense' inputRef={register} required 
                id="password" label="Password" name="password" type="password" 
                helperText="At least 6 characters."/>
            <TextField fullWidth margin='dense' inputRef={register} required 
                id="passwordCheck" label="Confirm Password" name="passwordCheck" type="password" 
                helperText="Please type your password again."/> 
            <div className={styles.buttonWrapper}>
                <Button fullWidth variant="contained" className={styles.primaryButton} type="submit" onClick={handleSubmit(onSubmit)}>Let me in!</Button>
                {loading && <CircularProgress size={24} className={styles.buttonProgress} />}
            </div>
            <Button fullWidth variant="contained" className={styles.secondaryButton} onClick={props.setPanel}>Cancel</Button>
        </form>
    );
};



export {LoginForm,RegisterForm};
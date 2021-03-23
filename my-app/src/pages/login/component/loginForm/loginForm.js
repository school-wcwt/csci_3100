import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { makeStyles, TextField,CircularProgress  } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import axios from '../../../../axiosConfig';
import {ChangeUserState,IsLogin,Set_userobj} from '../../../services/authService';
import { BrowserRouter as Router, Switch, Redirect,Route, Link } from 'react-router-dom';
import {send_validation_email} from '../../../../component/email/email';
import {Navbar,Form,FormControl,Nav} from 'react-bootstrap';

import history from "../../../history";

const useStyles = makeStyles((theme) => ({
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: "95%",
    },
    main_buttom_style: {
        margin: theme.spacing(1),
        height: "8vh",
        width: theme.spacing(55),
        [theme.breakpoints.up("lg")]: {
            width: theme.spacing(68),
        }
    },
    buttom_style: {
        margin: theme.spacing(1),
        width: theme.spacing(55),
        [theme.breakpoints.up("lg")]: {
            width: theme.spacing(68),
        }
    },

    extendedIcon: {
        marginRight: theme.spacing(1),
        color: "rgb(47, 79, 79)",
    },
    welcome_message:{
        color: "LightCoral", 
        fontWeight:800,
        margin: "0 auto",
        padding: "2%",
        paddingLeft:"5%",

    },
    buttonProgress:  {
        margin: theme.spacing(1),
        position: "relative",
        width: theme.spacing(1),
        [theme.breakpoints.up("lg")]: {
            width: theme.spacing(1),
        }
    },
    
}));

// you can use React.forwardRef to pass the ref too
const Select = React.forwardRef(({ label }, ref) => (
    <>
        <label>{label}</label>
        <select name={label} ref={ref}>
            <option value="20">20</option>
            <option value="30">30</option>
        </select>
    </>
));

const LoginForm = (props) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState();
    
    const { register, handleSubmit } = useForm();
    const [loading, setLoading] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    const [redirect, setRedirect] = React.useState(0);
    const classes = useStyles();
    const timer = React.useRef();
    React.useEffect(() => {
        return () => {
          clearTimeout(timer.current);
        };
      }, []);

    const onSubmit = data => {
            setLoading(true);
            axios(
                {
                method: 'POST',
                url: 'auth',
                data: {
                    filter: {email: data.Email},
                    password: data.Password 
                }
            })
            .then(res => {
                alert("Login sucess");
            })
            .catch(err => {
                console.log(err);
                console.log("Error state");
                ChangeUserState("user");
                history.push('/login')
                setRedirect(1);
            })
        
    };

    //<label for="go_login">
     // data return name of [Email,Password]
    return (
        <>
        <form onSubmit={handleSubmit(onSubmit)}>
        <div  style = {{textAlign: "center"}}>
            <Nav className={classes.welcome_message} >Welcome Back to mATE! We Hope All of You Can Enjoy the Food</Nav>
            <TextField className={classes.textField} margin="normal" variant="outlined" inputRef={register}
            id="Email" label = "Email" name = "Email" type="email" />
            <TextField className={classes.textField} margin="normal" variant="outlined" inputRef={register}
            id="Password" label = "Password" name = "Password" type="password" />
            
                <Button variant="contained" type="submit" size="large" color="secondary" onClick={onSubmit} className={classes.main_buttom_style} component="span">
                    Login
                </Button>
                {loading && <CircularProgress size={24} className={classes.buttonProgress} />} 
            
                <Button variant="contained" size="large" color="primary" className={classes.buttom_style} onClick = {props.setPanel} isLoading  = "true" component="span">
                    Register
                </Button>
                </div> 
        </form>
        {redirect ? <Redirect to="/main"/> : null};
        </>
    );
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


const RegisterForm = (props) => {
    const { register, handleSubmit } = useForm();
    const [loading, setLoading] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    const [redirect, setRedirect] = React.useState(0);
    const classes = useStyles();
    const timer = React.useRef();
    
    
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
            url: 'new',
            data: {
                type: 0,
                username: data.UserName,
                email: data.Email,
                password: data.Password
            }}
        )
        .then(res => {
            alert("Register sucess");
            send_validation_email(emaildata);
            alert("Email sent to " + data.Email);
            history.push('/login')
            setRedirect(1);

        })
        .catch(err => {
            console.log(err.message);
        })
    };
    // data return name of [UserName,Email,Password,PasswordCheck]
    return (
        <>
        <form onSubmit={handleSubmit(onSubmit)}>
        <div  style = {{textAlign: "center"}}>
            <TextField className={classes.textField} margin="normal" variant="outlined" inputRef={register} required = "true" id="UserName" label = "UserName" name = "UserName" type="username" />
            <TextField className={classes.textField} margin="normal" variant="outlined" inputRef={register} required = "true" id="Email" label = "Email" name = "Email" type="email" />
            <TextField className={classes.textField} margin="normal" variant="outlined" inputRef={register} required = "true" id="Password" label = "Password" name = "Password" type="password" />
            <TextField className={classes.textField} margin="normal" variant="outlined" inputRef={register} required = "true" id="PasswordCheck" label = "Please Comfirm Your Password Again" name = "PasswordCheck" type="password" />        
                <Button variant="contained" type="submit" size="large" color="primary" onClick = {handleSubmit(onSubmit)} className={classes.main_buttom_style} 
                component="span" >Join Us Now</Button>
                {loading && <CircularProgress size={24} className={classes.buttonProgress} />} 
                <Button variant="contained" size="large" color="secondary" className={classes.buttom_style}
                component="span" onClick = {props.setPanel} >Cancel</Button>
        </div>
        </form>
        </>
    );
};



export {LoginForm,RegisterForm};
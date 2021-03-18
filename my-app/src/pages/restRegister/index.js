import React from "react";
import { useForm } from "react-hook-form";
import { makeStyles,TextField } from "@material-ui/core";
import { Paper } from '@material-ui/core';
import bg_img from './img/8.jpg';
import {Nav} from 'react-bootstrap';
import Button from '@material-ui/core/Button';
import axios from '../../axiosConfig';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';



const useStyles = makeStyles((theme) => ({ 
    bgImg:{
        //backgroundImage: `linear-gradient(rgba(0, 0, 0,0.7),rgba(0, 0, 0,0.7)),url(${piazzaImg})`,
        backgroundImage:　`linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.3)), url(${bg_img})`,
        opacity: "1",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        width: "100%",
        height: "100vh",
    },

    paper_style: {
        position: "relative",
        top:"12%",
        left:"26%",
        width:"45%",
        backgroundColor : "rgb(255, 255, 255,0.85)",
        },

    paper_div:{
        opacity: "1",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        width: "100%",
        height: "100vh", 
    },

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
        height: "8vh",
        width: theme.spacing(20),
        [theme.breakpoints.up("lg")]: {
            width: theme.spacing(30),
        }
    },
    welcome_message:{
        color: "LightCoral", 
        fontWeight:800,
        margin: "0 auto",
        padding: "2%",
        paddingLeft:"5%",

    },
    upload_button:{
        '& > *': {
            margin: theme.spacing(1),
          },
        },
    input: {
        display: 'none',
    },
}));

const TextBox = ({label,dataName,type,register}) => {
    if (!type)  type = "text";
    const classes = useStyles();
    return (
        <TextField className={classes.textField} margin="normal" variant="outlined" inputRef={register}
        id={dataName} label = {label} name = {dataName} type={type} />
    );
}

const RestForm = (props) => {
    const { register, handleSubmit } = useForm();
    const classes = useStyles();
    const onSubmit = data => {
        axios(
            {
            // not correct here
            method: 'POST',
            url: '/user/auth',
            data: {
                filter: {email: data.Email},
                password: data.Password 
            }
        })
        .then(res => {
            alert("Rest register sucess");
        })
        .catch(err => {
            console.log(err);
            console.log("Rest register sucess");
        })
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
        <Nav className={classes.welcome_message} >Welcome to Create a new Restaurant. Please Fill in the Following Information</Nav>
        <TextBox label = "Restaurant Name" dataName ="restName" register = {register}/>
        <TextBox label = "Contact Number" dataName ="phone" register = {register}/>
        <TextBox label = "address" dataName ="address" register = {register}/>
        <TextBox label = "Your First Rating for this Restaurant (0 To 5)" dataName ="likes" type = "number" register = {register}/>
        
        <input id="go_login" type="submit" style = {{display:"none"}}/>
        <label for="go_login">
            <Button variant="contained" size="large" color="secondary" className={classes.main_buttom_style} component="span">
                Recommand This 
            </Button>
        </label>   
        <label for = "go_register">
            <Button variant="contained" size="large" color="primary" className={classes.buttom_style} onClick = {props.setPanel} component="span">
                Cancel
            </Button>
        </label>
    </form>
    )

}
const RestRegister = ()=>{
    const classes = useStyles();
    
    return (        
        <div className = {classes.bgImg}>
            <div className = {classes.paper_div}>
            <Paper className = {classes.paper_style} elevation={3} variant="outlined">
            <RestForm/>
            </Paper>
            </div>
        </div>

    )
}


export default RestRegister;

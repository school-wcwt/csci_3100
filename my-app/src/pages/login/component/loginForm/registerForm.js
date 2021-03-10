import React from "react";
import axios from 'axios';
import ReactDOM from "react-dom";
import { useForm } from "react-hook-form";
import { makeStyles, TextField } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import {Mongo_baseURL} from '../../../../config';
import {UserValidation} from '../../../../component/email/email';
//import cors from ;

const db_host = Math.floor(Math.random() * 100) + 1;
axios.defaults.withCredentials = true


const useStyles = makeStyles((theme) => ({
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: "95%",
    },
    main_buttom_style: {
        margin: theme.spacing(1),
        width: "95%",
        height: "8vh",
    },
    buttom_style: {
        margin: theme.spacing(1),
        width: "95%",
    },

    extendedIcon: {
        marginRight: theme.spacing(1),
        color: "rgb(47, 79, 79)",
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

const InvalidData = (data)=>{
    var valid_letter = /^[0-9a-zA-Z]+$/;
    var pw_min_length = 5;
    if (data.Password !== data.PasswordCheck) { 
        alert("Password not match, please check again"); return true;}
    else if (data.Password.length < pw_min_length){
        alert(`Please make sure password length at least ${pw_min_length} letters`); 
        return true;}
    else if (!valid_letter.test(data.Password)){
        alert(`Please make sure password letter contains 0-9,a-z,A-Z only`); return true;}
    else if (!valid_letter.test(data.UserName)){
        alert(`Please make sure User Name letter contains 0-9,a-z,A-Z only`); return true;}
    return false;
        
}

const RegisterForm = (props) => {
    
    const { register, handleSubmit } = useForm();
    const classes = useStyles();
    const onSubmit = data => {
        if (InvalidData(data)) return 0;

        axios({
            method: 'POST',
            baseURL: `${Mongo_baseURL}`,
            url: 'entity/NEW',
            withCredentials: false,
            data: {
                type: 0,
                username: data.UserName,
                email: data.Email,
                password: data.Password
            }
        })
        .then(res => {
            <UserValidation UserName={data.UserName} UserEmail = {data.Email} PassCode = "125"/>
        })
        .catch(err => {
            console.log(err.message);
        })
    };
    // data return name of [UserName,Email,Password,PasswordCheck]
    return (
        <>
        <form onSubmit={handleSubmit(onSubmit)}>
            <TextField className={classes.textField} margin="normal" variant="outlined" inputRef={register} required = "true" id="UserName" label = "UserName" name = "UserName" type="username" />
            <TextField className={classes.textField} margin="normal" variant="outlined" inputRef={register} required = "true" id="Email" label = "Email" name = "Email" type="email" />
            <TextField className={classes.textField} margin="normal" variant="outlined" inputRef={register} required = "true" id="Password" label = "Password" name = "Password" type="password" />
            <TextField className={classes.textField} margin="normal" variant="outlined" inputRef={register} required = "true" id="PasswordCheck" label = "Please Comfirm Your Password Again" name = "PasswordCheck" type="password" />
            <input id="go_register" type="submit" style = {{display:"none"}}/>           
            <label for = "go_register">
                <Button variant="contained" size="large" color="primary" className={classes.main_buttom_style} 
                component="span" >Join Us Now</Button>
                <Button variant="contained" size="large" color="secondary" className={classes.buttom_style}
                component="span" onClick = {props.setPanel} >Cancel</Button>
            </label>
        </form>
        </>
    );
};


export default RegisterForm;
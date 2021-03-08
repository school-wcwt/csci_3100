import React from "react";
import axios from 'axios';
import ReactDOM from "react-dom";
import { useForm } from "react-hook-form";
import { makeStyles, TextField } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
//import cors from ;

const db_host = Math.floor(Math.random() * 100) + 1;

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

const RegisterForm = (props) => {
    
    const { register, handleSubmit } = useForm();
    const classes = useStyles();
    const onSubmit = data => {
        if (data.Password !== data.PasswordCheck) {
            alert("Password not match, please check again");
            return 0;
        }
        axios({
            method: 'POST',
            baseURL: 'http://localhost:3100/',
            url: 'entity/new',
            data: {
                type: 0,
                username: data.UserName,
                email: data.Email,
                password: data.Password
            }
        })
        .then(res => {
            console.log(res);
        })
        .catch(err => {
            console.log(err);
        })
    };
    // data return name of [UserName,Email,Password,PasswordCheck]
    return (
        <>
        <form onSubmit={handleSubmit(onSubmit)}>
            <TextField className={classes.textField} margin="normal" variant="outlined" inputRef={register}
            id="UserName" label = "UserName" name = "UserName" type="username" />
            <TextField className={classes.textField} margin="normal" variant="outlined" inputRef={register}
            id="Email" label = "Email" name = "Email" type="email" />
            <TextField className={classes.textField} margin="normal" variant="outlined" inputRef={register}
            id="Password" label = "Password" name = "Password" type="password" />
            <TextField className={classes.textField} margin="normal" variant="outlined" inputRef={register}
            id="PasswordCheck" label = "Please Comfirm Your Password Again" name = "PasswordCheck" type="password" />
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
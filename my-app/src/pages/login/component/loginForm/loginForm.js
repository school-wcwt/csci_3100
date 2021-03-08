import React from "react";
import axios from 'axios';
import ReactDOM from "react-dom";
import { useForm } from "react-hook-form";
import { makeStyles, TextField } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import {Mongo_port} from '../../../../config';
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

const LoginForm = (props) => {
    const { register, handleSubmit } = useForm();
    const classes = useStyles();
    const onSubmit = data => {
        axios({
            method: 'POST',
            baseURL: `http://localhost:${Mongo_port}/`,
            url: '/user/auth',
            data: {
                filter: { entityID: data.entityID },
                password: data.password
            }
        })
        .then(res => {
            console.log(res);
            Window.alert("Register success")
        })
        .catch(err => {
            console.log(err);
        })
    };
     // data return name of [Email,Password]
    return (
        <>
        <form onSubmit={handleSubmit(onSubmit)}>
            
            <TextField className={classes.textField} margin="normal" variant="outlined" inputRef={register}
            id="Email" label = "Email" name = "Email" type="email" />
            <TextField className={classes.textField} margin="normal" variant="outlined" inputRef={register}
            id="Password" label = "Password" name = "Password" type="password" />
            <input id="login_input" type="submit" style = {{display:"none"}}/>
            <label for="login_input">
                <Button variant="contained" size="large" color="secondary" className={classes.main_buttom_style} component="span">Login</Button>
            </label>            
        </form>
            <label for = "go_register">
                <Button 
                    variant="contained" size="large" color="primary" 
                    className={classes.buttom_style} 
                    onClick = {props.setPanel} 
                    component="span">
                    Register
                </Button>
            </label>
        </>
    );
};


export default LoginForm;
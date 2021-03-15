import React from "react";
import axios from 'axios';
import { useForm } from "react-hook-form";
import { makeStyles, TextField } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import {Mongo_baseURL} from '../../../../config';
import {ChangeUserState,dev_user_ac,dev_user_pw} from '../../../services/authService';


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
        /*
        if (data.Email == dev_user_ac && data.Password==dev_user_pw){
            return ChangeUserState(777);
        }
        */
        axios({
            method: 'PUT',
            baseURL: `${Mongo_baseURL}`,
            url: '/user/auth',
            withCredentials: false,
            data: {
                filter: { email: data.Email },
                password: data.Password
            }
        })
        .then(res => {
            console.log("Login sucess");
            console.log(res);
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
            <input id="go_login" type="submit" style = {{display:"none"}}/>
            <label for="go_login">
                <Button variant="contained" size="large" color="secondary" className={classes.main_buttom_style} component="span">
                    Login
                </Button>
            </label>            
            <label for = "go_register">
                <Button variant="contained" size="large" color="primary" className={classes.buttom_style} onClick = {props.setPanel} component="span">
                    Register
                </Button>
            </label>
        </form>
        </>
    );
};


export default LoginForm;
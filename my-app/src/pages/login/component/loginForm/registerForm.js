import React from "react";
import axios from 'axios';
import ReactDOM from "react-dom";
import { useForm } from "react-hook-form";
import { makeStyles, TextField } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
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

const Input = ({ label, register, required,type }) => {
    const classes = useStyles();
    return (
    <>
        <br/>
        <TextField
          id={label}
          label = {label}
          name = {label}
          type={type}
          className={classes.textField}
          margin="normal"
          variant="outlined"
          inputRef={register({ required })}
        />
        <br/>
    </>
    );
}

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
        console.log(JSON.stringify(data));
        axios({
            method: 'GET',
            baseURL: 'http://localhost:3100/',
            url: 'entity/Nick-7816',
            withCredentials: false,
            data: {
                type: 0,
                username: data.UserName,
                email: data.Email,
                password: data.password,
            }
        })
        .then(res => {
            console.log(res);
        })
        .catch(err => {
            console.log(err);
        })
    };

    return (
        <>
        <form onSubmit={handleSubmit(onSubmit)}>
            
            <Input label='UserName' type='username' register={register} required />
            <Input label='Email' type='email' register={register} required />
            <Input label='Password' type='password' register={register} required/>
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
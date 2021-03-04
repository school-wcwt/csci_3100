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
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: "95%",
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
          id="outlined-search"
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

const LoginForm = () => {
    const { register, handleSubmit } = useForm();
    const classes = useStyles();
    const onSubmit = data => {
        console.log(JSON.stringify(data));
        /*(async () => {
            try {
                var res = await axios({
                    // param
                })
                console.log(res)
            } catch (err) { console.log(err) }
        })()*/
        axios({
            method: 'post',
            baseURL: 'http://localhost:3100/',
            url: '/user/auth',
            data: {
                filter: { entityID: data.entityID },
                password: data.password
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
            <Input label='Email' type='email' register={register} required />
            <Input label='Password' type='password' register={register} required/>
            <input id="login_input" type="submit" style = {{display:"none"}}/>
            <label for="login_input">
                <Button variant="contained" size="large" color="secondary" className={classes.buttom_style} onClick='setPanel' component="span">Login</Button>
            </label>            
        </form>
            <label for = "go_register">
                <Button variant="contained" size="large" color="primary" className={classes.buttom_style} component="span">Register</Button>
            </label>
        </>
    );
};


export default LoginForm;
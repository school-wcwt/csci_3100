import React from "react";
import { Paper } from '@material-ui/core';
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({ 
    paper_style: {
        backgroundColor : "#fffff6",
        opacity: "0.85",
        flex: 1,
        top: "-8%",
        left: "49%",
        width: "49%",
        height: "64vh",
        position: "relative",
        [theme.breakpoints.up("lg")]: {
            top: "-32%",
            left: "52%",
            width: "43%",
            height: "79vh",
        }},
    
}));
const LoginForm = () => {
    const classes = useStyles();
    return (
        <Paper className = {classes.paper_style} elevation={3} variant="outlined">
            <form action="/reservation/create">
            <label>
                <p>author:</p>
                <input type="text" name="author" />
            </label>

            <label>
                <p>target: </p>
                <input type="text" name="target" />
            </label>
            
            <label>
                <p>time:</p>
                <input type="datetime-local" name="datetime"/>
            </label>

            <input type="submit" value="Submit" />
            </form>

        </Paper>
    );
}

export default LoginForm;
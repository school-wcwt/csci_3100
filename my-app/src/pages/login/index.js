import React from "react";
import { Typography, Box, CssBaseline } from '@material-ui/core';

import logo from '../../image/logo.png'
import useStyles from './styles/indexStyle'
import LoginForm from './component/loginForm'
import RegisterForm from './component/registerForm'

const Login = (props) => {
    var [panel, setPanel] = React.useState(0);
    const styles = useStyles(); 
    return (
        <div className={styles.viewPort}>
        <div className={styles.background}>
            <CssBaseline/>
            <Box m={4} pt={4}/>
            <img src={logo} className = {styles.logo}/>
            <Typography className={styles.header}> 
                Spilling tea with friends has never been easier. 🍵
            </Typography>
            {panel == 0 ? <LoginForm setPanel={() => {setPanel(!panel)}} handleLogin={props.handleLogin} /> : null }
            {panel == 1 ? <RegisterForm setPanel={() => {setPanel(!panel)}} /> : null}
            <Box m={4} pt={4}/>
        </div>
        </div>
    )
}

export default Login;

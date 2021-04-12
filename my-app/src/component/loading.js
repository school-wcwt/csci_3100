import React from "react";
import { Typography, Box, CssBaseline } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import logo from '../image/logo.png'


const useStyles = makeStyles((theme) => ({ 
    viewPort: {
        display:'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh'
    },
    logo: {
        display: 'block',
        margin: 'auto',
        width: '12rem'
    },
    header: {
        ...theme.typography.h3,
        color: theme.palette.primary.main,
        textAlign: 'center',
        padding: '1rem 6rem'
    },
}));

const Loading = (props) => {
    const styles = useStyles(); 

    return (
        <div className={styles.viewPort}>
        <div className={styles.background}>
            <CssBaseline/>
            <Box m={4} pt={4}/>
            <img src={logo} className = {styles.logo}/>
            <Typography className={styles.header}> 
                Loading... 
            </Typography>
            <Box m={4} pt={4}/>
        </div>
        </div>
    )
}

export default Loading;

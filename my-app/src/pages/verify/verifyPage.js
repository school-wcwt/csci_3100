import React, { useEffect, useState } from "react";
import { Typography, Box, CssBaseline } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import logo from '../../image/logo.png'
import axios from '../../axiosConfig'
import history from '../history'
import Loading from '../../component/loading'
import { useParams } from 'react-router';


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
    subHeader: {
        ...theme.typography.h5,
        color: theme.palette.grey[700],
        textAlign: 'center',
        padding: '1rem 6rem'
    },
}));

const Verify = (props) => {
    const styles = useStyles(); 
    const [res, setRes] = useState(null);
    const params = useParams();

    useEffect(() => {
        const data = {
            entityID: params.entityID,
            authHash: params.shift().join(''),
        }
        axios.post('/verify', data)
        .then(res => {
            setRes('OK');
            setTimeout(() => {
                history.push('/login')
            }, 3000)
        })
        .catch(res => {
            setRes('Error')
        })
    }, [])

    if (res == null) return <Loading />
    else return (
        <div className={styles.viewPort}>
        <div className={styles.background}>
            <CssBaseline/>
            <Box m={4} pt={4}/>
            <img src={logo} className = {styles.logo}/>
            <Typography className={styles.header}> 
                {res == 'OK' ? 'Success!' : 'Wrong verification link. 😞'}
            </Typography>
            <Typography className={styles.subHeader}>
                {res == 'OK' ? 'Redirecting to login in 3 seconds...' : 'Please check again.'} 
            </Typography>
            <Box m={4} pt={4}/>
        </div>
        </div>
    )
}

export default Verify;

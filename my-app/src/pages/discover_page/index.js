import { useEffect, useState } from 'react';
import RestCard from './component/cardMedia/cardMedia';
import {Auth} from '../services/authService';
import axios from '../../axiosConfig'
import global from '../../component/global'
import Loading from '../../component/loading'
import useWindowDimensions from '../../component/windowDimensions'
import NavBar from '../main/component/nav'
import { CssBaseline, GridList, GridListTile, Typography } from '@material-ui/core';
import { darken, makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        margin: theme.spacing(0, 4),      
    },
    gridList: {
        flexWrap: 'nowrap',
        transform: 'translateZ(0)',
        alignItems: 'center',
        /*'& li:first-child': {
            marginLeft: 'calc(50vh - 150px + 32px)'
        },
        '& li:last-child': {
            marginRight: 'calc(50vh - 150px + 32px)'
        }*/
    },
    title: {
        margin: theme.spacing(4, 4, 2),
    }
}))

const DiscoverPage = (props) => {
    const classes = useStyles()
    const [rests, setRests] = useState(null);
    const fetchRandRest = () => {
        if (global.loginedUser.user == null) return;
        axios.post('/entity/random', {filter: {type: 'Rest', followed: {$ne: global.loginedUser.user._id}}, size: 10})
        .then(res => setRests(res.data))
        .catch(err => console.log(err))
    }

    const { height, width } = useWindowDimensions();
    const columns = (() => {
        return (width-64)/316
    })()

    useEffect(() => {
        fetchRandRest()
    }, [global.loginedUser.user])

    if (global.loginedUser.user == null || rests == null) return <Loading/>
    return (
        <>
        <CssBaseline/>
        <NavBar/>
        <Typography variant='h4' className={classes.title}>Restaurants 🍮</Typography>
        <div className={classes.root}>
            <GridList className={classes.gridList} cols={columns} cellHeight='auto'>
                {rests.map(rest => (
                <GridListTile><RestCard rest={rest} /></GridListTile>
                ))}
            </GridList>
        </div>
        </>
    );
}

export default DiscoverPage;

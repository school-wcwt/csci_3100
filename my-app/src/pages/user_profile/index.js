import React, { useState } from "react";
import axios from "axios";
import Nav from "../main/component/nav";
import 'bootstrap/dist/css/bootstrap.min.css';
import InformCard from './component/cardMedia';
import { useParams } from 'react-router';
import {makeStyles,Grid,Paper} from '@material-ui/core';
import {FavoriteIcon,GroupAddIcon,ChatIcon} from '@material-ui/icons';

var mydataset;

// ! means not null when get data
const useStyles = makeStyles((theme) => ({
    paper_style:{
        display: 'flex',
        flexWrap: 'wrap',
        '& > *': {
        margin: theme.spacing(1),
        width: theme.spacing(64),
        height: theme.spacing(16),
        },
    }, 
}));



function load_my_data(EntitiesID){
    mydataset = {
        UserID: EntitiesID,
        UserName: "Tom Wong", // !
        Email: "1155109240@gmail.com", // !
        Favourite_Rest: 5, // !
        Followers: 1000, // !
        PostNumber: 10, // !
        lastestLoginTime: "24 April 2021", // !
        BigImagePath: "/img/user_image/handsome1.jpg"
    };
    return mydataset;
}

const HeaderPaper = ({title,number,color}) =>{
    return (
        <Paper elevation={3} style = {{backgroundColor: color}}>
        Hello World
        </Paper>
    )
}

const UserHeading  = () => {
    const classes = useStyles();
    return (
        <div className="pt-5">
        <Grid container spacing={1}>
            <Grid item xs={4}>
                <InformCard datainput = {mydataset} />
            </Grid>
            <Grid item xs={3}>
                <div className = {classes.paper_style}>
                <HeaderPaper color = "#CFB011"/>
                <Paper elevation={3} />
                </div>
            </Grid>
            <Grid item xs={3}>
                <div className = {classes.paper_style}>
                <Paper elevation={3} />
                <Paper elevation={3} />
                </div>
            </Grid>
        </Grid>
        </div>
    );
};

const PostArea =()=> {
    return (
        <div className="pt-5">
            <h1>It is my post Area</h1>
        </div>
    )
}
const UserProfilePage = () =>{
    const pageID  = useParams();
    load_my_data(pageID.EntitiesID);
    return(
    <div className="pt-5">
        <Nav/>
        <UserHeading/>
        <PostArea/>
    </div>
    )
}

export default UserProfilePage;
import React, { useState } from "react";
import axios from "axios";
import Navbar from "../main/component/nav";
import 'bootstrap/dist/css/bootstrap.min.css';
import InformCard from './component/cardMedia';
import { useParams } from 'react-router';
import {makeStyles,Grid,Paper} from '@material-ui/core';
import {FavoriteIcon,GroupAddIcon,ChatIcon} from '@material-ui/icons';
import PeopleIcon from '@material-ui/icons/People';
import {Nav} from 'react-bootstrap';
import Button from '@material-ui/core/Button';


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
    Heading_title:{
        color: "white", 
        fontWeight:1000,
        margin: "0 auto",
        textAlign: "center",
        padding: "2%",
        paddingLeft:"5%",

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
        BigImagePath: "/img/user_image/handsome1.jpg" // !
    };
    return mydataset;
}
/*
        <Paper elevation={3} style = {{backgroundColor: color}}>
        <Nav className = {classes.Heading_title}>{title}</Nav>
        </Paper>
*/

const HeaderPaper = ({title,number,color}) =>{
    const classes = useStyles();
    return (
        <Button variant="contained" size="large" style ={{backgroundColor: color}}>
            <Nav className = {classes.Heading_title}>{title}</Nav>
            
        </Button>


    )
}

const UserHeading  = () => {
    const classes = useStyles();
    const title_box = ["Followed Resturant","Likes","Post Number","Favouriate"];

    const color_box = ["#5F9EA0","#DC143C","#9370DB","#FFA500"];
    return (
        <div className="pt-5">
        <Grid container spacing={1}>
            <Grid item xs={4}>
                <InformCard datainput = {mydataset} />
            </Grid>
            <Grid item xs={3}>
                <div className = {classes.paper_style}>
                <HeaderPaper color = {color_box[0]} title = {title_box[0]} number = {3}/>
                <HeaderPaper color = {color_box[1]} title = {title_box[1]}/>
                </div>
            </Grid>
            <Grid item xs={3}>
                <div className = {classes.paper_style}>
                <HeaderPaper color = {color_box[2]} title = {title_box[2]}/>
                <HeaderPaper color = {color_box[3]} title = {title_box[3]}/>
                </div>
            </Grid>
        </Grid>
        </div>
    );
};

const PostArea =()=> {
    return (
        <div className="pt-5">
            <h1>It is my post Area for entities {mydataset.UserID}</h1>
        </div>
    )
}
const UserProfilePage = () =>{
    const pageID  = useParams();
    load_my_data(pageID.EntitiesID);
    return(
    <div className="pt-5" style ={{backgroundColor: "#F5F5DC"}}>
        <Navbar/>
        <UserHeading/>
        <PostArea/>
    </div>
    )
}

export default UserProfilePage;
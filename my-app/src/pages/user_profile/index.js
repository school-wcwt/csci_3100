import React, { useState } from "react";
import axios from "axios";
import Navbar from "../main/component/nav";
import 'bootstrap/dist/css/bootstrap.min.css';
import InformCard from './component/cardMedia';
import { useParams } from 'react-router';
import {makeStyles,Grid,Paper} from '@material-ui/core';
import PeopleIcon from '@material-ui/icons/People';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ForumIcon from '@material-ui/icons/Forum';
import FreeBreakfastIcon from '@material-ui/icons/FreeBreakfast';
import {Nav} from 'react-bootstrap';
import Button from '@material-ui/core/Button';
import {Container} from 'react-bootstrap';
import {Auth} from '../services/authService';
import Feed from '../main/component/feed/feed';



var mydataset;

// ! means not null when get data
const useStyles = makeStyles((theme) => ({
    paper_style:{
        display: 'flex',
        flexWrap: 'wrap',
        '& > *': {
        margin: theme.spacing(1),
        width: theme.spacing(64),
        },
    },
    Heading_Box_style:{
        borderBottomStyle: "solid", 
        borderColor: "LightCoral", 
    },
    Heading_title:{
        color: "white", 
        fontWeight:100,
        margin: "0 auto",
        textAlign: "center",

    }, 
    Number_title:{
        color: "white", 
        fontWeight:1000,
        margin: "0 auto",   
        width:"100%",
        height:"100%",

    }, 
    icon_style:{
        height:"100%",
        width:"20%",
        color: "white",
    },
}));

// google drive: https://drive.google.com/drive/folders/1HDCkRRA1zYwjAEwEMjK1xJTmOrcN59oh?usp=sharing
// BigImagePath: "/img/user_image/handsome1.jpg" // !

function load_my_data(EntitiesID){
    //["Followed Resturant","Likes","Post Number","Follower"];
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

const HeaderPaper = ({title,number,color,icon}) =>{
    const classes = useStyles();
    number = number?number:"Only Follower Can view This Data";
    return (
        <Button variant="contained" size="large" style ={{backgroundColor: color,}}>
            <Paper elevation={0}  style = {{backgroundColor: color}}>
            <Nav className = {classes.Heading_title}>{title}</Nav>
            <br/>
            {icon}
            <br/>
            <div className = {classes.Number_title}>
                <Nav >{number}</Nav>
            </div>
            
            </Paper>
        </Button>


    )
}

const UserHeading  = () => {
    const classes = useStyles();
    const title_box = ["Followed Resturant","Likes","Post Number","Follower"];
    const color_box = ["#5F9EA0","#DC143C","#9370DB","#FFA500"];
    return (
        <div className="pt-5" >
        <Grid container spacing={1}>
            <Grid item xs={4}>
                <InformCard datainput = {mydataset} />
            </Grid>
            <Grid item xs={3} className = {classes.Heading_Box_style}>
                <div className = {classes.paper_style}>
                <HeaderPaper color = {color_box[0]} title = {title_box[0]} number = {32} icon = {<FreeBreakfastIcon className = {classes.icon_style}/>}/>
                <HeaderPaper color = {color_box[1]} title = {title_box[1]} number = {5052} icon = {<FavoriteIcon className = {classes.icon_style}/>}/>
                </div>
            </Grid>
            <Grid item xs={3} className = {classes.Heading_Box_style}>
                <div className = {classes.paper_style}>
                <HeaderPaper color = {color_box[2]} title = {title_box[2]} number = {3} icon = {<ForumIcon className = {classes.icon_style}/>}/>
                <HeaderPaper color = {color_box[3]} title = {title_box[3]} number = {3105} icon = {<PeopleIcon className = {classes.icon_style}/>}/>
                </div>
            </Grid>
        </Grid>
        </div>
        
    );
};

const PostArea =()=> {
    return (
        <div className="pt-5">
            <Grid container spacing={1}>
            <Grid item xs={4}></Grid>
            <Grid item xs={6}>
                <Feed/>
            </Grid>
            </Grid>
            
        </div>
    )
}
const UserProfilePage = () =>{
    console.log("My cookie in user profile " + console.log(document.cookie));
    Auth();
    const pageID  = useParams();
    load_my_data(pageID.EntitiesID);
    return(
    <div className="pt-5" >
        <Navbar/>
        <UserHeading/>
        <PostArea/>
    </div>
    )
}

export default UserProfilePage;
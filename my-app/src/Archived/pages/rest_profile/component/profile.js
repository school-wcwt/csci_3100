import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import InformCard from './cardMedia';
import { useParams } from 'react-router';
import {makeStyles,Grid,Paper} from '@material-ui/core';
import PeopleIcon from '@material-ui/icons/People';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ForumIcon from '@material-ui/icons/Forum';
import FreeBreakfastIcon from '@material-ui/icons/FreeBreakfast';
import {Nav} from 'react-bootstrap';
import Button from '@material-ui/core/Button';
import {Post} from '../../../component/post/post.js';
import { CssBaseline } from '@material-ui/core';
import {Auth} from 'component/authService';
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
const HeaderPaper = ({title,number,color,icon}) =>{
    const classes = useStyles();
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
};

const UserHeading  = ({mydataset}) => {
    const classes = useStyles();
    const title_box = ["Followed Resturant","Likes","Post Number","Follower"];
    const number = [mydataset.Favourite_Rest, mydataset.likes, mydataset.PostNumber, mydataset.Followers]
    console.log("my mumber is "+ number);
    const color_box = ["#5F9EA0","#DC143C","#9370DB","#FFA500"];
    return (
        <div className="pt-5" >
        <Grid container spacing={1}>
            <Grid item xs={4}>
                <InformCard datainput = {mydataset} />
            </Grid>
            <Grid item xs={3} className = {classes.Heading_Box_style}>
                <div className = {classes.paper_style}>
                <HeaderPaper color = {color_box[0]} title = {title_box[0]} number = {number[0]} icon = {<FreeBreakfastIcon className = {classes.icon_style}/>}/>
                <HeaderPaper color = {color_box[1]} title = {title_box[1]} number = {number[1]} icon = {<FavoriteIcon className = {classes.icon_style}/>}/>
                </div>
            </Grid>
            <Grid item xs={3} className = {classes.Heading_Box_style}>
                <div className = {classes.paper_style}>
                <HeaderPaper color = {color_box[2]} title = {title_box[2]} number = {number[2]} icon = {<ForumIcon className = {classes.icon_style}/>}/>
                <HeaderPaper color = {color_box[3]} title = {title_box[3]} number = {number[3]} icon = {<PeopleIcon className = {classes.icon_style}/>}/>
                </div>
            </Grid>
        </Grid>
        </div>
        
    );
};
const PostArea =(mydataset)=> {
    var fil = {}
    return (
        <div className="pt-5">
            <Grid container spacing={1}>
                <Grid item xs={4}>{/*Empty now*/}</Grid>
                
                <Grid item xs={6}>
                    
                    {/* All post here*/}

                </Grid>

            </Grid>
            
        </div>
    )
}
export {
    UserHeading,PostArea
}
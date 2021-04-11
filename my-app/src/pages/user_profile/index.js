import React, { useState, useEffect } from "react";
import axios from '../../axiosConfig';
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
import {Post} from '../../component/post/post.js';
import { CssBaseline } from '@material-ui/core';
import {Auth} from '../services/authService';
import {UserHeading,PostArea} from './component/profile';


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



const UserProfilePage = () =>{
    Auth();
    const pageID  = useParams();
    const entitiesID = pageID.EntitiesID;

    const [myData, setUser] = useState(null);
    const [MyPage, setPage] = useState();
    const Fit_my_data = (data_backend)=>{
        return {
            entitiesID: data_backend.entityID,
            UserName: data_backend.username, // !
            Email: data_backend.email, // !
            Favourite_Rest: data_backend.followingRest.length, // !
            Followers: data_backend.followed.length, // !
            PostNumber: data_backend.post.length, // !
            JoinTime: new Date(data_backend.joinTime).toDateString(), // !
            BigImagePath: "/img/user_image/handsome1.jpg", // !,
            PostID: data_backend.post,
            likes: data_backend.followingUser.length,
            complete: data_backend.entityID?true:false,
        };
    };
    useEffect(() => {
      axios.get(`entity/${entitiesID}`)
      .then(entity => {
        setUser(entity.data);
      })
      .catch(err => {
        console.log(err)
      })
    },[])
    if (myData==null){ return ( <p>'Loading'</p>) }
    var mydataset = Fit_my_data(myData)
    if (!mydataset.complete){ return ( <p>'Loading'</p>) }
    console.log("data is " + mydataset.Followers);
    return(
        <>
        <CssBaseline />
        <Navbar/>
        <UserHeading mydataset = {mydataset}/>
        <PostArea mydataset = {mydataset}/>
        
        </>
        )
    
}

export default UserProfilePage;
import {React, Component,useState, useEffect } from 'react';
import {  Router, Switch, Redirect,Route, Link } from 'react-router-dom';
import Main from './main/';
import Login from './login/';
import Reservation from './reservation/';
import ErrorPage from './errorPage/';
import TestPage from './test_page/';
import RestRegister from './restRegister/';
import Entity from './followers_page/entity.js';
import Post from './followers_page/post.js'
import Comment from './followers_page/comment.js'
import Hashtag from './followers_page/hashtag.js'
import Sock from './followers_page/socket-test.js'
import Search from './followers_page/search.js'
import PanelBar from './followers_page/panel.js'
import DiscoverPage from './discover_page/';
import UserProfilePage from './user_profile/';
import RestProfilePage from './rest_profile/';
import CreatePost from './createPost/';
import '../component/css/background.css';
import {GetMyUser, useLoginUser} from './services/authService';
import axios from '../axiosConfig'
// it is backend path for template I found
// input box : https://v3.material-ui.com/demos/text-fields/

// -1 not login in ,0 user, 1 rest
// For Testing purpose, if you want to go specific page without permission, go ./services/authService and set userState to admin
// {IsLogin()? null:<Redirect to={{ pathname: '/login' }} />}

import history from "./history";
import global from '../component/global';
import { Typography } from '@material-ui/core';
//RestProfilePage
const Routing = (props) => {
  const [user, setUser] = useState({})

  const handleLogin = (loggedInUser) => {
    setUser(loggedInUser);
  }

  global.loginedUser = useLoginUser();

  return (
    <Router history={history}>
      <div>
        <Switch>
            <Route exact path='/' component={Main} />
            <Route exact path='/main' render={(props) => <Main/>} />
            <Route path='/login' render={(props) => <Login handleLogin={handleLogin}/>} />
            <Route path='/reservation' component={Reservation}/>
            <Route path='/test_page' component={TestPage}/>
            <Route path='/restRegister' component={RestRegister}/>
            <Route path='/entity' component={Entity}/>
            <Route path='/post' render={(props) => <Post user={user}/>} />
            <Route path='/comment' component={Comment}/>
            <Route path='/sock' component={Sock}/>
            <Route path='/search' component={Search}/>
            <Route path='/panel' component={PanelBar}/>
            <Route path='/discover' component={DiscoverPage}/>
            <Route path='/userprofile/:EntitiesID' > <UserProfilePage/> </Route>
            <Route path='/restprofile/:EntitiesID' > <RestProfilePage/> </Route>
            <Route path='/createPost/:EntitiesID' > <CreatePost/> </Route>
            <Route component={ErrorPage} />
        </Switch>
      </div>
    </Router>
  );
}
  
  export default Routing;
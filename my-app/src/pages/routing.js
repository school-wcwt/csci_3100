import {React, Component,useState, useEffect } from 'react';
import {  Router, Switch, Redirect,Route, Link } from 'react-router-dom';
import Main from './main/';
import Login from './login/';
import Reservation from './reservation/';
import ErrorPage from './errorPage/';
import TestPage from './test_page/';
import RestRegister from './restRegister/';
import Entity from './panel_page/entity.js';
import Post from './panel_page/post.js'
import Comment from './panel_page/comment.js'
import Hashtag from './panel_page/hashtag.js'
import Sock from './panel_page/socket-test.js'
import Search from './main/component/search.js'
import PanelBar from './panel_page/panel.js'
import DiscoverPage from './discover_page/';
import ProfilePage from './user_profile/index';
import CreatePost from './createPost/';
import Verify from './verify/verifyPage';
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
  global.loginedUser = useLoginUser();

  return (
    <Router history={history}>
      <div>
        <Switch>
            <Route exact path='/' component={Main} />
            <Route exact path='/main' component={Main} />
            <Route path='/login' component={Login} />
            <Route path='/auth/:entityID/:authHash' component={Verify}/>
            <Route path='/reservation' component={Reservation}/>
            <Route path='/test_page' component={TestPage}/>
            <Route path='/restRegister' component={RestRegister}/>
            <Route path='/entity' component={Entity}/>
            <Route path='/post' render={(props) => <Post user={GetMyUser()}/>} />
            <Route path='/comment' component={Comment}/>
            <Route path='/hashtag' component={Hashtag}/>
            <Route path='/sock' component={Sock}/>
            <Route path='/panel' component={PanelBar}/>
            <Route path='/discover' component={DiscoverPage}/>
            <Route path='/createPost' component={CreatePost}/> 
            <Route path='/profile/:EntityID' component={ProfilePage}/>
            <Route component={ErrorPage} />
        </Switch>
      </div>
    </Router>
  );
}
  
  export default Routing;
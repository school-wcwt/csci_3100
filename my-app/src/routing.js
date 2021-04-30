import { Router, Switch, Route } from 'react-router-dom';
import { Main, Login, CreateRest, Error, Discover, CreatePost, Profile, Verify } from './pages'

import Entity from './pages/panel_page/entity.js';
import Post from './pages/panel_page/post.js'
import Comment from './pages/panel_page/comment.js'
import Hashtag from './pages/panel_page/hashtag.js'
import Sock from './pages/panel_page/socket-test.js'
import PanelBar from './pages/panel_page/panel.js'

import {GetMyUser, useLoginUser} from 'component/authService';
import { history, global, Error404 } from "component";

/**
 * Pages Manage System:
 * Define all the pages we have and each page will render which function
 * @return page
 */

const Routing = (props) => {
  
  // Golbal state. If user not login, null here.
  global.loginedUser = useLoginUser();

  return (
    <Router history={history}>
      <div>
        <Switch>
            <Route exact path='/'                    component={Main} />
            <Route exact path='/main'                component={Main} />

            <Route path='/login'                     component={Login} />
            <Route path='/auth/:entityID/:authHash+' component={Verify}/>

            <Route path='/createRest'                component={CreateRest}/>
            <Route path='/createPost'                component={CreatePost}/>
            <Route path='/discover'                  component={Discover}/> 
            <Route path='/profile/:EntityID'         component={Profile}/>

            <Route path='/entity'                    component={Entity}/>
            <Route path='/post'                      render={(props) => <Post user={GetMyUser()}/>} />
            <Route path='/comment'                   component={Comment}/>
            <Route path='/hashtag'                   component={Hashtag}/>
            <Route path='/sock'                      component={Sock}/>
            <Route path='/panel'                     component={PanelBar}/>
               
            <Route component={Error404} />
        </Switch>
      </div>
    </Router>
  );
}
  
  export default Routing;
import {React, Component,useState } from 'react';
import {  Router, Switch, Redirect,Route, Link } from 'react-router-dom';
import Main from './main/';
import Login from './login/';
import Reservation from './reservation/';
import ErrorPage from './errorPage/';
import {Auth} from './services/authService';
import TestPage from './test_page/';
import RestRegister from './restRegister/';
import Followers from './followers_page/';
import DiscoverPage from './discover_page/';
import UserProfilePage from './user_profile/';
// it is backend path for template I found
// input box : https://v3.material-ui.com/demos/text-fields/

// -1 not login in ,0 user, 1 rest
// For Testing purpose, if you want to go specific page without permission, go ./services/authService and set userState to admin
// {IsLogin()? null:<Redirect to={{ pathname: '/login' }} />}

import history from "./history";

class Routing extends Component { 
    render() {
      return (
      <Router history={history}>
          <div>
            <Switch>
                <Route exact path='/' component={Main} />
                <Route exact path='/main' component={Main} />
                <Route path='/login' component={Login} />
                <Route path='/reservation' component={Reservation}/>
                <Route path='/test_page' component={TestPage}/>
                <Route path='/restRegister' component={RestRegister}/>
                <Route path='/followers' component={Followers}/>
                <Route path='/discover' component={DiscoverPage}/>
                <Route path='/userprofile/:EntitiesID' > <UserProfilePage/> </Route>
                <Route component={ErrorPage} />
            </Switch>
          </div>
        </Router>
      );
    }
  }
  
  export default Routing;
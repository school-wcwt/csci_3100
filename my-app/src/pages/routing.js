import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Redirect,Route, Link } from 'react-router-dom';
import Main from './main/';
import Login from './login/';
import Reservation from './reservation/';
import ErrorPage from './errorPage/';
import {IsLogin} from './services/authService';
import TestPage from './test_page/';
import RestRegister from './restRegister/';
import Followers from './followers_page/';
// it is backend path for template I found
// input box : https://v3.material-ui.com/demos/text-fields/

// -1 not login in ,0 user, 1 rest
// For Testing purpose, if you want to go specific page without permission, go ./services/authService and set userState to admin
//{IsLogin()? null:<Redirect to={{ pathname: '/login' }} />}
class Routing extends Component {
    render() {
      return (
      <Router>
          <div>
            <Switch>
                <Route exact path='/' component={Main} />
                <Route exact path='/main' component={Main} />
                <Route path='/login' component={Login} />
                <Route path='/reservation' component={Reservation}/>
                <Route path='/test_page' component={TestPage}/>
                <Route path='/restRegister' component={RestRegister}/>
                <Route path='/followers' component={Followers}/>
                <Route component={ErrorPage} />
            </Switch>
          </div>
          <>
          
          </>
        </Router>
      );
    }
  }
  
  export default Routing;
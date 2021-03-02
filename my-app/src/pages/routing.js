import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Main from './main/';
import Login from './login/';
import Reservation from './reservation/';
import ErrorPage from './errorPage/';




class Routing extends Component {
    render() {
      return (
      <Router>
          <div>
            <Switch>
                <Route exact path='/' component={Main} />
                <Route path='/login' component={Login} />
                <Route path='/reservation' component={Reservation}/>
                <Route path='/error' component={ErrorPage} />
            </Switch>
          </div>
        </Router>
      );
    }
  }
  
  export default Routing;
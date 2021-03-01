import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Login from './login/';
import ErrorPage from './errorPage/';

class Routing extends Component {
    render() {
      return (
      <Router>
          <div>
            <Switch>
                <Route exact path='/' component={ErrorPage} />
                <Route path='/login' component={Login} />
                <Route path='/ErrorPage' component={ErrorPage} />
            </Switch>
          </div>
        </Router>
      );
    }
  }
  
  export default Routing;
import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import Login from './pages/login/';
import Contact from './components/Contact';
import ErrorPage from './ErrorPage';

class App extends Component {
    render() {
      return (
      <Router>
          <div>
            <Switch>
                <Route exact path='/' component={Home} />
                <Route path='/contact' component={Contact} />
                <Route path='/login' component={Login} />
                <Route path='/ErrorPage' component={ErrorPage} />
            </Switch>
          </div>
        </Router>
      );
    }
  }
  
  export default App;
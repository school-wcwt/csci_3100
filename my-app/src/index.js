import React from 'react';
import { BrowserRouter } from 'react-router-dom'
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import Routing from './pages/routing.js';
//import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styled from 'styled-components';


ReactDOM.render(
  <BrowserRouter>
    <Routing />
  </BrowserRouter>,
  document.getElementById('root')
);
reportWebVitals();
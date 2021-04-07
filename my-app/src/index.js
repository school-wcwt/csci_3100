import React from 'react';
import { BrowserRouter } from 'react-router-dom'
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import Routing from './pages/routing.js';
//import './index.css';
//import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styled from 'styled-components';

import MUItheme from './component/MUITheme/theme'
import { ThemeProvider } from '@material-ui/core/styles';

require('dotenv').config()

ReactDOM.render(
  <ThemeProvider theme={MUItheme}>
    <BrowserRouter>
      <Routing />
    </BrowserRouter>
  </ThemeProvider>,
  document.getElementById('root')
);
reportWebVitals();
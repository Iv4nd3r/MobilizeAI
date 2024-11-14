// src/index.js

import '@fontsource/montserrat'; // Import Montserrat font
import './index.css'; // Main CSS file
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import axios from 'axios';
import process from 'process';



ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

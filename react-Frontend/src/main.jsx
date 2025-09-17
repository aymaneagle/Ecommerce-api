import 'bootstrap';
import "bootstrap-icons/font/bootstrap-icons.css"
import 'bootstrap/dist/css/bootstrap.css'
import 'react-loading-skeleton/dist/skeleton.css'

import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import ReactDOM from 'react-dom/client';

import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
import App from './App.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
 <App/>
  </StrictMode>,
)

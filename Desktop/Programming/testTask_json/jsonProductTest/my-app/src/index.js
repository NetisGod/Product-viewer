import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import { BrowserRouter } from 'react-router-dom'
import Routes from './components/Routes'


ReactDOM.render(
    <BrowserRouter>
        <Routes/>
    </BrowserRouter>,
    document.getElementById('root'));


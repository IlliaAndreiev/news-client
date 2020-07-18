import React from 'react';
import './App.css';
import Header from './components/Header';
import Main from './components/Main';
import Toastr from './components/Toastr';

import {
    BrowserRouter as Router,
} from "react-router-dom";

export default () => {
    return (
        <div className="App" >
            <Router>
                <Header />
                <Main />
                <Toastr />
            </Router>
        </div>
    );
}
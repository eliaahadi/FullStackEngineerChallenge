"use strict"
// REACT
import React from 'react';
import {render} from 'react-dom';
// REACT-ROUTER
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom';
import Home from './components/Home';
import Admin from './components/Admin';
import Employee from './components/Employee';

const routes = (
    <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/admin" component={Admin}/>
          <Route path="/employee" component={Employee}/>
        </Switch>
    </Router> 
);

export default routes;
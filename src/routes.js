"use strict"
// REACT
import React from 'react';
import {render} from 'react-dom';
// REACT-ROUTER
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import EmployeesList from './components/pages/employeesList';
import ReviewsList from './components/pages/reviewsList';
import Cart from './components/pages/cart';
import LoginForm from './components/pages/loginForm';
import EmployeesForm from './components/pages/employeesForm';
import ReviewsFormAdmin from './components/pages/reviewsFormAdmin';
import ReviewsFormEmployee from './components/pages/reviewsFormEmployee';
import Main from './main';

const routes = (
    <Router history={browserHistory}>
      <Route path="/" component={Main}>
        <IndexRoute component={ReviewsFormEmployee}/>
        <Route path="/login" component={LoginForm}/>
        <Route path="/admin" component={EmployeesForm}/>
      </Route>
    </Router> 
);

export default routes;
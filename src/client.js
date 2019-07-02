"use strict"

// REACT
import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';

// REACT-ROUTER
// import {Router, Route, IndexRoute, browserHistory} from 'react-router';

import {applyMiddleware, createStore} from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

// IMPORT COMBINED REDUCERS
import reducers from './reducers/index';

// IMPORT ACTIONS
// import {addToCart} from './actions/cartActions';
// import {getEmployee, getEmployees, deleteEmployee, updateEmployee} from './actions/employeesActions';

//STEP 1 create store
const initialState = window.INITIAL_STATE;
const middleware = applyMiddleware(thunk, logger);
const store = createStore(reducers, initialState, middleware);

// import EmployeesList from './components/pages/employeesList';
// import Cart from './components/pages/cart';
// import EmployeesForm from './components/pages/employeesForm';
// import Main from './main';

// import Menu from './components/menu.js';
import routes from './routes';

const Routes = (
  <Provider store={store}>
    {routes}
  </Provider>
)

render(
  Routes, document.getElementById('app')
);

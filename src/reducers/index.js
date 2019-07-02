"use strict"
import {combineReducers} from 'redux';

// HERE IMPORT REDUCERS TO BE COMBINED
import {employeesReducers} from './employeesReducers';
import {reviewsReducers} from './reviewsReducers';

//HERE COMBINE THE REDUCERS
export default combineReducers({
  employees: employeesReducers,
  reviews: reviewsReducers
})
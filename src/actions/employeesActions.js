"use strict"
import axios from 'axios';

// GET A EMPLOYEE
export function getEmployee(id){
  return function(dispatch){
    axios.get("/api/employees/" + id)
      .then(function(response){
        dispatch({type:"GET_EMPLOYEE", payload:id})
      })
      .catch(function(err){
        dispatch({type:"GET_EMPLOYEE_REJECTED", payload:err})
      })
  }
}

// GET  EMPLOYEES (READ)
export function getEmployees() {
  return function(dispatch){
    axios.get("/api/employees")
    .then(function(response){
      dispatch({type:"GET_EMPLOYEES", payload:response.data})
    })
    .catch(function(err){
      dispatch({type:"GET_EMPLOYEES_REJECTED", payload:err})
    })
  }
}

// POST A EMPLOYEE (CREATE)
export function postEmployee(employee) {
  console.log("posted employee ", employee)
  return function (dispatch) {
    axios.post("/api/employees", employee)
      .then(function(response){
        console.log("posted employee RESPONSE ", employee, response)
        dispatch({type: "POST_EMPLOYEE", payload: response.data})
      })
      .catch(function(err){
        dispatch({type: "POST_EMPLOYEE_REJECTED", payload: "there was an error while posting a new employee"})
      })
  }
}

// DELETE A EMPLOYEE
export function deleteEmployee(id){
  return function(dispatch){
    axios.delete("/api/employees/" + id)
      .then(function(response){
        dispatch({type:"DELETE_EMPLOYEE", payload:id})
      })
      .catch(function(err){
        dispatch({type:"DELETE_EMPLOYEE_REJECTED", payload:err})
      })
  }
}

// UPDATE A EMPLOYEE (UPDATE)
export function updateEmployee(employee, id) {
  console.log("updated employee ", employee, id, employee[0].name)
  return function(dispatch){
    axios.put("/api/employees/" + id, employee)
      .then(function(response){
        console.log("updated employee RESPONSE ", employee, id, response)
        dispatch({type: "UPDATE_EMPLOYEE",
        payload: response.data})
      })
      .catch(function(err){
        dispatch({type:"UPDATE_EMPLOYEE_REJECTED", payload:err})
      })
  }
}

// RESET FORM BUTTON
export function resetButton(){
  return {
    type:"RESET_BUTTON"
  }
}
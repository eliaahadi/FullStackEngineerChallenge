"use strict"
// EMPLOYEES REDUCERS
export function employeesReducers(state={
  employees:[]
}, action) {
  switch(action.type) {
    case "GET_EMPLOYEES": {
      return {...state, employees:[...action.payload]}
      break;
    }
    case "POST_EMPLOYEE": {
      // let employees = state.employees.concat(action.payload);
      // return {employees};
      return {...state, employees: [...state.employees, ...action.payload], 
        msg:'Saved! Click to continue', style:'success', validation:'success'}
      break;
    }
    case "POST_EMPLOYEE_REJECTED": {
      return {...state, msg:'Please, try again', style:'danger', validation:'error'}
      break;
    }
    case "RESET_BUTTON": {
      return {...state, msg:null, style:'primary', validation:null}
      break;
    }
    case "DELETE_EMPLOYEE": {
      // create a copy of current array of employees
      const currentEmployeeToDelete = [...state.employees];
      // find which index in employees array to delete
      const indexToDelete = currentEmployeeToDelete.findIndex(
        function(employee) {
          return employee._id == action.payload;
        }
      )
      // use slice to remove employee at specified index
      return {employees: [...currentEmployeeToDelete.slice(0, indexToDelete),
      ...currentEmployeeToDelete.slice(indexToDelete + 1)]}
      break;
    }
    case "UPDATE_EMPLOYEE": {
      // create a copy of current array of employees
      const currentEmployeeToUpdate = [...state.employees];
      // find which index in employees array to update
      const indexToUpdate = currentEmployeeToUpdate.findIndex(
        function(employee) {
          return employee._id = action.payload._id;
        }
      )
      const newEmployeeToUpdate = {
        ...currentEmployeeToUpdate[indexToUpdate],
        name: action.payload.name
      }
      console.log("what is newemployeeToUpdate ", currentEmployeeToUpdate, indexToUpdate, action, newEmployeeToUpdate);
      // use slice to remove employee at specified index
      return {employees: [...currentEmployeeToUpdate.slice(0, indexToUpdate), newEmployeeToUpdate,
      ...currentEmployeeToUpdate.slice(indexToUpdate + 1)],
      updatemsg:'Updated! Click to continue', style:'success', validation:'success'
    }
      break;      
    }
  }
  return state;
}
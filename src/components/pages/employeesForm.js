"use strict"
import React from 'react';
import {MenuItem, ListGroup, InputGroup, DropdownButton, Image, Col, Row, Well, Panel, FormControl, FormGroup, ControlLabel, Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {findDOMNode} from 'react-dom';
import {postEmployee, updateEmployee, getEmployee, deleteEmployee, getEmployees, resetButton} from '../../actions/employeesActions';
import ReviewsFormAdmin from './reviewsFormAdmin'
import axios from 'axios';

class EmployeesForm extends React.Component{
  constructor() {
    super();
    this.state = {
      employees:[{}],
      employee:'',
      showValues: {},
      isFetching: true
    }
  }
   
  componentDidMount(){
    this.setState({...this.state, isFetching: true});
      this.props.getEmployees();
     this.setState({...this.state, isFetching: false});
    //GET EMPLOYEES FROM API
     axios.get('/api/employees')
    .then(function(response){
      this.setState({employees:response.data});
    }.bind(this))
    .catch(function(err){
      this.setState({employees:'error loading employees files from the server', employee:''})
    }.bind(this))
  }
  addEmployeeSubmit(){
    const employee =
    [
      {
      name: findDOMNode(this.refs.name).value,
      }
    ]
    if (employee[0].name === "") {
      alert('Employee name must not be empty to save it')
    } else {
      this.props.postEmployee(employee);
    }
    console.log("post employees ", this.props.postEmployee, employee, employee[0].name)
  }

  updateEmployeeSubmit(){
    const employee =
    [
      {
        name: findDOMNode(this.refs.updatename).value,
      }
    ]
    if (employee[0].name === "") {
      alert('Employee name must not be empty to save it')
    } else {
      this.props.updateEmployee(employee, this.state.showValues._id);
    }
  }

  onDelete(){
    let employeeId =
    findDOMNode(this.refs.delete).value;
    if (employeeId === 'select') {
      alert('choose an ID to delete');
    } else {
      this.props.deleteEmployee(employeeId);
    }
  }
  handleSelect(employee){
    this.setState({
      employee: employee._id
    })
    this.setState({showValues: employee});
  }

  resetFormAdd(){
    //RESET THE ADD Button
    this.props.resetButton();
    findDOMNode(this.refs.name).value = '';
    this.setState({employee:''});
  }

  resetFormUpdate(){
    //RESET THE UPDATE Button
    this.props.resetButton();
    findDOMNode(this.refs.updatename).value = '';
    this.setState({employee:''});
  }

  render(){
    if (this.state.isFetching) {
      return <p>Loading ...</p>;
    }
    const employeesListDelete = this.props.employees.map(function(employeesArr){
      return (
        <option key={employeesArr._id}>
        {employeesArr._id} </option>
      )
    })

    const employeesListSelect = this.props.employees.map(function(employeeArr){
      return (
       <li key={employeeArr._id}>
        id:{employeeArr._id} - name: {employeeArr.name}
       </li> 
        )
      }, this)

    const employeesList =
    this.state.employees.map(function(employeeArr){
      return(
        <MenuItem key={employeeArr._id}
        eventKey={employeeArr.name}
        onClick={this.handleSelect.bind(this,
        employeeArr)}>
          id:{employeeArr._id} - name:{employeeArr.name}
        </MenuItem>
        )
      }, this)

    return(
      <div>
      <Well>
        <Row>
          <Panel>
            <h3>
              Employees List
            </h3>
            {employeesListSelect}
          </Panel>
        </Row>
      <Row>
       <Col xs={12} sm={6}>
        <Panel>
          <InputGroup>
            <FormControl id={this.state.employee} type="text"
              ref="employee" value={this.state.employee} />
              <DropdownButton 
                componentClass={InputGroup.Button}
                id="input-dropdown-addon"
                title="Select a employee"
                bsStyle="primary">
                {employeesList}
              </DropdownButton>
          </InputGroup>

          <FormGroup controlId="name" validationState={this.props.validation}>
            <ControlLabel>Update Employee</ControlLabel>
            <FormControl
            type="text"
            placeholder={this.state.showValues.name}
            ref="updatename" />
            <FormControl.Feedback />
          </FormGroup>
        <Button
        onClick={(!this.props.updatemsg)?(this.updateEmployeeSubmit.bind(this)):(this.resetFormUpdate.bind(this))}
          bsStyle={(!this.props.style)?("primary"):(this.props.style)}>
          {(!this.props.updatemsg)?("Update name"):(this.props.updatemsg)}
        </Button>
        </Panel>
      </Col>
      <Col xs={12} sm={6}>
        <Panel>
          <FormGroup controlId="name" validationState={this.props.validation}>
            <ControlLabel>Add Employee</ControlLabel>
            <FormControl
            type="text"
            placeholder="Enter Name"
            ref="name" />
            <FormControl.Feedback/>
          </FormGroup>
        <Button
        onClick={(!this.props.msg)?(this.addEmployeeSubmit.bind(this)):(this.resetFormAdd.bind(this))}
          bsStyle={(!this.props.style)?("primary"):(this.props.style)}>
          {(!this.props.msg)?("Save name"):(this.props.msg)}
        </Button>
        </Panel>
        <Panel>
          <FormGroup
            controlId="formControlsSelect">
            <ControlLabel>Select a name id to delete</ControlLabel>
            <FormControl ref="delete"
              componentClass="select" placeholder="select">
            <option
            value="select">select</option>
            {employeesListDelete}
            </FormControl>
          </FormGroup>
          <Button
          onClick={this.onDelete.bind(this)}
          bsStyle="danger">Delete name</Button>
        </Panel>
      </Col>
    </Row>
    </Well>
    <ReviewsFormAdmin/>
    </div>
    )
  } 
}
function mapStateToProps(state){
  return {
    employees: state.employees.employees,
    msg: state.employees.msg,
    updatemsg: state.employees.updatemsg,
    style: state.employees.style,
    validation: state.employees.validation
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    postEmployee, updateEmployee, deleteEmployee, getEmployee, getEmployees, resetButton
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(EmployeesForm);
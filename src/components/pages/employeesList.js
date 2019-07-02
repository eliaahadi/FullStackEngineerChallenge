"use strict"
import React from 'react';
import {connect} from 'react-redux';
import {getEmployees} from '../../actions/employeesActions';
import {bindActionCreators} from 'redux';
import {Carousel, Grid, Col, Row, Button} from 'react-bootstrap';
import EmployeeItem from './employeeItem';
import EmployeesForm from './employeesForm';

class EmployeesList extends React.Component{
  componentDidMount(){
    this.props.getEmployees()
  }
  render(){
    const employeesList =this.props.employees.map(function(employeesArr){
      return(
        <Col xs={12} sm={6} md={4}
        key={employeesArr._id}>
          <EmployeeItem _id= {employeesArr._id}
            name={employeesArr.name}
          />
        </Col>
      ) 
    })
      return(
        <Grid>
        <Row style={{marginTop:'15px'}}> 
          {employeesList}
        </Row>
      </Grid>
    ) 
  }
}
function mapStateToProps(state){
  return{
  employees: state.employees.employees
  } 
}
function mapDispatchToProps(dispatch){
  return bindActionCreators({
    getEmployees: getEmployees
  }, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(EmployeesList);

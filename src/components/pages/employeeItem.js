"use strict"
import React from 'react';
import {Image, Row, Col, Well, Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {postEmployee, updateEmployee} from '../../actions/employeesActions';

class EmployeeItem extends React.Component{
  handleEmployee(){
    const employee = 
    [...this.props.employees, 
      {
      _id: this.props._id,
      name: this.props.name,
      }
    ]

    // CHECK IF EMPLOYEE IS EMPTY
    if(this.props.employee.length > 0) {
      // EMPLOYEE IS NOT EMPTY
      let _id = this.props._id;
      let employeeIndex = this.props.employee.findIndex(function(employee){
        return employee._id === _id;
      })
      // IF RETURNS -1 THERE ARE NO ITEMS WITH SAME ID
      if (employeeIndex === -1){
        this.props.postEmployee(employee);
      } else {
        // WE NEED TO UPDATE QUANTITY
        this.props.updateEmployee(this.props.employee, _id);
      }
    } else {
      // EMPLOYEE IS EMPTY
      this.props.postEmployee(employee);
    }
  }   
  constructor(){
    super();
    this.state = {
      isClicked:false
    };
  }
  onReadMore(){
    this.setState({isClicked:true})
  }  

  render(){
    return(
      <Well>
        <Row>
          <Col xs={6} sm={8}>
            <h6>{this.props.name}</h6>
            <p>{(this.props.description.length > 50 && this.state.isClicked === false)
              ?(this.props.description.substring(0, 50)):(this.props.description)}
              <button className='link' onClick={this.onReadMore.bind(this)}>
                {(this.state.isClicked === false && this.props.description !== null &&
                this.props.description.length > 50)?('...read more'):('')}
              </button>
            </p>
            <h6>usd. {this.props.price}</h6>
            <Button onClick={() => this.handleEmployee()}
            bsStyle='primary'>Buy now</Button>
          </Col>
        </Row>
      </Well> 
      )
    } 
  }

function mapStateToProps(state){
  return{
    employee:state.employee.employee
  } 
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ 
    postEmployee: postEmployee,
    updateEmployee: updateEmployee
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeItem);
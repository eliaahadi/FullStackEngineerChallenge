"use strict"
import React from 'react';
import {MenuItem, ListGroup, InputGroup, DropdownButton, Image, Col, Row, Well, Panel, FormControl, FormGroup, ControlLabel, Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {findDOMNode} from 'react-dom';
import {postReview, updateReview, getReview, deleteReview, getReviews, resetButton} from '../../actions/reviewsActions';
import {getEmployees} from '../../actions/employeesActions';

import axios from 'axios';

class ReviewsFormAdmin extends React.Component{
  constructor() {
    super();
    this.state = {
      reviews:[{}],
      employees:[{}],
      employeeAddReviewFor:'',
      employeeAddReviewBy:'',
      review:'',
      showValuesUpdate: {},
      showValuesAddReviewFor: {},
      showValuesAddReviewBy: {},
      isFetching: true
    }
  }
   
  componentDidMount(){
    this.setState({...this.state, isFetching: true});
      this.props.getReviews();
     
    //GET REVIEWS FROM API
     axios.get('/api/reviews')
    .then(function(response){
      this.setState({reviews:response.data});
    }.bind(this))
    .catch(function(err){
      this.setState({reviews:'error loading reviews files from the server', review:''})
    }.bind(this))

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

  addReviewSubmit(){
    const review =
    [
      {
        reviewsFor: {_id: findDOMNode(this.refs.reviewFor).value, name: this.state.showValuesAddReviewFor},
        rate: findDOMNode(this.refs.rate).value,
        comment: findDOMNode(this.refs.comment).value,
        reviewsBy: {_id: findDOMNode(this.refs.reviewBy).value, name: this.state.showValuesAddReviewBy}
      }
    ]
    if (review[0].reviewsFor === "") {
      alert('Reviewee name must not be empty to save it')
    } 
    if (review[0].rate === "") {
      alert('Review rate must not be empty to save it')
    }
    if (review[0].comment === "") {
      alert('Review comment must not be empty to save it')
    }
    if (review[0].reviewsBy === "") {
      alert('Reviewer name must not be empty to save it')
    }
    else {
      this.props.postReview(review);
    }
  }

  updateReviewSubmit(){
    const review =
    [
      {
        rate: findDOMNode(this.refs.updaterate).value,
        comment: findDOMNode(this.refs.updatecomment).value,
      }
    ]
    if (review[0].rate === "") {
      alert('Review rate must not be empty to save it')
    } 
    if (review[0].name === "") {
      alert('Review name must not be empty to save it')
    }
    else {
      this.props.updateReview(review, this.state.showValuesUpdate._id);
    }
  }

  onDelete(){
    let reviewId =
    findDOMNode(this.refs.delete).value;
    if (reviewId === 'select') {
      alert('choose an ID to delete');
    } else {
      this.props.deleteReview(reviewId);
    }
  }
  handleSelectUpdate(review){
    this.setState({
      review: review._id
    })
    this.setState({showValuesUpdate: review});
  }
  handleSelectAddReviewFor(employee){
    this.setState({
      employeeAddReviewFor: employee._id
    })
    this.setState({showValuesAddReviewFor: employee});
  }
  handleSelectAddReviewBy(employee){
    this.setState({
      employeeAddReviewBy: employee._id
    })
    this.setState({showValuesAddReviewBy: employee});
  }

  resetFormAdd(){
    //RESET THE ADD Button
    this.props.resetButton();
    findDOMNode(this.refs.name).value = '';
    this.setState({review:''});
  }

  resetFormUpdate(){
    //RESET THE UPDATE Button
    this.props.resetButton();
    findDOMNode(this.refs.updatename).value = '';
    this.setState({review:''});
  }

  render(){
    if (this.state.isFetching) {
      return <p>Loading ...</p>;
    }
    const reviewsListDelete = this.props.reviews.map(function(reviewsArr){
      return (
        <option key={reviewsArr._id}>
        {reviewsArr._id} </option>
      )
    })

    const reviewsListSelect = this.props.reviews && this.props.reviews.length > 0 ? this.props.reviews.map(function(reviewArr){
      return (
       <li key={reviewArr._id}>
          id: {reviewArr._id} - reviewsFor: {reviewArr.reviewsFor.name} - rating: {reviewArr.rate} - comment: {reviewArr.comment} - reviewsBy: {reviewArr.reviewsBy.name}
       </li> 
        )
      }, this) : <span></span>;

    const reviewsList = this.props.reviews && this.props.reviews.length > 0 ?
    this.props.reviews.map(function(reviewArr){
      return(
        <MenuItem key={reviewArr._id}
        eventKey={reviewArr.name}
        onClick={this.handleSelectUpdate.bind(this,
        reviewArr)}>
          id: {reviewArr._id} - reviewsFor: {reviewArr.reviewsFor.name} - rating: {reviewArr.rate} - comment: {reviewArr.comment} - reviewsBy: {reviewArr.reviewsBy.name}
        </MenuItem>
        )
      }, this) : <span></span>;

    const employeesListReviewFor =
      this.state.employees.map(function(employeeArr){
        return(
          <MenuItem key={employeeArr._id}
          eventKey={employeeArr.name}
          onClick={this.handleSelectAddReviewFor.bind(this,
          employeeArr)}>
            id:{employeeArr._id} - name:{employeeArr.name}
          </MenuItem>
          )
        }, this)

    const employeesListReviewBy =
      this.state.employees.map(function(employeeArr){
        return(
          <MenuItem key={employeeArr._id}
          eventKey={employeeArr.name}
          onClick={this.handleSelectAddReviewBy.bind(this,
          employeeArr)}>
            id:{employeeArr._id} - name:{employeeArr.name}
          </MenuItem>
          )
        }, this)

    return(
      <Well>
        <Row>
          <Panel>
            <h3>
              Reviews List
            </h3>
            {reviewsListSelect}
          </Panel>
        </Row>
      <Row>
       <Col xs={12} sm={6}>
        <Panel>
          <InputGroup>
            <FormControl id={this.state.review} type="text"
              ref="review" value={this.state.review} />
              <DropdownButton 
                componentClass={InputGroup.Button}
                id="input-dropdown-addon"
                title="Select a review"
                bsStyle="primary">
                {reviewsList}
              </DropdownButton>
          </InputGroup>
          <div className='align liststyle'>
          Review for {this.state.showValuesUpdate.reviewsFor && this.state.showValuesUpdate.reviewsFor.name.length > 0 ? this.state.showValuesUpdate.reviewsFor.name
          : <div></div>
          }
          </div>
          <div className='align liststyle'>
          Review by {this.state.showValuesUpdate.reviewsBy && this.state.showValuesUpdate.reviewsBy.name.length > 0 ? this.state.showValuesUpdate.reviewsBy.name
          : <div></div>
          }
          </div>
          <FormGroup controlId="name" validationState={this.props.validation}>
            <ControlLabel>Update Review Rating</ControlLabel>
            <FormControl
            type="text"
            placeholder={this.state.showValuesUpdate.rate}
            ref="updaterate" />
            <FormControl.Feedback />
          </FormGroup>
          <FormGroup controlId="name" validationState={this.props.validation}>
            <ControlLabel>Update Review Comment</ControlLabel>
            <FormControl
            type="text"
            placeholder={this.state.showValuesUpdate.comment}
            ref="updatecomment" />
            <FormControl.Feedback />
          </FormGroup>
        <Button
        onClick={(!this.props.updatemsg)?(this.updateReviewSubmit.bind(this)):(this.resetFormUpdate.bind(this))}
          bsStyle={(!this.props.style)?("primary"):(this.props.style)}>
          {(!this.props.updatemsg)?("Update review"):(this.props.updatemsg)}
        </Button>
        </Panel>
      </Col>
      <Col xs={12} sm={6}>
        <Panel>
        <InputGroup>
            <FormControl id={this.state.employeeAddReviewFor} type="text"
              ref="reviewFor" value={this.state.employeeAddReviewFor} />
              <DropdownButton 
                componentClass={InputGroup.Button}
                id="input-dropdown-addon"
                title="Select a reviewee"
                bsStyle="primary">
                 {employeesListReviewFor}
              </DropdownButton>
          </InputGroup>
          <div className='align liststyle'>
          Review for {this.state.showValuesAddReviewFor.name && this.state.showValuesAddReviewFor.name.length > 0 ? this.state.showValuesAddReviewFor.name
          : <div></div>
          }
          </div>
        <FormGroup controlId="rate" validationState={this.props.validation}>
            <ControlLabel>Add Review Rating</ControlLabel>
            <FormControl
            type="text"
            placeholder="Enter Rating"
            ref="rate" />
            <FormControl.Feedback/>
          </FormGroup>
          <FormGroup controlId="comment" validationState={this.props.validation}>
            <ControlLabel>Add Review Comment</ControlLabel>
            <FormControl
            type="text"
            placeholder="Enter Comment"
            ref="comment" />
            <FormControl.Feedback/>
          </FormGroup>
          <InputGroup>
            <FormControl id={this.state.employeeAddReviewBy} type="text"
              ref="reviewBy" value={this.state.employeeAddReviewBy} />
              <DropdownButton 
                componentClass={InputGroup.Button}
                id="input-dropdown-addon"
                title="Select a reviewer"
                bsStyle="primary">
                {employeesListReviewBy}
              </DropdownButton>
          </InputGroup>
          <div className='align liststyle'>
          Review by {this.state.showValuesAddReviewBy.name && this.state.showValuesAddReviewBy.name.length > 0 ? this.state.showValuesAddReviewBy.name
          : <div></div>
          }
          </div>
        <Button
        onClick={(!this.props.msg)?(this.addReviewSubmit.bind(this)):(this.resetFormAdd.bind(this))}
          bsStyle={(!this.props.style)?("primary"):(this.props.style)}>
          {(!this.props.msg)?("Save review"):(this.props.msg)}
        </Button>
        </Panel>
      </Col>
    </Row>
  </Well>
    )
  } 
}
function mapStateToProps(state){
  return {
    reviews: state.reviews.reviews,
    msg: state.reviews.msg,
    updatemsg: state.reviews.updatemsg,
    style: state.reviews.style,
    validation: state.reviews.validation
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    postReview, updateReview, deleteReview, getReview, getReviews, resetButton
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ReviewsFormAdmin);
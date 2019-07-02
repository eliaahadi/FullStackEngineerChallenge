"use strict"
import React from 'react';
import {MenuItem, ListGroup, InputGroup, DropdownButton, Image, Col, Row, Well, Panel, FormControl, FormGroup, ControlLabel, Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {findDOMNode} from 'react-dom';
import {postReview, updateReview, getReview, deleteReview, getReviews, resetButton} from '../../actions/reviewsActions';

import axios from 'axios';

class ReviewsFormEmployee extends React.Component{
  constructor() {
    super();
    this.state = {
      reviews:[{}],
      review:'',
      showValues: {},
      isFetching: true
    }
  }
   
  componentDidMount(){
    console.log('\n \n reviewForm this props \n \n', this.props)
    this.setState({...this.state, isFetching: true});
      this.props.getReviews();
     this.setState({...this.state, isFetching: false});
    //GET REVIEWS FROM API
     axios.get('/api/reviews')
    .then(function(response){
      this.setState({reviews:response.data});
      console.log('review state', this.state.reviews);
    }.bind(this))
    .catch(function(err){
      this.setState({reviews:'error loading reviews files from the server', review:''})
    }.bind(this))

    
  }
  addReviewSubmit(){
    const review =
    [
      {
      reviewsFor: {name: findDOMNode(this.refs.name).value},
      rate: findDOMNode(this.refs.rate).value,
      comment: findDOMNode(this.refs.comment).value
      }
    ]
    if (review[0].rate === "") {
      alert('Review name must not be empty to save it')
    } else {
      
      this.props.postReview(review);

    }
    console.log("post reviews ", this.props.postReview(review), review, review[0].reviewsFor.name)
  }

  updateReviewSubmit(){
    const review =
    [
      {
        rate: findDOMNode(this.refs.updaterate).value,
        comment: findDOMNode(this.refs.updatecomment).value,
      }
    ]
    if (review[0].name === "") {
      alert('Review name must not be empty to save it')
    } else {
      console.log('updateReview function ', review, this.state.showValues._id)
      this.props.updateReview(review, this.state.showValues._id);

    }
    console.log("update reviews SUBMIT ", this.refs, review, this.state.showValues._id)
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
  handleSelect(review){
    this.setState({
      review: review._id
    })
    // let inputValues = this.state.values;
    this.setState({showValues: review});
    console.log('handle select review ', review, review._id, '\n review name ', review.reviewsFor.name, '\n show values ', this.state.showValues)
  }

  handleReview(review){
    console.log('handle select review ', review, review._id)
    // this.setState({
    //   review: review._id
    // })
    // this.setState({showValues: review});
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
      console.log('rA ===> ', reviewArr.reviewsFor.name)
      return (
       <li key={reviewArr._id}>
   id: {reviewArr._id} - reviewsFor: {reviewArr.reviewsFor.name} - rating: {reviewArr.rate} - comment: {reviewArr.comment} - reviewsBy: {reviewArr.reviewsBy.name}
       </li> 
        )
      }, this) : <span></span>;

    const reviewsList = this.props.reviews && this.props.reviews.length > 0 ?
    this.props.reviews.map(function(reviewArr){
      console.log("reviewsList map -> ", reviewArr)
      return(
        <MenuItem key={reviewArr._id}
        eventKey={reviewArr.name}
        onClick={this.handleSelect.bind(this,
        reviewArr)}>
             id: {reviewArr._id} - reviewsFor: {reviewArr.reviewsFor.name} - rating: {reviewArr.rate} - comment: {reviewArr.comment} - reviewsBy: {reviewArr.reviewsBy.name}
        </MenuItem>
        )
      }, this) : <span></span>;

    console.log('this.state.reviews ', this.state.reviews)
    console.log('this.state.showValues ', this.state.showValues, this.state.showValues.reviewsFor)
    // console.log('this.state.showValues NAME ', this.state.showValues.reviewsFor.name)
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
          <div>
          Review for {this.state.showValues.reviewsFor && this.state.showValues.reviewsFor.name.length > 0 ? this.state.showValues.reviewsFor.name
          : <div></div>
          }
          </div>
          <div>
          Review by {this.state.showValues.reviewsBy && this.state.showValues.reviewsBy.name.length > 0 ? this.state.showValues.reviewsBy.name
          : <div></div>
          }
          </div>
          <FormGroup controlId="name" validationState={this.props.validation}>
            <ControlLabel>Update Review Rating</ControlLabel>
            <FormControl
            type="text"
            placeholder={this.state.showValues.rate}
            ref="updaterate" />
            <FormControl.Feedback />
          </FormGroup>
          <FormGroup controlId="name" validationState={this.props.validation}>
            <ControlLabel>Update Review Comment</ControlLabel>
            <FormControl
            type="text"
            placeholder={this.state.showValues.comment}
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

export default connect(mapStateToProps, mapDispatchToProps)(ReviewsFormEmployee);
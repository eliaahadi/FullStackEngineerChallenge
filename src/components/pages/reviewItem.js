"use strict"
import React from 'react';
import {Image, Row, Col, Well, Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {addToreview, updateReview} from '../../actions/reviewsActions';

class ReviewItem extends React.Component{
  
  handleReview(){
    const reviews = 
    [...this.props.reviews, 
      {
        _id: this.props._id,
        reviewsFor: this.props.reviewsFor,
        rate: this.props.rate,
        comment: this.props.comment
      }
    ]
  }   
  constructor(){
    
    super();
    this.state = {
    };
  }
    
    render(){
    return(
      <Well>
        <Row>
          <Col xs={6} sm={8}>
            <h6>{this.props.reviewsFor}</h6>
          </Col>
        </Row>
      </Well> 
      )
    } 
  }

function mapStateToProps(state){
  return{
    reviews:state.reviews.reviews
  } 
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ 
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ReviewItem);
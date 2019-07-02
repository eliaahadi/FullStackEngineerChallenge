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
    console.log('\n \n review Item props', this.props, '\n \n review Array \n \n', reviews)
    
    // CHECK IF REVIEW IS EMPTY
    // if(this.props.reviews.length > 0) {
    //   // REVIEW IS NOT EMPTY
    //   let _id = this.props._id;
      
    //   let reviewIndex = this.props.reviews.findIndex(function(review){
    //     return review._id === _id;
    //   })
    //   // IF RETURNS -1 THERE ARE NO ITEMS WITH SAME ID
    //   if (reviewIndex === -1){
    //     this.props.postReview(review);
    //   } else {
    //     // WE NEED TO UPDATE QUANTITY
    //     console.log("reviewitem ", this.props.review);
    //     this.props.updateReview(_id, 1, this.props.review);
    //   }
    // } else {
    //   // review IS EMPTY
    //   this.props.postReview(review);
    // }
  }   
  constructor(){
    
    super();
    this.state = {
    };
  }
  // onReadMore(){
    //   this.setState({isClicked:true})
    // }  
    
    render(){
    console.log('\n \n reviews Items \n \n', this.props, this.props.reviewsFor);
    return(
      <Well>
        <Row>
          <Col xs={6} sm={8}>
            <h6>{this.props.reviewsFor}</h6>
            {/* <h6>{this.handleReview()}</h6> */}
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
    // postReview: postReview,
    // updateReview: updateReview
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ReviewItem);
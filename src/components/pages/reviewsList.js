"use strict"
import React from 'react';
import {connect} from 'react-redux';
import {Grid, Image, Row, Col, Well, Button} from 'react-bootstrap';
import {getReviews} from '../../actions/reviewsActions';
import {bindActionCreators} from 'redux';
import ReviewItem from './reviewItem';


class ReviewsList extends React.Component{
  componentDidMount(){
    this.props.getReviews()
  }
  render(){
    const reviewsList =this.props.reviews.map(function(reviewsArr){
      console.log('review List Array ', reviewsArr)
      return(
        <Col xs={12} sm={6} md={4}
        key={reviewsArr._id}>
          <ReviewItem _id= {reviewsArr._id}
            reviewsFor={reviewsArr.reviewsFor['name']}
            rate={reviewsArr.rate}
            comment={reviewsArr.comment}
          />
        </Col>
      ) 
    })
    console.log('\n \n reviews list component ', <ReviewItem />);
    return(
        <Grid>
        <Row style={{marginTop:'15px'}}> 
          {reviewsList}
        </Row>
      </Grid>
    ) 
  }
}
function mapStateToProps(state){
  return{
  reviews: state.reviews.reviews
  } 
}
function mapDispatchToProps(dispatch){
  return bindActionCreators({
    getReviews: getReviews
  }, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(ReviewsList);

"use strict"
import axios from 'axios';

// GET A REVIEW
export function getReview(id){
  return function(dispatch){
    axios.get("/api/reviews/" + id)
      .then(function(response){
        dispatch({type:"GET_REVIEW", payload:id})
      })
      .catch(function(err){
        dispatch({type:"GET_REVIEW_REJECTED", payload:err})
      })
  }
}

// GET  REVIEWS (READ)
export function getReviews() {
  return function(dispatch){
    axios.get("/api/reviews")
    .then(function(response){
      dispatch({type:"GET_REVIEWS", payload:response.data})
    })
    .catch(function(err){
      dispatch({type:"GET_REVIEWS_REJECTED", payload:err})
    })
  }
}

// POST A REVIEW (CREATE)
export function postReview(review) {
  console.log("posted review ", review)
  return function (dispatch) {
    axios.post("/api/reviews", review)
      .then(function(response){
        console.log("posted review RESPONSE ", review, response)
        dispatch({type: "POST_REVIEW", payload: response.data})
      })
      .catch(function(err){
        dispatch({type: "POST_REVIEW_REJECTED", payload: "there was an error while posting a new review"})
      })
  }
}

// DELETE A REVIEW
export function deleteReview(id){
  return function(dispatch){
    axios.delete("/api/reviews/" + id)
      .then(function(response){
        dispatch({type:"DELETE_REVIEW", payload:id})
      })
      .catch(function(err){
        dispatch({type:"DELETE_REVIEW_REJECTED", payload:err})
      })
  }
}

// UPDATE A REVIEW (UPDATE)
export function updateReview(review, id) {
  console.log("updated review ", review, id, review[0].name)
  return function(dispatch){
    axios.put("/api/reviews/" + id, review)
      .then(function(response){
        console.log("updated review RESPONSE ", review, id, response)
        dispatch({type: "UPDATE_REVIEW",
        payload: response.data})
      })
      .catch(function(err){
        dispatch({type:"UPDATE_REVIEW_REJECTED", payload:err})
      })
  }
}

// RESET FORM BUTTON
export function resetButton(){
  return {
    type:"RESET_BUTTON"
  }
}
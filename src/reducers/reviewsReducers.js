"use strict"
// REVIEWS REDUCERS
export function reviewsReducers(state={
  reviews:[]
}, action) {
  switch(action.type) {
    case "GET_REVIEWS": {
      return {...state, reviews:[...action.payload]}
      break;
    }
    case "POST_REVIEW": {
      // let reviews = state.reviews.concat(action.payload);
      // return {reviews};
      return {...state, reviews: [...state.reviews, ...action.payload], 
        msg:'Saved! Click to continue', style:'success', validation:'success'}
      break;
    }
    case "POST_REVIEW_REJECTED": {
      return {...state, msg:'Please, try again', style:'danger', validation:'error'}
      break;
    }
    case "RESET_BUTTON": {
      return {...state, msg:null, style:'primary', validation:null}
      break;
    }

    case "UPDATE_REVIEW": {
      // create a copy of current array of reviews
      const currentReviewToUpdate = [...state.reviews];
      // find which index in reviews array to update
      const indexToUpdate = currentReviewToUpdate.findIndex(
        function(review) {
          return review._id = action.payload._id;
        }
      )
      const newReviewToUpdate = {
        ...currentReviewToUpdate[indexToUpdate],
        rate: action.payload.rate,
        comment: action.payload.comment
      }
      console.log("what is newreviewToUpdate ", currentReviewToUpdate, indexToUpdate, action, newReviewToUpdate);
      // use slice to remove review at specified index
      return {reviews: [...currentReviewToUpdate.slice(0, indexToUpdate), newReviewToUpdate,
      ...currentReviewToUpdate.slice(indexToUpdate + 1)],
      updatemsg:'Updated! Click to continue', style:'success', validation:'success'
    }
      break;      
    }
  }
  return state;
}
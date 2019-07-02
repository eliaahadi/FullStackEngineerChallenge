// var mongoose = require('mongoose');
// mongoose.connect('mongodb://mxuser:mxuser@ds139138.mlab.com:39138/mxdb');

// var db = mongoose.connection;

require("../database");

var Employee = require('./employees'),
    Reviews = require('./reviews');


var Mei = new Employee({
    name: "Mei"
})

var Hanzo = new Employee({
    name: "Hanzo"
})

var Siwen = new Employee({
  name: "Siwen"
})




Mei.save();
Hanzo.save();
Siwen.save();

console.log('employees seed inserted')
var review1 = new Reviews(
  {
  reviewsFor: Mei._id,
  rate: '10',
  comment: 'sugoi!',
  reviewsBy: Hanzo._id,
  }
)

review1.save(function(error) {
  if (!error) {
      Reviews.find({})
          .populate('reviewsFor')
          .populate('reviewsBy')
          .exec(function(error, reviews) {
              console.log('exec ', JSON.stringify(reviews, null, "\t"))
          })
  }
});
 
var review2 = new Reviews(
  {
    reviewsFor: Mei._id,
    rate: '10',
    comment: 'amazing',
    reviewsBy: Siwen._id
  }
)

review2.save(function(error) {
  if (!error) {
      Reviews.find({})
          .populate('reviewsFor')
          .populate('reviewsBy')
          .exec(function(error, reviews) {
              console.log('exec ', JSON.stringify(reviews, null, "\t"))
          })
  }
});

var review3 = new Reviews(
  {
    reviewsFor: Hanzo._id,
    rate: '8',
    comment: 'nice',
    reviewsBy: Mei._id,
  }
)

review3.save(function(error) {
  if (!error) {
      Reviews.find({})
          .populate('reviewsFor')
          .populate('reviewsBy')
          .exec(function(error, reviews) {
              console.log('exec ', JSON.stringify(reviews, null, "\t"))
          })
  }
});

var review4 = new Reviews(
  {
    reviewsFor: Hanzo._id,
    rate: '7',
    comment: 'moderate',
    reviewsBy: Siwen._id,
  }
)

review4.save(function(error) {
  if (!error) {
      Reviews.find({})
          .populate('reviewsFor')
          .populate('reviewsBy')
          .exec(function(error, reviews) {
              console.log('exec ', JSON.stringify(reviews, null, "\t"))
          })
  }
});

var review5 = new Reviews(
  {
    reviewsFor: Siwen._id,
    rate: '10',
    comment: 'fantastic',
    reviewsBy: Mei._id,
  }
)

review5.save(function(error) {
  if (!error) {
      Reviews.find({})
          .populate('reviewsFor')
          .populate('reviewsBy')
          .exec(function(error, reviews) {
              console.log('exec ', JSON.stringify(reviews, null, "\t"))
          })
  }
});


var review6 = new Reviews(
  {
    reviewsFor: Siwen._id,
    rate: '9',
    comment: 'wonderful',
    reviewsBy: Hanzo._id,
  }
)

review6.save(function(error) {
  if (!error) {
      Reviews.find({})
          .populate('reviewsFor')
          .populate('reviewsBy')
          .exec(function(error, reviews) {
              console.log('exec ', JSON.stringify(reviews, null, "\t"))
          })
  }
});

console.log('REVIEW seed inserted')

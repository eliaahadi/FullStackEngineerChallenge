"use strict"
var mongoose = require('mongoose');

var review = mongoose.Schema({
  reviewsFor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employees'
  },
  rate: Number,
  comment: String,
  reviewsBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employees'
  }
})

var Review = mongoose.model('Review', review);
module.exports = Review; 
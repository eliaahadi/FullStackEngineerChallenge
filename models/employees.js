"use strict"
var mongoose = require('mongoose');

var employees = mongoose.Schema({
	name: String
})

var Employees = mongoose.model('Employees', employees);
module.exports = Employees; 
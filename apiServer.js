var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// API server
var mongoose = require('mongoose');
mongoose.connect('mongodb://mxuser:mxuser@ds139138.mlab.com:39138/mxdb');

var db = mongoose.connection;
db.on('error', console.error.bind(console, '#MongoDB - connection error: '));     

//employees
var Employees = require('./models/employees.js');

//POST 
app.post('/employees', function(req, res){
  var employee = req.body;
  Employees.create(employee, function(err, employees){
    if(err){
      console.log('# API POST EMPLOYEES: ', err);
    }
    res.json(employees);
  }) 
});

// GET ALL
app.get('/employees', function(req, res){
  Employees.find(function(err, employees){
    if(err){
      console.log('# API GET EMPLOYEES: ', err);
    }
    res.json(employees)
  })
});

// GET ONE
app.get('/employees/:_id', function(req, res){
  var query = {_id: req.params._id};
  Employees.findById(query._id, function(err, employee){
    if(err){
      console.log('# API GET EMPLOYEE: ', err);
    }
    res.json(employee)
  })
});

// DELETE
app.delete('/employees/:_id', function(req, res){
  var query = {_id: req.params._id};
  Employees.remove(query, function(err, employees){
    if(err){
      console.log('# API DELETE EMPLOYEES: ', err);
    }
    res.json(employees);
  })
});

// UPDATE
app.put('/employees/:_id', function(req, res){
  var employee = req.body;
  var query = {_id: req.params._id};

  var update = {
    '$set':{
      name:employee[0].name
    }
};
// When true returns the updated document
var options = {new: true};
Employees.findOneAndUpdate(query, update, options, function(err, single_employee){
  if(err){
    console.log('# API UPDATE EMPLOYEES: ', err);
  }
  res.json(single_employee);
  })
});

// reviews
var Reviews = require('./models/reviews.js');

// GET ALL
app.get('/reviews', function(req, res){
  Reviews.find({})
  .populate('reviewsFor')
  .populate('reviewsBy')
  .exec(function(error, reviews) {
      // console.log('exec ', JSON.stringify(reviews, null, "\t"))
      res.json(reviews)
  })
});

// GET ONE
app.get('/reviews/:_id', function(req, res){
  var query = {_id: req.params._id};
  console.log('get one review', query)
  Reviews.findById(query._id, function(err, review){
    if(err){
      console.log('# API GET REVIEW: ', err);
    }
    // console.log("\n \n get one review req \n \n", req, "\n \n get ONE RES \n \n", res, "\n \n get one REVIEW \n \n", employee, 'query')
    res.json(review)
  })
});

//POST 
app.post('/reviews', function(req, res){
  var review = req.body;
  // [ { reviewsFor: { name: 'Siwen' }, rate: '10', comment: 'amazing' } ]
  console.log('apiserver reviews POST req', req.body)
  // console.log('\n \n apiserver reviews POST RES', res)
  console.log('\n \n apiserver reviews find ID', Reviews.find({_id: req.params._id}))
  // if (id.match(/^[0-9a-fA-F]{24}$/)) {
  //   // Yes, it's a valid ObjectId, proceed with `findById` call.
  // }
  Reviews.create(review, function(err, reviews){
    Reviews.find({})
    .populate('reviewsFor')
    .populate('reviewsBy')
    .exec(function(error, reviews) {
        console.log('add one review EXEC ', JSON.stringify(reviews, null, "\t"))
        // res.json(reviews)
    })
    console.log('\n \n reviews API create ', reviews)
    if(err){
      console.log('# API POST REVIEWS: ', err);
    }
    res.json(reviews);
  }) 
});


// UPDATE
app.put('/reviews/:_id', function(req, res){
  console.log('apiServer put', req, res)
  var review = req.body;
  var query = {_id: req.params._id};
  // if the field doesn't exist $set will set a new field
  var update = {
    '$set':{
      rate:review[0].rate,
      comment:review[0].comment
    }
};
// When true returns the updated document
var options = {new: true};
// console.log("\n \n update apiServer req.body \n \n", employee, "\n \n update apiServer query \n \n", query, "\n \n update apiServer update \n \n", update)
Reviews.findOneAndUpdate(query, update, options, function(err, singlereview){
  if(err){
    console.log('# API UPDATE REVIEWS: ', err);
  }
  res.json(singlereview);
  })
});
// END APIs  

app.listen(3001, function(err){
  if(err){
    return console.log(err);
  }
  console.log('API Server is listening on http://localhost:3001');
})
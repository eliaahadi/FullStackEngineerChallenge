## HR Performance Review App
This web application that allows employees to submit feedback toward each other's performance review.

The app structure is as follows.
```
- app
  - frontend
    - components
    - routes.js
  - backend
    - bin
    - node_modules
    - routes
    - apiServer.js
    - server.js
    - app.js
  - webpack.config.js
  - package.json
  - projectREADME.md
  - README.md
  - index.js
```
### Setup
```
$ git clone repo
$ cd FullStackEngineerChallenge
```
- Seed data 
```
FullStackEngineerChallenge $ yarn install
FullStackEngineerChallenge $ yarn seed
```
- Run frontend 
```
FullStackEngineerChallenge $ yarn web
```
- Run backend
```
FullStackEngineerChallenge $ yarn start
```
- Now view frontend website at localhost:3000/
- View backend json API at localhost:3001/employees or localhost:3001/reviews

## Feature overview
### Admin view
* Add/remove/update/view employees
* Add/update/view performance reviews
* Assign employees to participate in another employee's performance review (needed more time for this feature)

### Employee view
* List of performance reviews requiring feedback (get)
* Submit feedback (post)

## Challenge Scope
* High level description of design and technologies used
  - Stack used is JavaScript/React/Redux for frontend, backend is NodeJS, and database is MongoDB.
* Server side API (using a programming language and/or framework of your choice)
  * Implementation of at least 3 API calls
    - In Adminview, calls for CRUD operations in for Employees and CRU operations for Reviews.
    - In Employee view, calls for review update are available.
  * Most full stack web developers at PayPay currently use Java, Ruby on Rails, or Node.js on the server(with MySQL for the database), but feel free to use other tech if you prefer
    - NodeJS used for server side
* Web app
  * Implementation of 2-5 web pages using a modern web framework (e.g. React or Angular) that talks to server side
    * This should integrate with your API, but it's fine to use static responses for some of it 
      - 3 pages, employee/homepage, admin login, and admin page.
* Document all assumptions made
* Complete solutions aren't required, but what you do submit needs to run.

## How to complete this challenge
* Fork this repo in github
* Complete the design and code as defined to the best of your abilities
* Place notes in your code to help with clarity where appropriate. Make it readable enough to present to the PayPay interview team
* Complete your work in your own github repo and send the results to us and/or present them during your interview

## What are we looking for? What does this prove?
* Assumptions you make given limited requirements
  - Given time constraints, I incorporated all features except assigining review to an employee.
* Technology and design choices
  - Stack: JS/React/Redux/Mongo/NodeJS
* Identify areas of your strengths
  - I can figure out most problems with time, I didn't have alot of time to finish adding alot of styling, error handling, or unit tests.
* This is not a pass or fail test, this will serve as a common ground that we can deep dive together into specific issues

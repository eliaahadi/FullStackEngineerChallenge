import React, { Component, useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Admin, Resource, EditGuesser } from "react-admin";
import simpleRestProvider from 'ra-data-simple-rest';
import jsonServerProvider from "ra-data-json-server";
import { UserList, UserEdit, UserCreate } from './users';
import Form from './Form';
import SignUpForm from './SignUpForm';

/*
{
  "employees": [
    {
      "id": 1,
      "name": "Employee 1",
      "reviews_given": 1,
      "reviews_received": 2,
    },
    {
      "id": 2,
      "name": "Employee 2",
      "reviews_given": 1,
      "reviews_received": 1,
    }
  ]
}
*/
const dataProvider =
  jsonServerProvider("https://raw.githubusercontent.com/eliaahadi/demo/master/employee.json");

function Home() {
  return (
    <div className="container">
      home
      <Link to="/admin">Admin</Link>
      <Link to="/employee">Employee</Link>
      <SignUpForm />
    </div>
  );
}

export default Home;
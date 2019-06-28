import React, { Component, useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

function Employee() {
  return (
    <div className="container">
      employee
      <Link to="/">Home</Link>
    </div>
  );
}

export default Employee;
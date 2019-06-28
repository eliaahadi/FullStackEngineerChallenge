import React, { Component, useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

function Admin() {
  return (
    <div className="container">
      admin
      <Link to="/">Home</Link>
    </div>
  );
}

export default Admin;
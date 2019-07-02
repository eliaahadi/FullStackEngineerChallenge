import React, { Component } from 'react';
import ReactDOM from "react-dom";
import { Route, withRouter} from 'react-router-dom';
import {MenuItem, ListGroup, InputGroup, DropdownButton, Image, Col, Row, Well, Panel, FormControl, FormGroup, ControlLabel, Button} from 'react-bootstrap';

function validate(name, password) {
  const errors = [];

  if (name.length === 0) {
    errors.push("name can't be empty");
  }
  if (name.length < 5) {
    errors.push("name should be at least 5 charcters long");
  }
  if (name !== "admin") {
    errors.push("Name is invalid");
  }
  if (password !== "admin") {
    errors.push("Password is invalid");
  }
  return errors;
}

class LoginForm extends React.Component {
  constructor() {
    super();
    this.state = {
      errors: []
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    const name = ReactDOM.findDOMNode(this._nameInput).value;
    const password = ReactDOM.findDOMNode(this._passwordInput).value;
    const errors = validate(name, password);

    if (errors.length > 0) {
      this.setState({ errors });
      return;
    }
    this.props.history.push('/admin');
  }

  render() {
    const { errors } = this.state;
    return (
      <Well>
        <Row>
            <h3>
          Admin Login
            </h3>
  
      <form className="align" onSubmit={this.handleSubmit}>
        {errors.map(error => (
          <p key={error}>Error: {error}</p>
        ))}
        <input
          ref={nameInput => (this._nameInput = nameInput)}
          type="text"
          placeholder="name"
        />
        <input
          ref={passwordInput => (this._passwordInput = passwordInput)}
          type="password"
          placeholder="Password"
        />
        <button type="submit">Submit</button>
      </form>
        </Row>
      </Well>
    );
  }
}

export default LoginForm;
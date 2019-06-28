import React, { Component } from 'react';
import ReactDOM from "react-dom";
import { Route , withRouter} from 'react-router-dom';

function validate(email, password) {
  // we are going to store errors for all fields
  const errors = [];

  if (email.length === 0) {
    errors.push("Email can't be empty");
  }

  if (email.length < 5) {
    errors.push("Email should be at least 5 charcters long");
  }
  if (email.split("").filter(x => x === "@").length !== 1) {
    errors.push("Email should contain a @");
  }
  if (email.indexOf(".") === -1) {
    errors.push("Email should contain at least one dot");
  }

  // if (password.length < 6) {
  //   errors.push("Password should be at least 6 characters long");
  // }

  if (password !== "admin") {
    errors.push("Password is invalid");
  }

  return errors;
}

class SignUpForm extends React.Component {
  constructor() {
    super();
    this.state = {
      errors: []
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    const email = ReactDOM.findDOMNode(this._emailInput).value;
    const password = ReactDOM.findDOMNode(this._passwordInput).value;
    // const email = e.target.email;
    // const password = e.target.password;

    console.log(email,password)
    const errors = validate(email, password);
    if (errors.length > 0) {
      this.setState({ errors });
      return;
    }

    // submit the data...
    console.log(email, password);
    this.props.history.push('/admin');
  }

  render() {
    const { errors } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        {errors.map(error => (
          <p key={error}>Error: {error}</p>
        ))}
        <input
          ref={emailInput => (this._emailInput = emailInput)}
          type="text"
          placeholder="Email"
        />
        <input
          ref={passwordInput => (this._passwordInput = passwordInput)}
          type="password"
          placeholder="Password"
        />

        <button type="submit">Submit</button>
      </form>
    );
  }
}

export default withRouter(SignUpForm);
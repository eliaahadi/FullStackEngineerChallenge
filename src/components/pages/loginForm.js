import React, { Component } from 'react';
import ReactDOM from "react-dom";
import { Route , withRouter} from 'react-router-dom';

function validate(name, password) {
  // we are going to store errors for all fields
  const errors = [];

  if (name.length === 0) {
    errors.push("name can't be empty");
  }

  if (name.length < 5) {
    errors.push("name should be at least 5 charcters long");
  }

  // if (password.length < 6) {
  //   errors.push("Password should be at least 6 characters long");
  // }
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
    // const name = e.target.name;
    // const password = e.target.password;

    console.log(name,password)
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
      <form onSubmit={this.handleSubmit}>
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
    );
  }
}

export default LoginForm;
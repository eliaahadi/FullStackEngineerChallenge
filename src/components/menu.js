"use strict"
import React from 'react';
import {Nav, NavItem, Navbar, Badge} from 'react-bootstrap';
import LoginForm from './pages/loginForm';

class Menu extends React.Component{
  render(){
    return(
      <Navbar inverse fixedTop>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="/">Performance Review</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
        <Nav>
        </Nav>
        <Nav pullRight>
          <NavItem eventKey={1} href="/login">Admin</NavItem>
        </Nav>
        </Navbar.Collapse>
      </Navbar>
    ); 
  }
}

export default Menu
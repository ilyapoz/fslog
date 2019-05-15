import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";

import { Navbar, Nav } from 'react-bootstrap';

import Landing from './Landing';
import Login from './Login';
import Profile from './Profile';
import Round from './Round';

export default function App() {
  return (
    <Router>
      <Navbar variant="dark" bg="dark" expand="md">
        <Navbar.Brand as={NavLink} to="/">FS log</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link as={NavLink} to="/round">
              Round
            </Nav.Link>
            <Login />
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Route path="/" exact component={Landing} />
      <Route path="/round" component={Round} />
      <Route path="/profile" component={Profile} />
    </Router>
  );
};

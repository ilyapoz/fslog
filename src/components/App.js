import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import { Navbar, Nav } from 'react-bootstrap';

import Round from './Round';
import Landing from './Landing';

export default function App() {
  return (
    <Router>
      <Navbar variant="dark" bg="dark" expand="md">
        <Navbar.Brand as={Link} to="/">FS log</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav>
            <Nav.Link as={Link} to="/round">
              Round
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Route path="/" exact component={Landing}/>
      <Route path="/round" component={Round}/>
    </Router>
  );
};

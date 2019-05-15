import React from 'react';

import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';

import { Link, withRouter } from 'react-router-dom';

import { Navbar, NavDropdown, Spinner } from 'react-bootstrap';

import Dev from './lib/Dev';

export default compose(
  withRouter,
  firebaseConnect(),
  connect(({ firebase: { auth } }) => ({ auth }))
)(function Login({firebase, auth, history}) {
  if (!isLoaded(auth)) {
    return (
      <Navbar.Text><Spinner animation="border" size="sm" /></Navbar.Text>
    );
  }

  if (isEmpty(auth)) {
    return (
      <NavDropdown title="Login" alignRight>
        <NavDropdown.Item onClick={() => firebase.login({ provider: 'google', type: 'popup' })}>
          Login with Google
        </NavDropdown.Item>
        <Dev>
          <NavDropdown.Item onClick={() => firebase.login({ provider: 'facebook', type: 'popup' })}>
            Login with Facebook
          </NavDropdown.Item>
        </Dev>
      </NavDropdown>
    );
  }

  return (
    <NavDropdown title={auth.displayName} alignRight>
      <NavDropdown.Item as={Link} to="/profile">Profile</NavDropdown.Item>
      <NavDropdown.Item onClick={() => firebase.logout().then(() => history.push('/'))}>Logout</NavDropdown.Item>
    </NavDropdown>
  );
});

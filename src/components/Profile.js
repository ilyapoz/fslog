import React from 'react';

import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';

import { Redirect } from 'react-router';

import { Container, Card, Spinner, Button } from 'react-bootstrap';

import Dev from './lib/Dev';

export default compose(
  firebaseConnect(),
  connect(({ firebase: { auth, profile } }) => ({ auth, profile }))
)(function Profile({firebase, auth, profile}) {
  const destroyProfile = () => {
    firebase.auth().currentUser.delete();
  };

  return (
    <Container>
    <h1>User profile</h1>
    {(() => {
      if (!isLoaded(profile)) {
        return <Spinner animation="border" />;
      }

      if (isEmpty(auth)) {
        return <Redirect to="/" />;
      }

      return (
        <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src={profile.avatarUrl} />
          <Card.Body>
            <Card.Title>{profile.displayName}</Card.Title>
            <Card.Text>
              Nothing here at the moment.
              Coming: your teams, training sessions etc.
            </Card.Text>
            <Dev>
              <Card.Text>
                <Button variant="danger" onClick={destroyProfile}>Destroy profile</Button>
              </Card.Text>
            </Dev>
          </Card.Body>
        </Card>
      );
    })()}
    </Container>
  );
});

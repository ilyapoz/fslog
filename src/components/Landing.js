import React from 'react';

import { LinkContainer } from 'react-router-bootstrap';

import { Container, Jumbotron, Button } from 'react-bootstrap';

export default function Landing() {
  return (
    <Container className="mt-4">
      <Jumbotron>
        <h1>Welcome to Formation&nbsp;Skydiving log!</h1>

        <p>
          I tried to create a means to log training/competition timings for randoms and block points to track
          progress, analyze weaknesses, find good and bad ideas for block execution, compare teams etc.
        </p>

        <p>
          I personally come from VFS, but this tool can be used for any draw-based discipline like FS, Dynamic etc.
        </p>

        <p>
          <LinkContainer to="/round">
            <Button variant="primary">Try it now!</Button>
          </LinkContainer>
        </p>
      </Jumbotron>
    </Container>
  );
}

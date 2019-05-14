import React from 'react';
import './App.scss';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Container, Row, Col, Navbar, ButtonToolbar, Form } from 'react-bootstrap';

import { connect } from 'react-redux';

import DrawEditor from './DrawEditor';
import PlaybackRate from './PlaybackRate';
import Player from './Player';
import PointsToolbar from './PointsToolbar';
import Stats from './Stats';
import VideoSelector from './VideoSelector';

export default connect(state => ({
    video: state.vfs.video,
    draw: state.vfs.draw,
    drawId: state.vfs.drawId,
  }), {
  }
)(class App extends React.Component {
  state = {
    // used for interface updates that allow some lag, pass currentRealtime callback to critical components
    currentTime: 0,
  };
  player = React.createRef();

  render() {
    return (
      <>
        <Navbar variant="dark" bg="dark" expand="xl" className="sticky-top">
          <Navbar.Brand href="/#">FS log</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav"/>
          <Navbar.Collapse id="basic-navbar-nav">
          </Navbar.Collapse>
        </Navbar>

        <Container fluid={true} className="p-3">
          <Row>
            <Col lg={5}>
              <Form inline className="mb-2">
                <DrawEditor />
                <VideoSelector />
              </Form>
              <Player
                video={this.props.video}
                player={this.player}
                onTimeUpdate={this.handleTimeUpdate}
              />
              <ButtonToolbar className="mb-4">
                <PlaybackRate onChange={this.playbackRate}/>
                <PointsToolbar
                  currentTime={this.state.currentTime}
                  currentRealtime={this.currentRealtime}/>
              </ButtonToolbar>
            </Col>

            <Col>
              <Stats currentTime={this.state.currentTime} />
            </Col>
          </Row>
        </Container>
      </>
    );
  }

  handleTimeUpdate = currentTime => {
    this.setState({currentTime});
  }

  playbackRate = rate => {
    this.player.current.playbackRate = rate;
  }

  currentRealtime = () => this.player.current.currentTime;
});

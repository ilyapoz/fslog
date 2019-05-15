import React from 'react';

import { Container, Row, Col, ButtonToolbar, Form } from 'react-bootstrap';

import { connect } from 'react-redux';
import { setDraw, openVideo } from '../../redux/vfs/actions';

import DrawEditor from '../lib/DrawEditor';
import Player from '../lib/Player';
import VideoSelector from '../lib/VideoSelector';

import PlaybackRate from './PlaybackRate';
import PointsToolbar from './PointsToolbar';
import Stats from './Stats';

const ConnectedDrawEditor = connect(state => ({draw: state.vfs.draw.str}), {setDraw})(DrawEditor);

export default connect(state => ({
    video: state.vfs.video,
    loopSegments: state.vfs.loopSegments,
  }), {
    openVideo,
  }
)(class Round extends React.Component {
  state = {
    // used for interface updates that allow some lag, pass currentRealtime callback to critical components
    currentTime: 0,
  };

  player = React.createRef();

  render() {
    return (
      <Container fluid={true} className="p-3">
        <Row>
          <Col lg={5}>
            <Form inline className="mb-2">
              <ConnectedDrawEditor />
              <VideoSelector openVideo={this.props.openVideo} />
            </Form>
            <Player
              video={this.props.video}
              player={this.player}
              onTimeUpdate={this.handleTimeUpdate}
              loopSegments={this.props.loopSegments}
            />
            <ButtonToolbar className="mb-4">
              <PlaybackRate onChange={this.playbackRate} />
              <PointsToolbar
                currentTime={this.state.currentTime}
                currentRealtime={this.currentRealtime} />
            </ButtonToolbar>
          </Col>

          <Col>
            <Stats currentTime={this.state.currentTime} />
          </Col>
        </Row>
      </Container>
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

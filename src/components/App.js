import React from 'react';
import './App.scss';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import { ButtonToolbar } from 'react-bootstrap';

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
    currentTime: 0,
  };
  player = React.createRef();

  render() {
    return (
      <>
        <nav className="navbar navbar-expand-xl sticky-top navbar-dark bg-dark">
          <a className="navbar-brand" href="/#">FS log</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggler" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarToggler">
          </div>
        </nav>
        <div className="container-fluid p-3">
          <div className="row">
            <div className="col-lg-5">
              <div className="form-inline mb-4">
                <DrawEditor key={this.props.drawId} />
                <VideoSelector />
              </div>
              <Player
                video={this.props.video}
                player={this.player}
                onTimeUpdate={this.handleTimeUpdate}
              />
              <ButtonToolbar className="mb-4">
                <PlaybackRate onChange={this.playbackRate}/>
                <div className="btn-group mr-2" role="group">
                  <button className="btn btn-primary" onClick={this.togglePlay}>Toggle play</button>
                </div>
                <div className="btn-group" role="group">
                  <PointsToolbar
                    currentTime={this.state.currentTime}
                    currentRealtime={() => this.player.current.currentTime}/>
                </div>
              </ButtonToolbar>
            </div>
            <div className="col-lg-7">
              <Stats currentTime={this.state.currentTime} />
            </div>
          </div>
        </div>
      </>
    );
  }

  togglePlay = () => {
    let player = this.player.current;
    if (player.paused) {
      player.play();
    } else {
      player.pause();
    }
  }

  handleTimeUpdate = currentTime => {
    this.setState({currentTime});
  }

  playbackRate = rate => {
    this.player.current.playbackRate = rate;
  }
});

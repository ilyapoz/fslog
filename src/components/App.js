import React from 'react';
import './App.scss';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import { connect } from 'react-redux';
import { resetPoints, placePoint, loadPoints, savePoints, setDraw, setLoopSegments, openVideo } from '../redux/vfs/actions';

import Dev from './Dev';
import Player from './Player';
import Stats from './Stats';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      drawText: props.draw.str,
      currentTime: 0,
    };
    this.player = React.createRef();
    this.videoSelector = React.createRef();
  }

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
              <div className="form-inline ml-auto mb-4">
                <input type="file" accept="video/*" ref={this.videoSelector} onChange={this.openVideo}/>
                <div className="input-group">
                  <input type="text" className="form-control" value={this.state.drawText} onChange={this.updateDrawText}/>
                  <div className="input-group-append">
                    <button className="btn btn-danger" type="button" onClick={this.updateDraw}>Update</button>
                  </div>
                </div>
              </div>
              <Player
                video={this.props.video}
                player={this.player}
                loopSegments={this.props.loopSegments}
                onTimeUpdate={this.handleTimeUpdate}
              />
              <div className="btn-toolbar mb-4" role="toolbar" aria-label="Player control">
                <div className="btn-group ml-auto mr-2" role="group" aria-label="Playback rate">
                  <button className="btn btn-secondary" onClick={() => this.playbackRate(0.2)}>0.2</button>
                  <button className="btn btn-secondary" onClick={() => this.playbackRate(0.5)}>0.5</button>
                  <button className="btn btn-secondary" onClick={() => this.playbackRate(1.0)}>1.0</button>
                </div>
                <div className="btn-group mr-2" role="group">
                  <button className="btn btn-primary" onClick={this.togglePlay}>Toggle play</button>
                </div>
                <div className="btn-group" role="group">
                  <button className="btn btn-danger" onClick={this.reset}>Reset</button>
                  <button disabled={this.props.points.length > 0 &&
                        this.state.currentTime < this.props.points[this.props.points.length - 1].time}
                      className="btn btn-primary" style={{width: '200px'}} onClick={this.place}>
                    Next formation <span>{this.nextFormation().name}</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="col-lg-7">
              <Stats
                points={this.props.points}
                draw={this.props.draw}
                onPointClick={this.handlePointClick}
                onPageClick={this.handlePageClick}
                onFormationClick={this.handleFormationClick}
                currentTime={this.state.currentTime}
                />
              <div className="btn-toolbar mt-4">
                <Dev>
                    <button className="btn btn-primary" onClick={this.props.savePoints}>Save</button>
                    <button className="ml-2 btn btn-primary" onClick={this.loadPoints}>Load</button>
                </Dev>
                <button className="btn btn-danger ml-2"
                    disabled={this.props.loopSegments.length === 0}
                    onClick={this.resetLoopSegments}>
                  <span className="gryphicon glyphicon-search"/>Cancel loop
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  handleTimeUpdate = currentTime => {
    this.setState({currentTime});
  }

  updateDrawText = e => {
    this.setState({
      drawText: e.target.value
    });
  }

  updateDraw = () => {
    this.reset();
    this.props.setDraw(this.state.drawText);
  }

  place = () => {
    this.props.placePoint(this.player.current.currentTime);
  }

  reset = () => {
    this.props.resetPoints();
  }

  togglePlay = () => {
    let player = this.player.current;
    if (player.paused) {
      player.play();
    } else {
      player.pause();
    }
  }

  playbackRate(rate) {
    this.player.current.playbackRate = rate;
  }

  handlePointClick = (stats, point_id) => {
    const start = point_id > 0 ?
      this.props.points[point_id - 1].time :
      Math.max(0, this.props.points[0].time - 1.5);
    const finish = this.props.points[point_id].time;

    this.props.setLoopSegments([{start, finish}]);
  }

  handlePageClick = (stats, page) => {
    this.props.setLoopSegments([stats.pages[page]]);
  }

  handleFormationClick = (stats, formation) => {
    const loopSegments = stats.formations[formation].map(point =>
        ({start: point.time - point.incremental, finish: point.time}));
    this.props.setLoopSegments(loopSegments);
  }

  resetLoopSegments = () => {
    this.props.setLoopSegments([]);
  }

  nextFormation() {
    return this.props.draw.formation(this.props.points.length);
  }

  loadPoints = () => {
    this.props.loadPoints();
    this.setState({
      drawText: this.props.draw.str,
    });
  }

  openVideo = () => {
    this.props.openVideo(URL.createObjectURL(this.videoSelector.current.files[0]));
  }
};

const mapStateToProps = state => {
  return {
    points: state.vfs.points,
    draw: state.vfs.draw,
    loopSegments: state.vfs.loopSegments,
    video: state.vfs.video,
  };
};

export default connect(mapStateToProps,
  {
    resetPoints,
    placePoint,
    loadPoints,
    savePoints,
    setDraw,
    setLoopSegments,
    openVideo,
  }
)(App);

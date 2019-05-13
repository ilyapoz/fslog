import React from 'react';
import './App.scss';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import Dev from './Dev.js';
import Player from './Player.js';
import Stats from './Stats.js';
import vfs from './vfs.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    const default_draw = 'G-13-14';
    this.state = {
      drawText: default_draw,
      draw: new vfs.Draw(default_draw),
      video: "video.mp4",
      points: [],
      loopSegments: [],
      currentTime: null,
    };
    this.player = React.createRef();
    this.videoSelector = React.createRef();
  }

  render() {
    return (
      <>
        {this.renderNavbar()}
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
                video={this.state.video}
                player={this.player}
                loopSegments={this.state.loopSegments}
                onTimeUpdate={this.handleTimeUpdate}/>
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
                  <button disabled={this.state.points.length > 0 &&
                        this.state.currentTime < this.state.points[this.state.points.length - 1].time}
                      className="btn btn-primary" style={{width: '200px'}} onClick={this.place}>
                    Next formation <span>{this.nextFormation(this.state).name}</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="col-lg-7">
              <Stats
                points={this.state.points}
                draw={this.state.draw}
                onPointClick={this.handlePointClick}
                onPageClick={this.handlePageClick}
                onFormationClick={this.handleFormationClick}
                currentTime={this.state.currentTime}
                />
              <div className="btn-toolbar mt-4">
                <Dev>
                    <button className="btn btn-primary" onClick={this.savePoints}>Save</button>
                    <button className="ml-2 btn btn-primary" onClick={this.loadPoints}>Load</button>
                </Dev>
                <button className="btn btn-danger ml-2"
                    disabled={this.state.loopSegments.length === 0}
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

  renderNavbar() {
    return (
      <nav className="navbar navbar-expand-xl sticky-top navbar-dark bg-dark">
        <a className="navbar-brand" href="/#">FS log</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggler" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarToggler">
        </div>
      </nav>
    );
  }

  updateDrawText = (e) => {
    this.setState({
      drawText: e.target.value
    });
  }

  updateDraw = () => {
    this.reset();
    this.setState((state) => ({
      draw: new vfs.Draw(state.drawText)
    }));
  }

  place = () => {
    this.setState((state) => ({
      points: state.points.concat(
        {
          time: this.player.current.currentTime,
    })}));
  }

  reset = () => {
    this.setState({points: []});
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
      this.state.points[point_id - 1].time :
      Math.max(0, this.state.points[0].time - 1.5);
    const finish = this.state.points[point_id].time;

    this.setState({
      loopSegments: [{start, finish}]
    });
  }

  handlePageClick = (stats, page) => {
    this.setState({
      loopSegments: [stats.pages[page]]
    });
  }

  handleFormationClick = (stats, formation) => {
    const loopSegments = stats.formations[formation].map((point) =>
        ({start: point.time - point.incremental, finish: point.time}));
    this.setState({loopSegments});
  }

  resetLoopSegments = () => {
    this.setState({loopSegments: []});
  }

  nextFormation(state) {
    return state.draw.formation(state.points.length);
  }

  savePoints = () => {
    localStorage.setItem('draw', this.state.draw.str);
    localStorage.setItem('points', JSON.stringify(this.state.points));
  }

  loadPoints = () => {
    const draw = localStorage.getItem('draw');
    const points = JSON.parse(localStorage.getItem('points'));
    this.setState({
      drawText: draw,
      draw: new vfs.Draw(draw),
      points: points,
    });
  }

  openVideo = () => {
    this.setState({
      video: URL.createObjectURL(this.videoSelector.current.files[0])
    });
  }

  handleTimeUpdate = (currentTime) => {
    this.setState({currentTime});
  }
};

export default App;

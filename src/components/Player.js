import React from 'react';
import { connect } from 'react-redux';

export default connect(state => ({
    loopSegments: state.vfs.loopSegments,
  }),{
  }
)(class Player extends React.Component {
  render() {
    return (
      <video ref={this.props.player}
        src={this.props.video}
        onTimeUpdate={this.handleTimeUpdate}
        className=""
        width="100%"
        muted controls autoPlay
        playsInline />
    );
  }

  handleTimeUpdate = (e) => {
    const player = this.props.player.current;
    const jump = this.calculateJump(player.currentTime);
    if (jump) {
      player.currentTime = jump;
    }
    this.props.onTimeUpdate(player.currentTime);
  }

  calculateJump(time) {
    const segments = this.props.loopSegments;
    if (!segments || segments.length === 0) {
      return null;
    }

    for (const segment of segments) {
      if (time < segment.start) {
        return segment.start; // skip gap
      }

      if (time < segment.finish) {
        return null; // play back
      }
    }

    return segments[0].start; // loop
  }
});

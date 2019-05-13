import React from 'react';

class Player extends React.Component {
  render() {
    return (
      <video ref={this.props.player} width="100%" className="sticky-top" src={this.props.video} muted controls autoPlay />
    );
  }
};

export default Player;

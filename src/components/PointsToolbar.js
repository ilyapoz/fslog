import React from 'react';
import { connect } from 'react-redux';

import { resetPoints, placePoint } from '../redux/vfs/actions';

export default connect(state => ({
    draw: state.vfs.draw,
    points: state.vfs.points,
  }), {
    resetPoints,
    placePoint,
  }
)(class PointsToolbar extends React.Component {
  render() {
    return (
      <>
        <button className="btn btn-danger" onClick={this.props.resetPoints}>Reset</button>
        <button disabled={this.props.points.length > 0 &&
              this.props.currentTime < this.props.points[this.props.points.length - 1].time}
            className="btn btn-primary" style={{width: '200px'}} onClick={this.place}>
          Next formation <span>{this.nextFormation().name}</span>
        </button>
      </>
    );
  }

  place = () => {
    this.props.placePoint(this.player.current.currentTime);
  }

  nextFormation() {
    return this.props.draw.formation(this.props.points.length);
  }
});

import React from 'react';

import { connect } from 'react-redux';
import { resetPoints, placePoint } from '../../redux/vfs/actions';

import { ButtonGroup, Button } from 'react-bootstrap';

export default connect(state => ({
    draw: state.vfs.draw,
    points: state.vfs.points,
  }), {
    resetPoints,
    placePoint,
  }
)(class PointsToolbar extends React.Component {
  render() {
    const disablePlace = this.props.points.length > 0 &&
        this.props.currentTime < this.props.points[this.props.points.length - 1].time;

    return (
      <ButtonGroup>
        <Button variant="danger" onClick={this.props.resetPoints}>Reset</Button>
        <Button
            onClick={this.place}
            disabled={disablePlace}
            style={{width: '200px'}}
            variant="primary" >
          Next formation <span>{this.nextFormation().name}</span>
        </Button>
      </ButtonGroup>
    );
  }

  place = () => {
    this.props.placePoint(this.props.currentRealtime());
  }

  nextFormation() {
    return this.props.draw.formation(this.props.points.length);
  }
});

import React from 'react';
import { connect } from 'react-redux';

import { setDraw } from '../redux/vfs/actions';

export default connect(state => ({
    draw: state.vfs.draw,
  }), {
    setDraw,
  }
)(class DrawEditor extends React.Component {
  state = { drawText: this.props.draw.str };

  render() {
    return (
      <div className="input-group">
        <input type="text" className="form-control" value={this.state.drawText} onChange={this.updateDrawText}/>
        <div className="input-group-append">
          <button className="btn btn-link" type="button" onClick={this.updateDraw}>Update</button>
        </div>
      </div>
    );
  }

  updateDrawText = e => {
    this.setState({drawText: e.target.value});
  }

  updateDraw = () => {
    this.props.setDraw(this.state.drawText);
  }
});

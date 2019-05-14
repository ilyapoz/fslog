import React from 'react';

import { connect } from 'react-redux';
import { setDraw } from '../redux/vfs/actions';

import { Form } from 'react-bootstrap';

export default connect(state => ({
    draw: state.vfs.draw,
  }), {
    setDraw,
  }
)(function DrawEditor({draw, setDraw}) {
  const updateDraw = e => {
    setDraw(e.target.value);
  }

  return (
    <Form.Group>
      <Form.Label className="mr-2">Draw:</Form.Label>
      <Form.Control type="text" value={draw.str} onChange={updateDraw} />
    </Form.Group>
  );
});

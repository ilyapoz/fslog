import React from 'react';

import { Form } from 'react-bootstrap';

export default function DrawEditor({draw, setDraw}) {
  return (
    <Form.Group className="mb-2">
      <Form.Label className="mr-2">Draw:</Form.Label>
      <Form.Control type="text" value={draw} onChange={e => { setDraw(e.target.value); }} />
    </Form.Group>
  );
};

import React from 'react';

import { connect } from 'react-redux';
import { openVideo } from '../redux/vfs/actions';

import { Form } from 'react-bootstrap';

export default connect(state => ({
  }), {
    openVideo,
  }
)(function VideoSelector({openVideo}) {
  let videoSelector = React.createRef();

  const handleOpen = () => {
    openVideo(URL.createObjectURL(videoSelector.current.files[0]));
  };

  return (
    <Form.Group>
      <input className="ml-auto" type="file" accept="video/*" ref={videoSelector} onChange={handleOpen}/>
    </Form.Group>
  );
});

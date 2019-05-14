import React from 'react';
import { connect } from 'react-redux';

import { openVideo } from '../redux/vfs/actions';

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
    <input className="ml-auto" type="file" accept="video/*" ref={videoSelector} onChange={handleOpen}/>
  );
});

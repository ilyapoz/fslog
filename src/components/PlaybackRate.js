import React from 'react';
import { ToggleButtonGroup, ToggleButton } from 'react-bootstrap';

export default function PlaybackRate({onChange}) {
  const [rate, setRate] = React.useState(1.0);

  const handleChange = rate => {
    onChange(rate);
    setRate(rate);
  };

  return (
    <ToggleButtonGroup
        type="radio"
        name="playbackRate"
        value={rate}
        onChange={handleChange}
        className="ml-auto mr-2">
      {[0.2, 0.5, 1.0].map(rate => <ToggleButton key={rate} variant="secondary" value={rate}>{rate.toFixed(1)}</ToggleButton>)}
    </ToggleButtonGroup>
  );
};

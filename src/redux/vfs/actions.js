export const Type = {
  'RESET': 'RESET_POINT',
  'PLACE': 'PLACE_POINT',
  'LOAD_POINTS': 'LOAD_POINTS',
  'SAVE_POINTS': 'SAVE_POINTS',
  'SET_DRAW': 'SET_DRAW',
  'SET_LOOP_SEGMENTS': 'SET_LOOP_SEGMENTS',
  'OPEN_VIDEO': 'OPEN_VIDEO',
};

export const resetPoints = () => ({
  type: Type.RESET
});

export const placePoint = time => ({
  type: Type.PLACE,
  payload: time
});

export const setDraw = text => ({
  type: Type.SET_DRAW,
  payload: text,
});

export const loadPoints = () => ({ type: Type.LOAD_POINTS });
export const savePoints = () => ({ type: Type.SAVE_POINTS });

export const setLoopSegments = segments => ({
  type: Type.SET_LOOP_SEGMENTS,
  payload: segments
});

export const openVideo = video => ({
  type: Type.OPEN_VIDEO,
  payload: video,
});

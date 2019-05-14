import {Type} from './actions';

import vfs from '../../lib/vfs';

const defaultDraw = 'G-13-14';

const defaultState = {
  points: [],
  draw: new vfs.Draw(defaultDraw),
  loopSegments: [],
  video: 'video.mp4',
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case Type.RESET:
      return {
        ...state,
        points: [],
        loopSegments: [],
      };

    case Type.PLACE:
      return {
        ...state,
        points: [ ...state.points, { time: action.payload } ],
      };

    case Type.SET_DRAW:
      return {
        ...state,
        points: [],
        loopSegments: [],
        draw: new vfs.Draw(action.payload),
      };

    case Type.SAVE_POINTS:
      localStorage.setItem('draw', state.draw.str);
      localStorage.setItem('points', JSON.stringify(state.points));
      return state;

    case Type.LOAD_POINTS:
      const draw = localStorage.getItem('draw');
      const points = JSON.parse(localStorage.getItem('points'));
      return {
        ...state,
        draw: new vfs.Draw(draw),
        points: points,
        loopSegments: [],
      };

    case Type.SET_LOOP_SEGMENTS:
      return {
        ...state,
        loopSegments: action.payload,
      };

    case Type.OPEN_VIDEO:
      return {
        ...state,
        video: action.payload,
        points: [],
        loopSegments: [],
      };

    default:
      return state;
  }
};

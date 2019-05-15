import {Type} from './actions';

import vfs from '../../lib/vfs';


const defaultState = (() => {
  const draw = new vfs.Draw('G-13-14');

  return {
    draw,
    points: [],
    stats: draw.stats([]),
    loopSegments: [],
    video: 'video.mp4',
  };
})();

export default (state = defaultState, action) => {
  switch (action.type) {
    case Type.RESET:
      return {
        ...state,
        points: [],
        stats: state.draw.stats([]),
        loopSegments: [],
      };

    case Type.PLACE:
      const new_points = [...state.points, { time: action.payload }];
      return {
        ...state,
        points: new_points,
        stats: state.draw.stats(new_points), // TODO: optimize here
      };

    case Type.SET_DRAW: {
      const draw = new vfs.Draw(action.payload);
      return {
        ...state,
        draw,
        points: [],
        stats: draw.stats([]),
        loopSegments: [],
      };
    }

    case Type.SAVE_POINTS:
      localStorage.setItem('draw', state.draw.str);
      localStorage.setItem('points', JSON.stringify(state.points));
      return state;

    case Type.LOAD_POINTS: {
      const drawText = localStorage.getItem('draw');
      const draw = new vfs.Draw(drawText);
      const points = JSON.parse(localStorage.getItem('points'));
      return {
        ...state,
        draw,
        points,
        stats: draw.stats(points),
        loopSegments: [],
      };
    }

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
        stats: state.draw.stats([]),
        loopSegments: [],
      };

    default:
      return state;
  }
};

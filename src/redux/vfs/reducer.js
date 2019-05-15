import { createSelector } from 'reselect';

import { Type } from './actions';

import vfs from '../../lib/vfs';

const defaultState = {
  draw: new vfs.Draw('G-13-14'),
  points: [],
  loopSegments: [],
  video: 'video.mp4',
};

const getDraw = state => state.draw;
const getPoints = state => state.points;

export const statsSelector = createSelector(
  getDraw, getPoints,
  (draw, points) => draw.stats(points) // TODO: optimize to incremental build
);

export const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case Type.RESET:
      return {
        ...state,
        points: [],
        loopSegments: [],
      };

    case Type.PLACE:
      const new_points = [...state.points, { time: action.payload }];
      return {
        ...state,
        points: new_points,
      };

    case Type.SET_DRAW: {
      return {
        ...state,
        draw: new vfs.Draw(action.payload),
        points: [],
        loopSegments: [],
      };
    }

    case Type.SAVE_POINTS:
      localStorage.setItem('draw', state.draw.str);
      localStorage.setItem('points', JSON.stringify(state.points));
      return state;

    case Type.LOAD_POINTS: {
      const drawText = localStorage.getItem('draw');
      const points = JSON.parse(localStorage.getItem('points'));
      return {
        ...state,
        draw: new vfs.Draw(drawText),
        points,
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
        loopSegments: [],
      };

    default:
      return state;
  }
};

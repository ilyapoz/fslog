import { combineReducers } from 'redux';
import { reducer as vfs } from './vfs/reducer';

import { firebaseReducer } from 'react-redux-firebase'

export default combineReducers({
  vfs,
  firebase: firebaseReducer
});

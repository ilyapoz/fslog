import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App.js';
import * as serviceWorker from './serviceWorker';

import { Provider } from 'react-redux';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';

import store from './redux/store';
import firebaseConfig from './firebase.js';

ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...firebaseConfig} dispatch={store.dispatch}>
      <App />
    </ReactReduxFirebaseProvider>
  </Provider>,
  document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

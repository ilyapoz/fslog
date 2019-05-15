import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyANmppjdGJCbprIuihFjTbm4gyqir4CNrw",
  authDomain: "fs-log.firebaseapp.com",
  databaseURL: "https://fs-log.firebaseio.com",
  projectId: "fs-log",
  storageBucket: "fs-log.appspot.com",
  messagingSenderId: "19899406519",
  appId: "1:19899406519:web:3490704de9974050"
};

firebase.initializeApp(firebaseConfig);

const rrfConfig = {
  userProfile: 'users',
};

const props = {
  firebase,
  config: rrfConfig,
};

export default props;

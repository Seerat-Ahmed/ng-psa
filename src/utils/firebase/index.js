import firebase from 'firebase';
import '@firebase/firestore';
import ReduxSagaFirebase from 'redux-saga-firebase';

// const config  = {
//   apiKey: 'AIzaSyAF_L9VohzxfNHoFws5XZ3WJ-u2bVYuL-Q',
//   authDomain: 'parrot-scribe.firebaseapp.com',
//   databaseURL: 'https://parrot-scribe.firebaseio.com',
//   projectId: 'parrot-scribe',
//   storageBucket: 'parrot-scribe.appspot.com',
//   messagingSenderId: '916622505580'
// };

/* COPY THE ACTUAL CONFIG FROM FIREBASE CONSOLE */
const config = {
  apiKey: "AIzaSyA2xVyZySeOMgp58sFahS-6od0AXnxl0ew",
  authDomain: "parrotcms.firebaseapp.com",
  databaseURL: "https://parrotcms.firebaseio.com",
  projectId: "parrotcms",
  storageBucket: "parrotcms.appspot.com",
  messagingSenderId: "978068695842"
};

// create singleton instance for firebase
const firebaseApp = firebase.initializeApp(config);
const db = new ReduxSagaFirebase(firebaseApp, firebase.firestore());

export default db;
export { firebase as fire };

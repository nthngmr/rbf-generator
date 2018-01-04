import firebase from 'firebase';
import '@firebase/firestore';

firebase.initializeApp({
  apiKey: "<%= firebaseApiKey %>",
  authDomain: "<%= firebaseSlug %>.firebaseapp.com",
  databaseURL: "https://<%= firebaseSlug %>.firebaseio.com",
  projectId: "<%= firebaseSlug %>",
  storageBucket: "<%= firebaseSlug %>.appspot.com",
  messagingSenderId: "<%= firebaseMessagingSenderId %>"
});

window.fb = firebase;

export default firebase;

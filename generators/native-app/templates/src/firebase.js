import firebase from '@firebase/app';
import '@firebase/firestore'
import '@firebase/auth'


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

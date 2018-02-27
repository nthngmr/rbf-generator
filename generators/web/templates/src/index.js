import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import store from './configureStore';
import setFirebase from '@nothingmore/auth/firebase';
import {HANDLE_SIGNED_IN, HANDLE_SIGNED_OUT} from '@nothingmore/auth/actions';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import firebase from './firebase';
import {
  BrowserRouter as Router
} from 'react-router-dom';

setFirebase(firebase);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App/>
    </Router>
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();

let userRef;

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    userRef = firebase.firestore().doc(`users/${user.uid}`)
    userRef.set({info: {email: user.email}, uid: user.uid}, {merge: true})
    .then(() => {
      userRef.onSnapshot((doc) => {
        if (doc.exists) {
          let user = doc.data()
          store.dispatch({
            type: HANDLE_SIGNED_IN,
            user
          });
        }
      });
    })
  } else {
    store.dispatch({
      type: HANDLE_SIGNED_OUT
    });
  }
});

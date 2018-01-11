import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import store from './configureStore';
import {actions, setFirebase} from '@nothingmore/auth';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import firebase from './firebase';
import {
  BrowserRouter as Router
} from 'react-router-dom';

const {HANDLE_SIGNED_IN, HANDLE_SIGNED_OUT} = actions;

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

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    firebase.firestore()
      .doc(`users/${user.uid}`)
      .get()
      .then((doc) => {
        store.dispatch({
          type: HANDLE_SIGNED_IN, 
          user: doc.data(),
          uid: user.uid,
          photoUrl: user.photoUrl
        });
      })
  } else {
    store.dispatch({
      type: HANDLE_SIGNED_OUT
    });
  }
});


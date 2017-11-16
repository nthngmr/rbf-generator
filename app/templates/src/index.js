import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import store from './configureStore';
import {HANDLE_SIGNED_IN, HANDLE_SIGNED_OUT} from './actions/auth';
import '<%= cssImport %>';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import firebase from './firebase';
import {
  BrowserRouter as Router
} from 'react-router-dom';

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
    store.dispatch({
      type: HANDLE_SIGNED_IN, 
      user: user
    });
  } else {
    store.dispatch({
      type: HANDLE_SIGNED_OUT, 
      user: user
    });
  }
});


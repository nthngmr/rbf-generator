import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import store from './src/configureStore';
import { Provider } from 'react-redux';
import IndexPageContainer from './src/pages/index-page/IndexPageContainer';
import AuthPage from './src/pages/auth-page/AuthPage';
import {connect} from 'react-redux';
import firebase from './src/firebase';
import _ from 'lodash';
import { Container, Content, Header, StyleProvider, Spinner } from 'native-base';
import getTheme from './native-base-theme/components';
import platform from './native-base-theme/variables/platform';
import setFirebase from '@nothingmore/auth/firebase';
import {HANDLE_SIGNED_IN, HANDLE_SIGNED_OUT} from '@nothingmore/auth/actions';

setFirebase(firebase);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 50,
    alignSelf: 'stretch'
  }
});

class Switcher extends React.Component {
  render() {
    return this.props.userID ? <IndexPageContainer/> : (this.props.pending ? <Spinner style={{marginTop: 200}}/> : <AuthPage/>)
  }
}

const SwitcherContainer = connect((state) => ({
  userID: _.get(state, 'auth.user.uid'),
  pending: _.get(state, 'auth.status') === 'pending'
}),
(dispatch) => ({
  dispatch
}))(Switcher);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <SwitcherContainer/>
      </Provider>
    );
  }
}


firebase
  .auth()
  .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
  .then(() => {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        firebase.firestore()
          .doc(`users/${user.uid}`)
          .get()
          .then((doc) => {
            store.dispatch({
              type: HANDLE_SIGNED_IN,
              user: _.merge(doc.data(), {uid: user.uid})
            });
          })
      } else {
        store.dispatch({
          type: HANDLE_SIGNED_OUT
        });
      }
    });
  })
  .catch(function(error) {
    console.log("Firebase Auth Error: ", error.message);
  });

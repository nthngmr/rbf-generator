import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import store from './src/configureStore';
import { Provider } from 'react-redux';
import {HANDLE_SIGNED_IN, HANDLE_SIGNED_OUT} from './src/actions/auth';
import IndexPageContainer from './src/pages/index-page/IndexPageContainer';
import AuthPageContainer from './src/pages/auth-page/AuthPageContainer';
import {connect} from 'react-redux';
import firebase from './src/firebase';
import _ from 'lodash';
import { Container, Content, Header, StyleProvider } from 'native-base';
import getTheme from './native-base-theme/components';
import platform from './native-base-theme/variables/platform';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 50,
    alignSelf: 'stretch'
  },
});

class Switcher extends React.Component {
  render() {
    return this.props.userID ? <IndexPageContainer/> : <AuthPageContainer/>
  }
}

const SwitcherContainer = connect((state) => ({
  userID: _.get(state, 'auth.user.uid')
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

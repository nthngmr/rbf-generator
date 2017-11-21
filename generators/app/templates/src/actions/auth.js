import firebase from '../firebase';


export const HANDLE_SIGNED_IN = 'HANDLE_SIGNED_IN';
export const HANDLE_SIGNED_OUT = 'HANDLE_SIGNED_OUT';
export const HANDLE_SIGNING_OUT = 'HANDLE_SIGNING_OUT';
export const HANDLE_SIGN_IN_FAILURE = 'HANDLE_SIGN_IN_FAILURE';
export const SIGN_IN_WITH_GOOGLE = 'SIGN_IN_WITH_GOOGLE';
export const SIGN_IN_WITH_EMAIL = 'SIGN_IN_WITH_EMAIL';
export const SIGN_UP_WITH_EMAIL = 'SIGN_UP_WITH_EMAIL';

export const signInWithGoogle = (id) => {
  return (dispatch, getState) => {
    var provider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(provider).then(function(result) {
      return saveUserInfo(result.user).then(() => {
        return dispatch({
          type: HANDLE_SIGNED_IN, 
          token: result.credential.accessToken,
          user: result.user,
          provider: 'google'
        });
      });
    }).catch(function(error) {
      return dispatch({
        type: HANDLE_SIGN_IN_FAILURE, 
        error,
        provider: 'google'
      });
    });
  }
}

export const signInWithEmail = (email, password) => {
  return (dispatch, getState) => {

    return firebase.auth().signInWithEmailAndPassword(email, password).then(function(result) {
      return saveUserInfo(result.user).then(() => {
        return dispatch({
          type: HANDLE_SIGNED_IN, 
          token: result.credential.accessToken,
          user: result.user,
          provider: 'email'
        });
      });
    }).catch(function(error) {
      return dispatch({
        type: HANDLE_SIGN_IN_FAILURE, 
        error,
        provider: 'email'
      });
    });
  }
}

export const signUpWithEmail = (email, password, passwordConfirmation) => {
  return (dispatch, getState) => {

    return firebase.auth().createUserWithEmailAndPassword(email, password).then(function(result) {
      return saveUserInfo(result.user).then(() => {
        return dispatch({
          type: HANDLE_SIGNED_IN, 
          token: result.credential.accessToken,
          user: result.user,
          provider: 'email'
        });
      });
    }).catch(function(error) {
      return dispatch({
        type: HANDLE_SIGN_IN_FAILURE, 
        error,
        provider: 'email'
      });
    });
  }
}

function saveUserInfo(user) {
  let info = {
    name: user.displayName,
    email: user.email,
    photoUrl: user.photoURL,
    emailVerified: user.emailVerified,
    uid: user.uid
  }
  return firebase.firestore().doc(`users/${user.uid}`).set({info});
}

export const signOut = (id) => {
  return (dispatch, getState) => {

    dispatch({
      type: HANDLE_SIGNING_OUT
    });

    firebase.auth().signOut().then(function(result) {
      dispatch({
        type: HANDLE_SIGNED_OUT
      });
    })
  }
}

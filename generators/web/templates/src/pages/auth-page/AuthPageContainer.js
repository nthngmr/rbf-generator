import {connect} from 'react-redux';
import {signInWithGoogle, signInWithEmail, signUpWithEmail} from './../../actions/auth';
import AuthPage from './AuthPage';

const AuthPageContainer = connect((state) => ({
  auth: state.auth,
  authPending: state.auth.status === 'pending',
  form: state.form.signIn
}),
(dispatch) => ({
  dispatch,
  signInWithGoogle: () => {
    dispatch(signInWithGoogle());
  },
  signInWithEmail: (...args) => {
    dispatch(signInWithEmail(...args));
  },
  signUpWithEmail: (...args) => {
    dispatch(signUpWithEmail(...args));
  }
}))(AuthPage);

export default AuthPageContainer;

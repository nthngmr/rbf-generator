import {connect} from 'react-redux';
import _ from 'lodash';
import IndexPage from './IndexPage';
import { signOut } from '@nothingmore/auth/actions';

const IndexPageContainer = connect((state) => ({
  userID: _.get(state, 'auth.user.uid')
}),
(dispatch) => ({
  dispatch,
  signOut: () => {
    dispatch(signOut());
  }
}))(IndexPage);

export default IndexPageContainer;

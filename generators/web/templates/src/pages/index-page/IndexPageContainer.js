import {connect} from 'react-redux';
import _ from 'lodash';
import IndexPage from './IndexPage';

const IndexPageContainer = connect((state) => ({
  userID: _.get(state, 'auth.user.uid')
}),
(dispatch) => ({
  dispatch
}))(IndexPage);

export default IndexPageContainer;

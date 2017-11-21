import {connect} from 'react-redux';
import _ from 'lodash';
import <%= page %>Page from './<%= page %>Page';

const <%= page %>PageContainer = connect((state) => ({
  userID: _.get(state, 'auth.user.uid')
}),
(dispatch) => ({
  dispatch
}))(<%= page %>Page);

export default <%= page %>PageContainer;

import {connect} from 'react-redux';
import _ from 'lodash';
import SettingsPage from './SettingsPage';

const SettingsPageContainer = connect((state) => ({
  userID: _.get(state, 'auth.user.uid')
}),
(dispatch) => ({
  dispatch
}))(SettingsPage);

export default SettingsPageContainer;

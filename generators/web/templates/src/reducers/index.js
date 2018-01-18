import { combineReducers } from 'redux';
import auth from '@nothingmore/auth/reducer';
import { reducer as formReducer } from 'redux-form';

export default combineReducers({
  auth,
  form: formReducer
});

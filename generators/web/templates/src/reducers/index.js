import { combineReducers } from 'redux';
import { reducer as auth } from '@nothingmore/auth';
import { reducer as formReducer } from 'redux-form';


export default combineReducers({
  auth,
  form: formReducer
});

import _ from 'lodash';
import {
  HANDLE_SIGNED_IN, 
  HANDLE_SIGNED_OUT, 
  HANDLE_SIGNING_OUT,
  SIGN_IN_WITH_GOOGLE, 
  HANDLE_SIGN_IN_FAILURE
} from './../actions/auth';

const initialState = {
  status: 'pending'
}

const auth = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_IN_WITH_GOOGLE:
      return {
        status: 'pending'
      };
    case HANDLE_SIGNED_IN:
      return {
        status: 'authenticated',
        token: action.token,
        user: action.user
      };
    case HANDLE_SIGNING_OUT:
      return {
        ...state,
        status: 'pending'
      };
    case HANDLE_SIGNED_OUT:
      return {
        status: 'unauthenticated'
      };
    case HANDLE_SIGN_IN_FAILURE:
      return {
        status: 'unauthenticated',
        type: 'HANDLE_SIGN_IN_FAILURE', 
        error: action.error,
        provider: action.provider
      }
    default:
      return state;
  }
}

export default auth;
